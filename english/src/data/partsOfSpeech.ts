import { LEXICON } from './lexicon';

export type Pos = 'noun' | 'verb' | 'adj' | 'adv' | 'pron' | 'prep' | 'art' | 'conj';

export const POS_INFO: Record<Pos, { one: string; many: string; hint: string }> = {
  noun: { one: 'съществително', many: 'съществителните', hint: 'име на човек, място, предмет или понятие: man, park, idea' },
  verb: { one: 'глагол', many: 'глаголите', hint: 'действие или състояние: walked, bought, was' },
  adj: { one: 'прилагателно', many: 'прилагателните', hint: 'описва съществително: old, red, tired' },
  adv: { one: 'наречие', many: 'наречията', hint: 'описва как, кога, колко често: slowly, often, very' },
  pron: { one: 'местоимение', many: 'местоименията', hint: 'замества име: she, they, it, her, my' },
  prep: { one: 'предлог', many: 'предлозите', hint: 'връзка с място, време, посока: into, near, across' },
  art: { one: 'член', many: 'членовете', hint: 'a, an, the' },
  conj: { one: 'съюз', many: 'съюзите', hint: 'свързва думи или изречения: and, but, because, so' },
};

export interface PersonNoun {
  w: string;
  g: 'm' | 'f' | 'n';
}

const uniq = (arr: string[]) => [...new Set(arr)];
const single = (w: string) => !w.includes(' ') && !/[A-Z]/.test(w);

const FEMALE = new Set(['woman', 'girl', 'nurse', 'mother', 'sister', 'daughter', 'aunt', 'grandmother', 'wife', 'queen', 'actress', 'waitress', 'lady', 'niece', 'bride', 'girlfriend', 'princess']);
const MALE = new Set(['man', 'boy', 'waiter', 'father', 'brother', 'son', 'uncle', 'grandfather', 'husband', 'king', 'actor', 'gentleman', 'nephew', 'groom', 'boyfriend', 'prince', 'policeman', 'businessman']);

// People, places, adjectives and adverbs are curated so the sentences stay natural.
export const PERSON_NOUNS: PersonNoun[] = uniq([
  'man', 'woman', 'teacher', 'boy', 'girl', 'doctor', 'student', 'driver', 'nurse', 'waiter', 'artist', 'engineer', 'mother', 'father', 'brother', 'sister',
  'uncle', 'aunt', 'grandmother', 'grandfather', 'neighbour', 'farmer', 'policeman', 'tourist', 'child', 'lawyer', 'musician', 'baker', 'stranger', 'soldier',
  'pilot', 'journalist', 'manager', 'scientist', 'actor', 'actress', 'king', 'queen', 'husband', 'wife', 'boss', 'guest', 'customer', 'visitor', 'cook',
]).map((w) => ({ w, g: FEMALE.has(w) ? 'f' : MALE.has(w) ? 'm' : 'n' }));

export const PLACE_NOUNS = uniq([
  'room', 'house', 'garden', 'kitchen', 'park', 'station', 'office', 'shop', 'forest', 'city', 'hotel', 'library', 'school', 'museum', 'market', 'church',
  'castle', 'village', 'field', 'bridge', 'tunnel', 'hall', 'yard', 'cafe', 'restaurant', 'bank', 'stadium', 'square', 'harbour', 'beach', 'cave', 'valley',
  'garage', 'classroom', 'bedroom', 'cellar', 'attic', 'corridor', 'street', 'meadow',
]);
export const OBJECT_NOUNS = ['book', 'letter', 'ball', 'cake', 'box', 'bag', 'key', 'phone', 'picture', 'cup', 'umbrella', 'apple', 'coin', 'bottle', 'hat', 'map', 'ticket', 'scarf', 'basket', 'lamp'];
// Extra objects from the shared lexicon for the generic verbs (bought, saw, found, wanted).
export const LEX_OBJECTS = uniq(LEXICON.filter((e) => e.pos === 'n' && !e.tags.includes('unc') && !e.tags.includes('pl') && (e.tags.includes('food') || e.tags.includes('clothes')) && single(e.en[0])).map((e) => e.en[0]));

