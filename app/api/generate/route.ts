import { generateText, Output } from "ai";
import { z } from "zod";

const blankSchema = z.object({
  id: z.string(),
  stem: z.string().nullable().describe("Word stem before the blank, e.g. 'd' for der/die/das, 'ein' for einen/eine, 'klein' for kleinen. Null if user writes the whole word."),
  prompt: z.string().nullable().describe("Hint in brackets after blank for whole-word answers, e.g. 'er' for accusative/dative of 'er', 'wir' for accusative/dative of 'wir'. Only for pronouns that need case transformation. Null if using stem."),
  answer: z.string().describe("The correct answer the user should type - just the ending if stem is provided, or the whole word if prompt is provided"),
});

const exerciseSchema = z.object({
  id: z.string(),
  parts: z.array(z.string()).describe("Sentence parts split by blanks. If sentence has 2 blanks, there will be 3 parts."),
  blanks: z.array(blankSchema).describe("The blanks in order, matching the gaps between parts"),
});

const exercisesResponseSchema = z.object({
  exercises: z.array(exerciseSchema).min(5).max(6),
});

export async function POST(req: Request) {
  const { complexity, prepositionsMode } = await req.json();

  const complexityInstructions = {
    simple: `
- Use simple, everyday sentences with common verbs and prepositions
- Focus on: an, auf, für, in, mit, nach, von, zu
- Use basic vocabulary (Haus, Schule, Freund, Buch, etc.)
- 2-3 blanks per sentence maximum`,
    intermediate: `
- Use more complex sentence structures with subordinate clauses
- Include verbs with fixed prepositions: warten auf, denken an, sich freuen auf, achten auf
- Mix accusative and dative cases
- Include object pronouns that need case transformation
- 3-4 blanks per sentence`,
    advanced: `
- Use complex sentences with multiple clauses
- Include advanced verb-preposition combinations: bestehen auf, sich verlassen auf, zweifeln an
- Use reflexive verbs and pronouns
- Include genitive case where appropriate
- Mix all cases in single sentences
- 4-5 blanks per sentence`,
  };

  const prepositionInstruction = prepositionsMode
    ? `
IMPORTANT: Include preposition blanks! When a verb requires a specific preposition (e.g., warten auf, denken an), 
make the preposition a blank with NO stem and NO prompt - just an empty blank that the user fills with the preposition.
Example: "Er wartet {blank with no stem/prompt, answer: 'auf'} seinen Freund."`
    : "Do NOT include preposition blanks. Write prepositions as regular text.";

  const prompt = `Generate 5-6 German grammar exercises for practicing case usage (Akkusativ, Dativ, Genitiv) with verb-preposition structures.

Complexity level: ${complexity}
${complexityInstructions[complexity as keyof typeof complexityInstructions]}

${prepositionInstruction}

BLANK TYPES - USE EXACTLY AS SPECIFIED:

1. ARTICLES (der/die/das/den/dem/des):
   - stem: "d", answer: just the ending ("er", "ie", "as", "en", "em", "es")
   
2. INDEFINITE ARTICLES (ein/eine/einen/einem/eines/einer):
   - stem: "ein", answer: just the ending ("", "e", "en", "em", "es", "er")
   - For nominative masculine/neuter "ein": stem: "ein", answer: ""
   
3. ADJECTIVES after articles:
   - stem: the adjective stem (e.g. "klein", "groß", "alt", "neu")
   - answer: just the ending ("e", "en", "er", "es", "em")

4. OBJECT PRONOUNS (accusative/dative forms of personal pronouns):
   - ONLY create blanks for pronouns that CHANGE form (not nominative subjects!)
   - stem: null, prompt: nominative form of the pronoun ("ich", "du", "er", "sie", "es", "wir", "ihr")
   - answer: the correct accusative or dative form ("mich/mir", "dich/dir", "ihn/ihm", "sie/ihr", "uns", "euch")
   - DO NOT make a blank for subject pronouns - they stay as regular text!
   - Example: "Er gibt mir das Buch" - "Er" is text (subject), "mir" could be a blank with prompt "ich"

5. PREPOSITIONS (only if prepositionsMode is true):
   - stem: null, prompt: null (empty blank)
   - answer: the correct preposition ("auf", "an", "für", "mit", etc.)

RULES:
- Each exercise MUST have the correct number of parts: parts.length = blanks.length + 1
- Generate unique IDs for each exercise and blank (use format "ex1", "ex2" for exercises, "b1", "b2" for blanks)
- Sentences must be grammatically correct German
- Use realistic, practical sentences
- Subject pronouns (nominative) should be regular text, NOT blanks

CRITICAL - PARTS STRUCTURE:
- The "parts" array contains the TEXT BETWEEN blanks only
- Do NOT include the stem in the parts - the stem is ONLY in the blank object
- The stem will be rendered before the input field automatically

EXAMPLES:
For "Er wartet auf seinen kleinen Bruder" (with prepositions mode):
- Full sentence with blanks: "Er wartet [blank:auf] [blank:sein+en] [blank:klein+en] Bruder."
- parts: ["Er wartet ", " ", " Bruder."]
- blanks: [{stem:null, prompt:null, answer:"auf"}, {stem:"sein", prompt:null, answer:"en"}, {stem:"klein", prompt:null, answer:"en"}]

For "Sie gibt ihm das Buch" (ihm is dative of er):
- Full sentence with blanks: "Sie gibt [blank:ihm with prompt er] [blank:d+as] Buch."
- parts: ["Sie gibt ", " ", " Buch."]
- blanks: [{stem:null, prompt:"er", answer:"ihm"}, {stem:"d", prompt:null, answer:"as"}]

For "Der kleine Hund" (simple article + adjective):
- parts: ["", " ", " Hund"]
- blanks: [{stem:"d", prompt:null, answer:"er"}, {stem:"klein", prompt:null, answer:"e"}]`;

  const { output } = await generateText({
    model: "anthropic/claude-sonnet-4-20250514",
    output: Output.object({
      schema: exercisesResponseSchema,
    }),
    prompt,
  });

  return Response.json(output);
}
