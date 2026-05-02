export type Complexity = "simple" | "intermediate" | "advanced";

export interface Blank {
  id: string;
  stem?: string; // e.g., "d", "ein", "klein" - appears before input
  prompt?: string; // e.g., "er", "sie" - the nominative form shown in brackets for pronouns
  correctAnswer: string; // Only the ending for stem words, full word for prompts
}

export interface Exercise {
  id: number;
  parts: (string | { blankId: string })[];
  blanks: Blank[];
}

export interface ExerciseSet {
  complexity: Complexity;
  prepositionsMode: boolean;
  exercises: Exercise[];
}

// Helper to create exercises with blanks
// Template uses markers:
// - {d__} for stem+ending (user fills ending)
// - {(er)} for pronoun with nominative form shown (user writes declined form)
// - {___} for prepositions (blank with no hint)
function createExercise(
  id: number,
  template: string,
  answers: string[]
): Exercise {
  const parts: (string | { blankId: string })[] = [];
  const blanks: Blank[] = [];
  
  // Match markers in curly braces
  const regex = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let blankIndex = 0;
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }
    
    const marker = match[1];
    const blankId = `${id}-${blankIndex}`;
    const fullAnswer = answers[blankIndex] || "";
    
    parts.push({ blankId });
    
    // Check if it's a prompt in parentheses like (er), (sie), (wir) - nominative pronoun
    if (marker.startsWith("(") && marker.endsWith(")")) {
      blanks.push({
        id: blankId,
        prompt: marker.slice(1, -1), // Remove parentheses, keep the nominative form
        correctAnswer: fullAnswer,
      });
    }
    // Check if it's a preposition blank (no hint)
    else if (marker === "___") {
      blanks.push({
        id: blankId,
        // No stem, no prompt - just empty blank
        correctAnswer: fullAnswer,
      });
    }
    // Check if it ends with __ (stem + ending pattern)
    else if (marker.endsWith("__")) {
      const stem = marker.slice(0, -2); // Remove __
      blanks.push({
        id: blankId,
        stem: stem,
        correctAnswer: fullAnswer.slice(stem.length), // Only the ending
      });
    }
    // Otherwise it's a full word blank (generic)
    else {
      blanks.push({
        id: blankId,
        correctAnswer: fullAnswer,
      });
    }
    
    blankIndex++;
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text after last match
  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }
  
  return { id, parts, blanks };
}

