export interface Link {
  title: string
  url: string
  note: string
}

export const newsletters: Link[] = [
  { title: 'Latent Space', url: 'https://www.latent.space/', note: 'За AI инженери, newsletter и podcast.' },
  { title: 'Interconnects (Nathan Lambert)', url: 'https://www.interconnects.ai/', note: 'Отворени модели и post-training.' },
  { title: 'Ahead of AI (Sebastian Raschka)', url: 'https://magazine.sebastianraschka.com/', note: 'Research, обяснен за инженери.' },
  { title: 'Simon Willison', url: 'https://simonwillison.net/', note: 'Практични бележки, почти всеки ден.' },
  { title: 'Hamel Husain', url: 'https://hamel.dev/', note: 'Evals и как се строят AI продукти.' },
  { title: 'Eugene Yan', url: 'https://eugeneyan.com/', note: 'Системи и patterns.' },
  { title: 'The Batch (DeepLearning.AI)', url: 'https://www.deeplearning.ai/the-batch/', note: 'Общ седмичен обзор.' },
]

export const sources: Link[] = [
  { title: 'Anthropic Engineering blog', url: 'https://www.anthropic.com/engineering', note: 'Agents, context engineering, tools. Първоизточник.' },
  { title: 'docs.claude.com', url: 'https://docs.claude.com/', note: 'Документацията на Claude API и Claude Code.' },
  { title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/', note: 'Примери за всяка функция на API-то.' },
  { title: 'Hugging Face blog', url: 'https://huggingface.co/blog', note: 'Отворени модели, fine-tuning, нови библиотеки.' },
  { title: 'Hugging Face Daily Papers', url: 'https://huggingface.co/papers', note: 'Кои papers се обсъждат тази седмица.' },
  { title: 'Dwarkesh Podcast', url: 'https://www.dwarkesh.com/', note: 'Дълги интервюта с хората, които строят моделите.' },
]

export const dietRules: string[] = [
  'Един нов инструмент на месец, най-много. Първо едночасов spike, после решение.',
  'Нов модел не значи ново учене. Пускаш eval suite-а си срещу него и гледаш числата.',
  'Ако статия не променя нещо, което правиш, не ти трябва бележка за нея.',
  'Всеки три месеца се връщаш към тази карта и отбелязваш какво се е променило.',
  'Около два часа седмично. Повече от това е прокрастинация, преоблечена като учене.',
]
