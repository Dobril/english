// Word pools for the article generator. Words carry category tags so that only
// sensible verb + adjective + noun combinations get built.

export type Cat = 'food' | 'object' | 'vehicle' | 'place' | 'animal' | 'person' | 'abstract' | 'reading' | 'film' | 'clothes' | 'tech';

export interface Noun {
  w: string;
  pl: string;
  cats: Cat[];
  // Sound override: true = vowel sound despite consonant letter (hour), false = consonant sound (university)
  an?: boolean;
  // came from the shared lexicon (only generic verbs may use it)
  lex?: boolean;
}

export const NOUNS: Noun[] = [
  { w: 'apple', pl: 'apples', cats: ['food'] },
  { w: 'orange', pl: 'oranges', cats: ['food'] },
  { w: 'egg', pl: 'eggs', cats: ['food'] },
  { w: 'sandwich', pl: 'sandwiches', cats: ['food'] },
  { w: 'banana', pl: 'bananas', cats: ['food'] },
  { w: 'pizza', pl: 'pizzas', cats: ['food'] },
  { w: 'onion', pl: 'onions', cats: ['food'] },
  { w: 'car', pl: 'cars', cats: ['vehicle'] },
  { w: 'bike', pl: 'bikes', cats: ['vehicle'] },
  { w: 'motorbike', pl: 'motorbikes', cats: ['vehicle'] },
  { w: 'boat', pl: 'boats', cats: ['vehicle'] },
  { w: 'umbrella', pl: 'umbrellas', cats: ['object'] },
  { w: 'watch', pl: 'watches', cats: ['object', 'tech'] },
  { w: 'lamp', pl: 'lamps', cats: ['object'] },
  { w: 'box', pl: 'boxes', cats: ['object'] },
  { w: 'bottle', pl: 'bottles', cats: ['object'] },
  { w: 'chair', pl: 'chairs', cats: ['object'] },
  { w: 'key', pl: 'keys', cats: ['object'] },
  { w: 'wallet', pl: 'wallets', cats: ['object'] },
  { w: 'envelope', pl: 'envelopes', cats: ['object'] },
  { w: 'ring', pl: 'rings', cats: ['object'] },
  { w: 'phone', pl: 'phones', cats: ['tech'] },
  { w: 'laptop', pl: 'laptops', cats: ['tech'] },
  { w: 'camera', pl: 'cameras', cats: ['tech'] },
  { w: 'printer', pl: 'printers', cats: ['tech'] },
  { w: 'house', pl: 'houses', cats: ['place'] },
  { w: 'flat', pl: 'flats', cats: ['place'] },
  { w: 'island', pl: 'islands', cats: ['place'] },
  { w: 'hotel', pl: 'hotels', cats: ['place'] },
  { w: 'office', pl: 'offices', cats: ['place'] },
  { w: 'cat', pl: 'cats', cats: ['animal'] },
  { w: 'dog', pl: 'dogs', cats: ['animal'] },
  { w: 'owl', pl: 'owls', cats: ['animal'] },
  { w: 'elephant', pl: 'elephants', cats: ['animal'] },
  { w: 'horse', pl: 'horses', cats: ['animal'] },
  { w: 'eagle', pl: 'eagles', cats: ['animal'] },
  { w: 'man', pl: 'men', cats: ['person'] },
  { w: 'woman', pl: 'women', cats: ['person'] },
  { w: 'actor', pl: 'actors', cats: ['person'] },
  { w: 'engineer', pl: 'engineers', cats: ['person'] },
  { w: 'artist', pl: 'artists', cats: ['person'] },
  { w: 'idea', pl: 'ideas', cats: ['abstract'] },
  { w: 'problem', pl: 'problems', cats: ['abstract'] },
  { w: 'answer', pl: 'answers', cats: ['abstract'] },
  { w: 'plan', pl: 'plans', cats: ['abstract'] },
  { w: 'question', pl: 'questions', cats: ['abstract'] },
  { w: 'accident', pl: 'accidents', cats: ['abstract'] },
  { w: 'book', pl: 'books', cats: ['reading'] },
  { w: 'film', pl: 'films', cats: ['film'] },
  { w: 'article', pl: 'articles', cats: ['reading'] },
  { w: 'email', pl: 'emails', cats: ['reading'] },
  { w: 'letter', pl: 'letters', cats: ['reading'] },
  { w: 'jacket', pl: 'jackets', cats: ['clothes'] },
  { w: 'hat', pl: 'hats', cats: ['clothes'] },
  { w: 'uniform', pl: 'uniforms', cats: ['clothes'], an: false },
  { w: 'hour', pl: 'hours', cats: [], an: true },
  { w: 'university', pl: 'universities', cats: ['place'], an: false },
  { w: 'unicorn', pl: 'unicorns', cats: ['animal'], an: false },
  { w: 'poem', pl: 'poems', cats: ['reading'] },
  { w: 'story', pl: 'stories', cats: ['reading'] },
  { w: 'report', pl: 'reports', cats: ['reading'] },
  { w: 'magazine', pl: 'magazines', cats: ['reading'] },
  { w: 'documentary', pl: 'documentaries', cats: ['film'] },
  { w: 'series', pl: 'series', cats: ['film'] },
  { w: 'cottage', pl: 'cottages', cats: ['place'] },
  { w: 'castle', pl: 'castles', cats: ['place'] },
  { w: 'village', pl: 'villages', cats: ['place'] },
  { w: 'museum', pl: 'museums', cats: ['place'] },
  { w: 'restaurant', pl: 'restaurants', cats: ['place'] },
  { w: 'garage', pl: 'garages', cats: ['place'] },
  { w: 'rabbit', pl: 'rabbits', cats: ['animal'] },
  { w: 'parrot', pl: 'parrots', cats: ['animal'] },
  { w: 'kitten', pl: 'kittens', cats: ['animal'] },
  { w: 'puppy', pl: 'puppies', cats: ['animal'] },
  { w: 'hamster', pl: 'hamsters', cats: ['animal'] },
  { w: 'doctor', pl: 'doctors', cats: ['person'] },
  { w: 'teacher', pl: 'teachers', cats: ['person'] },
  { w: 'lawyer', pl: 'lawyers', cats: ['person'] },
  { w: 'tourist', pl: 'tourists', cats: ['person'] },
  { w: 'musician', pl: 'musicians', cats: ['person'] },
  { w: 'stranger', pl: 'strangers', cats: ['person'] },
  { w: 'van', pl: 'vans', cats: ['vehicle'] },
  { w: 'scooter', pl: 'scooters', cats: ['vehicle'] },
  { w: 'truck', pl: 'trucks', cats: ['vehicle'] },
  { w: 'tablet', pl: 'tablets', cats: ['tech'] },
  { w: 'headset', pl: 'headsets', cats: ['tech'] },
  { w: 'charger', pl: 'chargers', cats: ['tech'] },
  { w: 'mistake', pl: 'mistakes', cats: ['abstract'] },
  { w: 'argument', pl: 'arguments', cats: ['abstract'] },
  { w: 'excuse', pl: 'excuses', cats: ['abstract'] },
  { w: 'opportunity', pl: 'opportunities', cats: ['abstract'] },
  { w: 'solution', pl: 'solutions', cats: ['abstract'] },
  { w: 'suggestion', pl: 'suggestions', cats: ['abstract'] },
  { w: 'coat', pl: 'coats', cats: ['clothes'] },
  { w: 'scarf', pl: 'scarves', cats: ['clothes'] },
  { w: 'dress', pl: 'dresses', cats: ['clothes'] },
  { w: 'sweater', pl: 'sweaters', cats: ['clothes'] },
  { w: 'mango', pl: 'mangoes', cats: ['food'] },
  { w: 'biscuit', pl: 'biscuits', cats: ['food'] },
  { w: 'pancake', pl: 'pancakes', cats: ['food'] },
  { w: 'salad', pl: 'salads', cats: ['food'] },
  { w: 'omelette', pl: 'omelettes', cats: ['food'] },
  { w: 'ice cream', pl: 'ice creams', cats: ['food'] },
  { w: 'mirror', pl: 'mirrors', cats: ['object'] },
  { w: 'candle', pl: 'candles', cats: ['object'] },
  { w: 'basket', pl: 'baskets', cats: ['object'] },
  { w: 'blanket', pl: 'blankets', cats: ['object'] },
  { w: 'ladder', pl: 'ladders', cats: ['object'] },
  { w: 'toy', pl: 'toys', cats: ['object'] },
];

