"use client";

import { useState, useEffect } from "react";
import { ExerciseCard } from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import { type Exercise, type Complexity } from "@/lib/exercises";
import { BookOpen, CheckCircle, RotateCcw, Clock } from "lucide-react";

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

export function ExerciseList({
  exercises,
  complexity,
  prepositionsMode,
}: ExerciseListProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timePerBlank, setTimePerBlank] = useState<number | null>(null);

  // Reset state and start timer when exercises change
  useEffect(() => {
    setUserAnswers({});
    setIsChecked(false);
    setTimePerBlank(null);
    // Start timer when exercises are loaded
    if (exercises.length > 0) {
      setStartTime(Date.now());
    }
  }, [exercises, complexity, prepositionsMode]);

  const handleAnswerChange = (blankId: string, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [blankId]: value,
    }));
  };

  const handleCheck = () => {
    if (startTime) {
      const totalTime = (Date.now() - startTime) / 1000; // in seconds
      const blanksCount = exercises.reduce((sum, ex) => sum + ex.blanks.length, 0);
      if (blanksCount > 0) {
        setTimePerBlank(totalTime / blanksCount);
      }
    }
    setIsChecked(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsChecked(false);
    setTimePerBlank(null);
    setStartTime(Date.now());
  };

  // Calculate score when checked
  const totalBlanks = exercises.reduce((sum, ex) => sum + ex.blanks.length, 0);
  const correctAnswers = isChecked
    ? exercises.reduce((sum, ex) => {
        return (
          sum +
          ex.blanks.filter(
            (blank) =>
              (userAnswers[blank.id] || "").trim().toLowerCase() ===
              blank.correctAnswer.toLowerCase()
          ).length
        );
      }, 0)
    : 0;

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium text-card-foreground">
          No Exercises Yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure your settings and click &quot;Generate Exercises&quot; to
          start practicing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {complexityLabels[complexity]}
          </span>
          <span
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              prepositionsMode
                ? "bg-accent/10 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Prepositions {prepositionsMode ? "On" : "Off"}
          </span>
          <span className="text-sm text-muted-foreground">
            {exercises.length} exercises
          </span>
        </div>

        {isChecked && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Score: {correctAnswers} / {totalBlanks}
            </div>
            {timePerBlank !== null && (
              <div className="flex items-center gap-2 rounded-md bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Clock className="h-4 w-4" />
                {timePerBlank.toFixed(1)}s per blank
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            isChecked={isChecked}
          />
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        {!isChecked ? (
          <Button onClick={handleCheck} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Check Answers
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
