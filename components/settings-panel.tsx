"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { type Complexity } from "@/lib/exercises";
import { Loader2 } from "lucide-react";

interface SettingsPanelProps {
  complexity: Complexity;
  setComplexity: (complexity: Complexity) => void;
  prepositionsMode: boolean;
  setPrepositionsMode: (mode: boolean) => void;
  onGenerate: () => void;
  isLoading?: boolean;
}

const complexityOptions: { value: Complexity; label: string; description: string }[] = [
  { value: "simple", label: "Simple", description: "One clause, short sentences" },
  { value: "intermediate", label: "Intermediate", description: "Multiple clauses, simple structure" },
  { value: "advanced", label: "Advanced", description: "Dense noun phrases, subordinate clauses" },
];

export function SettingsPanel({
  complexity,
  setComplexity,
  prepositionsMode,
  setPrepositionsMode,
  onGenerate,
  isLoading = false,
}: SettingsPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-card-foreground">Exercise Settings</h2>
      
      <div className="space-y-6">
        {/* Complexity Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Complexity Level</Label>
          <div className="grid gap-2">
            {complexityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setComplexity(option.value)}
                className={`flex flex-col items-start rounded-md border p-3 text-left transition-colors ${
                  complexity === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-card-foreground hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Prepositions Mode Toggle */}
        <div className="flex items-center justify-between rounded-md border border-border bg-background p-4">
          <div className="space-y-0.5">
            <Label htmlFor="prepositions-mode" className="text-sm font-medium text-card-foreground">
              Prepositions Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Include verb-governed preposition blanks
            </p>
          </div>
          <Switch
            id="prepositions-mode"
            checked={prepositionsMode}
            onCheckedChange={setPrepositionsMode}
          />
        </div>

        {/* Generate Button */}
        <Button onClick={onGenerate} className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Exercises"
          )}
        </Button>
      </div>
    </div>
  );
}
