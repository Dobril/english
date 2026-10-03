import { PREDICATES, SUBJECTS, TENSES, TENSE_BY_ID, TVERBS, type Marker, type Subject, type TenseId, type TVerb } from '../data/tenses';
import { pick, chance } from '../lib/random';
import { matches } from '../lib/matching';

export type Piece = string | { blank: true } | { marker: string } | { mono: string };

export type Form = 'aff' | 'neg' | 'q';
export const FORM_LABEL: Record<Form, string> = { aff: 'положителна', neg: 'отрицателна', q: 'въпросителна' };

export interface TenseItem {
  tense: TenseId;
  tenseName: string;
  form: Form;
  negative: boolean;
  pieces: Piece[];
  verb: TVerb;
  subject: Subject;
  answer: string;
  accepted: string[];
  rule: string;
  text: string;
}

function be(subj: Subject, past: boolean): string[] {
  if (past) return subj.n === 'sg' && subj.p !== 2 ? ['was'] : ['were'];
  if (subj.p === 1 && subj.n === 'sg') return ['am', "'m"];
  if (subj.p === 3 && subj.n === 'sg') return ['is', "'s"];
  return ['are', "'re"];
}

function beNeg(subj: Subject, past: boolean): string[] {
  if (past) return subj.n === 'sg' && subj.p !== 2 ? ['was not', "wasn't"] : ['were not', "weren't"];
  if (subj.p === 1 && subj.n === 'sg') return ['am not', "'m not"];
  if (subj.p === 3 && subj.n === 'sg') return ['is not', "isn't", "'s not"];
  return ['are not', "aren't", "'re not"];
}

function have(subj: Subject): string[] {
  return subj.p === 3 && subj.n === 'sg' ? ['has', "'s"] : ['have', "'ve"];
}

function haveNeg(subj: Subject): string[] {
  return subj.p === 3 && subj.n === 'sg' ? ['has not', "hasn't"] : ['have not', "haven't"];
}

function cross(auxes: string[], rest: string[]): string[] {
  const out: string[] = [];
  for (const a of auxes) for (const r of rest) out.push(`${a} ${r}`);
  return out;
}

// Returns every accepted spelling; the first entry is the one shown as the answer.
export function verbForms(tense: TenseId, verb: TVerb, subj: Subject, neg: boolean): string[] {
  const third = subj.p === 3 && subj.n === 'sg';
  switch (tense) {
    case 'presSimple':
      if (!neg) return [third ? verb.s : verb.base];
      return third ? [`doesn't ${verb.base}`, `does not ${verb.base}`] : [`don't ${verb.base}`, `do not ${verb.base}`];
    case 'presCont':
      return cross(neg ? beNeg(subj, false) : be(subj, false), [verb.ing]);
    case 'pastSimple':
      return neg ? [`didn't ${verb.base}`, `did not ${verb.base}`] : verb.past;
    case 'pastCont':
      return cross(neg ? beNeg(subj, true) : be(subj, true), [verb.ing]);
    case 'presPerf':
      return cross(neg ? haveNeg(subj) : have(subj), verb.pp);
    case 'presPerfCont':
      return cross(neg ? haveNeg(subj) : have(subj), [`been ${verb.ing}`]);
    case 'pastPerf':
      return cross(neg ? ['had not', "hadn't"] : ['had', "'d"], verb.pp);
    case 'future': {
      const will = neg ? [`won't ${verb.base}`, `will not ${verb.base}`] : [`will ${verb.base}`, `'ll ${verb.base}`];
      const going = cross(neg ? beNeg(subj, false) : be(subj, false), [`going to ${verb.base}`]);
      return [...will, ...going];
    }
  }
}

// Question: auxiliary + subject + verb ("Did he finish", "Is Anna sleeping").
export function questionForms(tense: TenseId, verb: TVerb, subj: Subject): string[] {
  const third = subj.p === 3 && subj.n === 'sg';
  const s = subj.s === 'I' ? 'I' : /^[A-Z][a-z]+$/.test(subj.s) && !['He', 'She', 'We', 'They', 'You', 'It'].includes(subj.s) ? subj.s : subj.s.toLowerCase();
  const beNow = subj.p === 1 && subj.n === 'sg' ? 'am' : third ? 'is' : 'are';
  const bePast = subj.n === 'sg' && subj.p !== 2 ? 'was' : 'were';
  const hv = third ? 'has' : 'have';
  switch (tense) {
    case 'presSimple':
      return [`${third ? 'does' : 'do'} ${s} ${verb.base}`];
    case 'presCont':
      return [`${beNow} ${s} ${verb.ing}`];
    case 'pastSimple':
      return [`did ${s} ${verb.base}`];
    case 'pastCont':
      return [`${bePast} ${s} ${verb.ing}`];
    case 'presPerf':
      return verb.pp.map((pp) => `${hv} ${s} ${pp}`);
    case 'presPerfCont':
      return [`${hv} ${s} been ${verb.ing}`];
    case 'pastPerf':
      return verb.pp.map((pp) => `had ${s} ${pp}`);
    case 'future':
      return [`will ${s} ${verb.base}`, `${beNow} ${s} going to ${verb.base}`];
  }
}

