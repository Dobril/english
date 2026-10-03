import * as D from '../data/articles';
import { VOWEL_SOUND_WORDS, CONSONANT_SOUND_PREFIX } from '../data/sound';
import { pick, chance } from '../lib/random';

export type Article = 'a' | 'an' | 'the' | '-';
export type ArticleRule =
  | 'first'
  | 'sound'
  | 'job'
  | 'freq'
  | 'second'
  | 'unique'
  | 'superl'
  | 'ordinal'
  | 'instrument'
  | 'geoThe'
  | 'specified'
  | 'pluralGeneral'
  | 'uncountGeneral'
  | 'mealsSportsLang'
  | 'geoZero'
  | 'fixed';

export type Piece = string | { blank: number };

export interface ArticleItem {
  pieces: Piece[];
  answers: Article[];
  rule: ArticleRule;
  explain: string;
}

export const RULES: { id: ArticleRule; label: string; article: string }[] = [
  { id: 'first', label: 'първо споменаване', article: 'a / an' },
  { id: 'sound', label: 'по звука: an hour, a university', article: 'a / an' },
  { id: 'job', label: 'професии и „един от многото“', article: 'a / an' },
  { id: 'freq', label: 'честота: twice a week', article: 'a / an' },
  { id: 'second', label: 'вече споменато', article: 'the' },
  { id: 'unique', label: 'единствено по рода си', article: 'the' },
  { id: 'superl', label: 'превъзходна степен', article: 'the' },
  { id: 'ordinal', label: 'поредни: the first, the last', article: 'the' },
  { id: 'instrument', label: 'музикални инструменти', article: 'the' },
  { id: 'geoThe', label: 'реки, морета, планини, държави в мн. ч.', article: 'the' },
  { id: 'specified', label: 'уточнено: the book on the table', article: 'the' },
  { id: 'pluralGeneral', label: 'мн. число, общо', article: '-' },
  { id: 'uncountGeneral', label: 'неброими, общо', article: '-' },
  { id: 'mealsSportsLang', label: 'хранения, спортове, езици', article: '-' },
  { id: 'geoZero', label: 'държави, градове, континенти', article: '-' },
  { id: 'fixed', label: 'устойчиви изрази: at home, by bus', article: '-' },
];

export const RULE_LABEL: Record<ArticleRule, string> = Object.fromEntries(RULES.map((r) => [r.id, `${r.label} (${r.article})`])) as Record<ArticleRule, string>;

export function startsWithVowelSound(phrase: string, override?: boolean): boolean {
  if (override !== undefined) return override;
  const w = phrase.trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (VOWEL_SOUND_WORDS.has(w)) return true;
  if (CONSONANT_SOUND_PREFIX.test(w)) return false;
  return /^[aeiou]/.test(w);
}

export function indefinite(phrase: string, override?: boolean): Article {
  return startsWithVowelSound(phrase, override) ? 'an' : 'a';
}

function soundNote(word: string, override?: boolean): string {
  const vowel = startsWithVowelSound(word, override);
  return `„${word}“ започва със ${vowel ? 'гласен' : 'съгласен'} звук → ${vowel ? 'an' : 'a'}.`;
}

// Turns "She saw ___ car. ___ car was red." into pieces with numbered blanks.
function parse(sentence: string): { pieces: Piece[]; count: number } {
  const parts = sentence.split('___');
  const pieces: Piece[] = [];
  parts.forEach((p, i) => {
    if (i > 0) pieces.push({ blank: i - 1 });
    if (p) pieces.push(p);
  });
  return { pieces, count: parts.length - 1 };
}

function build(sentence: string, answers: Article[], rule: ArticleRule, explain: string): ArticleItem {
  const { pieces, count } = parse(sentence);
  if (count !== answers.length) throw new Error(`blank count mismatch: ${sentence}`);
  return { pieces, answers, rule, explain };
}

function nounsFor(verb: D.Verb): D.Noun[] {
  if (verb.only) return D.NOUNS.filter((n) => verb.only!.includes(n.w));
  return D.NOUNS.filter((n) => (verb.lexOk || !n.lex) && n.cats.some((c) => verb.obj!.includes(c)));
}

function adjFor(noun: D.Noun): D.Adjective[] {
  return D.ADJECTIVES.filter((a) => a.cats.some((c) => noun.cats.includes(c)));
}

function withEnding(base: string): string {
  const e = pick(D.ENDINGS);
  return e ? `${base} ${e}.` : `${base}.`;
}

