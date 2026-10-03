import { ReactNode } from 'react';
import { Volume2, ChevronRight } from 'lucide-react';
import { speak } from '../lib/speak';
import type { SessionStats } from '../hooks/useSession';

export function StatsBar({ stats, onReset, right }: { stats: SessionStats; onReset: () => void; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="pill bg-green-soft text-green">
        Верни <b>{stats.correct}</b>
      </span>
      <span className="pill bg-red-soft text-red">
        Грешни <b>{stats.wrong}</b>
      </span>
      <span className="pill bg-card2 text-muted">
        Серия <b className="text-text">{stats.streak}</b>
      </span>
      <button type="button" onClick={onReset} className="tap hidden min-h-9 text-sm text-muted underline underline-offset-4 hover:text-text sm:inline">
        нулирай
      </button>
      {right && <div className="ml-auto text-right">{right}</div>}
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}

// Keyboard hints render only on devices with a mouse and fine pointer.
export function Hint({ children }: { children: ReactNode }) {
  return <p className="hidden fine:block text-sm text-muted">{children}</p>;
}

export function SpeakButton({ text, size = 'md', label }: { text: string; size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const dim = size === 'lg' ? 'h-14 w-14' : size === 'sm' ? 'h-11 w-11' : 'h-12 w-12';
  const icon = size === 'lg' ? 24 : 20;
  return (
    <button
      type="button"
      aria-label={label ?? `Произнеси: ${text}`}
      title="Произнеси"
      onClick={(e) => {
        e.stopPropagation();
        void speak(text);
      }}
      className={`tap inline-flex ${dim} shrink-0 items-center justify-center rounded-full border border-border text-muted hover:bg-card2 hover:text-text`}
    >
      <Volume2 size={icon} />
    </button>
  );
}

// A word that pronounces itself when tapped. Speaks only its own text.
export function SpeakWord({ text, className = '', speakText }: { text: string; className?: string; speakText?: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      title="Натисни, за да чуеш"
      className={`speak-word ${className}`}
      onClick={() => void speak(speakText ?? text)}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          void speak(speakText ?? text);
        }
      }}
    >
      {text}
    </span>
  );
}

export function Feedback({ ok, children }: { ok: boolean | null; children: ReactNode }) {
  if (ok === null) return null;
  return (
    <div className={`border-l-4 pl-3 text-[1.05rem] leading-relaxed ${ok ? 'border-green' : 'border-red'}`} role="status">
      <b>{ok ? 'Точно така.' : 'Не съвсем.'}</b> {children}
    </div>
  );
}

export function RulesCard({ title, items }: { title: string; items: { head: ReactNode; body: ReactNode }[] }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="border-l-2 border-border pl-3 text-[0.95rem] leading-relaxed text-muted">
            <b className="text-text">{it.head}</b>: {it.body}
          </div>
        ))}
      </div>
    </section>
  );
}

// Module options. With inline=true they are always visible on desktop and collapsible on phones;
// with inline=false (long lists) they are collapsible everywhere.
export function Settings({ title = 'Настройки', children, inline = false, className = '' }: { title?: string; children: ReactNode; inline?: boolean; className?: string }) {
  const body = <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:gap-x-5 sm:gap-y-2 sm:text-[0.95rem]">{children}</div>;
  return (
    <>
      {inline && <div className={`hidden md:block ${className}`}>{body}</div>}
      <details className={`group -my-1 border-t border-dashed border-border pt-1 ${inline ? 'md:hidden' : ''} ${className}`}>
        <summary className="tap flex min-h-9 items-center gap-2 text-sm font-semibold text-muted hover:text-text">
          <ChevronRight size={14} className="tri" />
          {title}
        </summary>
        <div className="mb-2 mt-2">{body}</div>
      </details>
    </>
  );
}

export function Check({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="tap inline-flex min-h-9 items-center gap-2 sm:min-h-11">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-muted">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-muted sm:mb-2 sm:text-[0.72rem]">{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="text-[0.78rem] font-bold uppercase tracking-wider text-accent">{children}</span>;
}

// Main action row: full-width button on phones, inline on desktop. It sits in the normal flow
// under the inputs so the virtual keyboard never hides it and nothing overlays the page.
export function ActionBar({
  primary,
  onPrimary,
  secondary,
  onSecondary,
  hint,
  disabled,
}: {
  primary: string;
  onPrimary: () => void;
  secondary?: string;
  onSecondary?: () => void;
  hint?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" disabled={disabled} onClick={onPrimary} className="btn-primary tap min-h-14 flex-1 px-6 text-lg md:min-h-13 md:flex-none">
        {primary}
      </button>
      {secondary && onSecondary && (
        <button type="button" onClick={onSecondary} className="btn-ghost tap min-h-14 whitespace-nowrap px-4 text-lg md:min-h-13">
          {secondary}
        </button>
      )}
      {hint && <div className="hidden text-sm text-muted md:fine:block">{hint}</div>}
    </div>
  );
}

// Renders a sentence with blanks and optional underlined markers.
export type Piece =
  | string
  | { blank: number; text?: string; state?: 'ok' | 'bad' | 'active' | 'idle' }
  | { marker: string }
  | { mono: string };

export function Sentence({ pieces, size = 'lg' }: { pieces: Piece[]; size?: 'lg' | 'md' }) {
  return (
    <p className={`font-serif leading-[1.45] ${size === 'lg' ? 'text-[1.55rem] sm:text-[2.3rem]' : 'text-[1.3rem] sm:text-[1.8rem]'}`}>
      {pieces.map((p, i) => {
        if (typeof p === 'string') return <span key={i}>{p}</span>;
        if ('marker' in p) return <span key={i} className="marker">{p.marker}</span>;
        if ('mono' in p) return <span key={i} className="font-mono text-[0.65em] text-muted">{p.mono}</span>;
        const st = p.state ?? 'idle';
        const color = st === 'ok' ? 'text-green' : st === 'bad' ? 'text-red' : '';
        return (
          <span key={i} className={`blank ${st === 'active' ? 'active' : ''} ${color} ${p.text ? 'font-mono text-[0.85em] font-semibold' : ''}`}>
            {p.text ? p.text : ' '}
          </span>
        );
      })}
    </p>
  );
}