export const ADJ_PERSON = ['old', 'young', 'tired', 'tall', 'kind', 'clever', 'happy', 'angry', 'quiet', 'busy', 'nervous', 'elderly', 'friendly', 'polite', 'lazy', 'brave', 'shy', 'curious', 'patient', 'cheerful', 'sleepy', 'hungry', 'thirsty', 'famous', 'rich', 'poor', 'strong', 'weak', 'honest', 'gentle', 'proud', 'sad', 'lonely', 'worried', 'excited', 'bored', 'confused', 'calm'];
export const ADJ_PLACE = ['small', 'big', 'quiet', 'dark', 'empty', 'old', 'beautiful', 'cold', 'warm', 'noisy', 'enormous', 'tiny', 'crowded', 'ancient', 'modern', 'bright', 'dusty', 'narrow', 'wide', 'famous', 'strange', 'sunny', 'peaceful', 'busy', 'dirty', 'clean', 'huge', 'lovely', 'distant', 'wooden'];
export const ADJ_OBJECT = ['red', 'heavy', 'new', 'old', 'small', 'beautiful', 'expensive', 'broken', 'blue', 'big', 'orange', 'green', 'yellow', 'cheap', 'tiny', 'strange', 'shiny', 'wooden', 'plastic', 'empty', 'full', 'dirty', 'wet', 'huge', 'lovely', 'ugly', 'square', 'round', 'soft', 'sharp'];
export const ADJ_LEX_OBJECT = ['new', 'old', 'small', 'big', 'beautiful', 'expensive', 'cheap', 'strange', 'lovely', 'huge', 'tiny'];

export const ADV_MANNER = ['slowly', 'quickly', 'quietly', 'suddenly', 'carefully', 'happily', 'angrily', 'loudly', 'nervously', 'gently', 'calmly', 'silently', 'bravely', 'politely', 'lazily', 'eagerly', 'sadly', 'proudly', 'cheerfully', 'patiently', 'anxiously', 'clumsily', 'secretly', 'immediately', 'finally', 'unexpectedly'];
export const ADV_FREQ = ['often', 'always', 'usually', 'sometimes', 'rarely', 'frequently', 'occasionally', 'seldom', 'regularly', 'constantly'];

export const VERB_MOTION = ['walked', 'ran', 'went', 'drove', 'hurried', 'jumped', 'moved', 'looked', 'came', 'rushed', 'wandered', 'marched', 'stepped', 'climbed', 'cycled'];
// Prepositions after verbs of motion (walked into) and after static verbs (stood near).
export const PREP_MOTION = ['into', 'through', 'across', 'towards', 'past', 'along', 'around', 'out of'];
export const PREP_STATIC = ['near', 'behind', 'outside', 'inside', 'beside', 'in front of', 'next to', 'opposite'];
export const ADJ_REASON = ['tired', 'nervous', 'hungry', 'thirsty', 'late', 'angry', 'sleepy', 'worried', 'scared', 'bored', 'cold', 'ill', 'excited', 'lost'];
export const VERB_STATIC = ['stood', 'sat', 'waited', 'rested', 'stopped'];

// Transitive verbs with the objects they make sense with.
export const VERB_TRANS: { w: string; obj: string[] }[] = [
  { w: 'bought', obj: ['book', 'cake', 'bag', 'phone', 'picture', 'cup', 'ball', 'umbrella', 'apple'] },
  { w: 'found', obj: ['key', 'letter', 'box', 'ball', 'phone', 'bag', 'umbrella', 'book'] },
  { w: 'took', obj: ['book', 'key', 'letter', 'bag', 'phone', 'cup', 'umbrella', 'apple'] },
  { w: 'opened', obj: ['box', 'letter', 'bag', 'book', 'umbrella'] },
  { w: 'carried', obj: ['box', 'bag', 'cup', 'ball', 'umbrella', 'cake'] },
  { w: 'dropped', obj: ['cup', 'key', 'ball', 'phone', 'box', 'apple'] },
  { w: 'saw', obj: ['book', 'letter', 'ball', 'cake', 'box', 'bag', 'key', 'phone', 'picture', 'cup'] },
  { w: 'washed', obj: ['cup', 'apple'] },
  { w: 'painted', obj: ['picture', 'box'] },
  { w: 'wanted', obj: ['book', 'cake', 'bag', 'phone', 'picture', 'ball', 'umbrella', 'apple'] },
  { w: 'lost', obj: ['key', 'phone', 'bag', 'umbrella', 'letter', 'book'] },
  { w: 'sold', obj: ['book', 'picture', 'phone', 'bag', 'ball', 'hat', 'lamp', 'map'] },
  { w: 'grabbed', obj: ['key', 'bag', 'phone', 'umbrella', 'cup', 'hat', 'scarf', 'ticket'] },
  { w: 'hid', obj: ['key', 'letter', 'box', 'phone', 'cake', 'coin', 'ticket'] },
];

// Generic verbs that also work with the lexicon objects (food, clothes).
export const VERB_TRANS_LEX = new Set(['bought', 'saw', 'found', 'wanted', 'carried', 'took']);

export const PRON_SUBJ: { w: string; poss: string; be: string }[] = [
  { w: 'she', poss: 'her', be: 'was' },
  { w: 'he', poss: 'his', be: 'was' },
  { w: 'they', poss: 'their', be: 'were' },
  { w: 'we', poss: 'our', be: 'were' },
  { w: 'I', poss: 'my', be: 'was' },
];
