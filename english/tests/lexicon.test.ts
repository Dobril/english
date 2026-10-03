import { describe, expect, it } from 'vitest';
import { CATEGORIES, LEXICON } from '../src/data/lexicon';
import { pluralize } from '../src/data/plural';

describe('lexicon', () => {
  it('has well over 1500 entries with valid fields', () => {
    expect(LEXICON.length).toBeGreaterThan(1500);
    const cats = new Set(CATEGORIES.map((c) => c.id));
    const validPos = new Set(['n', 'v', 'adj', 'adv', 'prep', 'conj', 'pron', 'num', 'phrase']);
    for (const e of LEXICON) {
      expect(cats.has(e.cat), `unknown category ${e.cat} for ${e.en[0]}`).toBe(true);
      expect(validPos.has(e.pos), `bad pos for ${e.en[0]}`).toBe(true);
      expect(e.en.length).toBeGreaterThan(0);
      expect(e.bg.length).toBeGreaterThan(0);
      for (const w of e.en) expect(w, `english contains cyrillic: ${w}`).not.toMatch(/[Ѐ-ӿ]/);
      for (const w of e.bg) expect(w, `bulgarian without cyrillic: ${w} (${e.en[0]})`).toMatch(/[Ѐ-ӿ]/);
      expect(e.en[0].startsWith('to '), `verb with "to": ${e.en[0]}`).toBe(false);
    }
  });

  it('covers every category with at least 40 words', () => {
    for (const c of CATEGORIES) {
      const n = LEXICON.filter((e) => e.cat === c.id).length;
      expect(n, `category ${c.id} has ${n} words`).toBeGreaterThanOrEqual(40);
    }
  });

  it('pluralizes common patterns', () => {
    expect(pluralize('apple')).toBe('apples');
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('city')).toBe('cities');
    expect(pluralize('key')).toBe('keys');
    expect(pluralize('knife')).toBe('knives');
    expect(pluralize('child')).toBe('children');
    expect(pluralize('credit card')).toBe('credit cards');
    expect(pluralize('potato')).toBe('potatoes');
  });
});

import { VOCAB } from '../src/data/vocabulary';
it('vocabulary trainer uses single words only', () => {
  expect(VOCAB.length).toBeGreaterThan(1500);
  for (const w of VOCAB) for (const en of w.en) expect(en, `multi-word: ${en}`).not.toMatch(/\s/);
});
