// The vocabulary trainer reads the shared lexicon (src/data/lexicon). Add words there.
import { CATEGORIES, LEXICON, type LexPos } from './lexicon';

export interface VocabWord {
  key: string;
  en: string[];
  bg: string[];
  cat: string;
  pos: LexPos;
}

export const VOCAB_CATEGORIES = CATEGORIES;

export const POS_SHORT: Record<LexPos, string> = {
  n: 'същ.',
  v: 'гл.',
  adj: 'прил.',
  adv: 'нар.',
  prep: 'предл.',
  conj: 'съюз',
  pron: 'мест.',
  num: 'числ.',
  phrase: 'израз',
};

// The trainer shows single words only (phrases and multi-word terms stay in the lexicon for other uses).
export const VOCAB: VocabWord[] = LEXICON.filter((e) => e.pos !== 'phrase' && !e.en[0].includes(' ')).map((e) => ({
  key: e.key,
  en: e.en.filter((w) => !w.includes(' ')),
  bg: e.bg,
  cat: e.cat,
  pos: e.pos,
}));
