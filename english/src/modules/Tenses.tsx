import { useCallback, useMemo, useRef, useState } from 'react';
import { TENSES, type TenseId } from '../data/tenses';
import { generateTense, checkTense, FORM_LABEL, type Form, type TenseItem } from '../generators/tenses';
import { useSession } from '../hooks/useSession';
import { useStored } from '../hooks/useStored';
import { blurOnTouch, useAutoFocus, useKeys } from '../hooks/useKeys';
import { pickWeighted, record } from '../lib/progress';
import { ActionBar, Check, Feedback, Kbd, Label, RulesCard, Sentence, Settings, SpeakButton, StatsBar, Tag, type Piece } from '../components/ui';

const MODULE = 'tenses';
const ALL = TENSES.map((t) => t.id);
const ALL_FORMS: Form[] = ['aff', 'neg', 'q'];

function make(selected: TenseId[], forms: Form[], prioritize: boolean): TenseItem {
  const pool = selected.length ? selected : ALL;
  const tense = pickWeighted(MODULE, pool, (t) => t, prioritize);
  return generateTense(tense, forms.length ? forms : ALL_FORMS);
}

export default function Tenses() {
  const { stats, mark, reset } = useSession();
  const [selected, setSelected] = useStored<TenseId[]>('tenses.selected', ALL);
  const [showName, setShowName] = useStored('tenses.showName', true);
  const [forms, setForms] = useStored<Form[]>('tenses.forms', ALL_FORMS);
  const [prioritize, setPrioritize] = useStored('tenses.prioritize', true);

  const [item, setItem] = useState<TenseItem>(() => make(selected, forms, prioritize));
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  useAutoFocus(ref, [item]);

  const next = useCallback(() => {
    setItem(make(selected, forms, prioritize));
    setInput('');
    setResult(null);
  }, [selected, forms, prioritize]);

  const check = useCallback(() => {
    if (result !== null) return;
    blurOnTouch();
    // An empty answer counts as a mistake and reveals the correct form.
    const ok = input.trim() !== '' && checkTense(input, item);
    setResult(ok);
    mark(ok);
    record(MODULE, item.tense, ok);
  }, [result, input, item, mark]);

  useKeys(useMemo(() => ({ enter: () => (result === null ? check() : next()) }), [result, check, next]));

  const pieces: Piece[] = item.pieces.map((p) => {
    if (typeof p === 'string') return p;
    if ('blank' in p) return { blank: 0, text: result === null ? undefined : item.answer, state: result === null ? 'active' : result ? 'ok' : 'bad' };
    return p;
  });

  const toggle = (id: TenseId, on: boolean) => setSelected((prev) => (on ? [...new Set([...prev, id])] : prev.filter((t) => t !== id)));
  const toggleForm = (f: Form, on: boolean) => setForms((prev) => (on ? ALL_FORMS.filter((x) => x === f || prev.includes(x)) : prev.filter((x) => x !== f)));
  const formTag = item.form === 'neg' ? ' · отрицание' : item.form === 'q' ? ' · въпрос' : '';
  const spoken = item.text.replace('___', item.answer).replace(/\s*\([a-z]+\)/, '');

  return (
    <div className="space-y-6">
      <section className="card flex flex-col gap-4 p-4 sm:gap-6 sm:p-7">
        <StatsBar stats={stats} onReset={reset} />

        <div className="flex items-center justify-between gap-3">
          <div className="min-h-5">{(showName || result !== null) && <Tag>
                {item.tenseName}
                {formTag}
              </Tag>}</div>
          {result !== null && <SpeakButton text={spoken} label="Прочети изречението" />}
        </div>

        <Sentence pieces={pieces} />

        <div>
          <Label>Глаголът в правилната форма</Label>
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
            placeholder={item.form === 'neg' ? 'отрицателна форма' : item.form === 'q' ? 'въпрос: спомагателен + подлог + глагол' : ''}
          />
        </div>

        {result !== null && (
          <div className="order-last md:order-none">
          <Feedback ok={result}>
            {result ? (
              <>
                <b>{item.tenseName}</b>. {item.rule}
                {item.form === 'q' && ' Въпрос: спомагателен глагол + подлог + глагол.'}
              </>
            ) : (
              <>
                {input.trim() === '' && 'Нищо не беше написано, затова се брои за грешка. '}
                Правилно: <span className="font-mono">{item.answer}</span>. <b>{item.tenseName}</b>: {item.rule}
                {item.form === 'q' && ' Въпрос: спомагателен глагол + подлог + глагол.'}
              </>
            )}
          </Feedback>
          </div>
        )}

        <ActionBar
          primary={result === null ? 'Провери' : 'Следващ'}
          onPrimary={result === null ? check : next}
          secondary="Пропусни"
          onSecondary={next}
          hint={
            <>
              <Kbd>Enter</Kbd> проверява, после минава нататък. Съкратени форми (doesn't, 's, 'll) се приемат.
            </>
          }
        />

        <Settings inline title="Настройки" className="order-last">
          <div className="flex w-full flex-wrap gap-x-4 gap-y-1">
            {ALL_FORMS.map((f) => (
              <Check key={f} checked={forms.includes(f)} onChange={(on) => toggleForm(f, on)}>
                {FORM_LABEL[f]} форма
              </Check>
            ))}
          </div>
          <div className="flex w-full flex-wrap gap-x-4 gap-y-1">
            <Check checked={showName} onChange={setShowName}>
              показвай името на времето
            </Check>
            <Check checked={prioritize} onChange={setPrioritize}>
              приоритет на грешните
            </Check>
          </div>
          <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-muted">Времена:</span>
            <button type="button" className="tap text-accent underline underline-offset-4" onClick={() => setSelected(ALL)}>
              всички
            </button>
            <button type="button" className="tap text-accent underline underline-offset-4" onClick={() => setSelected([])}>
              нито едно
            </button>
          </div>
          <div className="grid w-full gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {TENSES.map((t) => (
              <Check key={t.id} checked={selected.includes(t.id)} onChange={(on) => toggle(t.id, on)}>
                {t.name}
              </Check>
            ))}
          </div>
          <p className="w-full text-sm text-muted">
            Избрани: {selected.length === 0 ? 'всички' : `${selected.length} от ${TENSES.length}`} времена, {forms.length === 0 ? 'всички' : forms.length} форми. Изборът се пази на устройството.
          </p>
          {selected.length === 0 && <p className="text-sm text-red">Нищо не е избрано, затова се падат всички времена.</p>}
        </Settings>
      </section>

      <RulesCard
        title="Времената накратко"
        items={TENSES.map((t) => ({
          head: t.name,
          body: (
            <>
              {t.rule} <i>Маркери: {t.markers.slice(0, 4).map((m) => m.text.replace(/[,!]$/, '')).join('; ')}</i>
            </>
          ),
        }))}
      />
    </div>
  );
}
