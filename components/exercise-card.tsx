"use client";

import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { type Exercise } from "@/lib/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  userAnswers: Record<string, string>;
  onAnswerChange: (blankId: string, value: string) => void;
  isChecked: boolean;
}

export function ExerciseCard({
  exercise,
  index,
  userAnswers,
  onAnswerChange,
  isChecked,
}: ExerciseCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {index + 1}
        </span>
        <div className="flex flex-wrap items-center gap-1 text-base leading-relaxed text-card-foreground">
          {exercise.parts.map((part, partIndex) => {
            if (typeof part === "string") {
              return (
                <span key={partIndex} className="whitespace-pre-wrap">
                  {part}
                </span>
              );
            }

            const blank = exercise.blanks.find((b) => b.id === part.blankId);
            if (!blank) return null;

            const userAnswer = userAnswers[blank.id] || "";
            const isCorrect =
              userAnswer.trim().toLowerCase() ===
              blank.correctAnswer.toLowerCase();

            return (
              <span key={partIndex} className="inline-flex items-center gap-1">
                <span className="relative flex flex-col items-center">
                  <span className="mb-0.5 text-xs font-medium text-muted-foreground">
                    {blank.hint}
                  </span>
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(blank.id, e.target.value)}
                    disabled={isChecked}
                    className={`h-8 w-24 px-2 text-center text-sm font-medium ${
                      isChecked
                        ? isCorrect
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : ""
                    }`}
                    placeholder="..."
                  />
                </span>
                {isChecked && (
                  <span className="flex items-center">
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="flex items-center gap-1">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-green-600">
                          {blank.correctAnswer}
                        </span>
                      </span>
                    )}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