export interface Adjective {
  w: string;
  cats: Cat[];
  an?: boolean;
}

export const ADJECTIVES: Adjective[] = [
  { w: 'old', cats: ['object', 'vehicle', 'place', 'person', 'animal', 'clothes', 'tech', 'reading', 'film'] },
  { w: 'new', cats: ['object', 'vehicle', 'place', 'clothes', 'tech', 'reading', 'film', 'abstract'] },
  { w: 'interesting', cats: ['reading', 'film', 'person', 'abstract', 'place'] },
  { w: 'expensive', cats: ['object', 'vehicle', 'clothes', 'tech', 'place'] },
  { w: 'cheap', cats: ['object', 'vehicle', 'clothes', 'tech', 'place'] },
  { w: 'beautiful', cats: ['place', 'person', 'animal', 'object', 'clothes'] },
  { w: 'huge', cats: ['object', 'vehicle', 'place', 'animal'] },
  { w: 'small', cats: ['object', 'vehicle', 'place', 'animal', 'tech'] },
  { w: 'honest', cats: ['person'], an: true },
  { w: 'useful', cats: ['object', 'tech', 'abstract', 'reading', 'film'], an: false },
  { w: 'unusual', cats: ['object', 'abstract', 'animal', 'place', 'person'] },
  { w: 'excellent', cats: ['food', 'reading', 'film', 'abstract', 'person'] },
  { w: 'amazing', cats: ['place', 'abstract', 'reading', 'film', 'person'] },
  { w: 'ugly', cats: ['object', 'clothes', 'animal', 'place'] },
  { w: 'delicious', cats: ['food'] },
  { w: 'easy', cats: ['abstract'] },
  { w: 'important', cats: ['abstract', 'person', 'reading', 'film'] },
  { w: 'empty', cats: ['object', 'place'] },
  { w: 'enormous', cats: ['animal', 'place', 'object'] },
  { w: 'red', cats: ['object', 'vehicle', 'clothes'] },
  { w: 'Italian', cats: ['food', 'vehicle', 'person'] },
  { w: 'European', cats: ['person', 'vehicle', 'place'], an: false },
  { w: 'used', cats: ['vehicle', 'tech'], an: false },
  { w: 'urgent', cats: ['abstract', 'reading', 'film'] },
  { w: 'famous', cats: ['person', 'place', 'reading', 'film'] },
  { w: 'young', cats: ['person', 'animal'] },
  { w: 'awful', cats: ['reading', 'film', 'abstract', 'food', 'place'] },
  { w: 'tiny', cats: ['object', 'animal', 'place', 'tech'] },
  { w: 'strange', cats: ['object', 'animal', 'person', 'abstract', 'place'] },
  { w: 'modern', cats: ['place', 'tech', 'vehicle', 'object'] },
  { w: 'comfortable', cats: ['object', 'place', 'clothes', 'vehicle'] },
  { w: 'warm', cats: ['clothes', 'place'] },
  { w: 'fresh', cats: ['food'] },
  { w: 'spicy', cats: ['food'] },
  { w: 'friendly', cats: ['person', 'animal', 'place'] },
  { w: 'elegant', cats: ['clothes', 'person', 'place', 'object'] },
  { w: 'noisy', cats: ['animal', 'place', 'vehicle', 'person'] },
  { w: 'brilliant', cats: ['abstract', 'person', 'reading', 'film'] },
  { w: 'original', cats: ['abstract', 'reading', 'film'] },
  { w: 'electric', cats: ['vehicle', 'tech', 'object'] },
  { w: 'ancient', cats: ['place', 'object'] },
  { w: 'wooden', cats: ['object'] },
  { w: 'lovely', cats: ['place', 'person', 'animal', 'object', 'clothes'] },
  { w: 'awkward', cats: ['abstract', 'person'] },
  { w: 'ordinary', cats: ['object', 'person', 'place', 'abstract'] },
  { w: 'exciting', cats: ['reading', 'film', 'abstract', 'place'] },
];

