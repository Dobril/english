import { useMemo, useState } from 'react';
import { Search, Shuffle, X } from 'lucide-react';
import { IRREGULAR_VERBS, PATTERN_INFO, type Pattern } from '../data/irregularVerbs';
import { useStored } from '../hooks/useStored';
import { Check, Select, SpeakButton, SpeakWord } from '../components/ui';
import { shuffle } from '../lib/random';

type TypeFilter = 'all' | Pattern;

const SORTED = [...IRREGULAR_VERBS].sort((a, b) => a.base.localeCompare(b.base));

export default function VerbList() {
  const [query, setQuery] = useState('');
  const [type, setType] = useStored<TypeFilter>('verblist.type', 'all');
  const [coreOnly, setCoreOnly] = useStored('verblist.core', false);
  // null = alphabetical; otherwise a shuffled copy made on the last click
  const [order, setOrder] = useState<typeof SORTED | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (order ?? SORTED).filter((v) => {
      if (type !== 'all' && v.pattern !== type) return false;
      if (coreOnly && !v.core) return false;
      if (!q) return true;
      return v.base.startsWith(q) || v.past.some((f) => f.startsWith(q)) || v.participle.some((f) => f.startsWith(q)) || v.bg.toLowerCase().includes(q) || v.base.includes(q);
    });
  }, [query, type, coreOnly, order]);

  return (
    <div className="space-y-6">
      <section className="card space-y-4 p-4 sm:space-y-5 sm:p-7">
        <div className="relative">
          <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="verblist-search"
            className="input pl-12 pr-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Търси: begin, began, започвам..."
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Изчисти" className="tap absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-text">
              <X size={20} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem]">
          <Select<TypeFilter>
            label="Тип"
            value={type}
            onChange={setType}
            options={[
              { value: 'all', label: 'всички' },
              { value: 'AAA', label: 'AAA' },
              { value: 'ABB', label: 'ABB' },
              { value: 'ABC', label: 'ABC' },
              { value: 'ABA', label: 'ABA' },
            ]}
          />
          <Check checked={coreOnly} onChange={setCoreOnly}>
            само основните 60
          </Check>
          <button type="button" onClick={() => setOrder(shuffle(SORTED))} className="tap inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold hover:bg-card2">
            <Shuffle size={16} /> Разбъркай
          </button>
          {order && (
            <button type="button" onClick={() => setOrder(null)} className="tap text-sm text-accent underline underline-offset-4">
              по азбучен ред
            </button>
          )}
          <span className="text-sm text-muted">
            {rows.length} от {IRREGULAR_VERBS.length}
          </span>
        </div>

        {/* Phones: one card per verb with the three forms stacked, each with its own speaker. */}
        <div className="flex flex-col gap-2 md:hidden">
          {rows.map((v) => (
            <div key={v.base} className="rounded-xl border border-border bg-card2 p-3">
              <div className="mb-1 flex items-baseline justify-between gap-2 text-sm text-muted">
                <span>{v.bg}</span>
                <span className="font-mono text-xs">{v.pattern}</span>
              </div>
              <FormRow label="V1" forms={[v.base]} strong />
              <FormRow label="V2" forms={v.past} />
              <FormRow label="V3" forms={v.participle} />
            </div>
          ))}
          {rows.length === 0 && <p className="py-6 text-center text-muted">Няма глагол, който да отговаря на „{query}“.</p>}
        </div>

        {/* Desktop: table. */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                <th className="border-b border-border py-2 pr-2">Base</th>
                <th className="border-b border-border py-2 pr-2">Past Simple</th>
                <th className="border-b border-border py-2 pr-2">Past Participle</th>
                <th className="border-b border-border py-2 pr-2">Превод</th>
                <th className="border-b border-border py-2">Тип</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((v) => (
                <tr key={v.base} className="align-middle hover:bg-card2">
                  <td className="border-b border-border py-2 pr-2">
                    <Forms forms={[v.base]} strong />
                  </td>
                  <td className="border-b border-border py-2 pr-2">
                    <Forms forms={v.past} />
                  </td>
                  <td className="border-b border-border py-2 pr-2">
                    <Forms forms={v.participle} />
                  </td>
                  <td className="border-b border-border py-2 pr-2 text-muted">{v.bg}</td>
                  <td className="border-b border-border py-2">
                    <span className="font-mono text-sm text-muted" title={PATTERN_INFO[v.pattern].label}>
                      {v.pattern}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted">
                    Няма глагол, който да отговаря на „{query}“.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted">Натисни форма, за да я чуеш. AAA: трите форми еднакви; ABB: 2-ра и 3-та еднакви; ABC: различни; ABA: 1-ва и 3-та еднакви.</p>
      </section>
    </div>
  );
}

// Forms with a speaker button each; alternatives (learnt / learned) are separate buttons.
function Forms({ forms, strong = false }: { forms: string[]; strong?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
      {forms.map((f, i) => (
        <span key={f} className="inline-flex items-center gap-1">
          {i > 0 && <span className="px-0.5 text-muted">/</span>}
          <SpeakWord text={f} className={`tap px-1 font-mono text-[1.05rem] ${strong ? 'font-semibold' : ''}`} />
          <SpeakButton text={f} size="sm" />
        </span>
      ))}
    </span>
  );
}

function FormRow({ label, forms, strong = false }: { label: string; forms: string[]; strong?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="w-7 shrink-0 font-mono text-xs text-muted">{label}</span>
      <Forms forms={forms} strong={strong} />
    </div>
  );
}
