import { loadJSON, saveJSON } from './storage';
import { weightedPick } from './random';

export interface ItemStat {
  c: number;
  w: number;
  t: number;
}

type ModuleProgress = Record<string, ItemStat>;

const cache = new Map<string, ModuleProgress>();

function get(module: string): ModuleProgress {
  let p = cache.get(module);
  if (!p) {
    p = loadJSON<ModuleProgress>('progress.' + module, {});
    cache.set(module, p);
  }
  return p;
}

export function record(module: string, key: string, correct: boolean): void {
  const p = get(module);
  const s = p[key] ?? { c: 0, w: 0, t: 0 };
  if (correct) s.c++;
  else s.w++;
  s.t = Date.now();
  p[key] = s;
  saveJSON('progress.' + module, p);
}

export function stat(module: string, key: string): ItemStat | undefined {
  return get(module)[key];
}

export function clearProgress(module: string): void {
  cache.set(module, {});
  saveJSON('progress.' + module, {});
}

// Items with more mistakes come up more often; well-known items less often.
export function weightFor(s: ItemStat | undefined): number {
  if (!s) return 1.6;
  const seen = s.c + s.w;
  const errRate = s.w / seen;
  let w = 0.4 + errRate * 3;
  if (s.w > s.c) w += 1;
  if (seen >= 4 && errRate === 0) w = 0.25;
  return w;
}

const recent = new Map<string, string[]>();

// Picks by weight while avoiding the last few keys shown in the same module.
export function pickWeighted<T>(
  module: string,
  items: readonly T[],
  keyOf: (item: T) => string,
  prioritize: boolean,
): T {
  const last = recent.get(module) ?? [];
  const avoid = new Set(last.slice(-Math.min(4, Math.max(0, items.length - 1))));
  const pool = items.length > 1 ? items.filter((it) => !avoid.has(keyOf(it))) : items;
  const src = pool.length > 0 ? pool : items;
  const chosen = prioritize
    ? weightedPick(src, (it) => weightFor(stat(module, keyOf(it))))
    : src[Math.floor(Math.random() * src.length)];
  last.push(keyOf(chosen));
  recent.set(module, last.slice(-8));
  return chosen;
}