export interface Verb {
  w: string;
  obj?: Cat[];
  // may combine with nouns pulled from the shared lexicon (generic verbs only)
  lexOk?: boolean;
  // explicit whitelist of nouns (overrides obj)
  only?: string[];
}

// Verbs in the past tense; obj lists the noun categories they combine with.
export const VERBS: Verb[] = [
  { w: 'saw', obj: ['object', 'vehicle', 'animal', 'person', 'place', 'film'], lexOk: true },
  { w: 'bought', obj: ['food', 'object', 'vehicle', 'reading', 'clothes', 'tech', 'place'], lexOk: true },
  { w: 'found', obj: ['object', 'animal', 'reading', 'clothes', 'tech'], lexOk: true },
  { w: 'fixed', obj: ['vehicle', 'tech'] },
  { w: 'ate', obj: ['food'], lexOk: true },
  { w: 'read', obj: ['reading'] },
  { w: 'wrote', only: ['letter', 'email', 'poem', 'story', 'report', 'article', 'book'] },
  { w: 'met', obj: ['person'] },
  { w: 'visited', only: ['island', 'hotel', 'museum', 'castle', 'village', 'restaurant', 'university', 'cottage'] },
  { w: 'had', obj: ['abstract', 'food'] },
  { w: 'needed', obj: ['object', 'tech', 'abstract'] },
  { w: 'rented', only: ['car', 'bike', 'boat', 'van', 'scooter', 'flat', 'house', 'cottage', 'office', 'garage'] },
  { w: 'lost', obj: ['object', 'clothes', 'tech', 'animal'], lexOk: true },
  { w: 'adopted', only: ['cat', 'dog', 'rabbit', 'parrot', 'kitten', 'puppy', 'hamster', 'horse'] },
  { w: 'noticed', obj: ['object', 'animal', 'person', 'abstract'] },
  { w: 'ordered', obj: ['food'], lexOk: true },
  { w: 'tried', obj: ['food'], lexOk: true },
  { w: 'packed', obj: ['clothes', 'tech'], lexOk: true },
  { w: 'washed', obj: ['clothes', 'vehicle'] },
  { w: 'borrowed', obj: ['reading', 'tech'] },
  { w: 'painted', only: ['house', 'cottage', 'garage', 'box', 'chair', 'ladder', 'basket'] },
  { w: 'watched', obj: ['film'] },
];

