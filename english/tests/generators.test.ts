import { describe, expect, it } from 'vitest';
import { RULES, generateArticle, indefinite, itemText, startsWithVowelSound } from '../src/generators/articles';
import { VOWEL_SOUND_WORDS, CONSONANT_SOUND_PREFIX } from '../src/data/sound';
import { generateTense, checkTense, verbForms, questionForms } from '../src/generators/tenses';
import { TENSES, TVERBS, SUBJECTS } from '../src/data/tenses';
import { matches } from '../src/lib/matching';
import { generatePos } from '../src/generators/partsOfSpeech';
import { generateUnc } from '../src/generators/uncountable';
import { IRREGULAR_VERBS } from '../src/data/irregularVerbs';
import { PHRASAL_VERBS } from '../src/data/phrasalVerbs';
import { particleOptions } from '../src/generators/phrasal';

describe('sound rules', () => {
  it('handles letter vs sound exceptions', () => {
    expect(indefinite('hour')).toBe('an');
    expect(indefinite('honest')).toBe('an');
    expect(indefinite('university')).toBe('a');
    expect(indefinite('European')).toBe('a');
    expect(indefinite('used')).toBe('a');
    expect(indefinite('apple')).toBe('an');
    expect(indefinite('car')).toBe('a');
    expect(indefinite('interesting book')).toBe('an');
    expect(startsWithVowelSound('unicorn')).toBe(false);
  });
});

describe('article generator', () => {
  const VOWEL = /^[aeiou]/i;
  it('produces consistent answers for a large random sample', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 5000; i++) {
      const rule = RULES[i % RULES.length].id;
      const item = generateArticle(rule);
      expect(item.rule).toBe(rule);
      expect(item.answers.length).toBe(item.pieces.filter((p) => typeof p !== 'string').length);
      expect(item.explain.length).toBeGreaterThan(10);
      const text = itemText(item);
      expect(text).not.toMatch(/\s\s/);
      expect(text).not.toMatch(/\{/);
      seen.add(text);
      // a / an must agree with the sound of the following word
      item.pieces.forEach((p, idx) => {
        if (typeof p === 'string') return;
        const ans = item.answers[p.blank];
        const after = String(item.pieces[idx + 1] ?? '').trim().split(/\s+/)[0].replace(/[^A-Za-z-]/g, '');
        if (ans === 'a' || ans === 'an') {
          const expectVowel = startsWithVowelSound(after);
          expect(ans === 'an').toBe(expectVowel);
          // words with a letter/sound mismatch must be covered by overrides
          if (VOWEL.test(after) !== expectVowel) expect(VOWEL_SOUND_WORDS.has(after.toLowerCase()) || CONSONANT_SOUND_PREFIX.test(after), `override missing for ${after}`).toBe(true);
        }
      });
    }
    expect(seen.size).toBeGreaterThan(1500);
  });

  it('covers all rules with the expected article', () => {
    const expected: Record<string, string[]> = {
      first: ['a', 'an'], sound: ['a', 'an'], job: ['a', 'an'], freq: ['a'],
      second: ['a', 'an', 'the'], unique: ['the'], superl: ['the'], ordinal: ['the'], instrument: ['the'], geoThe: ['the'], specified: ['the'],
      pluralGeneral: ['-'], uncountGeneral: ['-'], mealsSportsLang: ['-'], geoZero: ['-'], fixed: ['-'],
    };
    for (const r of RULES) {
      for (let i = 0; i < 200; i++) {
        const item = generateArticle(r.id);
        for (const a of item.answers) expect(expected[r.id]).toContain(a);
      }
    }
  });
});

