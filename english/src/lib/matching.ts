// Flexible answer matching used by all free-text exercises.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?,;:]+$/g, '')
    .trim();
}

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, 'will not'],
  [/\bcan't\b/g, 'cannot'],
  [/\bshan't\b/g, 'shall not'],
  [/\b(\w+)n't\b/g, '$1 not'],
  [/\b(\w+)'ll\b/g, '$1 will'],
  [/\b(\w+)'re\b/g, '$1 are'],
  [/\b(\w+)'ve\b/g, '$1 have'],
  [/\b(\w+)'d\b/g, '$1 had'],
  [/\bi'm\b/g, 'i am'],
  [/^'s\b/g, 'is'],
  [/^'ll\b/g, 'will'],
  [/^'re\b/g, 'are'],
  [/^'ve\b/g, 'have'],
  [/^'d\b/g, 'had'],
  [/^'m\b/g, 'am'],
  [/\b(\w+)'s\b/g, '$1 is'],
];

// Expands contractions. Ambiguous ones ('s, 'd) get one reading; the caller compares
// against all accepted variants, so both readings get covered by the answer list.
export function expand(s: string): string {
  let out = s;
  for (const [re, rep] of CONTRACTIONS) out = out.replace(re, rep);
  return out.replace(/\s+/g, ' ').trim();
}

export function matches(input: string, accepted: readonly string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  const e = expand(n);
  for (const a of accepted) {
    const na = normalize(a);
    if (n === na) return true;
    if (e === expand(na)) return true;
  }
  return false;
}