export const SUBJECTS = ['I', 'She', 'He', 'They', 'We', 'My friend', 'My sister', 'My brother', 'Tom', 'Anna', 'Our neighbour'];
export const ENDINGS = ['yesterday', 'last week', 'this morning', 'on Sunday', 'last summer', 'two days ago', 'in the park', 'at the market', ''];

// Predicates used after a second mention ("... The cat is black.")
export const SECOND_PRED: Record<Cat, string[]> = {
  animal: ['is black', 'was very friendly', 'is tiny', 'sleeps all day', 'is very noisy'],
  object: ['was expensive', 'is very old', 'is broken now', 'is on the table', 'was a present'],
  vehicle: ['is red', 'was very cheap', 'is really fast', 'is parked outside'],
  reading: ['was boring', 'was fantastic', 'was about a spy', 'was really long', 'was full of mistakes'],
  film: ['was boring', 'was fantastic', 'was about a spy', 'was really long', 'made everybody cry'],
  place: ['is near the sea', 'is very small', 'has a big garden', 'was quite noisy'],
  person: ['was very kind', 'was tall and thin', 'spoke Spanish', 'was from Italy'],
  food: ['was delicious', 'was huge', 'was cold', 'was very expensive'],
  clothes: ['is too big', 'was cheap', 'is warm', 'looks great'],
  tech: ['works well', 'was expensive', 'is very fast', 'is broken now'],
  abstract: ['was interesting', 'was not easy', 'surprised everyone', 'was brilliant'],
};

