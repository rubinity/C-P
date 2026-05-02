export type Complexity = "simple" | "intermediate" | "advanced";

export interface Blank {
  id: string;
  correctAnswer: string;
}

export interface Exercise {
  id: number;
  // Parts of the sentence, alternating between text and blank markers
  // Blanks are represented as { blankId: "1" } objects
  parts: (string | { blankId: string })[];
  blanks: Blank[];
}

export interface ExerciseSet {
  complexity: Complexity;
  prepositionsMode: boolean;
  exercises: Exercise[];
}

// Helper to create exercises with blanks
function createExercise(
  id: number,
  template: string,
  answers: string[]
): Exercise {
  const parts: (string | { blankId: string })[] = [];
  const blanks: Blank[] = [];
  
  // Split by blank markers (___) and create parts array
  const segments = template.split(/(___)/);
  let blankIndex = 0;
  
  for (const segment of segments) {
    if (segment === "___") {
      const blankId = `${id}-${blankIndex}`;
      parts.push({ blankId });
      blanks.push({
        id: blankId,
        correctAnswer: answers[blankIndex] || "",
      });
      blankIndex++;
    } else if (segment) {
      parts.push(segment);
    }
  }
  
  return { id, parts, blanks };
}

// Example exercises for each complexity level and preposition mode
export const exampleExercises: Record<string, ExerciseSet> = {
  "simple-off": {
    complexity: "simple",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "___ Hund schläft.", ["Der"]),
      createExercise(2, "Ich sehe ___ ___ Katze.", ["eine", "kleine"]),
      createExercise(3, "___ Buch ist interessant.", ["Das"]),
      createExercise(4, "Er gibt ___ ___ Blumen.", ["ihr", "die"]),
      createExercise(5, "___ ___ Mann sitzt.", ["Der", "alte"]),
    ],
  },
  "simple-on": {
    complexity: "simple",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er wartet ___ ___ Bus.", ["auf", "den"]),
      createExercise(2, "Sie denkt ___ ___ Freund.", ["an", "ihren"]),
      createExercise(3, "Ich freue mich ___ ___ Reise.", ["auf", "die"]),
      createExercise(4, "Er hilft ___ ___ ___ Arbeit.", ["mir", "bei", "der"]),
      createExercise(5, "Sie interessiert sich ___ ___ Kunst.", ["für", "die"]),
    ],
  },
  "intermediate-off": {
    complexity: "intermediate",
    prepositionsMode: false,
    exercises: [
      createExercise(1, "___ Frau, die dort steht, ist ___ Lehrerin.", ["Die", "meine"]),
      createExercise(2, "Obwohl ___ Wetter schlecht ist, gehen wir spazieren.", ["das"]),
      createExercise(3, "Er kauft ___ ___ Auto, weil ___ ___ kaputt ist.", ["ein", "neues", "sein", "altes"]),
      createExercise(4, "___ ___ Kinder spielen, während ___ Eltern arbeiten.", ["Die", "kleinen", "ihre"]),
      createExercise(5, "Ich weiß nicht, ob ___ ___ Antwort kennt.", ["er", "die"]),
      createExercise(6, "___ Professor erklärt ___ ___ Thema.", ["Der", "das", "schwierige"]),
    ],
  },
  "intermediate-on": {
    complexity: "intermediate",
    prepositionsMode: true,
    exercises: [
      createExercise(1, "Er denkt ___ ___ Prüfung, die morgen stattfindet.", ["an", "die"]),
      createExercise(2, "Sie wartet ___ ___ Freund, der noch arbeitet.", ["auf", "ihren"]),
      createExercise(3, "Ich freue mich ___ ___ Geschenk, das du mir gibst.", ["über", "das"]),
      createExercise(4, "Er bittet ___ ___ Hilfe, weil er es allein nicht schafft.", ["sie", "um"]),
      createExercise(5, "Sie erinnert sich ___ ___ ___ Urlaub.", ["an", "den", "schönen"]),
      createExercise(6, "Wir sprechen ___ ___ ___ Projekt.", ["über", "das", "neue"]),
    ],
  },
  "advanced-off": {
    complexity: "advanced",
    prepositionsMode: false,
    exercises: [
      createExercise(
        1,
        "___ von ___ ___ Wissenschaftler ___ Theorie wurde von ___ ___ Gemeinschaft anerkannt.",
        ["Die", "dem", "berühmten", "entwickelte", "der", "internationalen"]
      ),
      createExercise(
        2,
        "Obwohl ___ ___ Studentin, die aus ___ ___ Dorf stammt, zunächst Schwierigkeiten hatte, gelang es ___, ___ ___ Prüfung zu bestehen.",
        ["die", "junge", "einem", "kleinen", "ihr", "die", "schwierige"]
      ),
      createExercise(
        3,
        "___ ___ Professor, dessen Forschung ___ ___ Welt bekannt ist, hielt ___ Vortrag über ___ Auswirkungen ___ Klimawandels.",
        ["Der", "alte", "der", "ganzen", "einen", "die", "des"]
      ),
      createExercise(
        4,
        "Nachdem ___ ___ Winter endlich vorbei war, freuten sich ___ Bewohner ___ ___ Stadt auf ___ ___ Frühling.",
        ["der", "lange", "die", "der", "kleinen", "den", "kommenden"]
      ),
      createExercise(
        5,
        "___ von ___ gestern ___ Buch, dessen Autor ___ ___ Schriftsteller ist, handelt von ___ Geschichte ___ ___ Familie.",
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
        "___ Wissenschaftler, der sich ___ ___ Erforschung ___ ___ Medikaments konzentriert, arbeitet ___ ___ ___ Projekt.",
        ["Der", "auf", "die", "des", "neuen", "an", "einem", "wichtigen"]
      ),
      createExercise(
        2,
        "Obwohl sie sich ___ ___ ___ Prüfung vorbereitet hatte, zweifelte sie ___ ___ Fähigkeiten.",
        ["auf", "die", "schwierige", "an", "ihren"]
      ),
      createExercise(
        3,
        "Er denkt oft ___ ___ Zeit, als er sich ___ ___ ___ Universität ___ ___ Studium bewarb.",
        ["an", "die", "an", "der", "alten", "um", "sein"]
      ),
      createExercise(
        4,
        "___ Politiker, der sich ___ ___ Interesse ___ Bürger einsetzt, kämpft ___ ___ ___ Zukunft.",
        ["Der", "für", "die", "der", "für", "eine", "bessere"]
      ),
      createExercise(
        5,
        "Sie erinnerte sich ___ ___ Tag, an dem sie sich ___ ___ ___ Stelle bewarb und ___ ___ Direktor sprach.",
        ["an", "den", "um", "ihre", "neue", "mit", "dem"]
      ),
    ],
  },
};

export function getExercises(complexity: Complexity, prepositionsMode: boolean): Exercise[] {
  const key = `${complexity}-${prepositionsMode ? "on" : "off"}`;
  return exampleExercises[key]?.exercises || [];
}
