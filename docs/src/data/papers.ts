import type { Paper } from './types'

export const papers: Paper[] = [
  { title: 'Attention Is All You Need', year: 2017, url: 'https://arxiv.org/abs/1706.03762', why: 'Архитектурата Transformer. Чети след фаза 1.' },
  { title: 'Language Models are Few-Shot Learners (GPT-3)', year: 2020, url: 'https://arxiv.org/abs/2005.14165', why: 'In-context learning: защо примерите в prompt-а работят.' },
  { title: 'Scaling Laws for Neural Language Models', year: 2020, url: 'https://arxiv.org/abs/2001.08361', why: 'Защо по-голям модел и повече данни дават предвидимо по-добър резултат.' },
  { title: 'Retrieval-Augmented Generation', year: 2020, url: 'https://arxiv.org/abs/2005.11401', why: 'Оригиналният RAG. Кратък и ясен.' },
  { title: 'LoRA: Low-Rank Adaptation', year: 2021, url: 'https://arxiv.org/abs/2106.09685', why: 'Как се fine-tune-ва модел, без да пипаш всичките му тегла.' },
  { title: 'Training language models to follow instructions (InstructGPT)', year: 2022, url: 'https://arxiv.org/abs/2203.02155', why: 'RLHF: как base моделът става асистент.' },
  { title: 'Chain-of-Thought Prompting', year: 2022, url: 'https://arxiv.org/abs/2201.11903', why: 'Защо "мисли стъпка по стъпка" работи.' },
  { title: 'ReAct: Reasoning and Acting', year: 2022, url: 'https://arxiv.org/abs/2210.03629', why: 'Коренът на всички агенти.' },
  { title: 'Constitutional AI', year: 2022, url: 'https://arxiv.org/abs/2212.08073', why: 'Как модел се обучава по принципи вместо само по човешки оценки.' },
  { title: 'Toolformer', year: 2023, url: 'https://arxiv.org/abs/2302.04761', why: 'Модели, които сами се учат да викат инструменти.' },
  { title: 'Direct Preference Optimization', year: 2023, url: 'https://arxiv.org/abs/2305.18290', why: 'По-простата алтернатива на RLHF, която ще ползваш във фаза 7.' },
  { title: 'Lost in the Middle', year: 2023, url: 'https://arxiv.org/abs/2307.03172', why: 'Дългият контекст не е безплатен: моделите губят информацията по средата.' },
  { title: 'DeepSeek-R1', year: 2025, url: 'https://arxiv.org/abs/2501.12948', why: 'Reasoning чрез reinforcement learning с проверими награди.' },
]
