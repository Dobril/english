import { Link } from '../../../components/Link'
import { nav } from '../data/nav'
import { Callout, Cmd } from '../../../components/Bits'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Личен наръчник, октомври 2026</div>
        <h1>Как да работя с Claude Code така, че да върши работата, а не да я прави два пъти</h1>
        <p className="lede">
          Claude Code не е чат, който пише код. Той е изпълнител с инструменти: чете файлове, пуска команди, прави промени и
          проверява резултата сам. Наръчникът обяснява кога какво се прави, коя команда защо съществува, как се пише задача в Linear
          и промпт към Claude, какво се пуска за проверка и кой мърджва.
        </p>
        <div className="meta">
          <span className="chip">18 раздела</span>
          <span className="chip">над 80 команди с обяснение</span>
          <span className="chip">проверени видеа и статии</span>
          <span className="chip">български и английски</span>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel accent">
          <h3>Едно правило над всички</h3>
          <p>
            <strong>Контекстът е най-ценният ресурс.</strong> Всичко, което Claude е прочел, казал и видял в сесията, стои в
            контекстния прозорец. Той се пълни бързо и качеството пада с пълненето. Почти всяка добра практика тук е следствие:
            чиста сесия за всяка задача (<Cmd>/clear</Cmd>), план преди код, кратък CLAUDE.md, изследване през subagents,
            проверка вместо доверие.
          </p>
          <p><Link to="/how-it-works">Защо е така: как мисли Claude Code</Link></p>
        </div>
        <div className="panel">
          <h3>Бърз старт за първия ден</h3>
          <ol>
            <li>Инсталирай, логни се, пусни <Cmd>/doctor</Cmd> и <Cmd>/statusline</Cmd>. (<Link to="/setup">раздел 2</Link>)</li>
            <li>В проекта: <Cmd>/init</Cmd>, после режи CLAUDE.md до под 200 реда. (<Link to="/claude-md">раздел 3</Link>)</li>
            <li>Добави безопасните команди в allow с <Cmd>/permissions</Cmd>, опасните в deny.</li>
            <li>Свържи Linear и GitHub: <code>claude mcp add</code> и <code>gh auth login</code>. (<Link to="/mcp">раздел 12</Link>)</li>
            <li>Първа задача: избери AI-ready задача, Shift+Tab в plan mode, план, изпълнение, <Cmd>/code-review</Cmd>, PR. (<Link to="/workflow">раздел 4</Link>)</li>
          </ol>
        </div>
        <div className="panel">
          <h3>Ритъмът на една задача</h3>
          <div className="flow">
            <div className="flow-step"><div className="n">1</div><div className="t">Задача</div><div className="d">AI-ready в Linear</div></div>
            <div className="flow-step"><div className="n">2</div><div className="t">План</div><div className="d">plan mode, коригираш</div></div>
            <div className="flow-step"><div className="n">3</div><div className="t">Код</div><div className="d">с тестове и проверка</div></div>
            <div className="flow-step"><div className="n">4</div><div className="t">Преглед</div><div className="d">/diff, /code-review</div></div>
            <div className="flow-step"><div className="n">5</div><div className="t">PR и merge</div><div className="d">Claude отваря, ти мърджваш</div></div>
          </div>
          <p className="muted">Подробно, с команди и промптове за всяка стъпка, в <Link to="/workflow">Работен процес по задача</Link>.</p>
        </div>
        <div className="panel">
          <h3>Как е построен наръчникът</h3>
          <ul>
            <li><strong>Основи</strong>: как работи инструментът и как се настройва веднъж.</li>
            <li><strong>Ежедневна работа</strong>: процесът от задача до merge, промптове, Linear, проверка, git.</li>
            <li><strong>Разширения</strong>: hooks, subagents, skills, MCP, паралелна работа. Когато основите са навик.</li>
            <li><strong>Справочник</strong>: всички команди с кога и защо, клавиши, практики, ресурси, речник.</li>
          </ul>
        </div>
      </section>

      <Callout kind="rule" title="Кой за какво отговаря">
        Claude: изследва, планира, пише, тества, отваря PR, обновява Linear. Ти: избираш задачата, одобряваш плана, четеш diff-а,
        преглеждаш PR-а и мърджваш. Автоматизираш проверките с hooks, не доверието.
      </Callout>

      <section>
        <div className="eyebrow">Всички раздели</div>
        {nav.slice(1).map((g) => (
          <div key={g.title}>
            <h3 className="mt" style={{ fontSize: '1rem', marginTop: 16 }}>{g.title}</h3>
            <div className="page-cards">
              {g.items.map((it) => (
                <Link key={it.to} to={it.to} className="page-card">
                  <div className="page-card-num">{it.mark}</div>
                  <div className="page-card-title">{it.label}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
