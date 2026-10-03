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
        1) How Claude Code Works (5 мин). 2) Explore → Plan → Code → Commit. 3) Mastering Claude Code in 30 minutes.
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

      <Block title="Инструменти и репота">
        <ResourceList items={tools} />
      </Block>

      <Block title="Да останеш в крак">
        <ul>
          <li><code>/release-notes</code> след всеки ъпдейт. Claude Code се сменя седмично; командите в този наръчник са актуални към октомври 2026.</li>
          <li>Секция "What's new" в документацията: <a href="https://code.claude.com/docs/en/whats-new/index" target="_blank" rel="noreferrer">code.claude.com/docs/en/whats-new</a>.</li>
          <li>Engineering блогът на Anthropic: <a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">anthropic.com/engineering</a>.</li>
          <li>Simon Willison пише почти ежедневно за агентно програмиране: <a href="https://simonwillison.net/" target="_blank" rel="noreferrer">simonwillison.net</a>.</li>
        </ul>
      </Block>

      <Pager current="/resources" />
    </>
  )
}
