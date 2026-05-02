"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings-panel";
import { ExerciseList } from "@/components/exercise-list";
import { type Complexity, type Exercise } from "@/lib/exercises";
import { GraduationCap } from "lucide-react";

// Transform API response to match our Exercise interface
interface APIBlank {
  id: string;
  stem: string | null;
  prompt: string | null;
  answer: string;
}

interface APIExercise {
  id: string;
  parts: string[];
  blanks: APIBlank[];
}

function transformAPIResponse(apiExercises: APIExercise[]): Exercise[] {
  return apiExercises.map((ex, index) => {
    // Interleave parts and blank references
    const parts: (string | { blankId: string })[] = [];
    
    for (let i = 0; i < ex.parts.length; i++) {
      if (ex.parts[i]) {
        parts.push(ex.parts[i]);
      }
      if (i < ex.blanks.length) {
        parts.push({ blankId: ex.blanks[i].id });
      }
    }
    
    return {
      id: index + 1,
      parts,
      blanks: ex.blanks.map((b) => ({
        id: b.id,
        stem: b.stem || undefined,
        prompt: b.prompt || undefined,
        correctAnswer: b.answer,
      })),
    };
  });
}

export default function Home() {
  const [complexity, setComplexity] = useState<Complexity>("simple");
  const [prepositionsMode, setPrepositionsMode] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationKey, setGenerationKey] = useState(0);
  const [currentSettings, setCurrentSettings] = useState<{
    complexity: Complexity;
    prepositionsMode: boolean;
  } | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complexity, prepositionsMode }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate exercises");
      }
      
      const data = await response.json();
      const transformedExercises = transformAPIResponse(data.exercises);
      setExercises(transformedExercises);
      setCurrentSettings({ complexity, prepositionsMode });
      setGenerationKey((k) => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-card-foreground sm:text-2xl">
              Cases and Prepositions
            </h1>
            <p className="text-sm text-muted-foreground">
              Practice case usage with verb-preposition structures
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Settings Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <SettingsPanel
              complexity={complexity}
              setComplexity={setComplexity}
              prepositionsMode={prepositionsMode}
              setPrepositionsMode={setPrepositionsMode}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </aside>

          {/* Exercises Area */}
          <section>
            {error && (
              <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                {error}
              </div>
            )}
            <ExerciseList
              key={generationKey}
              exercises={exercises}
              complexity={currentSettings?.complexity || complexity}
              prepositionsMode={currentSettings?.prepositionsMode || prepositionsMode}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
