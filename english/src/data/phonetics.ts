export interface PhonExample {
  word: string;
  ipa: string;
  bg: string;
}

export interface Phoneme {
  symbol: string;
  bg: string;
  mouth: string;
  examples: PhonExample[];
}

export interface PhonGroup {
  id: string;
  label: string;
  intro: string;
  items: Phoneme[];
}

export const PHONETICS: PhonGroup[] = [
  {
    id: 'vowels',
    label: 'Гласни',
    intro: 'Дължината има значение: ship /ɪ/ и sheep /iː/ са различни думи. Двоеточието (ː) означава дълъг звук.',
    items: [
      { symbol: 'iː', bg: 'дълго „ии“, като в „рии-ба“ с усмивка', mouth: 'устните разтегнати, езикът високо и напред', examples: [{ word: 'sheep', ipa: 'ʃiːp', bg: 'шийп' }, { word: 'see', ipa: 'siː', bg: 'сий' }, { word: 'green', ipa: 'ɡriːn', bg: 'грийн' }] },
      { symbol: 'ɪ', bg: 'кратко „и“, малко към „е“; по-отпуснато от българското „и“', mouth: 'устните леко отворени, езикът малко по-ниско и назад от /iː/', examples: [{ word: 'ship', ipa: 'ʃɪp', bg: 'шип' }, { word: 'sit', ipa: 'sɪt', bg: 'сит' }, { word: 'big', ipa: 'bɪɡ', bg: 'биг' }] },
      { symbol: 'e', bg: 'като българското „е“ в „пет“', mouth: 'устата полуотворена, езикът напред', examples: [{ word: 'bed', ipa: 'bed', bg: 'бед' }, { word: 'ten', ipa: 'ten', bg: 'тен' }, { word: 'red', ipa: 'red', bg: 'ред' }] },
      { symbol: 'æ', bg: 'между „а“ и „е“: широко отворено „е“ ', mouth: 'устата широко отворена, езикът напред и ниско, ъглите на устата встрани', examples: [{ word: 'cat', ipa: 'kæt', bg: 'кæт (между кат и кет)' }, { word: 'man', ipa: 'mæn', bg: 'мæн' }, { word: 'apple', ipa: 'ˈæpl', bg: 'æпъл' }] },
      { symbol: 'ɑː', bg: 'дълго дълбоко „аа“, като при лекар: „ааа“', mouth: 'устата широко отворена, езикът ниско и назад', examples: [{ word: 'car', ipa: 'kɑː', bg: 'каа' }, { word: 'father', ipa: 'ˈfɑːðə', bg: 'фаадъ' }, { word: 'park', ipa: 'pɑːk', bg: 'паак' }] },
      { symbol: 'ɒ', bg: 'кратко „о“, по-отворено от българското, почти „а“ с окръглени устни', mouth: 'устните леко окръглени, езикът назад и ниско', examples: [{ word: 'hot', ipa: 'hɒt', bg: 'хот' }, { word: 'dog', ipa: 'dɒɡ', bg: 'дог' }, { word: 'stop', ipa: 'stɒp', bg: 'стоп' }] },
      { symbol: 'ɔː', bg: 'дълго „оо“, като в „мооре“ с окръглени устни', mouth: 'устните окръглени, езикът назад, средна височина', examples: [{ word: 'door', ipa: 'dɔː', bg: 'доо' }, { word: 'talk', ipa: 'tɔːk', bg: 'тоок' }, { word: 'four', ipa: 'fɔː', bg: 'фоо' }] },
      { symbol: 'ʊ', bg: 'кратко „у“, по-отпуснато, между „у“ и „о“', mouth: 'устните леко окръглени, езикът назад, но не толкова високо', examples: [{ word: 'book', ipa: 'bʊk', bg: 'бук' }, { word: 'put', ipa: 'pʊt', bg: 'пут' }, { word: 'good', ipa: 'ɡʊd', bg: 'гуд' }] },
      { symbol: 'uː', bg: 'дълго „уу“, като в „кууче“', mouth: 'устните силно окръглени и издадени напред, езикът назад и високо', examples: [{ word: 'food', ipa: 'fuːd', bg: 'фууд' }, { word: 'blue', ipa: 'bluː', bg: 'блуу' }, { word: 'school', ipa: 'skuːl', bg: 'скуул' }] },
      { symbol: 'ʌ', bg: 'кратко „а“, като в „кът“ но по-отворено; почти българското „ъ“ под ударение', mouth: 'устата полуотворена, езикът в средата, отпуснат', examples: [{ word: 'cup', ipa: 'kʌp', bg: 'къп' }, { word: 'sun', ipa: 'sʌn', bg: 'сън' }, { word: 'love', ipa: 'lʌv', bg: 'лъв' }] },
      { symbol: 'ɜː', bg: 'дълго „ъъ“, като в „вълк“ но проточено, без „р“', mouth: 'устните неутрални, езикът в средата, не се движи', examples: [{ word: 'bird', ipa: 'bɜːd', bg: 'бъъд' }, { word: 'work', ipa: 'wɜːk', bg: 'уъък' }, { word: 'girl', ipa: 'ɡɜːl', bg: 'гъъл' }] },
      { symbol: 'ə', bg: 'кратко неударено „ъ“ (schwa): най-честият звук в английския', mouth: 'всичко отпуснато, устата леко отворена, много кратко', examples: [{ word: 'about', ipa: 'əˈbaʊt', bg: 'ъбаут' }, { word: 'teacher', ipa: 'ˈtiːtʃə', bg: 'тийчъ' }, { word: 'banana', ipa: 'bəˈnɑːnə', bg: 'бънаанъ' }] },
    ],
  },
  {
    id: 'diphthongs',
    label: 'Дифтонги',
    intro: 'Два гласни звука, слети в една сричка. Започват от първия и плавно се плъзгат към втория, който е по-слаб.',
    items: [
      { symbol: 'eɪ', bg: '„ей“, като в „сейф“', mouth: 'от „е“ към леко „и“', examples: [{ word: 'day', ipa: 'deɪ', bg: 'дей' }, { word: 'make', ipa: 'meɪk', bg: 'мейк' }, { word: 'rain', ipa: 'reɪn', bg: 'рейн' }] },
      { symbol: 'aɪ', bg: '„ай“, като в „чай“', mouth: 'от отворено „а“ към леко „и“', examples: [{ word: 'time', ipa: 'taɪm', bg: 'тайм' }, { word: 'my', ipa: 'maɪ', bg: 'май' }, { word: 'night', ipa: 'naɪt', bg: 'найт' }] },
      { symbol: 'ɔɪ', bg: '„ой“, като в „бой“', mouth: 'от окръглено „о“ към „и“', examples: [{ word: 'boy', ipa: 'bɔɪ', bg: 'бой' }, { word: 'coin', ipa: 'kɔɪn', bg: 'койн' }, { word: 'enjoy', ipa: 'ɪnˈdʒɔɪ', bg: 'инджой' }] },
      { symbol: 'aʊ', bg: '„ау“, като в „пауза“', mouth: 'от отворено „а“ към окръглено „у“', examples: [{ word: 'now', ipa: 'naʊ', bg: 'нау' }, { word: 'house', ipa: 'haʊs', bg: 'хаус' }, { word: 'town', ipa: 'taʊn', bg: 'таун' }] },
      { symbol: 'əʊ', bg: '„ъу“ (британско) / „оу“ (американско)', mouth: 'от отпуснато „ъ“ към окръглено „у“', examples: [{ word: 'go', ipa: 'ɡəʊ', bg: 'гъу / гоу' }, { word: 'home', ipa: 'həʊm', bg: 'хъум' }, { word: 'no', ipa: 'nəʊ', bg: 'нъу' }] },
      { symbol: 'ɪə', bg: '„иъ“, като в „пиеса“ но с „ъ“', mouth: 'от „и“ към отпуснато „ъ“', examples: [{ word: 'here', ipa: 'hɪə', bg: 'хиъ' }, { word: 'near', ipa: 'nɪə', bg: 'ниъ' }, { word: 'idea', ipa: 'aɪˈdɪə', bg: 'айдиъ' }] },
      { symbol: 'eə', bg: '„еъ“', mouth: 'от отворено „е“ към отпуснато „ъ“', examples: [{ word: 'hair', ipa: 'heə', bg: 'хеъ' }, { word: 'there', ipa: 'ðeə', bg: 'ðеъ' }, { word: 'care', ipa: 'keə', bg: 'кеъ' }] },
      { symbol: 'ʊə', bg: '„уъ“', mouth: 'от „у“ към отпуснато „ъ“', examples: [{ word: 'tour', ipa: 'tʊə', bg: 'туъ' }, { word: 'pure', ipa: 'pjʊə', bg: 'пюъ' }, { word: 'sure', ipa: 'ʃʊə', bg: 'шуъ' }] },
    ],
  },
  {
    id: 'consonants',
    label: 'Съгласни',
    intro: 'Повечето съвпадат с българските. Внимавай с /θ ð w ŋ r h/, които нямат точен български аналог, и с придиханието при /p t k/ в началото на дума.',
    items: [
      { symbol: 'θ', bg: 'беззвучно „т/с“ с език между зъбите (няма го в български)', mouth: 'върхът на езика леко между зъбите, въздухът минава без глас', examples: [{ word: 'think', ipa: 'θɪŋk', bg: 'θинк (с език между зъбите)' }, { word: 'three', ipa: 'θriː', bg: 'θрий' }, { word: 'bath', ipa: 'bɑːθ', bg: 'бааθ' }] },
      { symbol: 'ð', bg: 'между „д“ и „з“, с език между зъбите, звучно', mouth: 'върхът на езика между зъбите, гласните струни вибрират', examples: [{ word: 'this', ipa: 'ðɪs', bg: 'ðис' }, { word: 'mother', ipa: 'ˈmʌðə', bg: 'мъðъ' }, { word: 'the', ipa: 'ðə', bg: 'ðъ' }] },
      { symbol: 'w', bg: 'кратко „у“, което веднага преминава в следващата гласна; не е „в“', mouth: 'устните окръглени и издадени напред като за „у“, зъбите не докосват устната', examples: [{ word: 'water', ipa: 'ˈwɔːtə', bg: 'уоотъ' }, { word: 'we', ipa: 'wiː', bg: 'уий' }, { word: 'window', ipa: 'ˈwɪndəʊ', bg: 'уиндъу' }] },
      { symbol: 'v', bg: 'като българското „в“', mouth: 'горните зъби докосват долната устна, звучно', examples: [{ word: 'very', ipa: 'ˈveri', bg: 'вери' }, { word: 'love', ipa: 'lʌv', bg: 'лъв' }, { word: 'village', ipa: 'ˈvɪlɪdʒ', bg: 'вилидж' }] },
      { symbol: 'ŋ', bg: 'носово „н“, като в „банка“ (н-то преди к), без да се чува „г“ след него', mouth: 'задната част на езика опира в мекото небце, въздухът излиза през носа', examples: [{ word: 'sing', ipa: 'sɪŋ', bg: 'син(г)' }, { word: 'long', ipa: 'lɒŋ', bg: 'лон(г)' }, { word: 'morning', ipa: 'ˈmɔːnɪŋ', bg: 'моонин(г)' }] },
      { symbol: 'r', bg: 'меко „р“ без вибрация на езика; езикът не докосва небцето', mouth: 'върхът на езика се извива леко назад, без да докосва нищо; устните леко окръглени', examples: [{ word: 'red', ipa: 'red', bg: 'ред (меко р)' }, { word: 'sorry', ipa: 'ˈsɒri', bg: 'сори' }, { word: 'right', ipa: 'raɪt', bg: 'райт' }] },
      { symbol: 'h', bg: 'леко издишване, много по-слабо от българското „х“', mouth: 'гърлото отворено, само въздух, без триене', examples: [{ word: 'hello', ipa: 'heˈləʊ', bg: 'хелъу (леко х)' }, { word: 'house', ipa: 'haʊs', bg: 'хаус' }, { word: 'happy', ipa: 'ˈhæpi', bg: 'хæпи' }] },
      { symbol: 'ʃ', bg: 'като „ш“', mouth: 'устните леко издадени напред', examples: [{ word: 'she', ipa: 'ʃiː', bg: 'шии' }, { word: 'shop', ipa: 'ʃɒp', bg: 'шоп' }, { word: 'fish', ipa: 'fɪʃ', bg: 'фиш' }] },
      { symbol: 'ʒ', bg: 'като „ж“', mouth: 'както /ʃ/, но звучно', examples: [{ word: 'television', ipa: 'ˈtelɪvɪʒn', bg: 'теливижън' }, { word: 'usually', ipa: 'ˈjuːʒuəli', bg: 'юужуъли' }, { word: 'measure', ipa: 'ˈmeʒə', bg: 'межъ' }] },
      { symbol: 'tʃ', bg: 'като „ч“', mouth: 'езикът опира зад горните зъби, после се отпуска с триене', examples: [{ word: 'chair', ipa: 'tʃeə', bg: 'чеъ' }, { word: 'teacher', ipa: 'ˈtiːtʃə', bg: 'тийчъ' }, { word: 'watch', ipa: 'wɒtʃ', bg: 'уоч' }] },
      { symbol: 'dʒ', bg: 'като „дж“', mouth: 'както /tʃ/, но звучно', examples: [{ word: 'job', ipa: 'dʒɒb', bg: 'джоб' }, { word: 'juice', ipa: 'dʒuːs', bg: 'джуус' }, { word: 'bridge', ipa: 'brɪdʒ', bg: 'бридж' }] },
      { symbol: 'j', bg: 'като „й“', mouth: 'езикът високо и напред, както за „и“', examples: [{ word: 'yes', ipa: 'jes', bg: 'йес' }, { word: 'yellow', ipa: 'ˈjeləʊ', bg: 'йелъу' }, { word: 'year', ipa: 'jɪə', bg: 'йиъ' }] },
      { symbol: 'p', bg: '„п“, но в началото на дума с придихание (лек „х“ след него): „пхен“', mouth: 'устните се затварят и се отварят с изблик на въздух', examples: [{ word: 'pen', ipa: 'pen', bg: 'п(х)ен' }, { word: 'paper', ipa: 'ˈpeɪpə', bg: 'пейпъ' }, { word: 'stop', ipa: 'stɒp', bg: 'стоп' }] },
      { symbol: 't', bg: '„т“ с придихание в началото на дума; езикът е на венците, не на зъбите', mouth: 'върхът на езика опира на венците зад горните зъби', examples: [{ word: 'time', ipa: 'taɪm', bg: 'т(х)айм' }, { word: 'table', ipa: 'ˈteɪbl', bg: 'тейбъл' }, { word: 'water', ipa: 'ˈwɔːtə', bg: 'уоотъ' }] },
      { symbol: 'k', bg: '„к“ с придихание в началото на дума', mouth: 'задната част на езика опира в небцето', examples: [{ word: 'cat', ipa: 'kæt', bg: 'к(х)æт' }, { word: 'key', ipa: 'kiː', bg: 'кий' }, { word: 'book', ipa: 'bʊk', bg: 'бук' }] },
      { symbol: 'l', bg: '„л“; в края на дума е „тъмно“, като българското „л“ в „стол“', mouth: 'върхът на езика на венците; в края на дума задната част на езика се вдига', examples: [{ word: 'light', ipa: 'laɪt', bg: 'лайт' }, { word: 'milk', ipa: 'mɪlk', bg: 'милк' }, { word: 'ball', ipa: 'bɔːl', bg: 'боол' }] },
      { symbol: 'z', bg: 'като „з“; окончанието -s след звучен звук се чете „з“ (dogs = догз)', mouth: 'както „с“, но звучно', examples: [{ word: 'zoo', ipa: 'zuː', bg: 'зуу' }, { word: 'dogs', ipa: 'dɒɡz', bg: 'догз' }, { word: 'is', ipa: 'ɪz', bg: 'из' }] },
    ],
  },
];
