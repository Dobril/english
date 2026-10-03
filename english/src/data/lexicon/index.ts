import type { LexEntry, LexRow } from './types';
import { FOOD } from './food';
import { HOME } from './home';
import { TRAVEL } from './travel';
import { WORK } from './work';
import { PEOPLE } from './people';
import { FEELINGS } from './feelings';
import { NATURE } from './nature';
import { VERBS } from './verbs';
import { ADJECTIVES } from './adjectives';
import { FUNCTION_WORDS } from './functionWords';
import { LEISURE } from './leisure';

export type { LexEntry, LexPos, LexRow } from './types';

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'food', label: 'Храна и напитки' },
  { id: 'home', label: 'Дом и град' },
  { id: 'travel', label: 'Пътуване и транспорт' },
  { id: 'work', label: 'Работа и пари' },
  { id: 'education', label: 'Образование' },
  { id: 'people', label: 'Хора и семейство' },
  { id: 'body', label: 'Тяло и здраве' },
  { id: 'feelings', label: 'Чувства и характер' },
  { id: 'nature', label: 'Природа и време' },
  { id: 'animals', label: 'Животни и растения' },
  { id: 'verbs', label: 'Глаголи' },
  { id: 'adjectives', label: 'Прилагателни' },
  { id: 'adverbs', label: 'Наречия и служебни думи' },
  { id: 'time', label: 'Време и числа' },
  { id: 'tech', label: 'Технологии и медии' },
  { id: 'shopping', label: 'Пазаруване и дрехи' },
  { id: 'leisure', label: 'Спорт, хоби и изкуство' },
];

const ROWS: LexRow[] = [...FOOD, ...HOME, ...TRAVEL, ...WORK, ...PEOPLE, ...FEELINGS, ...NATURE, ...VERBS, ...ADJECTIVES, ...FUNCTION_WORDS, ...LEISURE];

function split(s: string): string[] {
  return s
    .split('/')
    .map((x) => x.trim())
    .filter(Boolean);
}

// The same word can appear in several categories (train = обучавам / тренирам). The first
// occurrence keeps its category; translations, spellings and tags of later ones are merged in.
const byKey = new Map<string, LexEntry>();
export const LEXICON: LexEntry[] = [];
for (const [en, bg, pos, cat, tags] of ROWS) {
  const ens = split(en);
  const key = `${ens[0].toLowerCase()}|${pos}`;
  const tagList = tags ? tags.split(/\s+/).filter(Boolean) : [];
  const existing = byKey.get(key);
  if (existing) {
    for (const w of ens) if (!existing.en.includes(w)) existing.en.push(w);
    for (const w of split(bg)) if (!existing.bg.includes(w)) existing.bg.push(w);
    for (const t of tagList) if (!existing.tags.includes(t)) existing.tags.push(t);
    continue;
  }
  const entry: LexEntry = { key, en: ens, bg: split(bg), pos, cat, tags: tagList };
  byKey.set(key, entry);
  LEXICON.push(entry);
}

export function byPos(pos: LexEntry['pos']): LexEntry[] {
  return LEXICON.filter((e) => e.pos === pos);
}

export function withTag(pos: LexEntry['pos'], tag: string): LexEntry[] {
  return LEXICON.filter((e) => e.pos === pos && e.tags.includes(tag));
}

export function translate(en: string): string | undefined {
  const e = LEXICON.find((x) => x.en.some((w) => w.toLowerCase() === en.toLowerCase()));
  return e?.bg.join(', ');
}
