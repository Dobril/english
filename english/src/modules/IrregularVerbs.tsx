import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { IRREGULAR_VERBS, PATTERN_INFO, type IrregularVerb, type Pattern } from '../data/irregularVerbs';
import { useSession } from '../hooks/useSession';
import { useStored } from '../hooks/useStored';
import { blurOnTouch, useAutoFocus, useKeys } from '../hooks/useKeys';
import { pickWeighted, record } from '../lib/progress';
import { normalize } from '../lib/matching';
import { ActionBar, Check, Feedback, Hint, Kbd, Label, RulesCard, Select, Settings, SpeakButton, SpeakWord, StatsBar } from '../components/ui';

type TypeFilter = 'all' | Pattern;
type Scope = 'core' | 'all';

const MODULE = 'verbs';

function formOk(input: string, forms: string[]): boolean {
  const n = normalize(input);
  return n !== '' && forms.some((f) => normalize(f) === n);
}

export default function IrregularVerbs() {
  const { stats, mark, reset } = useSession();
  const [type, setType] = useStored<TypeFilter>('verbs.type', 'all');
  const [scope, setScope] = useStored<Scope>('verbs.scope', 'core');
  const [prioritize, setPrioritize] = useStored('verbs.prioritize', true);
  const [showBg, setShowBg] = useStored('verbs.translation', true);

  const pool = useMemo(() => IRREGULAR_VERBS.filter((v) => (scope === 'all' || v.core) && (type === 'all' || v.pattern === type)), [scope, type]);

  const [verb, setVerb] = useState<IrregularVerb>(() => pickWeighted(MODULE, pool, (v) => v.base, prioritize));
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');
  const [checked, setChecked] = useState<null | { v2: boolean | null; v3: boolean | null; ok: boolean }>(null);
  const v2Ref = useRef<HTMLInputElement>(null);
  useAutoFocus(v2Ref, [verb]);

  const next = useCallback(() => {
    setVerb(pickWeighted(MODULE, pool, (v) => v.base, prioritize));
    setV2('');
    setV3('');
    setChecked(null);
  }, [pool, prioritize]);

  useEffect(() => {
    if (!pool.some((v) => v.base === verb.base)) next();
  }, [pool, verb.base, next]);

  const check = useCallback(() => {
    if (checked) return;
    blurOnTouch();
    const has2 = normalize(v2) !== '';
    const has3 = normalize(v3) !== '';
    // Nothing typed means the verb is unknown: show the forms and count a mistake.
    const empty = !has2 && !has3;
    const r2 = empty ? false : has2 ? formOk(v2, verb.past) : null;
    const r3 = empty ? false : has3 ? formOk(v3, verb.participle) : null;
    const ok = !empty && r2 !== false && r3 !== false;
    setChecked({ v2: r2, v3: r3, ok });
    mark(ok);
    record(MODULE, verb.base, ok);
  }, [checked, v2, v3, verb, mark]);

  useKeys(useMemo(() => ({ enter: () => (checked ? next() : check()) }), [checked, next, check]));

  const info = PATTERN_INFO[verb.pattern];
  const cls = (r: boolean | null | undefined) => (r === true ? 'ok' : r === false ? 'bad' : '');

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} />
        <Settings inline>
          <Select<TypeFilter>
            label="Тип"
            value={type}
            onChange={setType}
            options={[
              { value: 'all', label: 'всички' },
              { value: 'AAA', label: 'AAA (cut, cut, cut)' },
              { value: 'ABB', label: 'ABB (buy, bought, bought)' },
              { value: 'ABC', label: 'ABC (begin, began, begun)' },
              { value: 'ABA', label: 'ABA (come, came, come)' },
            ]}
          />
          <Select<Scope>
            label="Обхват"
            value={scope}
            onChange={setScope}
            options={[
              { value: 'core', label: 'основните 60' },
              { value: 'all', label: `всички (${IRREGULAR_VERBS.length})` },
            ]}
          />
          <Check checked={prioritize} onChange={setPrioritize}>
            приоритет на грешните
          </Check>
          <Check checked={showBg} onChange={setShowBg}>
            превод
          </Check>
        </Settings>

        <div className="flex flex-wrap items-center gap-3">
          <SpeakWord text={verb.base} className="tap px-1 font-sans text-[35px] font-extrabold leading-none tracking-tight sm:text-6xl" />
          <SpeakButton text={verb.base} size="md" />
          {showBg && <span className="font-serif text-xl italic text-muted sm:text-2xl">{verb.bg}</span>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Past Simple (2-ра форма)</Label>
            <input
              ref={v2Ref}
              className={`input ${cls(checked?.v2)}`}
              value={v2}
              onChange={(e) => setV2(e.target.value)}
              readOnly={!!checked}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="done"
              inputMode="text"
            />
          </div>
          <div>
            <Label>Past Participle (3-та форма)</Label>
            <input
              className={`input ${cls(checked?.v3)}`}
              value={v3}
              onChange={(e) => setV3(e.target.value)}
              readOnly={!!checked}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="done"
              inputMode="text"
            />
          </div>
        </div>

        {checked && (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="hidden sm:block">
                <ResultCard label="Base" forms={[verb.base]} state={null} />
              </div>
              <ResultCard label="Past Simple" forms={verb.past} state={checked.v2} />
              <ResultCard label="Past Participle" forms={verb.participle} state={checked.v3} />
            </div>
            <div className="order-last md:order-none">
            <Feedback ok={checked.ok}>
              Тип <b>{verb.pattern}</b>: {info.label} ({info.example}).
              {!checked.ok && (
                <>
                  {' '}
                  {normalize(v2) === '' && normalize(v3) === '' ? 'Нищо не беше попълнено, затова се брои за грешка. ' : ''}
                  Правилно: <span className="font-mono">{verb.past.join(' / ')}</span>, <span className="font-mono">{verb.participle.join(' / ')}</span>.
                </>
              )}
            </Feedback>
            </div>
          </>
        )}

        <ActionBar
          primary={checked ? 'Следващ' : 'Провери'}
          onPrimary={checked ? next : check}
          secondary="Друг глагол"
          onSecondary={next}
          hint={
            <>
              <Kbd>Enter</Kbd> проверява, после минава нататък. Достатъчно е да попълниш едно от полетата; празна проверка показва отговора и се брои за грешка.
            </>
          }
        />
        <Hint>Съвет: натисни самата дума, за да я чуеш. Формите с „/“ са равностойни (learnt / learned).</Hint>
      </section>

      <RulesCard
        title="Типовете накратко"
        items={[
          { head: 'AAA', body: 'трите форми са еднакви: cut, cut, cut; put, put, put; cost, cost, cost.' },
          { head: 'ABB', body: 'втората и третата са еднакви: buy, bought, bought; teach, taught, taught. Най-голямата група.' },
          { head: 'ABC', body: 'трите са различни: begin, began, begun; drink, drank, drunk (гласната i → a → u).' },
          { head: 'ABA', body: 'първата и третата са еднакви: come, came, come; run, ran, run; become, became, become.' },
          { head: 'Кога 2-ра форма', body: 'Past Simple: завършено действие в миналото. I saw him yesterday.' },
          { head: 'Кога 3-та форма', body: 'след have / has / had (перфектни времена) и в страдателен залог: I have seen it; it was written.' },
        ]}
      />
    </div>
  );
}

function ResultCard({ label, forms, state }: { label: string; forms: string[]; state: boolean | null }) {
  const bg = state === true ? 'bg-green-soft border-green-border' : state === false ? 'bg-red-soft border-red-border' : 'bg-card2 border-border';
  const color = state === true ? 'text-green' : state === false ? 'text-red' : '';
  const text = forms.join(' / ');
  return (
    <div className={`flex h-full items-center justify-between gap-2 rounded-xl border p-3 sm:p-4 ${bg}`}>
      <div className="min-w-0">
        <div className={`text-[0.72rem] font-bold uppercase tracking-wider ${state === null ? 'text-muted' : color}`}>{label}</div>
        <div className={`mt-1 flex items-center gap-2 font-mono text-xl font-semibold sm:text-2xl ${color}`}>
          {state === true && <CheckIcon size={20} />}
          <SpeakWord text={text} speakText={forms[0]} className="tap px-1" />
        </div>
      </div>
      <SpeakButton text={forms[0]} size="sm" />
    </div>
  );
}
