import { useState } from 'react';
import { PHONETICS } from '../data/phonetics';
import { useStored } from '../hooks/useStored';
import { RulesCard, SpeakButton, SpeakWord } from '../components/ui';

export default function Phonetics() {
  const [group, setGroup] = useStored('phon.group', 'vowels');
  const [open, setOpen] = useState<string | null>(null);
  const g = PHONETICS.find((x) => x.id === group) ?? PHONETICS[0];

  return (
    <div className="space-y-6">
      <section className="card space-y-4 p-4 sm:space-y-5 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {PHONETICS.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setGroup(x.id)}
              className={`tap min-h-10 rounded-full border px-3 text-sm font-semibold sm:min-h-11 sm:px-4 sm:text-base ${x.id === g.id ? 'border-line bg-accent-soft text-text' : 'border-border text-muted hover:text-text'}`}
            >
              {x.label} <span className="font-mono text-xs opacity-70">{x.items.length}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted sm:text-base">{g.intro}</p>

        <div className="grid gap-3 md:grid-cols-2">
          {g.items.map((ph) => {
            const expanded = open === ph.symbol;
            return (
              <div key={ph.symbol} className="rounded-xl border border-border bg-card2 p-3 sm:p-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : ph.symbol)}
                    className="tap flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-card font-mono text-2xl font-semibold sm:h-16 sm:w-16 sm:text-3xl"
                    title="Покажи / скрий положението на устата"
                  >
                    {ph.symbol}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="leading-snug break-words">{ph.bg}</div>
                    <div className={`mt-1 text-sm text-muted ${expanded ? '' : 'hidden md:block'}`}>
                      <b className="text-text">Уста:</b> {ph.mouth}
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      {ph.examples.map((ex) => (
                        <div key={ex.word} className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <SpeakButton text={ex.word} size="sm" />
                          <SpeakWord text={ex.word} className="tap px-1 font-serif text-xl" />
                          <span className="font-mono text-sm text-muted">/{ex.ipa}/</span>
                          <span className="text-sm text-muted">{ex.bg}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <RulesCard
        title="Транскрипцията накратко"
        items={[
          { head: 'ˈ', body: 'ударение: стои преди ударената сричка: /ˈteɪbl/. В английския ударението може да смени значението: REcord (запис) / reCORD (записвам).' },
          { head: 'ː', body: 'дълъг звук. Дължината различава думи: ship /ʃɪp/ и sheep /ʃiːp/, full /fʊl/ и fool /fuːl/.' },
          { head: 'ə (schwa)', body: 'най-честият звук: всяка неударена гласна може да стане „ъ“: about, teacher, banana. Не я произнасяй ясно.' },
          { head: 'Гласните са различни', body: 'английският има около 20 гласни звука, българският 6. Затова не търси точно съвпадение, а слушай и имитирай.' },
          { head: 'Придихание', body: 'p, t, k в началото на ударена сричка се изговарят с лек изблик на въздух: pen, time, cat. Провери, като държиш длан пред устата.' },
          { head: 'Звучни в края', body: 'за разлика от български, звучните съгласни в края не се обеззвучават: bad не е „bat“, dog не е „dok“.' },
        ]}
      />
    </div>
  );
}