function genFirst(): ArticleItem {
  const verb = pick(D.VERBS);
  const noun = pick(nounsFor(verb));
  const adjs = adjFor(noun);
  const adj = adjs.length && chance(0.55) ? pick(adjs) : null;
  const head = adj ? adj.w : noun.w;
  const override = adj ? adj.an : noun.an;
  const answer = indefinite(head, override);
  const s = withEnding(`${pick(D.SUBJECTS)} ${verb.w} ___ ${adj ? adj.w + ' ' : ''}${noun.w}`);
  const explain = `„${noun.w}“ е броимо съществително в ед. ч., споменато за първи път → неопределителен член. Гледаме думата веднага след члена: ${soundNote(head, override)}`;
  return build(s, [answer], 'first', explain);
}

function genSound(): ArticleItem {
  const tricky = [
    ...D.NOUNS.filter((n) => n.an !== undefined).map((n) => ({ w: n.w, an: n.an, noun: n })),
    ...D.ADJECTIVES.filter((a) => a.an !== undefined).map((a) => ({ w: a.w, an: a.an, adj: a })),
  ];
  const t = pick(tricky);
  let sentence: string;
  let answer: Article;
  let explain: string;
  if ('noun' in t && t.noun) {
    const verbs = D.VERBS.filter((v) => nounsFor(v).some((n) => n.w === t.noun!.w));
    if (t.noun.w === 'hour') {
      sentence = pick(['The meeting lasted ___ hour.', 'I waited for ___ hour.', 'It takes about ___ hour by car.']);
    } else if (t.noun.w === 'university') {
      sentence = pick(['She studies at ___ university in London.', 'There is ___ university in this town.', 'He is looking for ___ university abroad.']);
    } else if (verbs.length) {
      sentence = withEnding(`${pick(D.SUBJECTS)} ${pick(verbs).w} ___ ${t.noun.w}`);
    } else {
      sentence = `There is ___ ${t.noun.w} here.`;
    }
    answer = indefinite(t.w, t.an);
    explain = `Броимо същ. в ед. ч., споменато за първи път. Членът зависи от звука, не от буквата: ${soundNote(t.w, t.an)}`;
  } else {
    const adj = (t as { adj: D.Adjective }).adj;
    const nouns = D.NOUNS.filter((n) => !n.lex && n.cats.some((c) => adj.cats.includes(c)) && n.an === undefined);
    const noun = pick(nouns);
    const verbs = D.VERBS.filter((v) => nounsFor(v).some((n) => n.w === noun.w));
    sentence = withEnding(`${pick(D.SUBJECTS)} ${pick(verbs).w} ___ ${adj.w} ${noun.w}`);
    answer = indefinite(adj.w, adj.an);
    explain = `Първо споменаване → a / an. Гледаме звука на думата веднага след члена (прилагателното): ${soundNote(adj.w, adj.an)}`;
  }
  return build(sentence, [answer], 'sound', explain);
}

function genJob(): ArticleItem {
  const job = pick(D.JOBS);
  const adj = chance(0.45) ? pick(D.JOB_ADJ) : null;
  const head = adj ? adj.w : job.w;
  const override = adj ? adj.an : job.an;
  const answer = indefinite(head, override);
  const frame = pick(D.JOB_FRAMES).replace('{S}', pick(D.JOB_SUBJECTS)).replace('{J}', adj ? `${adj.w} ${job.w}` : job.w);
  const explain = `Професия или „един от многото“ → a / an. ${soundNote(head, override)}`;
  return build(frame, [answer], 'job', explain);
}

function genFreq(): ArticleItem {
  const s = `${pick(D.FREQ_SUBJECTS)} ${pick(D.FREQ_ACTS)} ${pick(D.FREQ_NUM)} ___ ${pick(D.FREQ_PERIOD)}.`;
  return build(s, ['a'], 'freq', 'Честота: „once a week, twice a month“. Тук a означава „на“ (веднъж на седмица), затова е неопределителен член.');
}

