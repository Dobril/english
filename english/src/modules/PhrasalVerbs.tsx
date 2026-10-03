import { useCallback, useMemo, useRef, useState } from 'react';
import { PHRASAL_VERBS, type PhrasalVerb } from '../data/phrasalVerbs';
import { particleOptions } from '../generators/phrasal';
import { useSession } from '../hooks/useSession';
import { useStored } from '../hooks/useStored';
import { blurOnTouch, useAutoFocus, useKeys } from '../hooks/useKeys';
import { pickWeighted, record } from '../lib/progress';
import { normalize } from '../lib/matching';
import { ActionBar, Check, Feedback, Kbd, Label, RulesCard, Select, Sentence, Settings, SpeakButton, SpeakWord, StatsBar, type Piece } from '../components/ui';

const MODULE = 'phrasal';
type Mode = 'buttons' | 'typing';

export default function PhrasalVerbs() {
  const { stats, mark, reset } = useSession();
  const [mode, setMode] = useStored<Mode>('phrasal.mode', 'buttons');
  const [prioritize, setPrioritize] = useStored('phrasal.prioritize', true);

  const [pv, setPv] = useState<PhrasalVerb>(() => pickWeighted(MODULE, PHRASAL_VERBS, (x) => x.key, prioritize));
  const [options, setOptions] = useState<string[]>(() => particleOptions(pv));
  const [picked, setPicked] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  useAutoFocus(ref, [pv, mode]);

  const next = useCallback(() => {
    const n = pickWeighted(MODULE, PHRASAL_VERBS, (x) => x.key, prioritize);
    setPv(n);
    setOptions(particleOptions(n));
    setPicked(null);
    setInput('');
    setResult(null);
  }, [prioritize, mode]);

  const finish = useCallback(
    (answer: string) => {
      const ok = normalize(answer) === normalize(pv.particle);
      setResult(ok);
      mark(ok);
      record(MODULE, pv.key, ok);
    },
    [pv, mark],
  );

  const choose = useCallback(
    (p: string) => {
      if (result !== null) return;
      setPicked(p);
      finish(p);
    },
    [result, finish],
  );

  const check = useCallback(() => {
    if (result !== null) return;
    blurOnTouch();
    // An empty answer counts as a mistake and reveals the particle.
    finish(input.trim() ? input : '\u0000');
  }, [result, input, finish]);

  useKeys(
    useMemo(
      () => ({
        enter: () => (result === null ? (mode === 'typing' ? check() : undefined) : next()),
        digit: (n: number) => {
          if (mode === 'buttons' && n <= options.length) choose(options[n - 1]);
        },
      }),
      [result, mode, check, next, options, choose],
    ),
  );

  const [before, after] = pv.example.split('___');
  const pieces: Piece[] = [before, { blank: 0, text: result === null ? undefined : pv.particle, state: result === null ? 'active' : result ? 'ok' : 'bad' }, after];
  const full = `${pv.verb} ${pv.particle}`;

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} />
        <Settings inline>
          <Select<Mode>
            label="Отговор"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'buttons', label: 'с бутони' },
              { value: 'typing', label: 'с писане' },
            ]}
          />
          <Check checked={prioritize} onChange={setPrioritize}>
            приоритет на грешните
          </Check>
        </Settings>

        <Sentence pieces={pieces} />

        {mode === 'buttons' ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {options.map((o, i) => {
              let cls = '';
              if (result !== null) {
                if (o === pv.particle) cls = 'ok';
                else if (o === picked) cls = 'bad';
                else cls = 'dim';
              }
              return (
                <button key={o} type="button" disabled={result !== null} onClick={() => choose(o)} className={`choice tap relative min-h-14 text-lg sm:min-h-20 sm:text-xl ${cls}`}>
                  {o}
                  <span className="absolute right-2 top-1 hidden text-xs font-normal text-muted fine:block">{i + 1}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <Label>Частицата (up, off, after...)</Label>
            <input
              ref={ref}
              className={`input ${result === true ? 'ok' : result === false ? 'bad' : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              readOnly={result !== null}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="done"
            />
          </div>
        )}

        {result !== null && (
          <div className="order-last flex flex-col gap-4 md:order-none">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card2 p-3 sm:p-4">
              <SpeakWord text={full} className="tap px-1 font-mono text-xl font-semibold sm:text-2xl" />
              <SpeakButton text={full} size="sm" />
              <span className="font-serif text-lg italic text-muted sm:text-xl">{pv.bg}</span>
              <div className="ml-auto flex items-center gap-2 text-sm text-muted">
                цялото изречение <SpeakButton text={pv.example.replace('___', pv.particle)} size="sm" label="Прочети изречението" />
              </div>
            </div>
            <Feedback ok={result}>
              <b>{full}</b> = {pv.bg}.{!result && <> Правилната частица е <span className="font-mono">{pv.particle}</span>.</>}
            </Feedback>
          </div>
        )}

        <ActionBar
          primary={result === null ? (mode === 'typing' ? 'Провери' : 'Пропусни') : 'Следващ'}
          onPrimary={result === null ? (mode === 'typing' ? check : next) : next}
          secondary={mode === 'typing' ? 'Пропусни' : undefined}
          onSecondary={mode === 'typing' ? next : undefined}
          hint={
            mode === 'buttons' ? (
              <>
                Клавиши <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd> <Kbd>4</Kbd> избират, <Kbd>Enter</Kbd> продължава.
              </>
            ) : (
              <>
                <Kbd>Enter</Kbd> проверява, после минава нататък.
              </>
            )
          }
        />
      </section>

      <RulesCard
        title="Фразовите глаголи накратко"
        items={[
          { head: 'Какво са', body: 'глагол + частица (up, off, on, out...), които заедно имат ново значение: give up = отказвам се, а не „давам нагоре“.' },
          { head: 'Разделяеми', body: 'при много от тях обектът може да е между глагола и частицата: turn the light on / turn on the light. С местоимение винаги по средата: turn it on.' },
          { head: 'Неразделяеми', body: 'с look after, look for, get over, run into обектът е винаги след частицата: look after the kids, not look the kids after.' },
          { head: 'Как се учат', body: 'най-добре в цели изречения и по глагол: get up, get on, get off, get over. Частицата често носи посока: up = нагоре / докрай, off = изключване / тръгване, out = навън / докрай.' },
        ]}
      />
    </div>
  );
}
