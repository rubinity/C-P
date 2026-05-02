"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { type Exercise } from "@/lib/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <p className="text-base leading-relaxed text-card-foreground">
            {exercise.maskedSentence}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnswer(!showAnswer)}
          className="gap-2"
        >
          {showAnswer ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Answer
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show Answer
            </>
          )}
        </Button>
      </div>

      {showAnswer && (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-accent/10 px-4 py-3">
          <Check className="h-4 w-4 shrink-0 text-accent" />
          <span className="font-medium text-accent">{exercise.answer}</span>
        </div>
      )}
    </div>
  );
}
