export type Complexity = "simple" | "intermediate" | "advanced";

export interface Blank {
  id: string;
  stem?: string; // e.g., "d", "ein", "klein" - appears before input
  prompt?: string; // e.g., "pronoun", "verb" - appears in brackets after input
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
// - {(pronoun)} for full word with prompt (user fills whole word)
// - {prep} for prepositions (user fills whole word)
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
    
    // Check if it's a prompt in parentheses like (pronoun)
    if (marker.startsWith("(") && marker.endsWith(")")) {
      blanks.push({
        id: blankId,
        prompt: marker.slice(1, -1), // Remove parentheses
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
    // Otherwise it's a full word blank (like prepositions)
    else {
      blanks.push({
        id: blankId,
        prompt: marker, // e.g., "prep"
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
export const exampleExercises: Record<string, ExerciseSet> = {
  "simple-off": {
    complexity: "simple",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "{D__} Hund schläft.", ["Der"]),
      createExercise(2, "Ich sehe {ein__} {klein__} Katze.", ["eine", "kleine"]),
      createExercise(3, "{D__} Buch ist interessant.", ["Das"]),
      createExercise(4, "{(pronoun)} gibt {(pronoun)} {d__} Blumen.", ["Er", "ihr", "die"]),
      createExercise(5, "{D__} {alt__} Mann sitzt.", ["Der", "alte"]),
    ],
  },
  "simple-on": {
    complexity: "simple",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "{(pronoun)} wartet {(prep)} {d__} Bus.", ["Er", "auf", "den"]),
      createExercise(2, "Sie denkt {(prep)} {ihr__} Freund.", ["an", "ihren"]),
      createExercise(3, "Ich freue mich {(prep)} {d__} Reise.", ["auf", "die"]),
      createExercise(4, "{(pronoun)} hilft {(pronoun)} {(prep)} {d__} Arbeit.", ["Er", "mir", "bei", "der"]),
      createExercise(5, "Sie interessiert sich {(prep)} {d__} Kunst.", ["für", "die"]),
    ],
  },
  "intermediate-off": {
    complexity: "intermediate",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "{D__} Frau, die dort steht, ist {mein__} Lehrerin.", ["Die", "meine"]),
      createExercise(2, "Obwohl {d__} Wetter schlecht ist, gehen {(pronoun)} spazieren.", ["das", "wir"]),
      createExercise(3, "{(pronoun)} kauft {ein__} {neu__} Auto, weil {sein__} {alt__} kaputt ist.", ["Er", "ein", "neues", "sein", "altes"]),
      createExercise(4, "{D__} {klein__} Kinder spielen, während {ihr__} Eltern arbeiten.", ["Die", "kleinen", "ihre"]),
      createExercise(5, "Ich weiß nicht, ob {(pronoun)} {d__} Antwort kennt.", ["er", "die"]),
      createExercise(6, "{D__} Professor erklärt {d__} {schwierig__} Thema.", ["Der", "das", "schwierige"]),
    ],
  },
  "intermediate-on": {
    complexity: "intermediate",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "{(pronoun)} denkt {(prep)} {d__} Prüfung, die morgen stattfindet.", ["Er", "an", "die"]),
      createExercise(2, "Sie wartet {(prep)} {ihr__} Freund, der noch arbeitet.", ["auf", "ihren"]),
      createExercise(3, "Ich freue mich {(prep)} {d__} Geschenk, das du {(pronoun)} gibst.", ["über", "das", "mir"]),
      createExercise(4, "{(pronoun)} bittet {(pronoun)} {(prep)} Hilfe, weil {(pronoun)} es allein nicht schafft.", ["Er", "sie", "um", "er"]),
      createExercise(5, "Sie erinnert sich {(prep)} {d__} {schön__} Urlaub.", ["an", "den", "schönen"]),
      createExercise(6, "{(pronoun)} sprechen {(prep)} {d__} {neu__} Projekt.", ["Wir", "über", "das", "neue"]),
    ],
  },
  "advanced-off": {
    complexity: "advanced",
    prepositionsMode: false,
    exercises: [
      createExercise(
        1,
        "{D__} von {d__} {berühmt__} Wissenschaftler {(verb)} Theorie wurde von {d__} {international__} Gemeinschaft anerkannt.",
        ["Die", "dem", "berühmten", "entwickelte", "der", "internationalen"]
      ),
      createExercise(
        2,
        "Obwohl {d__} {jung__} Studentin, die aus {ein__} {klein__} Dorf stammt, zunächst Schwierigkeiten hatte, gelang es {(pronoun)}, {d__} {schwierig__} Prüfung zu bestehen.",
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
        "{D__} von {(pronoun)} gestern {(verb)} Buch, dessen Autor {ein__} {berühmt__} Schriftsteller ist, handelt von {d__} Geschichte {ein__} {alt__} Familie.",
        ["Das", "mir", "gekaufte", "ein", "berühmter", "der", "einer", "alten"]
      ),
    ],
  },
  "advanced-on": {
    complexity: "advanced",
    prepositionsMode: true,
    exercises: [
      createExercise(
        1,
        "{D__} Wissenschaftler, der sich {(prep)} {d__} Erforschung {d__} {neu__} Medikaments konzentriert, arbeitet {(prep)} {ein__} {wichtig__} Projekt.",
        ["Der", "auf", "die", "des", "neuen", "an", "einem", "wichtigen"]
      ),
      createExercise(
        2,
        "Obwohl {(pronoun)} sich {(prep)} {d__} {schwierig__} Prüfung vorbereitet hatte, zweifelte {(pronoun)} {(prep)} {ihr__} Fähigkeiten.",
        ["sie", "auf", "die", "schwierige", "sie", "an", "ihren"]
      ),
      createExercise(
        3,
        "{(pronoun)} denkt oft {(prep)} {d__} Zeit, als {(pronoun)} sich {(prep)} {d__} {alt__} Universität {(prep)} {sein__} Studium bewarb.",
        ["Er", "an", "die", "er", "an", "der", "alten", "um", "sein"]
      ),
      createExercise(
        4,
        "{D__} Politiker, der sich {(prep)} {d__} Interesse {d__} Bürger einsetzt, kämpft {(prep)} {ein__} {besser__} Zukunft.",
        ["Der", "für", "die", "der", "für", "eine", "bessere"]
      ),
      createExercise(
        5,
        "Sie erinnerte sich {(prep)} {d__} Tag, an dem {(pronoun)} sich {(prep)} {ihr__} {neu__} Stelle bewarb und {(prep)} {d__} Direktor sprach.",
        ["an", "den", "sie", "um", "ihre", "neue", "mit", "dem"]
      ),
    ],
  },
};

export function getExercises(complexity: Complexity, prepositionsMode: boolean): Exercise[] {
  const key = `${complexity}-${prepositionsMode ? "on" : "off"}`;
  return exampleExercises[key]?.exercises || [];
}
