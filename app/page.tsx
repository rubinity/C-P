"use client";

import { useState } from "react";
import { SettingsPanel } from "@/components/settings-panel";
import { ExerciseList } from "@/components/exercise-list";
import { getExercises, type Complexity, type Exercise } from "@/lib/exercises";
import { GraduationCap } from "lucide-react";

export default function Home() {
  const [complexity, setComplexity] = useState<Complexity>("simple");
  const [prepositionsMode, setPrepositionsMode] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentSettings, setCurrentSettings] = useState<{
    complexity: Complexity;
    prepositionsMode: boolean;
  } | null>(null);

  const handleGenerate = () => {
    const newExercises = getExercises(complexity, prepositionsMode);
    setExercises(newExercises);
    setCurrentSettings({ complexity, prepositionsMode });
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
              German Grammar Exercises
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
            />
          </aside>

          {/* Exercises Area */}
          <section>
            <ExerciseList
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
