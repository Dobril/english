import { UNCOUNTABLE, COUNTABLE, type UncNoun } from '../data/uncountable';
import { pick, chance, shuffle } from '../lib/random';
import { startsWithVowelSound } from './articles';

export type UncTask = 'muchMany' | 'isAre' | 'aSome' | 'mistake';

export interface ChoiceItem {
  kind: 'choice';
  task: Exclude<UncTask, 'mistake'>;
  text: string;
  options: string[];
  accepted: string[];
  explain: string;
  key: string;
}

export interface MistakeItem {
  kind: 'mistake';
  task: 'mistake';
  words: string[];
  wrongIndex: number;
  corrected: string;
  explain: string;
  key: string;
}

export type UncItem = ChoiceItem | MistakeItem;

export const TASK_LABEL: Record<UncTask, string> = {
  muchMany: 'much / many',
  isAre: 'is / are',
  aSome: 'a / an / some / a piece of',
  mistake: 'намери грешката',
};

const FAKE_PLURAL = new Set([
  'information', 'advice', 'furniture', 'luggage', 'homework', 'equipment', 'research', 'evidence', 'knowledge', 'progress', 'traffic', 'music', 'money',
  'accommodation', 'baggage', 'behaviour', 'clothing', 'damage', 'entertainment', 'jewellery', 'machinery', 'permission', 'pollution', 'software', 'vocabulary', 'transport', 'scenery', 'patience', 'laughter', 'literature', 'poetry', 'happiness', 'wealth', 'health', 'safety',
]);

function whyUnc(n: UncNoun) {
  return `„${n.w}“ (${n.bg}) е неброимо: ${n.why}`;
}

function genMuchMany(): ChoiceItem {
  const unc = chance(0.6);
  const frames = ['How ___ {N} do you need?', 'There isn’t ___ {N} left.', 'We don’t have ___ {N}.', 'How ___ {N} did you buy?', 'I don’t know ___ {N}.'];
  if (unc) {
    const n = pick(UNCOUNTABLE);
    return { kind: 'choice', task: 'muchMany', text: pick(frames).replace('{N}', n.w), options: ['much', 'many'], accepted: ['much'], explain: `${whyUnc(n)} С неброими се използва much.`, key: n.w };
  }
  const n = pick(COUNTABLE);
  return { kind: 'choice', task: 'muchMany', text: pick(frames).replace('{N}', n.pl), options: ['much', 'many'], accepted: ['many'], explain: `„${n.pl}“ е броимо в мн. число (a ${n.w}, two ${n.pl}) → many.`, key: 'c:' + n.w };
}

function genIsAre(): ChoiceItem {
  const unc = chance(0.6);
  if (unc) {
    const n = pick(UNCOUNTABLE);
    const frame = chance(0.5) ? `The ${n.w} ___ ${pick(n.ctx)}.` : `${n.w.charAt(0).toUpperCase() + n.w.slice(1)} ___ ${pick(n.ctx)}.`;
    return { kind: 'choice', task: 'isAre', text: frame, options: ['is', 'are'], accepted: ['is'], explain: `${whyUnc(n)} Неброимите са винаги в ед. число → is.`, key: n.w };
  }
  const n = pick(COUNTABLE);
  const plural = chance(0.75);
  const text = plural ? `The ${n.pl} ___ ${pick(n.ctx)}.` : `The ${n.w} ___ ${pick(n.ctx)}.`;
  return { kind: 'choice', task: 'isAre', text, options: ['is', 'are'], accepted: [plural ? 'are' : 'is'], explain: plural ? `„${n.pl}“ е броимо в мн. число → are.` : `„${n.w}“ е броимо в ед. число → is.`, key: 'c:' + n.w };
}

