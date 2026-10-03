import { Link } from '../../../components/Link'
import { nav } from '../data/nav'
import { Callout, Feat } from '../../../components/Bits'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Личен наръчник, октомври 2026</div>
        <h1>Как да работя с Claude Desktop така, че да получавам готови файлове, а не съвети как да ги направя</h1>
        <p className="lede">
          Claude Desktop има два режима за офис работа. <Feat>Chat</Feat> е за въпроси, чернови и мислене. <Feat>Cowork</Feat> е агент,
          който работи върху папките ти и връща Excel с формули, презентации, документи и анализи. Наръчникът обяснява кога кой
          се ползва, как се пише бриф, как се проверява резултатът, как се свързват Gmail, Drive, Slack и Office, и как
          повтарящата се работа се превръща в skill или насрочена задача.
        </p>
        <div className="meta">
          <span className="chip">19 раздела</span>
          <span className="chip">над 50 функции с кога и защо</span>
          <span className="chip">проверени видеа и документация</span>
          <span className="chip">български и английски</span>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel accent">
          <h3>Едно правило над всички</h3>
          <p>
            <strong>Chat за мисъл, Cowork за резултат, който ще дадеш на някого.</strong> Ако това, което искаш, се побира в
            няколко реплики, е чат. Ако е файл, който друг ще отвори, презентация, която ще покажеш, или таблица, която ще се
            обновява, е Cowork. Почти всяка добра практика тук следва от това: бриф, ориентиран към резултата, критерии за готово,
            проверка на числата преди нещо да излезе от компютъра ти.
          </p>
          <p><Link to="/how-it-works">Защо е така: как мисли всеки от двата режима</Link></p>
        </div>
        <div className="panel">
          <h3>Бърз старт за първия ден</h3>
          <ol>
            <li>Инсталирай приложението, влез, включи <Feat>Memory</Feat> и "Code execution and file creation". (<Link to="/setup">раздел 2</Link>)</li>
            <li>Направи папка Documents/Cowork с подпапки INPUTS, OUTPUTS, TEMPLATES. Напиши 20 реда <Feat>Global instructions</Feat>. (<Link to="/memory">раздел 3</Link>)</li>
            <li>Свържи Google Drive или Microsoft 365 и пощата от Customize. (<Link to="/connectors">раздел 11</Link>)</li>
            <li>Първа задача: нещо познато, на което знаеш как изглежда добрият резултат. Поискай Claude да ти повтори заданието и да зададе въпроси, преди да започне. (<Link to="/workflow">раздел 4</Link>)</li>
            <li>Отвори файла и провери 3 числа срещу източника. (<Link to="/verify">раздел 10</Link>)</li>
          </ol>
        </div>
        <div className="panel">
          <h3>Ритъмът на една задача</h3>
          <div className="flow">
            <div className="flow-step"><div className="n">1</div><div className="t">Входове</div><div className="d">копия в работната папка</div></div>
            <div className="flow-step"><div className="n">2</div><div className="t">Бриф</div><div className="d">резултат, формат, критерии</div></div>
            <div className="flow-step"><div className="n">3</div><div className="t">Въпроси</div><div className="d">Claude повтаря и пита</div></div>
            <div className="flow-step"><div className="n">4</div><div className="t">Работа</div><div className="d">гледаш, коригираш рано</div></div>
            <div className="flow-step"><div className="n">5</div><div className="t">Проверка</div><div className="d">числа, формули, формат</div></div>
          </div>
          <p className="muted">Подробно, с брифове за всяка стъпка, в <Link to="/workflow">Работен процес за една задача</Link>.</p>
        </div>
        <div className="panel">
          <h3>Как е построен наръчникът</h3>
          <ul>
            <li><strong>Основи</strong>: двата режима, настройка веднъж, инструкции и памет.</li>
            <li><strong>Ежедневна работа</strong>: процесът за една задача, брифове, после по вид работа: таблици, презентации, документи, анализи, проверка.</li>
            <li><strong>Разширения</strong>: connectors, skills и plugins, насрочени и фонови задачи, браузър и Office add-ins. Когато основите са навик.</li>
            <li><strong>Справочник</strong>: всички функции с кога и защо, клавиши и настройки, практики, ресурси, речник.</li>
          </ul>
        </div>
      </section>

      <Callout kind="rule" title="Кой за какво отговаря">
        Claude: чете входовете, пита, планира, строи файла, форматира, прави проверките, които си му дал. Ти: избираш задачата,
        даваш входовете, одобряваш плана, проверяваш числата и фактите, пращаш и представяш. Нищо не се изпраща, подписва или
        изтрива без теб.
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