function genSecond(): ArticleItem {
  const verb = pick(D.VERBS.filter((v) => v.w !== 'had' && v.w !== 'needed' && v.w !== 'noticed'));
  const pool = nounsFor(verb).filter((n) => n.an === undefined);
  const n1 = pick(pool);
  const cat = n1.cats[0];
  const twoNouns = chance(0.35);
  const n2 = twoNouns ? pick(pool.filter((n) => n.w !== n1.w && n.cats[0] === cat)) : null;
  const subj = pick(D.SUBJECTS);
  const pred = pick(D.SECOND_PRED[cat]);
  if (n2) {
    const which = chance(0.5) ? n1 : n2;
    const s = `${subj} ${verb.w} ___ ${n1.w} and ___ ${n2.w}. ___ ${which.w} ${pred}.`;
    return build(
      s,
      [indefinite(n1.w), indefinite(n2.w), 'the'],
      'second',
      `Първо споменаване → a / an („${n1.w}“, „${n2.w}“). Второто споменаване на „${which.w}“ вече е конкретно и известно → the.`,
    );
  }
  const s = `${subj} ${verb.w} ___ ${n1.w}${chance(0.5) ? ' ' + pick(D.ENDINGS.filter(Boolean)) : ''}. ___ ${n1.w} ${pred}.`;
  return build(s, [indefinite(n1.w), 'the'], 'second', `Първо споменаване на „${n1.w}“ → ${indefinite(n1.w)}. Второто споменаване е вече известно и конкретно → the.`);
}

function genUnique(): ArticleItem {
  const s = pick(D.UNIQUE);
  const count = s.split('___').length - 1;
  return build(s, Array(count).fill('the') as Article[], 'unique', 'Единствени по рода си неща (the sun, the moon, the sky, the world, the internet) винаги са с the.');
}

function genSuperl(): ArticleItem {
  const t = pick(D.SUPERLATIVES);
  return build(`${t.s} ___ ${t.sup} ${t.n} ${t.end}.`, ['the'], 'superl', `Превъзходна степен („${t.sup}“) винаги е с the: the best, the tallest, the most interesting.`);
}

function genOrdinal(): ArticleItem {
  const ord = pick(D.ORD_WORDS);
  const s = pick(D.ORDINALS).replace('{ORD}', ord);
  return build(s, ['the'], 'ordinal', 'Поредни числителни (first, second, third...) и „last“ вървят с the, защото сочат точно определено нещо.');
}

function genInstrument(): ArticleItem {
  const i = pick(D.INSTRUMENTS);
  const s = pick(D.INSTR_FRAMES).replace('{S}', pick(D.SIMPLE_SUBJECTS)).replace('{I}', i);
  return build(s, ['the'], 'instrument', `Музикални инструменти с „play“ са с the: play the ${i}. (Сравни: спортове са без член: play football.)`);
}

function genGeoThe(): ArticleItem {
  const g = pick(D.GEO_THE);
  const frames = g.kind === 'река' ? ['We sailed down ___ {G} last summer.', '___ {G} is a very long river.', 'They live near ___ {G}.'] : g.kind === 'море / океан' ? ['We swam in ___ {G}.', 'They sailed across ___ {G}.', '___ {G} is very deep.'] : D.GEO_FRAMES;
  const s = pick(frames).replace('{S}', pick(D.GEO_SUBJECTS)).replace('{G}', g.name);
  return build(s, ['the'], 'geoThe', `„${g.name}“ е ${g.kind}. Реки, морета, океани, планински вериги, пустини, групи острови и държави в мн. число са с the.`);
}

function genGeoZero(): ArticleItem {
  const g = pick(D.GEO_ZERO);
  const frames = g.kind === 'планински връх' ? ['{S} climbed ___ {G} last year.', 'Have you ever seen ___ {G}?', '___ {G} is covered in snow.'] : g.kind === 'езеро' ? ['We swam in ___ {G}.', '___ {G} is very deep.'] : [...D.GEO_FRAMES, '___ {G} is beautiful in spring.', '{S} lives in ___ {G}.'];
  const s = pick(frames).replace('{S}', pick(D.GEO_SUBJECTS)).replace('{G}', g.name);
  return build(s, ['-'], 'geoZero', `„${g.name}“ е ${g.kind}. Повечето държави, градове, континенти, езера и отделни върхове са без член. (Изключения: the Netherlands, the USA, the UK.)`);
}

function genSpecified(): ArticleItem {
  const t = pick(D.SPECIFIED);
  return build(`___ ${t.n} ${t.spec} ${t.pred}.`, ['the'], 'specified', `„${t.n} ${t.spec}“: уточнението след думата показва точно кой/кое имаме предвид → the, дори при мн. число и неброими.`);
}