function genASome(): ChoiceItem {
  const frames = ['I need ___ {N}.', 'Can I have ___ {N}?', 'She gave me ___ {N}.', 'We bought ___ {N}.', 'He brought ___ {N}.'];
  const unc = chance(0.6);
  if (unc) {
    const n = pick(UNCOUNTABLE);
    const unit = n.unit ?? 'a piece of';
    const accepted = n.unit ? ['some', n.unit] : ['some'];
    return {
      kind: 'choice',
      task: 'aSome',
      text: pick(frames).replace('{N}', n.w),
      options: ['a', 'an', 'some', unit],
      accepted,
      explain: `${whyUnc(n)} Не може a / an; казва се some ${n.w}${n.unit ? ` или ${n.unit} ${n.w}` : ''}.`,
      key: n.w,
    };
  }
  const n = pick(COUNTABLE);
  const a = startsWithVowelSound(n.w) ? 'an' : 'a';
  return { kind: 'choice', task: 'aSome', text: pick(frames).replace('{N}', n.w), options: ['a', 'an', 'some', 'a piece of'], accepted: [a], explain: `„${n.w}“ е броимо в ед. число → ${a} ${n.w}. (Some би било с мн. число: some ${n.pl}.)`, key: 'c:' + n.w };
}

function genMistake(): MistakeItem {
  const n = pick(UNCOUNTABLE);
  const types: (() => MistakeItem)[] = [];
  if (FAKE_PLURAL.has(n.w)) {
    types.push(() => {
      const words = pick([['I', 'have', 'a', 'lot', 'of', n.w + 's', 'about', 'it.'], ['She', 'gave', 'me', 'some', n.w + 's.'], ['We', 'need', 'more', n.w + 's.']]);
      const idx = words.findIndex((w) => w.startsWith(n.w + 's'));
      const corrected = words.map((w, i) => (i === idx ? w.replace(n.w + 's', n.w) : w)).join(' ');
      return { kind: 'mistake', task: 'mistake', words, wrongIndex: idx, corrected, explain: `${whyUnc(n)} Няма форма за мн. число: не „${n.w}s“, а просто „${n.w}“.`, key: n.w };
    });
  }
  types.push(() => {
    const a = startsWithVowelSound(n.w) ? 'an' : 'a';
    const words = pick([['She', 'gave', 'me', a, n.w + '.'], ['Can', 'I', 'have', a, n.w + '?'], ['He', 'bought', a, n.w, 'yesterday.']]);
    const idx = words.indexOf(a);
    const fix = n.unit ? n.unit : 'some';
    const corrected = words.map((w, i) => (i === idx ? fix : w)).join(' ');
    return { kind: 'mistake', task: 'mistake', words, wrongIndex: idx, corrected, explain: `${whyUnc(n)} Неброимите не вземат a / an; казва се „${fix} ${n.w}“.`, key: n.w };
  });
  types.push(() => {
    const words = pick([['How', 'many', n.w, 'do', 'you', 'have?'], ['There', 'isn’t', 'many', n.w, 'left.'], ['We', 'don’t', 'have', 'many', n.w + '.']]);
    const idx = words.indexOf('many');
    const corrected = words.map((w, i) => (i === idx ? 'much' : w)).join(' ');
    return { kind: 'mistake', task: 'mistake', words, wrongIndex: idx, corrected, explain: `${whyUnc(n)} С неброими е much, не many.`, key: n.w };
  });
  types.push(() => {
    const ctx = pick(n.ctx);
    const words = ['The', n.w, 'are', ...ctx.split(' ')];
    words[words.length - 1] += '.';
    const idx = 2;
    const corrected = words.map((w, i) => (i === idx ? 'is' : w)).join(' ');
    return { kind: 'mistake', task: 'mistake', words, wrongIndex: idx, corrected, explain: `${whyUnc(n)} Неброимите са в ед. число → is, не are.`, key: n.w };
  });
  return pick(types)();
}

export function generateUnc(tasks: UncTask[]): UncItem {
  const task = pick(tasks.length ? tasks : (['muchMany'] as UncTask[]));
  switch (task) {
    case 'muchMany':
      return genMuchMany();
    case 'isAre':
      return genIsAre();
    case 'aSome':
      return genASome();
    case 'mistake':
      return genMistake();
  }
}

export function shuffledOptions(item: ChoiceItem): string[] {
  return item.task === 'aSome' ? item.options : shuffle(item.options);
}
