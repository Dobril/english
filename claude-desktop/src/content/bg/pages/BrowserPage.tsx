import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function BrowserPage() {
  return (
    <>
      <PageHead
        mark="14"
        title="Браузър и Office add-ins"
        lede="Цел: да знаеш кога Claude да работи в браузъра, кога вътре в Excel, PowerPoint и Word и кога е по-добре да му дадеш файловете."
        chips={['Built-in browser', 'Claude in Chrome', 'Computer use', 'Claude for Microsoft 365', 'Quick entry']}
      />

      <Block title="Кое кога">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Ситуация</th><th>Ползвай</th><th>Защо</th></tr></thead>
            <tbody>
              <tr><td className="cat">Работата е на страница пред теб, вече си логнат</td><td><Feat>Claude in Chrome</Feat></td><td>Работи в твоя браузър с твоите табове и сесии. Нищо за настройване.</td></tr>
              <tr><td className="cat">Предаваш задача и не искаш да гледаш</td><td><Feat>Built-in browser</Feat> в Cowork</td><td>Отделен панел в приложението, Claude сам отваря и чете. Не ти пречи да работиш в своя браузър.</td></tr>
              <tr><td className="cat">Файлът е отворен и искаш промени на място</td><td><Feat>Claude for Excel</Feat>, <Feat>Claude for PowerPoint</Feat>, <Feat>Claude for Word</Feat></td><td>Пази формули, шаблон и стилове. Word редактира с tracked changes.</td></tr>
              <tr><td className="cat">Работата минава през много файлове и приложения, резултатът е нов файл</td><td><Feat>Cowork</Feat></td><td>Чете папката, пише файлове, ползва connectors. <Link to="/workflow">Раздел 4</Link>.</td></tr>
              <tr><td className="cat">Резултатът е мисъл или чернова</td><td>Chat</td><td>Бързо, без инструменти. <Link to="/how-it-works">Раздел 1</Link>.</td></tr>
              <tr><td className="cat">Въпрос за това, което е на екрана ти</td><td>Quick entry</td><td>Двойно Option (или Option+Space) на Mac, скрийншот и въпрос, без да сменяш приложението.</td></tr>
              <tr><td className="cat">Няма connector, няма файл, само приложение на екрана</td><td><Feat>Computer use</Feat></td><td>Последна опция. Бавно и скъпо, но работи там, където нищо друго не стига.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Вграденият браузър в Cowork">
        <p>
          Панел <strong>Browser</strong> вътре в десктоп приложението. Claude отваря страници, чете ги, кликва, пише, попълва форми и прави
          скрийншоти, а ти гледаш отстрани. Същите възможности като Claude in Chrome, но не зависи от твоя браузър. Pro, Max и Team; Enterprise,
          когато администраторът го включи.
        </p>
        <Steps
          items={[
            { title: 'Първо действие на сайт', body: <p>Преди да действа на сайт, Claude пита: <strong>Allow once</strong> за тази страница или <strong>Always allow</strong> за сайта. Отмяна от Settings.</p> },
            { title: 'Логини', body: <p>При първо ползване можеш да внесеш запазени логини от Chrome, Edge или Firefox, сайт по сайт. Банки, имейл и SSO са отметнати по подразбиране и остават навън, освен ако ти не ги избереш. Логините остават за следващи сесии на същия компютър.</p> },
            { title: 'Чистене', body: <p><strong>Clear browsing data</strong> от менюто на панела. Логините живеят в отделното хранилище на приложението, не в твоя браузър.</p> },
            { title: 'Изискване', body: <p>Десктоп приложението трябва да е отворено и онлайн, дори когато пускаш задачата от web или телефон.</p> },
          ]}
        />
        <p className="muted small">Предпочитан браузър: Settings → Cowork → Preferred browser. Claude ползва избора ти, освен ако не е наличен или не поискаш друго.</p>
      </Block>

      <Block title="Claude in Chrome">
        <ul>
          <li>Разширение за Chrome и Edge от Chrome Web Store. Влизаш със същия Claude акаунт.</li>
          <li>Работи в твоя браузър: вижда табовете и влиза там, където ти вече си влязъл. Затова е естественият избор за портали, вътрешни системи и всичко зад логин.</li>
          <li>Cowork може да го ползва за задачи зад логин вместо вградения браузър. Страничен панел за Cowork в Chrome: Max и Team, Pro се включва постепенно.</li>
          <li>Най-добре за: "попълни тази форма от данните в таблицата", "извади таблицата от тази страница в Excel", "мини през тези 20 обяви и обобщи условията".</li>
        </ul>
        <Brief title="Пример">{`Отвори портала за доставчици (вече съм логнат в този таб). За всяка фактура от файла Фактури-септември.xlsx въведи номер, дата, сума и доставчик във формата "Нова фактура". Не натискай "Изпрати", остави всяка на екрана за преглед и ми кажи кога е готова. Ако поле не съвпада с колоните, спри и питай.`}</Brief>
      </Block>

      <Block title="Computer use">
        <p>
          В бета, иска macOS 14 или по-нов. Claude управлява приложенията на екрана ти с разрешение за всяко приложение поотделно. Полезно
          за десктоп програми без connector и без файлов изход: стара счетоводна програма, вътрешен клиент, нещо, което съществува само като
          прозорец. Бавно е и струва много токени. Преди да го пуснеш, провери дали няма connector (<Link to="/connectors">раздел 11</Link>) или
          експорт във файл, който Cowork да прочете.
        </p>
      </Block>

      <Callout kind="warn" title="Браузърът е най-рисковата повърхност">
        Уеб страница може да съдържа скрити инструкции (prompt injection). Защитите намаляват риска, но не го премахват. Не ползвай браузъра за
        банкиране, медицински или чувствителни лични данни. На непознати сайтове преглеждай всяко действие, преди да го одобриш. Браузърните
        задачи са по-бавни и ползват повече от лимита ти; ако има connector за същата система, той е по-бърз и по-надежден.
      </Callout>

      <Block title="Claude for Microsoft 365: Excel, PowerPoint, Word, Outlook">
        <p>
          Add-in, който слага Claude вътре в Office. Excel, PowerPoint и Word са общодостъпни, Outlook е в бета. Разговорът вижда отворения файл и
          работи по него: с формули и зависимости в Excel, с шаблона и slide master в PowerPoint, с tracked changes и коментари в Word.
        </p>
        <Steps
          items={[
            { title: 'Инсталирай', body: <p>Microsoft AppSource, листинг <strong>Claude for Microsoft 365</strong>, бутон <strong>Get it now</strong>. Един листинг покрива и четирите приложения.</p> },
            { title: 'Активирай', body: <p>Отвори приложението. Windows: Home → Add-ins. Mac: Tools → Add-ins. Влез с Claude акаунта си.</p> },
            { title: 'Провери версията', body: <p>Excel и PowerPoint: web, Windows с Microsoft 365 build 16.0.13127.20296 или по-нов, Mac 16.46 или по-нов. Word: Windows версия 2205 или по-нова, Mac 16.61 или по-нов. Не работи на Excel 2016 и 2019 с постоянен лиценз, на iPad и Android.</p> },
            { title: 'Задай инструкции', body: <p>Settings в страничния панел на add-in-а → Instructions. Отделни за всяко приложение: "числата с разделител за хиляди" в Excel, "по един ред на bullet" в PowerPoint, "официален тон" в Word.</p> },
          ]}
        />
        <div className="grid-2">
          <div className="panel">
            <h3>Какво получаваш</h3>
            <ul>
              <li>Общ контекст между Excel, PowerPoint, Word и Outlook: "вземи обобщената таблица от работната книга и я сложи на слайд 3", без копиране.</li>
              <li>Диктовка на промпта вместо писане.</li>
              <li>Connectors и skills работят и тук.</li>
              <li>Дълги разговори се компактират автоматично, историята се пази локално в add-in-а.</li>
              <li>Разходът се брои към твоя Claude план.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>За какво внимаваш</h3>
            <ul>
              <li>Външни файлове (шаблони от интернет, файлове от контрагенти) може да носят скрити инструкции. Потвърждавай рисковите операции внимателно.</li>
              <li>Не за финални клиентски материали без човешки преглед. Не за одиторски изчисления без проверка.</li>
              <li>Excel add-in-ът не пипа data tables, макроси и VBA.</li>
              <li>Винаги на копие, когато промяната е голяма. Детайли по приложения в <Link to="/spreadsheets">раздел 6</Link>, <Link to="/presentations">7</Link> и <Link to="/documents">8</Link>.</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block title="Quick entry: Claude върху всяко приложение">
        <ul>
          <li>Mac: двойно натискане на Option отваря поле за Claude над текущото приложение. Алтернатива: Option+Space или своя комбинация, от Settings → General.</li>
          <li>Скрийншот или избор на прозорец с едно кликване, после въпросът: "какво не е наред в тази формула", "преведи този имейл", "обобщи този договор на екрана".</li>
          <li>Caps Lock за диктовка (изключена по подразбиране, macOS 14+). Иска разрешения за запис на екрана, достъпност и разпознаване на реч в System Settings → Privacy &amp; Security.</li>
          <li>Налично на всички планове, включително безплатния.</li>
        </ul>
      </Block>

      <Callout kind="rule">
        Редът на избор: файл или connector, после add-in, после браузър, накрая computer use. Всяка следваща стъпка е по-бавна, по-скъпа и с повече
        начини да се обърка. Проверката на резултата е същата навсякъде: <Link to="/verify">раздел 10</Link>.
      </Callout>

      <Pager current="/browser" />
    </>
  )
}