function genPluralGeneral(): ArticleItem {
  const noun = pick(D.NOUNS.filter((n) => n.an === undefined && n.cats[0] !== 'abstract' && n.cats[0] !== 'person'));
  const cat = noun.cats[0];
  // "likes / hates" only reads naturally with food and animals
  if ((cat === 'food' || cat === 'animal') && chance(0.6)) {
    const subj = pick(D.LIKE_SUBJECTS);
    const s = `${subj.s} ${pick(D.LIKE_VERBS[subj.num])} ___ ${noun.pl}.`;
    return build(s, ['-'], 'pluralGeneral', `„${noun.pl}“ е мн. число в общ смисъл (всички ${noun.pl}, не конкретни) → без член.`);
  }
  const s = `___ ${noun.pl} ${pick(D.PLURAL_PRED[cat])}.`;
  return build(s, ['-'], 'pluralGeneral', `Мн. число в общ смисъл (${noun.pl} изобщо) → без член. Сравни: „The ${noun.pl} in this shop...“ би било конкретно.`);
}

function genUncountGeneral(): ArticleItem {
  const u = pick(D.UNCOUNT);
  const opts: (() => string)[] = [];
  if (u.like) {
    opts.push(() => {
      const subj = pick(D.LIKE_SUBJECTS);
      return `${subj.s} ${pick(D.LIKE_VERBS[subj.num])} ___ ${u.w}.`;
    });
  }
  if (u.need) {
    opts.push(() => {
      const subj = pick(D.NEED_SUBJECTS);
      const v = subj === 'I' || subj === 'We' || subj === 'They' ? 'need' : 'needs';
      return `${subj} ${v} ___ ${u.w}.`;
    });
  }
  if (u.pred) opts.push(() => `___ ${u.w} ${pick(u.pred!)}.`);
  const s = pick(opts)();
  return build(s, ['-'], 'uncountGeneral', `„${u.w}“ е неброимо и е употребено в общ смисъл → без член. (Ако е конкретно, може the: „the water in this glass“.)`);
}

function genMealsSportsLang(): ArticleItem {
  const kind = pick(['meal', 'sport', 'lang'] as const);
  let s: string;
  let explain: string;
  if (kind === 'meal') {
    const m = pick(D.MEALS);
    s = pick(D.MEAL_FRAMES).replace('{M}', m).replace('{T}', pick(D.MEAL_TIMES)).replace('{S}', pick(D.SIMPLE_SUBJECTS));
    explain = `Храненията (breakfast, lunch, dinner) са без член: have ${m}.`;
  } else if (kind === 'sport') {
    const x = pick(D.SPORTS);
    s = pick(D.SPORT_FRAMES).replace('{X}', x).replace('{C}', pick(D.SPORT_COUNTRIES)).replace('{S}', pick(D.SIMPLE_SUBJECTS));
    explain = `Спортове и игри са без член: play ${x}. (Сравни: инструменти са с the: play the piano.)`;
  } else {
    const x = pick(D.LANGS);
    s = pick(D.LANG_FRAMES).replace('{X}', x).replace('{S}', pick(D.SIMPLE_SUBJECTS));
    explain = `Езиците са без член: speak ${x}. (Но: „the ${x} language“.)`;
  }
  return build(s, ['-'], 'mealsSportsLang', explain);
}

function genFixed(): ArticleItem {
  const f = pick(D.FIXED);
  const s = f.frame.replace('{S}', pick(D.SIMPLE_SUBJECTS));
  return build(s, ['-'], 'fixed', `„${f.phrase}“ е устойчив израз без член. Такива са: at home, go to bed, by bus, at night, at work, go to school, watch TV.`);
}

const GENERATORS: Record<ArticleRule, () => ArticleItem> = {
  first: genFirst,
  sound: genSound,
  job: genJob,
  freq: genFreq,
  second: genSecond,
  unique: genUnique,
  superl: genSuperl,
  ordinal: genOrdinal,
  instrument: genInstrument,
  geoThe: genGeoThe,
  specified: genSpecified,
  pluralGeneral: genPluralGeneral,
  uncountGeneral: genUncountGeneral,
  mealsSportsLang: genMealsSportsLang,
  geoZero: genGeoZero,
  fixed: genFixed,
};

export function generateArticle(rule: ArticleRule): ArticleItem {
  return GENERATORS[rule]();
}

export function itemText(item: ArticleItem, fill?: (i: number) => string): string {
  return item.pieces.map((p) => (typeof p === 'string' ? p : fill ? fill(p.blank) : '___')).join('');
}
