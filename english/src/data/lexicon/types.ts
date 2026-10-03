// One row of the shared dictionary.
// en:   English word or phrase; alternatives separated with " / " (e.g. "flat / apartment"). Verbs without "to".
// bg:   Bulgarian translation; alternatives separated with " / ".
// pos:  part of speech.
// cat:  category id from CATEGORIES in index.ts.
// tags: space-separated semantic tags used by the sentence generators:
//   nouns:      person place object food drink animal plant abstract vehicle clothes tech media body nature event time
//               plus "unc" (uncountable) and "pl" (plural only: scissors, clothes)
//   adjectives: which noun classes it can describe: person object place food animal weather abstract vehicle clothes tech media, or "any"
//   verbs:      "stative" for state verbs (know, like, want)
//   adverbs:    manner freq time degree place
export type LexPos = 'n' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'pron' | 'num' | 'phrase';
export type LexRow = [en: string, bg: string, pos: LexPos, cat: string, tags?: string];

export interface LexEntry {
  key: string;
  en: string[];
  bg: string[];
  pos: LexPos;
  cat: string;
  tags: string[];
}
