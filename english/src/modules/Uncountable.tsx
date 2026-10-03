import { useCallback, useMemo, useState } from 'react';
import { UNCOUNTABLE } from '../data/uncountable';
import { generateUnc, shuffledOptions, TASK_LABEL, type UncItem, type UncTask } from '../generators/uncountable';
import { useSession } from '../hooks/useSession';
import { useStored } from '../hooks/useStored';
import { useKeys } from '../hooks/useKeys';
import { pickWeighted, record } from '../lib/progress';
import { ActionBar, Check, Feedback, Kbd, RulesCard, Sentence, Settings, SpeakButton, StatsBar, Tag, type Piece } from '../components/ui';

const MODULE = 'uncountable';
const ALL_TASKS: UncTask[] = ['muchMany', 'isAre', 'aSome', 'mistake'];
// "find the mistake" is opt-in; by default only the choice tasks come up.
const DEFAULT_TASKS: UncTask[] = ['muchMany', 'isAre', 'aSome'];

function make(tasks: UncTask[], prioritize: boolean): { item: UncItem; options: string[] } {
  // Generate a few candidates and let the weighted picker favour nouns with mistakes.
  const candidates = Array.from({ length: 5 }, () => generateUnc(tasks));
  const item = pickWeighted(MODULE, candidates, (c) => c.key, prioritize);
  return { item, options: item.kind === 'choice' ? shuffledOptions(item) : [] };
}

export default function Uncountable() {
  const { stats, mark, reset } = useSession();
  const [tasks, setTasks] = useStored<UncTask[]>('unc.tasks2', DEFAULT_TASKS);
  const [prioritize, setPrioritize] = useStored('unc.prioritize', true);

  const [state, setState] = useState(() => make(tasks, prioritize));
  const { item, options } = state;
  const [picked, setPicked] = useState<string | number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  const next = useCallback(() => {
    setState(make(tasks, prioritize));
    setPicked(null);
    setResult(null);
  }, [tasks, prioritize]);

  const answer = useCallback(
    (p: string | number) => {
      if (result !== null) return;
      setPicked(p);
      const ok = item.kind === 'choice' ? item.accepted.includes(p as string) : p === item.wrongIndex;
      setResult(ok);
      mark(ok);
      record(MODULE, item.key, ok);
    },
    [result, item, mark],
  );

  useKeys(
    useMemo(
      () => ({
        enter: () => {
          if (result !== null) next();
        },
        digit: (n: number) => {
          if (item.kind === 'choice' && n <= options.length) answer(options[n - 1]);
        },
      }),
      [result, next, item, options, answer],
    ),
  );

  const toggle = (t: UncTask, on: boolean) => setTasks((prev) => (on ? [...new Set([...prev, t])] : prev.filter((x) => x !== t)));

  let pieces: Piece[] = [];
  let spoken = '';
  if (item.kind === 'choice') {
    const [before, after] = item.text.split('___');
    pieces = [before, { blank: 0, text: result === null ? undefined : item.accepted[0], state: result === null ? 'active' : result ? 'ok' : 'bad' }, after];
    spoken = item.text.replace('___', item.accepted[0]);
  } else {
    spoken = item.corrected;
  }

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} right={<Tag>{TASK_LABEL[item.task]}</Tag>} />
        <Settings inline>
          <div className="flex w-full flex-wrap gap-x-5 gap-y-1">
            {ALL_TASKS.map((t) => (
              <Check key={t} checked={tasks.includes(t)} onChange={(on) => toggle(t, on)}>
                {TASK_LABEL[t]}
              </Check>
            ))}
            <Check checked={prioritize} onChange={setPrioritize}>
              приоритет на грешните
            </Check>
          </div>
        </Settings>

        {item.kind === 'choice' ? (
          <>
            <Sentence pieces={pieces} />
            <div className={`grid gap-2 sm:gap-3 ${options.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {options.map((o, i) => {
                let cls = '';
                if (result !== null) {
                  if (item.accepted.includes(o)) cls = 'ok';
                  else if (o === picked) cls = 'bad';
                  else cls = 'dim';
                }
                return (
                  <button key={o} type="button" disabled={result !== null} onClick={() => answer(o)} className={`choice tap relative min-h-14 text-lg sm:min-h-20 sm:text-xl ${cls}`}>
                    {o}
                    <span className="absolute right-2 top-1 hidden text-xs font-normal text-muted fine:block">{i + 1}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {item.words.map((w, i) => {
                let cls = '';
                if (result !== null) {
                  if (i === item.wrongIndex) cls = 'ok';
                  else if (i === picked) cls = 'bad';
                }
                return (
                  <button key={i} type="button" disabled={result !== null} onClick={() => answer(i)} className={`chip tap min-h-11 sm:min-h-12 ${cls}`}>
                    {w}
                  </button>
                );
              })}
            </div>
            {result !== null && (
              <p className="font-serif text-xl sm:text-2xl">
                Правилно: <span className="text-green">{item.corrected}</span>
              </p>
            )}
          </>
        )}

        {result !== null && (
          <div className="order-last flex items-start gap-3 md:order-none">
            <div className="flex-1">
              <Feedback ok={result}>{item.explain}</Feedback>
            </div>
            <SpeakButton text={spoken} size="sm" label="Прочети изречението" />
          </div>
        )}

        <ActionBar
          primary={result === null ? 'Пропусни' : 'Следващ'}
          onPrimary={next}
          hint={
            item.kind === 'choice' ? (
              <>
                Клавиши <Kbd>1</Kbd> <Kbd>2</Kbd>{options.length > 2 && <> <Kbd>3</Kbd> <Kbd>4</Kbd></>} избират, <Kbd>Enter</Kbd> продължава.
              </>
            ) : (
              <>
                <Kbd>Enter</Kbd> продължава.
              </>
            )
          }
        />
      </section>

      <RulesCard
        title="Неброимите накратко"
        items={[
          { head: 'Кои са', body: 'течности и вещества (water, bread, rice), абстрактни понятия (advice, information, love), общи названия (furniture, luggage, money), дейности (homework, work, research).' },
          { head: 'Как се държат', body: 'нямат мн. число и не вземат a / an. Глаголът е в ед. число: The news is good. The furniture is old.' },
          { head: 'Количество', body: 'much, a lot of, some, any, a little, a bit of. НЕ many, a few. How much money? Not much time.' },
          { head: 'Как се броят', body: 'с мярка или „парче“: a piece of advice, a glass of water, a slice of bread, a cup of coffee, a bar of chocolate.' },
          { head: 'Капани за българи', body: 'money is (not are), information (без -s), advice (без -s), hair is long, news is (въпреки -s), furniture (без -s).' },
          { head: 'Двойни', body: 'някои са и двете с различно значение: a paper (вестник) / paper (хартия), a coffee (чаша кафе, разговорно) / coffee (напитката), a time (път) / time (време).' },
        ]}
      />
      <section className="card p-5 sm:p-6">
        <h2 className="mb-3 text-lg font-bold">Списък на неброимите в модула</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {UNCOUNTABLE.map((n) => (
            <span key={n.w} className="rounded-lg border border-border bg-card2 px-2 py-1">
              <span className="font-mono">{n.w}</span> <span className="text-muted">{n.bg}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