function markersFor(tense: TenseId, verb: TVerb, form: Form, subject: Subject): Marker[] {
  const neg = form === 'neg';
  return TENSE_BY_ID[tense].markers.filter((m) => {
    if (m.avoid?.includes(subject.s)) return false;
    // questions put the subject inside the blank, so a marker between subject and verb does not fit
    if (form === 'q' && m.pos === 'mid') return false;
    if (m.negOnly && !neg && form !== 'q') return false;
    if (m.affOnly && neg) return false;
    if (m.stativeOnly && !verb.stative) return false;
    if (m.dynamicOnly && verb.stative) return false;
    return true;
  });
}

export function generateTense(tense: TenseId, allowedForms: Form[] | boolean = ['aff', 'neg', 'q']): TenseItem {
  const forms: Form[] = Array.isArray(allowedForms) ? (allowedForms.length ? allowedForms : ['aff']) : allowedForms ? ['aff', 'neg'] : ['aff'];
  const def = TENSE_BY_ID[tense];
  const continuous = tense === 'presCont' || tense === 'pastCont' || tense === 'presPerfCont';
  const preds = PREDICATES.filter((p) => !(continuous && TVERBS[p.v].stative));
  const pred = pick(preds);
  const verb = TVERBS[pred.v];
  const subject = pred.weather ? SUBJECTS.find((s) => s.weather)! : pick(SUBJECTS.filter((s) => !s.weather));
  // Affirmative sentences are the most common; negatives and questions share the rest.
  const form: Form = forms.length === 1 ? forms[0] : forms.includes('aff') && chance(0.5) ? 'aff' : pick(forms.filter((f) => f !== 'aff' || forms.length === 1));
  const negative = form === 'neg';
  const marker = pick(markersFor(tense, verb, form, subject));
  const complement = pred.c.replace('{poss}', subject.poss);

  const pieces: Piece[] = [];
  let subjText = subject.s;
  if (marker.pos === 'start') {
    pieces.push({ marker: marker.text }, ' ');
    if (!/[!,]$/.test(marker.text)) subjText = subject.s.toLowerCase() === 'i' ? 'I' : subject.s.charAt(0).toLowerCase() + subject.s.slice(1);
  }
  if (form === 'q') {
    // the subject goes inside the blank: "___ (he / finish) the book yesterday?"
    const proper = /^[A-Z][a-z]+$/.test(subject.s) && !['He', 'She', 'We', 'They', 'You', 'It'].includes(subject.s);
    const hint = subject.s === 'I' || proper ? subject.s : subject.s.charAt(0).toLowerCase() + subject.s.slice(1);
    pieces.push({ blank: true }, ' ', { mono: `(${hint} / ${verb.base})` });
  } else {
    pieces.push(subjText, ' ');
    if (marker.pos === 'mid') pieces.push({ marker: marker.text }, ' ');
    pieces.push({ blank: true }, ' ', { mono: `(${verb.base})` });
  }
  if (complement) pieces.push(' ' + complement);
  if (marker.pos === 'end') pieces.push(' ', { marker: marker.text });
  pieces.push(form === 'q' ? '?' : '.');

  const answers = form === 'q' ? questionForms(tense, verb, subject) : verbForms(tense, verb, subject, negative);
  const accepted = [...answers];
  // for / since markers allow both Present Perfect and its continuous form.
  if (form !== 'q') {
    if (tense === 'presPerf' && /^(for|since)\b/.test(marker.text)) accepted.push(...verbForms('presPerfCont', verb, subject, negative));
    if (tense === 'presPerfCont') accepted.push(...verbForms('presPerf', verb, subject, negative));
  }

  const text = pieces.map((p) => (typeof p === 'string' ? p : 'blank' in p ? '___' : 'marker' in p ? p.marker : p.mono)).join('');
  return { tense, tenseName: def.name, form, negative, pieces, verb, subject, answer: answers[0], accepted, rule: def.rule, text };
}

export function checkTense(input: string, item: TenseItem): boolean {
  return matches(input, item.accepted);
}

export { TENSES };
