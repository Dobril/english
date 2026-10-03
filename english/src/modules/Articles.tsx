import { useCallback, useMemo, useState } from 'react';
import { RULES, RULE_LABEL, generateArticle, itemText, type Article, type ArticleItem, type ArticleRule } from '../generators/articles';
import { useSession } from '../hooks/useSession';
import { useStored } from '../hooks/useStored';
import { useKeys } from '../hooks/useKeys';
import { pickWeighted, record } from '../lib/progress';
import { ActionBar, Check, Feedback, Hint, Kbd, RulesCard, Sentence, Settings, SpeakButton, StatsBar, Tag, type Piece } from '../components/ui';

const MODULE = 'articles';
const OPTIONS: Article[] = ['a', 'an', 'the', '-'];
const ALL_RULES = RULES.map((r) => r.id);

function make(enabled: ArticleRule[], prioritize: boolean): ArticleItem {
  const pool = enabled.length ? enabled : ALL_RULES;
  const rule = pickWeighted(MODULE, pool, (r) => r, prioritize);
  return generateArticle(rule);
}

export default function Articles() {
  const { stats, mark, reset } = useSession();
  const [enabled, setEnabled] = useStored<ArticleRule[]>('articles.rules', ALL_RULES);
  const [prioritize, setPrioritize] = useStored('articles.prioritize', true);
  const [showRule, setShowRule] = useStored('articles.showRule', true);

  const [item, setItem] = useState<ArticleItem>(() => make(enabled, prioritize));
  const [chosen, setChosen] = useState<Article[]>([]);
  const done = chosen.length === item.answers.length;
  const ok = done && chosen.every((c, i) => c === item.answers[i]);

  const next = useCallback(() => {
    setItem(make(enabled, prioritize));
    setChosen([]);
  }, [enabled, prioritize]);

  const choose = useCallback(
    (a: Article) => {
      if (done) return;
      const c = [...chosen, a];
      setChosen(c);
      if (c.length === item.answers.length) {
        const allOk = c.every((x, i) => x === item.answers[i]);
        mark(allOk);
        record(MODULE, item.rule, allOk);
      }
    },
    [done, chosen, item, mark],
  );

  useKeys(
    useMemo(
      () => ({
        enter: () => {
          if (done) next();
        },
        digit: (n: number) => {
          if (n >= 1 && n <= 4) choose(OPTIONS[n - 1]);
        },
      }),
      [done, next, choose],
    ),
  );

  const pieces: Piece[] = item.pieces.map((p) => {
    if (typeof p === 'string') return p;
    const i = p.blank;
    if (i < chosen.length) return { blank: i, text: chosen[i], state: chosen[i] === item.answers[i] ? 'ok' : 'bad' };
    return { blank: i, state: i === chosen.length ? 'active' : 'idle' };
  });

  const current = Math.min(chosen.length, item.answers.length - 1);
  const toggleRule = (id: ArticleRule, on: boolean) => setEnabled((prev) => (on ? [...new Set([...prev, id])] : prev.filter((r) => r !== id)));

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} right={showRule || done ? <Tag>{RULE_LABEL[item.rule]}</Tag> : undefined} />

        <div className="flex items-start gap-3">
          <div className="flex-1">
            <Sentence pieces={pieces} />
          </div>
          {done && <SpeakButton text={itemText(item, (i) => (item.answers[i] === '-' ? '' : item.answers[i]))} label="Прочети изречението" />}
        </div>

        <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-4 sm:gap-3">
          {OPTIONS.map((o, i) => {
            let cls = '';
            if (done) {
              const wanted = item.answers[current];
              const got = chosen[current];
              if (o === wanted) cls = 'ok';
              else if (o === got) cls = 'bad';
              else cls = 'dim';
            }
            return (
              <button key={o} type="button" disabled={done} onClick={() => choose(o)} className={`choice tap relative min-h-14 text-lg sm:min-h-20 sm:text-xl ${cls}`}>
                {o === '-' ? '–' : o}
                <span className="absolute right-2 top-1 hidden text-xs font-normal text-muted fine:block">{i + 1}</span>
              </button>
            );
          })}
        </div>

        {item.answers.length > 1 && !done && <p className="text-sm text-muted">{item.answers.length} празни места, попълни ги поред.</p>}

        {done && (
          <div className="order-last md:order-none">
          <Feedback ok={ok}>
            {!ok && (
              <>
                Правилно: <span className="font-mono">{item.answers.map((a) => (a === '-' ? '–' : a)).join(', ')}</span>.{' '}
              </>
            )}
            {item.explain}
          </Feedback>
          </div>
        )}

        <ActionBar
          primary={done ? 'Следващ' : 'Пропусни'}
          onPrimary={next}
          hint={
            <>
              Клавиши <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd> <Kbd>4</Kbd> избират отговор, <Kbd>Enter</Kbd> продължава.
            </>
          }
        />
        <Hint>Знакът „–“ означава без член.</Hint>

        <Settings title="Кои правила да се падат" className="order-last">
          <div className="flex w-full flex-wrap gap-x-4 gap-y-1 text-sm">
            <button type="button" className="tap text-accent underline underline-offset-4" onClick={() => setEnabled(ALL_RULES)}>
              всички
            </button>
            <button type="button" className="tap text-accent underline underline-offset-4" onClick={() => setEnabled([])}>
              нито едно
            </button>
            <Check checked={prioritize} onChange={setPrioritize}>
              приоритет на грешните
            </Check>
            <Check checked={showRule} onChange={setShowRule}>
              показвай правилото преди отговора
            </Check>
          </div>
          <div className="grid w-full gap-x-6 sm:grid-cols-2">
            {RULES.map((r) => (
              <Check key={r.id} checked={enabled.includes(r.id)} onChange={(on) => toggleRule(r.id, on)}>
                {r.label} <span className="font-mono text-muted">({r.article})</span>
              </Check>
            ))}
          </div>
          {enabled.length === 0 && <p className="text-sm text-red">Нищо не е избрано, затова се падат всички правила.</p>}
        </Settings>
      </section>

      <RulesCard
        title="Правилата накратко"
        items={[
          { head: 'a / an', body: 'броимо съществително в ед. ч., споменато за първи път, професии, „едно от многото“, честота (twice a week). Изборът зависи от звука: an hour, a university, an honest man, a European.' },
          { head: 'the', body: 'вече споменато или известно и на двамата, единствено по рода си (the sun), превъзходна степен, поредни (the first), инструменти (the piano), морета, реки, планински вериги, държави в мн. число, уточнено с фраза (the book on the table).' },
          { head: 'без член', body: 'мн. число и неброими в общ смисъл, хранения, спортове, езици, повечето държави, градове и континенти, изрази като at home, go to bed, by bus, at night, watch TV.' },
        ]}
      />
    </div>
  );
}
