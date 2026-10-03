import * as D from '../data/partsOfSpeech';
import type { Pos } from '../data/partsOfSpeech';
import { pick, chance } from '../lib/random';
import { startsWithVowelSound } from './articles';

export interface Token {
  w: string;
  pos: Pos;
  // punctuation that follows the word (not part of the word itself)
  punct?: string;
}

export interface PosItem {
  tokens: Token[];
  target: Pos;
  text: string;
}

function art(next: string): Token {
  if (chance(0.5)) return { w: 'the', pos: 'art' };
  return { w: startsWithVowelSound(next) ? 'an' : 'a', pos: 'art' };
}

function pronFor(g: 'm' | 'f' | 'n'): string {
  if (g === 'm') return 'he';
  if (g === 'f') return 'she';
  return chance(0.5) ? 'he' : 'she';
}

function transWithObject(): Token[] {
  const v = pick(D.VERB_TRANS);
  const useLex = D.VERB_TRANS_LEX.has(v.w) && chance(0.4);
  const obj = useLex ? pick(D.LEX_OBJECTS) : pick(v.obj);
  const adj = chance(0.7) ? pick(useLex ? D.ADJ_LEX_OBJECT : D.ADJ_OBJECT) : null;
  const a = art(adj ?? obj);
  const out: Token[] = [{ w: v.w, pos: 'verb' }, a];
  if (adj) out.push({ w: adj, pos: 'adj' });
  out.push({ w: obj, pos: 'noun' });
  return out;
}

function placePhrase(withAdj = true, kind: 'motion' | 'static' | 'carry' = 'motion'): Token[] {
  const place = pick(D.PLACE_NOUNS);
  const adj = withAdj && chance(0.7) ? pick(D.ADJ_PLACE) : null;
  const prep = pick(kind === 'motion' ? D.PREP_MOTION : kind === 'static' ? D.PREP_STATIC : ['into', 'to', 'out of', 'towards']);
  const out: Token[] = [];
  // multi-word prepositions are one token each ("in front of" = one preposition)
  out.push({ w: prep, pos: 'prep' }, art(adj ?? place));
  if (adj) out.push({ w: adj, pos: 'adj' });
  out.push({ w: place, pos: 'noun' });
  return out;
}

type Template = () => Token[];

