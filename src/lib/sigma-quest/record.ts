export type QuestClock = { elapsedMs: number; running: boolean; finished: boolean };
export type QuestResult = QuestClock & { points: number; firstTries: number; timePoints: number };
export type QuestRecord = { letters: string; points: number; first_tries: number; elapsed_ms: number };

// Four ASCII letters keep the arcade format predictable on every keyboard.
export function normalizeLetters(input: unknown): string | null {
  return typeof input === 'string' && input.length === 4 && /^[A-Za-z]+$/.test(input)
    ? input.toUpperCase() : null;
}
