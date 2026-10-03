const IRREGULAR: Record<string, string> = {
  man: 'men', woman: 'women', child: 'children', tooth: 'teeth', foot: 'feet', mouse: 'mice', person: 'people', sheep: 'sheep', fish: 'fish', deer: 'deer',
  goose: 'geese', ox: 'oxen', leaf: 'leaves', knife: 'knives', wolf: 'wolves', shelf: 'shelves', half: 'halves', life: 'lives', wife: 'wives', loaf: 'loaves',
  thief: 'thieves', calf: 'calves', scarf: 'scarves', potato: 'potatoes', tomato: 'tomatoes', hero: 'heroes', echo: 'echoes', roof: 'roofs', chef: 'chefs',
  photo: 'photos', piano: 'pianos', radio: 'radios', video: 'videos', kilo: 'kilos', zoo: 'zoos', series: 'series', species: 'species', crisis: 'crises',
  cactus: 'cacti', policeman: 'policemen', fireman: 'firemen', businessman: 'businessmen', grandchild: 'grandchildren', 'mother-in-law': 'mothers-in-law',
  'father-in-law': 'fathers-in-law', passer_by: 'passers-by', 'passer-by': 'passers-by', louse: 'lice', bus: 'buses', gas: 'gases', quiz: 'quizzes',
};

export function pluralize(word: string): string {
  const w = word.trim();
  if (IRREGULAR[w]) return IRREGULAR[w];
  const parts = w.split(' ');
  if (parts.length > 1) return parts.slice(0, -1).join(' ') + ' ' + pluralize(parts[parts.length - 1]);
  if (/(s|x|z|ch|sh)$/.test(w)) return w + 'es';
  if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + 'ies';
  return w + 's';
}