describe('tense generator', () => {
  it('builds correct forms for every tense / subject / verb', () => {
    const she = SUBJECTS.find((s) => s.s === 'She')!;
    const they = SUBJECTS.find((s) => s.s === 'They')!;
    const i = SUBJECTS.find((s) => s.s === 'I')!;
    const go = TVERBS.go;
    expect(verbForms('presSimple', go, she, false)[0]).toBe('goes');
    expect(verbForms('presSimple', go, they, false)[0]).toBe('go');
    expect(verbForms('presSimple', go, she, true)).toContain("doesn't go");
    expect(verbForms('presCont', go, i, false)[0]).toBe('am going');
    expect(verbForms('pastSimple', go, she, false)[0]).toBe('went');
    expect(verbForms('pastSimple', go, she, true)[0]).toBe("didn't go");
    expect(verbForms('pastCont', go, they, false)[0]).toBe('were going');
    expect(verbForms('presPerf', go, she, false)[0]).toBe('has gone');
    expect(verbForms('presPerf', go, they, true)).toContain("haven't gone");
    expect(verbForms('presPerfCont', go, she, false)[0]).toBe('has been going');
    expect(verbForms('pastPerf', go, she, false)[0]).toBe('had gone');
    expect(verbForms('future', go, she, false)).toContain('is going to go');
    expect(verbForms('future', go, she, true)[0]).toBe("won't go");
  });

  it('accepts the shown answer and contractions for a large random sample', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 5000; i++) {
      const tense = TENSES[i % TENSES.length].id;
      const item = generateTense(tense, ['aff', 'neg', 'q']);
      expect(item.tense).toBe(tense);
      if (item.form === 'q') {
        expect(item.text.endsWith('?')).toBe(true);
        expect(item.text).toMatch(/\(.+ \/ .+\)/);
      } else expect(item.text.endsWith('.')).toBe(true);
      expect(checkTense(item.answer, item)).toBe(true);
      expect(checkTense(item.answer.toUpperCase() + '.', item)).toBe(true);
      expect(checkTense('xyz', item)).toBe(false);
      expect(item.text).toMatch(/___/);
      expect(item.text).not.toMatch(/\{poss\}/);
      expect(item.text).not.toMatch(/\s\s/);
      // continuous tenses never use stative verbs
      if (tense === 'presCont' || tense === 'pastCont' || tense === 'presPerfCont') expect(item.verb.stative).toBeFalsy();
      // weather verbs only with "It"
      const weatherVerbs = ['rain', 'snow', 'get', 'get dark', 'freeze'];
      if (item.verb.base === 'rain' || item.verb.base === 'snow') expect(item.subject.s).toBe('It');
      if (item.subject.s === 'It') expect(weatherVerbs).toContain(item.verb.base);
      seen.add(item.text);
    }
    expect(seen.size).toBeGreaterThan(3000);
  });

  it('builds questions with the subject inside the answer', () => {
    const she = SUBJECTS.find((s) => s.s === 'She')!;
    const brother = SUBJECTS.find((s) => s.s === 'My brother')!;
    const i = SUBJECTS.find((s) => s.s === 'I')!;
    expect(questionForms('presSimple', TVERBS.go, she)[0]).toBe('does she go');
    expect(questionForms('pastSimple', TVERBS.go, brother)[0]).toBe('did my brother go');
    expect(questionForms('presCont', TVERBS.go, i)[0]).toBe('am I going');
    expect(questionForms('presPerf', TVERBS.go, she)[0]).toBe('has she gone');
    expect(questionForms('future', TVERBS.go, she)).toContain('is she going to go');
    for (let k = 0; k < 500; k++) {
      const item = generateTense(TENSES[k % TENSES.length].id, ['q']);
      expect(item.form).toBe('q');
      expect(checkTense(item.answer, item)).toBe(true);
    }
    for (let k = 0; k < 200; k++) expect(generateTense('pastSimple', ['neg']).form).toBe('neg');
  });

  it('accepts alternative spellings and contractions', () => {
    const she = SUBJECTS.find((s) => s.s === 'She')!;
    const learn = TVERBS.learn;
    const forms = verbForms('presPerf', learn, she, false);
    expect(matches("she's learnt", forms) || matches("'s learnt", forms)).toBe(true);
    expect(matches('has learned', forms)).toBe(true);
    expect(matches('HAS  LEARNT ', forms)).toBe(true);
    expect(matches('has not learnt', verbForms('presPerf', learn, she, true))).toBe(true);
    expect(matches("hasn't learned", verbForms('presPerf', learn, she, true))).toBe(true);
    expect(matches('will not learn', verbForms('future', learn, she, true))).toBe(true);
    expect(matches("won't learn", verbForms('future', learn, she, true))).toBe(true);
    expect(matches('is going to learn', verbForms('future', learn, she, false))).toBe(true);
    expect(matches('does not learn', verbForms('presSimple', learn, she, true))).toBe(true);
  });
});

describe('other generators', () => {
  it('parts of speech sentences always contain the target', () => {
    for (let i = 0; i < 2000; i++) {
      const item = generatePos(['noun', 'verb', 'adj', 'adv', 'pron', 'prep', 'art', 'conj']);
      expect(item.tokens.some((t) => t.pos === item.target)).toBe(true);
      expect(item.text).toMatch(/^[A-Z]/);
      // a / an agreement inside generated sentences
      item.tokens.forEach((t, idx) => {
        if (t.w.toLowerCase() === 'a' || t.w.toLowerCase() === 'an') {
          expect(t.w.toLowerCase() === 'an').toBe(startsWithVowelSound(item.tokens[idx + 1].w));
        }
      });
    }
  });

  it('uncountable items are consistent', () => {
    for (let i = 0; i < 2000; i++) {
      const item = generateUnc(['muchMany', 'isAre', 'aSome', 'mistake']);
      if (item.kind === 'choice') {
        expect(item.text).toMatch(/___/);
        for (const a of item.accepted) expect(item.options).toContain(a);
      } else {
        expect(item.wrongIndex).toBeGreaterThanOrEqual(0);
        expect(item.words[item.wrongIndex]).toBeDefined();
        expect(item.corrected).not.toBe(item.words.join(' '));
      }
    }
  });

  it('irregular verbs and phrasal verbs data are well formed', () => {
    const bases = new Set<string>();
    for (const v of IRREGULAR_VERBS) {
      expect(bases.has(v.base)).toBe(false);
      bases.add(v.base);
      expect(v.past.length).toBeGreaterThan(0);
      expect(v.participle.length).toBeGreaterThan(0);
    }
    expect(IRREGULAR_VERBS.filter((v) => v.core).length).toBe(61);
    for (const pv of PHRASAL_VERBS) {
      expect(pv.example).toMatch(/___/);
      const opts = particleOptions(pv);
      expect(opts.length).toBe(4);
      expect(opts).toContain(pv.particle);
      expect(new Set(opts).size).toBe(4);
    }
  });
});