export const JOBS: { w: string; an?: boolean }[] = [
  { w: 'engineer' },
  { w: 'doctor' },
  { w: 'teacher' },
  { w: 'actor' },
  { w: 'artist' },
  { w: 'architect' },
  { w: 'nurse' },
  { w: 'lawyer' },
  { w: 'pilot' },
  { w: 'writer' },
  { w: 'electrician' },
  { w: 'accountant' },
  { w: 'hairdresser' },
  { w: 'university lecturer', an: false },
  { w: 'honest politician', an: true },
  { w: 'interpreter' },
  { w: 'optician' },
  { w: 'firefighter' },
  { w: 'dentist' },
];
export const JOB_ADJ: { w: string; an?: boolean }[] = [
  { w: 'experienced' },
  { w: 'excellent' },
  { w: 'famous' },
  { w: 'young' },
  { w: 'talented' },
  { w: 'good' },
  { w: 'well-known' },
  { w: 'ambitious' },
];
export const JOB_FRAMES = ['{S} is ___ {J}.', '{S} works as ___ {J}.', '{S} wants to be ___ {J}.', '{S} became ___ {J} last year.'];
export const JOB_SUBJECTS = ['She', 'He', 'My brother', 'My sister', 'Anna', 'Tom', 'Our neighbour', 'My best friend'];

export const FREQ_ACTS = ['go to the gym', 'visit the dentist', 'play tennis', 'eat out', 'go swimming', 'call home', 'clean the house', 'go to the cinema'];
export const FREQ_SUBJECTS = ['I', 'We', 'They', 'My parents', 'The students'];
export const FREQ_NUM = ['once', 'twice', 'three times', 'four times'];
export const FREQ_PERIOD = ['week', 'month', 'year', 'day'];

export const UNIQUE: string[] = [
  '___ sun is very hot today.',
  '___ moon was bright last night.',
  '___ earth goes around ___ sun.',
  'We looked at ___ stars in ___ sky.',
  '___ internet has changed our lives.',
  'What is ___ weather like today?',
  'We must protect ___ environment.',
  'She wants to travel around ___ world.',
  '___ sky was grey all day.',
  'There are many fish in ___ sea.',
  '___ moon goes around ___ earth.',
  'It is the biggest city in ___ world.',
];

export const SUPERLATIVES: { s: string; sup: string; n: string; end: string }[] = [
  { s: 'This is', sup: 'best', n: 'film', end: 'I have ever seen' },
  { s: 'That was', sup: 'best', n: 'holiday', end: 'of my life' },
  { s: 'She is', sup: 'tallest', n: 'girl', end: 'in the class' },
  { s: 'It was', sup: 'most interesting', n: 'book', end: 'I have ever read' },
  { s: 'He is', sup: 'fastest', n: 'runner', end: 'in the team' },
  { s: 'This is', sup: 'oldest', n: 'building', end: 'in the city' },
  { s: 'That was', sup: 'worst', n: 'day', end: 'of my life' },
  { s: 'Mount Everest is', sup: 'highest', n: 'mountain', end: 'in the world' },
  { s: 'It is', sup: 'most expensive', n: 'restaurant', end: 'in town' },
  { s: 'She is', sup: 'youngest', n: 'player', end: 'in the team' },
  { s: 'This is', sup: 'easiest', n: 'question', end: 'in the test' },
  { s: 'It was', sup: 'coldest', n: 'winter', end: 'in twenty years' },
];

export const ORDINALS: string[] = [
  'It is ___ first time I have been here.',
  'He lives on ___ {ORD} floor.',
  'This is ___ {ORD} day of our holiday.',
  'She was ___ first person to arrive.',
  'Turn left at ___ second traffic light.',
  '___ last bus leaves at midnight.',
  'We sat in ___ {ORD} row.',
  'It was ___ first day of school.',
  'Read ___ {ORD} chapter for tomorrow.',
];
export const ORD_WORDS = ['first', 'second', 'third', 'fourth', 'fifth', 'last'];

