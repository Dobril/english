import { PHRASAL_VERBS, type PhrasalVerb } from '../data/phrasalVerbs';
import { shuffle } from '../lib/random';

// Distractors are particles that the same verb takes in other phrasal verbs, topped up with common ones.
export function particleOptions(pv: PhrasalVerb): string[] {
  const sameVerb = PHRASAL_VERBS.filter((x) => x.verb === pv.verb && x.particle !== pv.particle).map((x) => x.particle);
  const common = ['up', 'down', 'on', 'off', 'in', 'out', 'away', 'back', 'over', 'after', 'for', 'into'];
  const pool = [...new Set([...shuffle(sameVerb), ...shuffle(common)])].filter((p) => p !== pv.particle);
  return shuffle([pv.particle, ...pool.slice(0, 3)]);
}
