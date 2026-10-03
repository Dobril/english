import { useCallback, useMemo, useState } from 'react';
import { POS_INFO } from '../data/partsOfSpeech';
import { generatePos, type PosItem } from '../generators/partsOfSpeech';
import { useSession } from '../hooks/useSession';
import { record } from '../lib/progress';
import { ActionBar, Kbd, RulesCard, SpeakButton, StatsBar } from '../components/ui';
import { useKeys } from '../hooks/useKeys';

const MODULE = 'pos';
const TARGET = 'noun';

// Find every noun in the sentence. Wrong taps turn red; once all nouns are found the next
// sentence comes by itself.
export default function PartsOfSpeech() {
  const { stats, mark, reset } = useSession();
  const [item, setItem] = useState<PosItem>(() => generatePos([TARGET]));
  const [tapped, setTapped] = useState<number[]>([]);

  const targets = useMemo(() => item.tokens.map((t, i) => (t.pos === TARGET ? i : -1)).filter((i) => i >= 0), [item]);

  const next = useCallback(() => {
    setItem(generatePos([TARGET]));
    setTapped([]);
  }, []);

  const tap = useCallback(
    (i: number) => {
      if (tapped.includes(i)) return;
      const now = [...tapped, i];
      setTapped(now);
      const found = targets.filter((t) => now.includes(t)).length;
      if (found === targets.length) {
        const ok = now.every((x) => item.tokens[x].pos === TARGET);
        mark(ok);
        record(MODULE, TARGET, ok);
        setTimeout(next, 250);
      }
    },
    [tapped, targets, item, mark, next],
  );

  useKeys(useMemo(() => ({ enter: next }), [next]));

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} />

        <p className="text-base sm:text-lg">
          Маркирай всички <b>{POS_INFO.noun.many}</b>. <span className="text-sm text-muted">{POS_INFO.noun.hint}</span>
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {item.tokens.map((t, i) => {
            const wasTapped = tapped.includes(i);
            const cls = wasTapped ? (t.pos === TARGET ? 'ok' : 'bad') : '';
            return (
              <span key={i} className="flex items-end">
                <button type="button" onClick={() => tap(i)} className={`chip tap min-h-11 sm:min-h-12 ${cls}`}>
                  {t.w}
                </button>
                {(t.punct || i === item.tokens.length - 1) && <span className="pb-2 font-serif text-2xl">{t.punct ?? '.'}</span>}
              </span>
            );
          })}
          <SpeakButton text={item.text} size="sm" label="Прочети изречението" />
        </div>

        <ActionBar
          primary="Пропусни"
          onPrimary={next}
          hint={
            <>
              Намери всички съществителни и следващото изречение идва само. <Kbd>Enter</Kbd> пропуска.
            </>
          }
        />
      </section>

      <RulesCard
        title="Съществителното накратко"
        items={[
          { head: 'Какво е', body: 'име на човек, място, предмет, животно или понятие: teacher, park, key, dog, idea.' },
          { head: 'Как се познава', body: 'може да стои след a / an / the или след my, his, this: a key, the park, my sister.' },
          { head: 'Не е съществително', body: 'думата, която описва (old, small), действието (walked, bought) и думите за начин (slowly, often).' },
          { head: 'Капан', body: 'местоименията (she, it, them) заместват съществителни, но не са съществителни.' },
        ]}
      />
    </div>
  );
}