export const INSTRUMENTS = ['piano', 'guitar', 'violin', 'drums', 'flute', 'saxophone', 'cello', 'trumpet'];
export const INSTR_FRAMES = ['{S} plays ___ {I}.', '{S} is learning to play ___ {I}.', '{S} played ___ {I} at the concert.', '{S} can play ___ {I} very well.'];

export const GEO_THE: { name: string; kind: 'река' | 'море / океан' | 'планинска верига' | 'държава в мн. число' | 'пустиня' | 'острови' }[] = [
  { name: 'Thames', kind: 'река' },
  { name: 'Danube', kind: 'река' },
  { name: 'Nile', kind: 'река' },
  { name: 'Amazon', kind: 'река' },
  { name: 'Black Sea', kind: 'море / океан' },
  { name: 'Mediterranean', kind: 'море / океан' },
  { name: 'Atlantic', kind: 'море / океан' },
  { name: 'Pacific Ocean', kind: 'море / океан' },
  { name: 'Alps', kind: 'планинска верига' },
  { name: 'Andes', kind: 'планинска верига' },
  { name: 'Himalayas', kind: 'планинска верига' },
  { name: 'Rocky Mountains', kind: 'планинска верига' },
  { name: 'Netherlands', kind: 'държава в мн. число' },
  { name: 'United States', kind: 'държава в мн. число' },
  { name: 'United Kingdom', kind: 'държава в мн. число' },
  { name: 'Philippines', kind: 'държава в мн. число' },
  { name: 'Czech Republic', kind: 'държава в мн. число' },
  { name: 'Sahara', kind: 'пустиня' },
  { name: 'Canary Islands', kind: 'острови' },
  { name: 'Bahamas', kind: 'острови' },
];

export const GEO_ZERO: { name: string; kind: 'държава' | 'град' | 'континент' | 'езеро' | 'планински връх' }[] = [
  { name: 'Bulgaria', kind: 'държава' },
  { name: 'France', kind: 'държава' },
  { name: 'Italy', kind: 'държава' },
  { name: 'Japan', kind: 'държава' },
  { name: 'Germany', kind: 'държава' },
  { name: 'Spain', kind: 'държава' },
  { name: 'Greece', kind: 'държава' },
  { name: 'Brazil', kind: 'държава' },
  { name: 'Sofia', kind: 'град' },
  { name: 'London', kind: 'град' },
  { name: 'Paris', kind: 'град' },
  { name: 'Rome', kind: 'град' },
  { name: 'Berlin', kind: 'град' },
  { name: 'Tokyo', kind: 'град' },
  { name: 'Varna', kind: 'град' },
  { name: 'Plovdiv', kind: 'град' },
  { name: 'Europe', kind: 'континент' },
  { name: 'Asia', kind: 'континент' },
  { name: 'Africa', kind: 'континент' },
  { name: 'Lake Baikal', kind: 'езеро' },
  { name: 'Mount Everest', kind: 'планински връх' },
  { name: 'Vitosha', kind: 'планински връх' },
];

export const GEO_FRAMES = ['{S} has never been to ___ {G}.', 'Have you ever visited ___ {G}?', '{S} spent two weeks in ___ {G} last year.', '{S} is flying to ___ {G} tomorrow.', 'We saw photos of ___ {G}.'];
export const GEO_SUBJECTS = ['She', 'He', 'My uncle', 'My cousin', 'Anna', 'Tom', 'My family'];

export const SPECIFIED: { n: string; spec: string; pred: string }[] = [
  { n: 'book', spec: 'on the table', pred: 'is mine' },
  { n: 'girl', spec: 'next to Tom', pred: 'is his sister' },
  { n: 'keys', spec: 'in my pocket', pred: 'are not mine' },
  { n: 'coffee', spec: 'in this café', pred: 'is excellent' },
  { n: 'people', spec: 'who live next door', pred: 'are very friendly' },
  { n: 'car', spec: 'in front of our house', pred: 'belongs to my uncle' },
  { n: 'water', spec: 'in this bottle', pred: 'is warm' },
  { n: 'man', spec: 'in the blue jacket', pred: 'is my teacher' },
  { n: 'flowers', spec: 'in the garden', pred: 'are beautiful' },
  { n: 'music', spec: 'they played last night', pred: 'was too loud' },
  { n: 'shoes', spec: 'you bought yesterday', pred: 'look great' },
  { n: 'film', spec: 'we watched on Friday', pred: 'was boring' },
  { n: 'children', spec: 'in this school', pred: 'learn two languages' },
];