// Example exercises for each complexity level and preposition mode
// Note: Subject pronouns (nominative) are NOT blanks - they appear as regular text
// Only pronouns that need to be declined (dative, accusative) are blanks with nominative shown
// Verbs are regular text, not blanks
// Prepositions use {___} with no hint
export const exampleExercises: Record<string, ExerciseSet> = {
  "simple-off": {
    complexity: "simple",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "{D__} Hund schläft.", ["Der"]),
      createExercise(2, "Ich sehe {ein__} {klein__} Katze.", ["eine", "kleine"]),
      createExercise(3, "{D__} Buch ist interessant.", ["Das"]),
      createExercise(4, "Er gibt {(sie)} {d__} Blumen.", ["ihr", "die"]),
      createExercise(5, "{D__} {alt__} Mann sitzt.", ["Der", "alte"]),
    ],
  },
  "simple-on": {
    complexity: "simple",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er wartet {___} {d__} Bus.", ["auf", "den"]),
      createExercise(2, "Sie denkt {___} {ihr__} Freund.", ["an", "ihren"]),
      createExercise(3, "Ich freue mich {___} {d__} Reise.", ["auf", "die"]),
      createExercise(4, "Er hilft {(ich)} {___} {d__} Arbeit.", ["mir", "bei", "der"]),
      createExercise(5, "Sie interessiert sich {___} {d__} Kunst.", ["für", "die"]),
    ],
  },
  "intermediate-off": {
    complexity: "intermediate",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "{D__} Frau, die dort steht, ist {mein__} Lehrerin.", ["Die", "meine"]),
      createExercise(2, "Obwohl {d__} Wetter schlecht ist, gehen wir spazieren.", ["das"]),
      createExercise(3, "Er kauft {ein__} {neu__} Auto, weil {sein__} {alt__} kaputt ist.", ["ein", "neues", "sein", "altes"]),
      createExercise(4, "{D__} {klein__} Kinder spielen, während {ihr__} Eltern arbeiten.", ["Die", "kleinen", "ihre"]),
      createExercise(5, "Ich weiß nicht, ob er {d__} Antwort kennt.", ["die"]),
      createExercise(6, "{D__} Professor erklärt {d__} {schwierig__} Thema.", ["Der", "das", "schwierige"]),
    ],
  },
  "intermediate-on": {
    complexity: "intermediate",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er denkt {___} {d__} Prüfung, die morgen stattfindet.", ["an", "die"]),
      createExercise(2, "Sie wartet {___} {ihr__} Freund, der noch arbeitet.", ["auf", "ihren"]),
      createExercise(3, "Ich freue mich {___} {d__} Geschenk, das du {(ich)} gibst.", ["über", "das", "mir"]),
      createExercise(4, "Er bittet {(sie)} {___} Hilfe, weil er es allein nicht schafft.", ["sie", "um"]),
      createExercise(5, "Sie erinnert sich {___} {d__} {schön__} Urlaub.", ["an", "den", "schönen"]),
      createExercise(6, "Wir sprechen {___} {d__} {neu__} Projekt.", ["über", "das", "neue"]),
    ],
  },
  "advanced-off": {
    complexity: "advanced",
    prepositionsMode: false,
    exercises: [
      createExercise(
        1,
        "{D__} von {d__} {berühmt__} Wissenschaftler entwickelte Theorie wurde von {d__} {international__} Gemeinschaft anerkannt.",
        ["Die", "dem", "berühmten", "der", "internationalen"]
      ),
      createExercise(
        2,
        "Obwohl {d__} {jung__} Studentin, die aus {ein__} {klein__} Dorf stammt, zunächst Schwierigkeiten hatte, gelang es {(sie)}, {d__} {schwierig__} Prüfung zu bestehen.",
        ["die", "junge", "einem", "kleinen", "ihr", "die", "schwierige"]
      ),
      createExercise(
        3,
        "{D__} {alt__} Professor, dessen Forschung {d__} {ganz__} Welt bekannt ist, hielt {ein__} Vortrag über {d__} Auswirkungen {d__} Klimawandels.",
        ["Der", "alte", "der", "ganzen", "einen", "die", "des"]
      ),
      createExercise(
        4,
        "Nachdem {d__} {lang__} Winter endlich vorbei war, freuten sich {d__} Bewohner {d__} {klein__} Stadt auf {d__} {kommend__} Frühling.",
        ["der", "lange", "die", "der", "kleinen", "den", "kommenden"]
      ),
      createExercise(
        5,
        "{D__} von {(ich)} gestern gekaufte Buch, dessen Autor {ein__} {berühmt__} Schriftsteller ist, handelt von {d__} Geschichte {ein__} {alt__} Familie.",
        ["Das", "mir", "ein", "berühmter", "der", "einer", "alten"]
      ),
    ],
  },
  "advanced-on": {
    complexity: "advanced",
    prepositionsMode: true,
    exercises: [
      createExercise(
        1,
        "{D__} Wissenschaftler, der sich {___} {d__} Erforschung {d__} {neu__} Medikaments konzentriert, arbeitet {___} {ein__} {wichtig__} Projekt.",
        ["Der", "auf", "die", "des", "neuen", "an", "einem", "wichtigen"]
      ),
      createExercise(
        2,
        "Obwohl sie sich {___} {d__} {schwierig__} Prüfung vorbereitet hatte, zweifelte sie {___} {ihr__} Fähigkeiten.",
        ["auf", "die", "schwierige", "an", "ihren"]
      ),
      createExercise(
        3,
        "Er denkt oft {___} {d__} Zeit, als er sich {___} {d__} {alt__} Universität {___} {sein__} Studium bewarb.",
        ["an", "die", "an", "der", "alten", "um", "sein"]
      ),
      createExercise(
        4,
        "{D__} Politiker, der sich {___} {d__} Interesse {d__} Bürger einsetzt, kämpft {___} {ein__} {besser__} Zukunft.",
        ["Der", "für", "die", "der", "für", "eine", "bessere"]
      ),
      createExercise(
        5,
        "Sie erinnerte sich {___} {d__} Tag, an dem sie sich {___} {ihr__} {neu__} Stelle bewarb und {___} {d__} Direktor sprach.",
        ["an", "den", "um", "ihre", "neue", "mit", "dem"]
      ),
    ],
  },
};

export function getExercises(complexity: Complexity, prepositionsMode: boolean): Exercise[] {
  const key = `${complexity}-${prepositionsMode ? "on" : "off"}`;
  return exampleExercises[key]?.exercises || [];
}
