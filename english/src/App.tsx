import { useEffect, useState } from 'react';
import IrregularVerbs from './modules/IrregularVerbs';
import Articles from './modules/Articles';
import Tenses from './modules/Tenses';
import PhrasalVerbs from './modules/PhrasalVerbs';
import Uncountable from './modules/Uncountable';
import Vocabulary from './modules/Vocabulary';
import Phonetics from './modules/Phonetics';
import PartsOfSpeech from './modules/PartsOfSpeech';
import VerbList from './modules/VerbList';
import { BookOpenText, ChevronDown, Ear, Languages, List, Moon, Puzzle, Sun, Tags, Type, Clock3, X } from 'lucide-react';
import { useStored } from './hooks/useStored';
import { primeVoices } from './lib/speak';

const modules = [
  { id: 'verbs', label: 'Неправилни глаголи', short: 'Глаголи', icon: Type, component: IrregularVerbs },
  { id: 'verbList', label: 'Списък глаголи', short: 'Списък', icon: List, component: VerbList },
  { id: 'articles', label: 'Членуване', short: 'Членуване', icon: BookOpenText, component: Articles },
  { id: 'tenses', label: 'Времена', short: 'Времена', icon: Clock3, component: Tenses },
  { id: 'phrasal', label: 'Фразови глаголи', short: 'Фразови', icon: Puzzle, component: PhrasalVerbs },
  { id: 'uncountable', label: 'Неброими', short: 'Неброими', icon: Tags, component: Uncountable },
  { id: 'vocab', label: 'Думи', short: 'Думи', icon: Languages, component: Vocabulary },
  { id: 'phonetics', label: 'Фонетика', short: 'Фонетика', icon: Ear, component: Phonetics },
  { id: 'pos', label: 'Части на речта', short: 'Части на речта', icon: Tags, component: PartsOfSpeech },
] as const;

type ModuleId = (typeof modules)[number]['id'];

export default function App() {
  const [theme, setTheme] = useStored<'dark' | 'light'>('theme', 'dark');
  const [active, setActive] = useStored<ModuleId>('module', 'verbs');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const prime = () => primeVoices();
    window.addEventListener('pointerdown', prime, { once: true });
    return () => window.removeEventListener('pointerdown', prime);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menu]);

  const current = modules.find((m) => m.id === active) ?? modules[0];
  const Active = current.component;

  return (
    <div className="min-h-dvh">
      <header className="sticky z-30 border-b border-border bg-bg" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <div className="hidden select-none items-baseline gap-1 sm:flex">
            <span className="text-lg font-extrabold tracking-tight">English</span>
            <span className="text-lg font-extrabold tracking-tight text-accent">Master</span>
          </div>

          <button type="button" onClick={() => setMenu(true)} className="tap flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 text-left font-bold md:hidden" aria-haspopup="dialog">
            <current.icon size={18} className="text-accent" />
            <span className="flex-1 truncate">{current.label}</span>
            <ChevronDown size={18} className="text-muted" />
          </button>

          <nav className="hidden flex-1 flex-wrap gap-0.5 md:flex lg:gap-1" aria-label="Модули">
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActive(m.id)}
                className={`tap min-h-10 whitespace-nowrap rounded-lg px-2.5 text-[13px] font-semibold transition-colors lg:px-3 lg:text-sm ${m.id === active ? 'bg-accent-soft text-text' : 'text-muted hover:bg-card2 hover:text-text'}`}
              >
                {m.short}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="tap inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted hover:text-text"
            aria-label={theme === 'dark' ? 'Светла тема' : 'Тъмна тема'}
            title={theme === 'dark' ? 'Светла тема' : 'Тъмна тема'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenu(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-lg font-bold">Модули</span>
              <button type="button" onClick={() => setMenu(false)} className="tap inline-flex h-11 w-11 items-center justify-center rounded-full text-muted" aria-label="Затвори">
                <X size={22} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {modules.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setActive(m.id);
                    setMenu(false);
                  }}
                  className={`tap flex min-h-16 items-center gap-3 rounded-xl border px-3 text-left font-semibold ${m.id === active ? 'border-line bg-accent-soft' : 'border-border bg-card2'}`}
                >
                  <m.icon size={20} className="shrink-0 text-accent" />
                  <span className="leading-tight">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-4 sm:py-6">
        <Active key={active} />
      </main>
    </div>
  );
}
