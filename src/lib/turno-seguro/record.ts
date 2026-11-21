export type RecordEntry = { initials: string; points: number };

export function normalizeInitials(value: string): string {
  return value.trim().normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
}

export function validInitials(value: string): boolean {
  return /^[A-Z]{3}$/.test(value);
}
