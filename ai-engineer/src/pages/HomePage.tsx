import { Link } from 'react-router-dom'
import { phases } from '../data/phases'
import { useProgress } from '../hooks/useProgress'

export function HomePage() {
  const { perPhase } = useProgress()

  return (
    <>
      <section className="hero">
        <div className="eyebrow">Лична пътна карта, октомври 2026</div>
        <h1>От Node.js и FastAPI до AI Engineer, който разбира какво строи</h1>
        <p className="lede">
          Девет фази, всяка стъпва на предишната. Без бързане: продължаваш към следващата фаза, когато отметнеш чеклиста ѝ,
          не когато минат седмиците. Отметките се пазят в този браузър.
        </p>
        <div className="meta">
          <span className="chip">старт: Node.js, Python, FastAPI, малко RAG</span>
          <span className="chip">ритъм: 8 до 10 ч / седмица</span>
          <span className="chip">общо: 14 до 18 месеца</span>
          <span className="chip">след фаза 4: готов за първа AI роля</span>
        </div>
        <div className="timeline" aria-label="Относителна продължителност на фазите">
          {phases.map((p) => {
            const c = perPhase(p.id)
            const done = c.all > 0 && c.done === c.all
            return (
              <Link key={p.id} to={`/phase/${p.id}`} style={{ ['--w' as string]: p.weight }} className={done ? 'done' : undefined} title={`${p.id}. ${p.title} (${p.weeks})`}>
                {p.id}
              </Link>
            )
          })}
        </div>
        <div className="timeline-caption">
          <span>седмица 1</span>
          <span>ширината е приблизителната продължителност</span>
          <span>около месец 16</span>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel accent">
          <h3>Инструментите не са проблем</h3>
          <p>
            Инструментите са стотици, но категориите са около дванадесет. Във всяка категория научаваш <strong>един</strong> инструмент
            до дъно, за още два знаеш какво правят и с какво се различават, за останалите знаеш, че съществуват.
          </p>
          <p>
            Когато разбираш какво прави категорията (например "векторна база"), смяната на инструмента отнема дни, не месеци.
            Затова картата винаги те кара първо да напишеш нещото на ръка и чак после да вземеш библиотека.
          </p>
          <p><Link to="/tools">Пълният списък с инструменти и колко дълбоко да ги знаеш</Link></p>
        </div>
        <div className="panel">
          <h3>Правила за учене</h3>
          <ol>
            <li><strong>30% четене, 70% строене.</strong> Всяка седмица нещо работещо, дори и малко.</li>
            <li><strong>Първо без framework, после с framework.</strong> RAG и агентски цикъл пишеш сам, тогава ще знаеш какво крият LangChain и LlamaIndex.</li>
            <li><strong>Един инструмент на категория.</strong> Нов инструмент най-много веднъж месечно, и то след едночасов "spike".</li>
            <li><strong>Дневник на ученето.</strong> Markdown файл: какво научих, какво не разбрах, какво ще пробвам. Веднъж седмично обясни нещо на глас, все едно на колега.</li>
            <li><strong>Claude като учител, не като ръце.</strong> "Изпитай ме по attention", "обясни ми HNSW като на дете", "прегледай кода ми". Но до фаза 4 кодът е твой.</li>
            <li><strong>Ако не влиза, връщаш се назад.</strong> Не напред. Неразбраната основа се връща като дълг във фаза 5.</li>
          </ol>
        </div>
        <div className="panel">
          <h3>Ритъм на седмицата</h3>
          <ul>
            <li>2 сесии по 1.5 ч: теория (видео, книга) с бележки в дневника.</li>
            <li>2 до 3 сесии по 1.5 до 2 ч: проектът на фазата или мини упражнение.</li>
            <li>30 мин в неделя: дневник, какво не разбрах, план за следващата седмица.</li>
            <li>Пропусната седмица не е провал. Продължаваш оттам, където си.</li>
          </ul>
          <p className="muted">
            Във всяка фаза ресурсите са подредени в реда, в който да ги минеш. Не е нужно да минеш всички: задължителните са
            първите два или три, останалите са за задълбочаване.
          </p>
        </div>
        <div className="panel">
          <h3>Как е построена всяка фаза</h3>
          <ul>
            <li><strong>Цел</strong> в едно изречение и какво ще разбереш.</li>
            <li><strong>Ресурси</strong> по ред: видео, книга, курс, статия, документация.</li>
            <li><strong>Инструменти</strong> с три нива на дълбочина.</li>
            <li><strong>Мини упражнения</strong> за по една вечер, за да не само четеш.</li>
            <li><strong>Проект на фазата</strong>, описан подробно в <Link to="/projects">Проекти</Link>.</li>
            <li><strong>Чеклист</strong> "готов си, когато". Той решава кога продължаваш.</li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <h3>Твоят Node.js опит не е излишен</h3>
        <ul>
          <li><strong>Vercel AI SDK</strong> е най-добрият TypeScript SDK за стрийминг UI и tool calling. Учиш го във фаза 2 и ти остава за всички интерфейси.</li>
          <li><strong>MCP TypeScript SDK</strong>: половината MCP сървъри са на TypeScript.</li>
          <li>Anthropic и OpenAI имат TypeScript SDK с равни възможности на Python.</li>
          <li>Правило: Python за всичко с данни, модели и ML; TypeScript за интерфейси и за инструменти, които живеят до frontend-а. Подробно в <Link to="/where">Къде какво се ползва</Link>.</li>
        </ul>
      </section>

      <section>
        <div className="eyebrow">Фазите накратко</div>
        <div className="phase-cards">
          {phases.map((p) => {
            const c = perPhase(p.id)
            return (
              <Link key={p.id} to={`/phase/${p.id}`} className="phase-card">
                <div className="phase-card-num">{p.id}</div>
                <div>
                  <div className="phase-card-title">{p.title}</div>
                  <div className="muted small">{p.weeks} · {c.done}/{c.all} отметки</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
