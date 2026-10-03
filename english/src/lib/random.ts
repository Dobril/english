export function rand(n: number): number {
  return Math.floor(Math.random() * n);
}

export function pick<T>(arr: readonly T[]): T {
  return arr[rand(arr.length)];
}

export function chance(p: number): boolean {
  return Math.random() < p;
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function weightedPick<T>(items: readonly T[], weight: (item: T) => number): T {
  let total = 0;
  const ws = items.map((it) => {
    const w = Math.max(0, weight(it));
    total += w;
    return w;
  });
  if (total <= 0) return pick(items);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= ws[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
