import { articles, communityVideos, officialDocs, officialVideos, tools } from '../data/resources'
import { Block, Callout, PageHead, Pager, ResourceList } from '../../../components/Bits'

export function ResourcesPage() {
  return (
    <>
      <PageHead
        mark="▶"
        title="Видеа, статии, документация"
        lede="Подбрани и проверени ресурси. Подредени в реда, в който да ги минеш: първо официалните, после практиците."
        chips={['линковете са проверени на 3 октомври 2026', 'английски']}
      />

      <Callout kind="tip" title="Ред за гледане">
        1) Introducing Cowork (официално, кратко). 2) Jeff Su: Top 5 Tips. 3) Tina Huang: Fundamentals in 22 Minutes.
        4) Официалните best practices като четиво. 5) По едно практическо видео на седмица. Всичко друго е по интерес.
      </Callout>

      <Block title="Официални видеа (Anthropic / Claude)">
        <ResourceList items={officialVideos} />
      </Block>

      <Block title="Видеа от практици">
        <ResourceList items={communityVideos} />
        <p className="muted small">Заглавията и каналите са проверени през YouTube. Съдържанието е на авторите; препоръките тук се основават на съвпадение с официалните практики.</p>
      </Block>

      <Block title="Официална документация: страниците, които ще отваряш">
        <ResourceList items={officialDocs} />
      </Block>

      <Block title="Статии">
        <ResourceList items={articles} />
      </Block>

      <Block title="Инструменти">
        <ResourceList items={tools} />
      </Block>

      <Block title="Да останеш в крак">
        <ul>
          <li>Changelog на приложението след всеки ъпдейт: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">claude.com/docs/cowork/changelog</a>. Функциите в този наръчник са актуални към октомври 2026.</li>
          <li>Блогът на Claude: <a href="https://claude.com/blog" target="_blank" rel="noreferrer">claude.com/blog</a>. Там излизат новите connectors, plugins и Office функции.</li>
          <li>Помощният център: <a href="https://support.claude.com" target="_blank" rel="noreferrer">support.claude.com</a>. Търси по името на функцията.</li>
          <li>Jeff Su и Tina Huang пускат клипове при всяка по-голяма промяна в Cowork.</li>
        </ul>
      </Block>

      <Pager current="/resources" />
    </>
  )
}