const TEMPLATES: Template[] = [
  // The old man slowly walked into the small house.
  () => {
    const p = pick(D.PERSON_NOUNS);
    const adj = pick(D.ADJ_PERSON);
    return [art(adj), { w: adj, pos: 'adj' }, { w: p.w, pos: 'noun' }, { w: pick(D.ADV_MANNER), pos: 'adv' }, { w: pick(D.VERB_MOTION), pos: 'verb' }, ...placePhrase()];
  },
  // She found her old book and carried it into the kitchen.
  () => {
    const s = pick(D.PRON_SUBJ);
    const v = pick(D.VERB_TRANS.filter((x) => x.w !== 'wanted'));
    const obj = pick(v.obj);
    const v2 = pick(['carried', 'brought', 'took'].filter((w) => w !== v.w));
    return [
      { w: s.w, pos: 'pron' },
      { w: v.w, pos: 'verb' },
      { w: s.poss, pos: 'pron' },
      { w: pick(D.ADJ_OBJECT), pos: 'adj' },
      { w: obj, pos: 'noun' },
      { w: 'and', pos: 'conj' },
      { w: v2, pos: 'verb' },
      { w: 'it', pos: 'pron' },
      ...placePhrase(false, 'carry'),
    ];
  },
  // The teacher walked slowly because she was tired.
  () => {
    const p = pick(D.PERSON_NOUNS);
    return [
      { w: 'the', pos: 'art' },
      { w: p.w, pos: 'noun' },
      { w: pick(['walked', 'moved', 'drove', 'left', 'stopped', 'waited', 'answered', 'spoke']), pos: 'verb' },
      { w: pick(['slowly', 'quickly', 'quietly', 'carefully', 'nervously', 'calmly', 'silently', 'anxiously', 'clumsily', 'suddenly']), pos: 'adv' },
      { w: 'because', pos: 'conj' },
      { w: pronFor(p.g), pos: 'pron' },
      { w: 'was', pos: 'verb' },
      { w: pick(D.ADJ_REASON), pos: 'adj' },
    ];
  },
  // We often walked through the dark forest.
  () => {
    const s = pick(D.PRON_SUBJ);
    return [{ w: s.w, pos: 'pron' }, { w: pick(D.ADV_FREQ), pos: 'adv' }, { w: pick(D.VERB_MOTION), pos: 'verb' }, ...placePhrase()];
  },
  // The tall boy and the girl ran quickly across the park.
  () => {
    const p1 = pick(D.PERSON_NOUNS);
    const p2 = pick(D.PERSON_NOUNS.filter((x) => x.w !== p1.w));
    const adj = pick(D.ADJ_PERSON);
    return [
      { w: 'the', pos: 'art' },
      { w: adj, pos: 'adj' },
      { w: p1.w, pos: 'noun' },
      { w: 'and', pos: 'conj' },
      { w: 'the', pos: 'art' },
      { w: p2.w, pos: 'noun' },
      { w: pick(D.VERB_MOTION), pos: 'verb' },
      { w: pick(D.ADV_MANNER), pos: 'adv' },
      ...placePhrase(),
    ];
  },
  // He opened the heavy box, but he suddenly dropped it.
  () => {
    const s = pick(D.PRON_SUBJ);
    const first = transWithObject();
    first[first.length - 1].punct = ',';
    const v2 = pick(['dropped', 'lost', 'forgot'].filter((w) => w !== first[0].w));
    return [{ w: s.w, pos: 'pron' }, ...first, { w: 'but', pos: 'conj' }, { w: s.w, pos: 'pron' }, { w: pick(['suddenly', 'immediately', 'accidentally', 'quickly', 'carelessly', 'finally', 'soon']), pos: 'adv' }, { w: v2, pos: 'verb' }, { w: 'it', pos: 'pron' }];
  },
  // The student was very tired, so she went into the kitchen.
  () => {
    const p = pick(D.PERSON_NOUNS);
    return [
      { w: 'the', pos: 'art' },
      { w: p.w, pos: 'noun' },
      { w: 'was', pos: 'verb' },
      { w: pick(['very', 'really', 'extremely']), pos: 'adv' },
      { w: pick(D.ADJ_REASON), pos: 'adj', punct: ',' },
      { w: 'so', pos: 'conj' },
      { w: pronFor(p.g), pos: 'pron' },
      { w: pick(['went', 'walked', 'hurried']), pos: 'verb' },
      ...placePhrase(),
    ];
  },
  // My sister bought an expensive phone yesterday.
  () => {
    const s = pick(D.PRON_SUBJ.filter((x) => x.w !== 'I'));
    return [{ w: s.poss, pos: 'pron' }, { w: pick(['sister', 'brother', 'friend', 'neighbour']), pos: 'noun' }, ...transWithObject(), { w: pick(['yesterday', 'today', 'recently', 'again']), pos: 'adv' }];
  },
  // They waited quietly near the old station while we slept.
  () => {
    const s = pick(D.PRON_SUBJ);
    const s2 = pick(D.PRON_SUBJ.filter((x) => x.w !== s.w));
    return [{ w: s.w, pos: 'pron' }, { w: pick(D.VERB_STATIC), pos: 'verb' }, { w: pick(['quietly', 'patiently', 'silently', 'calmly', 'nervously', 'happily']), pos: 'adv' }, ...placePhrase(true, 'static'), { w: 'while', pos: 'conj' }, { w: s2.w, pos: 'pron' }, { w: pick(['slept', 'worked', 'talked', 'rested']), pos: 'verb' }];
  },
];

function capitalizeFirst(tokens: Token[]): Token[] {
  const t = tokens[0];
  if (t.w !== 'I') tokens[0] = { ...t, w: t.w.charAt(0).toUpperCase() + t.w.slice(1) };
  return tokens;
}

export function tokensText(tokens: Token[]): string {
  return tokens.map((t, i) => t.w + (t.punct ?? '') + (i === tokens.length - 1 ? '.' : '')).join(' ');
}

export function generatePos(allowed: Pos[]): PosItem {
  const tokens = capitalizeFirst(pick(TEMPLATES)());
  const present = allowed.filter((p) => tokens.some((t) => t.pos === p));
  const target = present.length ? pick(present) : pick(allowed.length ? allowed : (['noun'] as Pos[]));
  if (!tokens.some((t) => t.pos === target)) return generatePos(allowed);
  return { tokens, target, text: tokensText(tokens) };
}
