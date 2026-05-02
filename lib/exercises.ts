export type Complexity = "simple" | "intermediate" | "advanced";

export interface Blank {
  id: string;
  hint: string; // e.g., "d__", "ein__", "klein__"
  correctAnswer: string;
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
// Template uses {hint} markers, e.g., "Ich sehe {ein__} {klein__} Katze."
function createExercise(
  id: number,
  template: string,
  answers: string[]
): Exercise {
  const parts: (string | { blankId: string })[] = [];
  const blanks: Blank[] = [];
  
  // Match hints in curly braces like {d__}, {ein__}, {___}
  const regex = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let blankIndex = 0;
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }
    
    const hint = match[1]; // The hint text inside braces
    const blankId = `${id}-${blankIndex}`;
    parts.push({ blankId });
    blanks.push({
      id: blankId,
      hint: hint,
      correctAnswer: answers[blankIndex] || "",
    });
    
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
      createExercise(4, "Er gibt {___} {d__} Blumen.", ["ihr", "die"]),
      createExercise(5, "{D__} {alt__} Mann sitzt.", ["Der", "alte"]),
    ],
  },
  "simple-on": {
    complexity: "simple",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er wartet {___} {d__} Bus.", ["auf", "den"]),
      createExercise(2, "Sie denkt {___} {___} Freund.", ["an", "ihren"]),
      createExercise(3, "Ich freue mich {___} {d__} Reise.", ["auf", "die"]),
      createExercise(4, "Er hilft {___} {___} {d__} Arbeit.", ["mir", "bei", "der"]),
      createExercise(5, "Sie interessiert sich {___} {d__} Kunst.", ["für", "die"]),
    ],
  },
  "intermediate-off": {
    complexity: "intermediate",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "{D__} Frau, die dort steht, ist {___} Lehrerin.", ["Die", "meine"]),
      createExercise(2, "Obwohl {d__} Wetter schlecht ist, gehen wir spazieren.", ["das"]),
      createExercise(3, "Er kauft {ein__} {neu__} Auto, weil {___} {alt__} kaputt ist.", ["ein", "neues", "sein", "altes"]),
      createExercise(4, "{D__} {klein__} Kinder spielen, während {___} Eltern arbeiten.", ["Die", "kleinen", "ihre"]),
      createExercise(5, "Ich weiß nicht, ob {___} {d__} Antwort kennt.", ["er", "die"]),
      createExercise(6, "{D__} Professor erklärt {d__} {schwierig__} Thema.", ["Der", "das", "schwierige"]),
    ],
  },
  "intermediate-on": {
    complexity: "intermediate",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er denkt {___} {d__} Prüfung, die morgen stattfindet.", ["an", "die"]),
      createExercise(2, "Sie wartet {___} {___} Freund, der noch arbeitet.", ["auf", "ihren"]),
      createExercise(3, "Ich freue mich {___} {d__} Geschenk, das du mir gibst.", ["über", "das"]),
      createExercise(4, "Er bittet {___} {___} Hilfe, weil er es allein nicht schafft.", ["sie", "um"]),
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
        "{D__} von {d__} {berühmt__} Wissenschaftler {___} Theorie wurde von {d__} {international__} Gemeinschaft anerkannt.",
        ["Die", "dem", "berühmten", "entwickelte", "der", "internationalen"]
      ),
      createExercise(
        2,
        "Obwohl {d__} {jung__} Studentin, die aus {ein__} {klein__} Dorf stammt, zunächst Schwierigkeiten hatte, gelang es {___}, {d__} {schwierig__} Prüfung zu bestehen.",
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
        "{D__} von {___} gestern {___} Buch, dessen Autor {ein__} {berühmt__} Schriftsteller ist, handelt von {d__} Geschichte {ein__} {alt__} Familie.",
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
        "{D__} Wissenschaftler, der sich {___} {d__} Erforschung {d__} {neu__} Medikaments konzentriert, arbeitet {___} {ein__} {wichtig__} Projekt.",
        ["Der", "auf", "die", "des", "neuen", "an", "einem", "wichtigen"]
      ),
      createExercise(
        2,
        "Obwohl sie sich {___} {d__} {schwierig__} Prüfung vorbereitet hatte, zweifelte sie {___} {___} Fähigkeiten.",
        ["auf", "die", "schwierige", "an", "ihren"]
      ),
      createExercise(
        3,
        "Er denkt oft {___} {d__} Zeit, als er sich {___} {d__} {alt__} Universität {___} {___} Studium bewarb.",
        ["an", "die", "an", "der", "alten", "um", "sein"]
      ),
      createExercise(
        4,
        "{D__} Politiker, der sich {___} {d__} Interesse {d__} Bürger einsetzt, kämpft {___} {ein__} {besser__} Zukunft.",
        ["Der", "für", "die", "der", "für", "eine", "bessere"]
      ),
      createExercise(
        5,
        "Sie erinnerte sich {___} {d__} Tag, an dem sie sich {___} {___} {neu__} Stelle bewarb und {___} {d__} Direktor sprach.",
        ["an", "den", "um", "ihre", "neue", "mit", "dem"]
      ),
    ],
  },
};

export function getExercises(complexity: Complexity, prepositionsMode: boolean): Exercise[] {
  const key = `${complexity}-${prepositionsMode ? "on" : "off"}`;
  return exampleExercises[key]?.exercises || [];
}
