

🚀[Live Demo](https://v0-cases-and-prepositions.vercel.app/)

⚠️ Important Note

Due to a submission issue, the demo link provided on the Give(a)Go platform is incorrect and cannot be updated.
For the correct demo, please use the link above.

# Cases and Prepositions

A German grammar exercise app that generates fill-in-the-blank sentences to practice case endings (articles, adjectives, pronouns) and prepositions, with instant feedback and time-per-blank metrics to build automatism.

## Features

- **AI-Generated Exercises** - Fresh sentences generated on demand using Claude via Vercel AI Gateway
- **Three Complexity Levels** - Simple (articles/adjectives), Intermediate (adds pronouns), Advanced (complex structures)
- **Prepositions Mode** - Toggle to include preposition blanks for verb-preposition practice
- **Instant Feedback** - Check answers with green/red indicators and correct solutions shown
- **Time Tracking** - Measures seconds per blank to track automatism improvement

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Vercel AI SDK 6
- Vercel AI Gateway

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Select complexity level and toggle prepositions mode
2. Click "Generate Exercises" to create new sentences
3. Fill in the blanks (stems like "d__" show what to complete)
4. Click "Check Answers" to see results and time per blank
5. Use "Try Again" to practice the same set or generate new exercises

## License

MIT
