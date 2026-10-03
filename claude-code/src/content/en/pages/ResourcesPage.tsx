import { articles, communityVideos, officialDocs, officialVideos, tools } from '../data/resources'
import { Block, Callout, PageHead, Pager, ResourceList } from '../../../components/Bits'

export function ResourcesPage() {
  return (
    <>
      <PageHead
        mark="▶"
        title="Videos, articles, documentation"
        lede="Selected and verified resources. In the order to go through them: the official ones first, then the practitioners."
        chips={['links verified on 3 October 2026', 'English']}
      />

      <Callout kind="tip" title="Watching order">
        1) How Claude Code Works (5 min). 2) Explore → Plan → Code → Commit. 3) Mastering Claude Code in 30 minutes.
        4) The official best practices as reading. 5) One practical video a week. Everything else by interest.
      </Callout>

      <Block title="Official videos (Anthropic / Claude)">
        <ResourceList items={officialVideos} />
      </Block>

      <Block title="Videos from practitioners">
        <ResourceList items={communityVideos} />
        <p className="muted small">Titles and channels verified through YouTube. The content is the authors'; recommendations here are based on agreement with the official practices.</p>
      </Block>

      <Block title="Official documentation: the pages you will open">
        <ResourceList items={officialDocs} />
      </Block>

      <Block title="Articles">
        <ResourceList items={articles} />
      </Block>

      <Block title="Tools and repos">
        <ResourceList items={tools} />
      </Block>

      <Block title="Staying current">
        <ul>
          <li><code>/release-notes</code> after every update. Claude Code changes weekly; the commands in this handbook are current as of October 2026.</li>
          <li>The "What's new" section in the docs: <a href="https://code.claude.com/docs/en/whats-new/index" target="_blank" rel="noreferrer">code.claude.com/docs/en/whats-new</a>.</li>
          <li>Anthropic's engineering blog: <a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">anthropic.com/engineering</a>.</li>
          <li>Simon Willison writes almost daily about agentic programming: <a href="https://simonwillison.net/" target="_blank" rel="noreferrer">simonwillison.net</a>.</li>
        </ul>
      </Block>

      <Pager current="/resources" />
    </>
  )
}