export const LIKE_VERBS: Record<string, string[]> = {
  sg: ['likes', 'loves', 'hates', 'does not like'],
  pl: ['like', 'love', 'hate', 'do not like'],
};
export const LIKE_SUBJECTS: { s: string; num: 'sg' | 'pl' }[] = [
  { s: 'I', num: 'pl' },
  { s: 'We', num: 'pl' },
  { s: 'They', num: 'pl' },
  { s: 'Children', num: 'pl' },
  { s: 'My parents', num: 'pl' },
  { s: 'She', num: 'sg' },
  { s: 'He', num: 'sg' },
  { s: 'My brother', num: 'sg' },
  { s: 'Anna', num: 'sg' },
  { s: 'My grandmother', num: 'sg' },
];

export const PLURAL_PRED: Record<Cat, string[]> = {
  animal: ['are wonderful pets', 'can be very noisy', 'need a lot of space', 'are intelligent animals'],
  food: ['are good for you', 'are delicious', 'are cheap in summer', 'are full of vitamins'],
  object: ['are useful', 'can be expensive', 'are sold everywhere', 'make good presents'],
  vehicle: ['are expensive', 'are fast', 'need regular service'],
  reading: ['are interesting', 'help you learn', 'can be boring'],
  film: ['are entertaining', 'can be boring', 'are popular with children'],
  place: ['are expensive these days', 'are noisy in summer'],
  person: ['work hard', 'are often busy'],
  clothes: ['are in fashion again', 'keep you warm'],
  tech: ['are getting cheaper', 'are everywhere today'],
  abstract: ['are part of life', 'are not always easy'],
};

export interface Uncount {
  w: string;
  like?: boolean;
  need?: boolean;
  pred?: string[];
}
export const UNCOUNT: Uncount[] = [
  { w: 'water', pred: ['is essential for life', 'boils at 100 degrees'] },
  { w: 'milk', like: true, pred: ['is good for your bones'] },
  { w: 'coffee', like: true, pred: ['keeps you awake'] },
  { w: 'tea', like: true, pred: ['is popular in Britain'] },
  { w: 'bread', like: true, pred: ['is made from flour'] },
  { w: 'rice', like: true, pred: ['is the main food in Asia'] },
  { w: 'cheese', like: true },
  { w: 'chocolate', like: true, pred: ['makes people happy'] },
  { w: 'money', need: true, pred: ['is important', 'does not grow on trees'] },
  { w: 'music', like: true, pred: ['makes me happy', 'is a universal language'] },
  { w: 'information', need: true, pred: ['is power'] },
  { w: 'advice', need: true },
  { w: 'love', pred: ['is blind', 'is all you need'] },
  { w: 'time', need: true, pred: ['is money', 'flies'] },
  { w: 'homework', pred: ['is boring', 'takes a lot of time'] },
  { w: 'furniture', pred: ['is expensive these days'] },
  { w: 'knowledge', pred: ['is power'] },
  { w: 'happiness', pred: ['is more important than money'] },
  { w: 'traffic', pred: ['is terrible in big cities'] },
  { w: 'help', need: true },
  { w: 'sleep', need: true, pred: ['is important for your health'] },
  { w: 'sugar', like: true, pred: ['is bad for your teeth'] },
  { w: 'honey', like: true },
  { w: 'luck', need: true },
  { w: 'jazz', like: true },
];
export const NEED_SUBJECTS = ['I', 'We', 'They', 'She', 'He', 'Everybody', 'My friend'];

