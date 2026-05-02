export type Complexity = "simple" | "intermediate" | "advanced";

export interface Exercise {
  id: number;
  maskedSentence: string;
  answer: string;
}

export interface ExerciseSet {
  complexity: Complexity;
  prepositionsMode: boolean;
  exercises: Exercise[];
}

// Example exercises for each complexity level and preposition mode
export const exampleExercises: Record<string, ExerciseSet> = {
  "simple-off": {
    complexity: "simple",
    prepositionsMode: false,
    exercises: [
      {
        id: 1,
        maskedSentence: "D__ Hund schläft.",
        answer: "Der",
      },
      {
        id: 2,
        maskedSentence: "Ich sehe ein__ klein__ Katze.",
        answer: "eine kleine",
      },
      {
        id: 3,
        maskedSentence: "D__ Buch ist interessant.",
        answer: "Das",
      },
      {
        id: 4,
        maskedSentence: "Er gibt __(sie) d__ Blumen.",
        answer: "ihr, die",
      },
      {
        id: 5,
        maskedSentence: "D__ alt__ Mann sitzt.",
        answer: "Der alte",
      },
    ],
  },
  "simple-on": {
    complexity: "simple",
    prepositionsMode: true,
    exercises: [
      {
        id: 1,
        maskedSentence: "Er wartet ___ d__ Bus.",
        answer: "auf, den",
      },
      {
        id: 2,
        maskedSentence: "Sie denkt ___ ihr__ Freund.",
        answer: "an, ihren",
      },
      {
        id: 3,
        maskedSentence: "Ich freue mich ___ d__ Reise.",
        answer: "auf, die",
      },
      {
        id: 4,
        maskedSentence: "Er hilft __(ich) ___ d__ Arbeit.",
        answer: "mir, bei, der",
      },
      {
        id: 5,
        maskedSentence: "Sie interessiert sich ___ d__ Kunst.",
        answer: "für, die",
      },
    ],
  },
  "intermediate-off": {
    complexity: "intermediate",
    prepositionsMode: false,
    exercises: [
      {
        id: 1,
        maskedSentence: "D__ Frau, die dort steht, ist mein__ Lehrerin.",
        answer: "Die, meine",
      },
      {
        id: 2,
        maskedSentence: "Obwohl d__ Wetter schlecht ist, gehen wir spazieren.",
        answer: "das",
      },
      {
        id: 3,
        maskedSentence: "Er kauft ein__ neu__ Auto, weil sein__ alt__ kaputt ist.",
        answer: "ein neues, sein altes",
      },
      {
        id: 4,
        maskedSentence: "D__ klein__ Kinder spielen, während ihr__ Eltern arbeiten.",
        answer: "Die kleinen, ihre",
      },
      {
        id: 5,
        maskedSentence: "Ich weiß nicht, ob __(er) d__ Antwort kennt.",
        answer: "er, die",
      },
      {
        id: 6,
        maskedSentence: "D__ Professor erklärt d__ schwierig__ Thema.",
        answer: "Der, das schwierige",
      },
    ],
  },
  "intermediate-on": {
    complexity: "intermediate",
    prepositionsMode: true,
    exercises: [
      {
        id: 1,
        maskedSentence: "Er denkt ___ d__ Prüfung, die morgen stattfindet.",
        answer: "an, die",
      },
      {
        id: 2,
        maskedSentence: "Sie wartet ___ ihr__ Freund, der noch arbeitet.",
        answer: "auf, ihren",
      },
      {
        id: 3,
        maskedSentence: "Ich freue mich ___ d__ Geschenk, das du mir gibst.",
        answer: "über, das",
      },
      {
        id: 4,
        maskedSentence: "Er bittet __(sie) ___ Hilfe, weil er es allein nicht schafft.",
        answer: "sie, um",
      },
      {
        id: 5,
        maskedSentence: "Sie erinnert sich ___ d__ schön__ Urlaub.",
        answer: "an, den schönen",
      },
      {
        id: 6,
        maskedSentence: "Wir sprechen ___ d__ neu__ Projekt.",
        answer: "über, das neue",
      },
    ],
  },
  "advanced-off": {
    complexity: "advanced",
    prepositionsMode: false,
    exercises: [
      {
        id: 1,
        maskedSentence: "D__ von d__ berühmt__ Wissenschaftler entwickelt__ Theorie wurde von d__ international__ Gemeinschaft anerkannt.",
        answer: "Die, dem berühmten, entwickelte, der internationalen",
      },
      {
        id: 2,
        maskedSentence: "Obwohl d__ jung__ Studentin, die aus ein__ klein__ Dorf stammt, zunächst Schwierigkeiten hatte, gelang es __(sie), d__ schwierig__ Prüfung zu bestehen.",
        answer: "die junge, einem kleinen, ihr, die schwierige",
      },
      {
        id: 3,
        maskedSentence: "D__ alt__ Professor, dessen Forschung d__ ganz__ Welt bekannt ist, hielt ein__ Vortrag über d__ Auswirkungen d__ Klimawandels.",
        answer: "Der alte, der ganzen, einen, die, des",
      },
      {
        id: 4,
        maskedSentence: "Nachdem d__ lang__ Winter endlich vorbei war, freuten sich d__ Bewohner d__ klein__ Stadt auf d__ komm__ Frühling.",
        answer: "der lange, die, der kleinen, den kommenden",
      },
      {
        id: 5,
        maskedSentence: "D__ von __(ich) gestern gekauft__ Buch, dessen Autor ein__ berühmt__ Schriftsteller ist, handelt von d__ Geschichte ein__ alt__ Familie.",
        answer: "Das, mir, gekaufte, ein berühmter, der, einer alten",
      },
    ],
  },
  "advanced-on": {
    complexity: "advanced",
    prepositionsMode: true,
    exercises: [
      {
        id: 1,
        maskedSentence: "D__ Wissenschaftler, der sich ___ d__ Erforschung d__ neu__ Medikaments konzentriert, arbeitet ___ ein__ wichtig__ Projekt.",
        answer: "Der, auf, die, des neuen, an, einem wichtigen",
      },
      {
        id: 2,
        maskedSentence: "Obwohl sie sich ___ d__ schwierig__ Prüfung vorbereitet hatte, zweifelte sie ___ ihr__ Fähigkeiten.",
        answer: "auf, die schwierige, an, ihren",
      },
      {
        id: 3,
        maskedSentence: "Er denkt oft ___ d__ Zeit, als er sich ___ d__ alt__ Universität ___ sein__ Studium bewarb.",
        answer: "an, die, an, der alten, um, sein",
      },
      {
        id: 4,
        maskedSentence: "D__ Politiker, der sich ___ d__ Interesse d__ Bürger einsetzt, kämpft ___ ein__ besser__ Zukunft.",
        answer: "Der, für, die, der, für, eine bessere",
      },
      {
        id: 5,
        maskedSentence: "Sie erinnerte sich ___ d__ Tag, an dem sie sich ___ ihr__ neu__ Stelle bewarb und ___ d__ Direktor sprach.",
        answer: "an, den, um, ihre neue, mit, dem",
      },
    ],
  },
};

export function getExercises(complexity: Complexity, prepositionsMode: boolean): Exercise[] {
  const key = `${complexity}-${prepositionsMode ? "on" : "off"}`;
  return exampleExercises[key]?.exercises || [];
}
