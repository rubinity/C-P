"use client";

import { ExerciseCard } from "@/components/exercise-card";
import { type Exercise, type Complexity } from "@/lib/exercises";
import { BookOpen } from "lucide-react";

interface ExerciseListProps {
  exercises: Exercise[];
  complexity: Complexity;
  prepositionsMode: boolean;
}

const complexityLabels: Record<Complexity, string> = {
  simple: "Simple",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function ExerciseList({ exercises, complexity, prepositionsMode }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium text-card-foreground">No Exercises Yet</h3>
        <p className="text-sm text-muted-foreground">
          Configure your settings and click &quot;Generate Exercises&quot; to start practicing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {complexityLabels[complexity]}
        </span>
        <span className={`rounded-md px-3 py-1 text-sm font-medium ${
          prepositionsMode 
            ? "bg-accent/10 text-accent" 
            : "bg-muted text-muted-foreground"
        }`}>
          Prepositions {prepositionsMode ? "On" : "Off"}
        </span>
        <span className="text-sm text-muted-foreground">
          {exercises.length} exercises
        </span>
      </div>

      <div className="space-y-3">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))}
      </div>
    </div>
  );
}