export const MEALS = ['breakfast', 'lunch', 'dinner', 'supper'];
export const SPORTS = ['football', 'tennis', 'basketball', 'volleyball', 'chess', 'golf', 'hockey', 'baseball'];
export const LANGS = ['English', 'Spanish', 'German', 'French', 'Italian', 'Japanese', 'Bulgarian', 'Chinese'];
export const MEAL_FRAMES = ['We had ___ {M} at {T}.', 'What did you have for ___ {M}?', '___ {M} is ready!', '{S} never skips ___ {M}.', 'They invited us to ___ {M}.'];
export const MEAL_TIMES = ['noon', 'seven', 'eight', 'half past six', 'nine'];
export const SPORT_FRAMES = ['{S} plays ___ {X} every weekend.', '___ {X} is popular in {C}.', '{S} is good at ___ {X}.', 'Do you like ___ {X}?'];
export const SPORT_COUNTRIES = ['Brazil', 'Bulgaria', 'Spain', 'Canada', 'Italy'];
export const LANG_FRAMES = ['{S} speaks ___ {X} fluently.', '{S} is learning ___ {X}.', '___ {X} is a difficult language.', 'Do you speak ___ {X}?', 'They teach ___ {X} at this school.'];
export const SIMPLE_SUBJECTS = ['She', 'He', 'My brother', 'Anna', 'Tom', 'My friend', 'Our teacher'];

export const FIXED: { frame: string; phrase: string }[] = [
  { frame: '{S} went ___ home early.', phrase: 'go home' },
  { frame: '{S} is at ___ home now.', phrase: 'at home' },
  { frame: 'I usually go to ___ bed at eleven.', phrase: 'go to bed' },
  { frame: '{S} came ___ by bus.', phrase: 'by bus' },
  { frame: 'We travelled ___ by train.', phrase: 'by train' },
  { frame: '{S} is at ___ work now.', phrase: 'at work' },
  { frame: 'The children go to ___ school by bus.', phrase: 'go to school' },
  { frame: 'I cannot sleep at ___ night.', phrase: 'at night' },
  { frame: '{S} goes to ___ church on Sundays.', phrase: 'go to church' },
  { frame: 'They are on ___ holiday.', phrase: 'on holiday' },
  { frame: 'We watched ___ TV all evening.', phrase: 'watch TV' },
  { frame: 'See you at ___ noon.', phrase: 'at noon' },
  { frame: 'They travel ___ by car.', phrase: 'by car' },
  { frame: 'We went there ___ on foot.', phrase: 'on foot' },
  { frame: '{S} is in ___ hospital after the accident.', phrase: 'in hospital' },
  { frame: 'The shop closes at ___ midnight.', phrase: 'at midnight' },
  { frame: '{S} has ___ breakfast at eight.', phrase: 'have breakfast' },
  { frame: 'We stayed at ___ home all weekend.', phrase: 'at home' },
];

// Extra nouns pulled from the shared lexicon by semantic tag. Only concrete classes that go with
// generic verbs (saw, bought, found...) are used, so verb + noun combinations stay sensible.
import { LEXICON } from './lexicon';
import { pluralize } from './plural';
import { VOWEL_SOUND_WORDS, CONSONANT_SOUND_PREFIX } from './sound';

const LEX_NOUN_CATS: Cat[] = ['food', 'clothes', 'tech'];

function soundOverride(word: string): boolean | undefined {
  const w = word.toLowerCase().split(' ')[0];
  if (VOWEL_SOUND_WORDS.has(w)) return true;
  if (CONSONANT_SOUND_PREFIX.test(w)) return false;
  return undefined;
}

const curatedNouns = new Set(NOUNS.map((n) => n.w));
for (const e of LEXICON) {
  if (e.pos !== 'n' || e.tags.includes('unc') || e.tags.includes('pl')) continue;
  const cats = e.tags.filter((t): t is Cat => (LEX_NOUN_CATS as string[]).includes(t));
  const w = e.en[0];
  if (!cats.length || curatedNouns.has(w) || /[A-Z]/.test(w) || w.split(' ').length > 2) continue;
  curatedNouns.add(w);
  NOUNS.push({ w, pl: pluralize(w), cats, an: soundOverride(w), lex: true });
}
