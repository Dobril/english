import { useCallback, useEffect, useMemo, useState } from 'react';
import { VOCAB, VOCAB_CATEGORIES, type VocabWord } from '../data/vocabulary';
import { useStored } from '../hooks/useStored';
import { useKeys } from '../hooks/useKeys';
import { pick, weightedPick } from '../lib/random';
import { Hint, Kbd, RulesCard, Select, Settings, SpeakButton } from '../components/ui';
import { ThumbsDown } from 'lucide-react';

type Dir = 'en-bg' | 'bg-en';

// Flashcard: the box shows one side, a tap flips it. No scoring, just recall practice.
export default function Vocabulary() {
  const [dir, setDir] = useStored<Dir>('vocab.dir', 'en-bg');
  const [cat, setCat] = useStored<string>('vocab.cat', 'all');

  const pool = useMemo(() => {
    const p = VOCAB.filter((w) => cat === 'all' || w.cat === cat);
    return p.length ? p : VOCAB;
  }, [cat]);

  const [recent, setRecent] = useState<string[]>([]);
  const [word, setWord] = useState<VocabWord>(() => pick(pool));
  const [flipped, setFlipped] = useState(false);
  // Words marked as unknown in this session (not persisted). onlyUnknown cycles just those.
  const [unknown, setUnknown] = useState<Set<string>>(() => new Set());
  const [onlyUnknown, setOnlyUnknown] = useState(false);

  const next = useCallback(() => {
    const unknownWords = VOCAB.filter((w) => unknown.has(w.key));
    const source = onlyUnknown && unknownWords.length ? unknownWords : pool;
    // unknown words come up about five times more often; avoid repeats within the last 30
    const choose = () => weightedPick(source, (w) => (unknown.has(w.key) ? 5 : 1));
    let w = choose();
    for (let i = 0; i < 20 && recent.includes(w.key) && source.length > 3; i++) w = choose();
    setRecent((r) => [...r.slice(-29), w.key]);
    setWord(w);
    setFlipped(false);
  }, [pool, recent, unknown, onlyUnknown]);

  const markUnknown = useCallback(() => {
    setUnknown((u) => new Set(u).add(word.key));
  }, [word.key]);
  const isUnknown = unknown.has(word.key);

  useEffect(() => {
    if (!onlyUnknown && !pool.some((w) => w.key === word.key)) next();
  }, [pool, word.key, next, onlyUnknown]);

  useEffect(() => setFlipped(false), [dir]);

  // First tap shows the other side, the next tap brings a new word.
  const tapCard = useCallback(() => {
    if (flipped) next();
    else setFlipped(true);
  }, [flipped, next]);

  useKeys(useMemo(() => ({ enter: tapCard }), [tapCard]));

  const showEnglish = (dir === 'en-bg') !== flipped;
  const text = showEnglish ? word.en.join(' / ') : word.bg.join(' / ');

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <button
            type="button"
            onClick={() => setOnlyUnknown((v) => !v)}
            disabled={unknown.size === 0}
            className={`pill tap ${onlyUnknown ? 'bg-accent-soft text-text' : 'bg-red-soft text-red'} disabled:opacity-50`}
            title="Върти само непознатите думи"
          >
            Непознати <b>{unknown.size}</b>
          </button>
          {onlyUnknown && (
            <button type="button" onClick={() => setOnlyUnknown(false)} className="tap text-accent underline underline-offset-4">
              всички думи
            </button>
          )}
          {unknown.size > 0 && (
            <button
              type="button"
              onClick={() => {
                setUnknown(new Set());
                setOnlyUnknown(false);
              }}
              className="tap text-muted underline underline-offset-4 hover:text-text"
            >
              нулирай непознатите
            </button>
          )}
        </div>
        <div>
          <Settings inline>
            <Select<Dir>
              label="Посока"
              value={dir}
              onChange={setDir}
              options={[
                { value: 'en-bg', label: 'EN → BG' },
                { value: 'bg-en', label: 'BG → EN' },
              ]}
            />
            <Select<string> label="Категория" value={cat} onChange={setCat} options={[{ value: 'all', label: 'всички' }, ...VOCAB_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))]} />
          </Settings>
        </div>

        <button
          type="button"
          onClick={tapCard}
          className="tap flex min-h-44 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card2 p-5 text-center sm:min-h-52 sm:p-8"
        >
          <span className="text-[0.66rem] font-bold uppercase tracking-wider text-muted sm:text-[0.72rem]">{showEnglish ? 'English' : 'Български'}</span>
          <span className={showEnglish ? 'font-sans text-[32px] font-extrabold leading-tight sm:text-5xl' : 'font-serif text-[30px] font-semibold leading-tight sm:text-5xl'}>{text}</span>
          <span className="mt-1 text-xs text-muted">{flipped ? 'натисни за следваща дума' : 'натисни за превода'}</span>
        </button>

        <div className="flex items-center justify-center gap-3">
          <SpeakButton text={word.en[0]} size="lg" label="Произнеси английската дума" />
          <button
            type="button"
            onClick={markUnknown}
            disabled={isUnknown}
            className="tap inline-flex min-h-12 items-center gap-2 rounded-xl border border-red-border bg-red-soft px-4 font-semibold text-red disabled:cursor-default disabled:opacity-45"
          >
            <ThumbsDown size={18} /> {isUnknown ? 'Отбелязана' : 'Не я знам'}
          </button>
        </div>

        <Hint>
          <Kbd>Enter</Kbd> обръща картата, втори <Kbd>Enter</Kbd> дава следваща дума. Непознатите думи се падат по-често; с „Непознати“ въртиш само тях.
        </Hint>
      </section>

      <RulesCard
        title="Как да учиш думи"
        items={[
          { head: 'Кратко и често', body: 'по 5 минути няколко пъти на ден работи по-добре от един час веднъж седмично.' },
          { head: 'Първо се сети', body: 'кажи си превода наум и чак тогава обърни картата. Усилието да си спомниш е това, което запомня.' },
          { head: 'И в двете посоки', body: 'EN → BG тренира разбиране, BG → EN тренира активен речник. Редувай ги.' },
          { head: 'На глас', body: 'натисни говорителя, чуй думата и я повтори. Връзката звук + значение се помни по-дълго от само четене.' },
        ]}
      />
    </div>
  );
}
