import { articles, communityVideos, officialDocs, officialVideos, tools } from '../data/resources'
import { Block, Callout, PageHead, Pager, ResourceList } from '../../../components/Bits'

export function ResourcesPage() {
  return (
    <>
      <PageHead
        mark="▶"
        title="Videos, articles, docs"
        lede="Selected and verified resources, in the order to go through them: official first, then practitioners."
        chips={['links verified on 3 October 2026', 'English']}
      />

      <Callout kind="tip" title="Watching order">
        1) Introducing Cowork (official, short). 2) Jeff Su: Top 5 Tips. 3) Tina Huang: Fundamentals in 22 Minutes.
        4) The official best practices as reading. 5) One practical video a week. Everything else by interest.
      </Callout>

      <Block title="Official videos (Anthropic / Claude)">
        <ResourceList items={officialVideos} />
      </Block>

      <Block title="Videos from practitioners">
        <ResourceList items={communityVideos} />
        <p className="muted small">Titles and channels were verified on YouTube. The content belongs to the authors; the recommendations here are based on agreement with the official practices.</p>
      </Block>

      <Block title="Official documentation: the pages you will open">
        <ResourceList items={officialDocs} />
      </Block>

      <Block title="Articles">
        <ResourceList items={articles} />
      </Block>

      <Block title="Tools">
        <ResourceList items={tools} />
      </Block>

      <Block title="Staying current">
        <ul>
          <li>The app changelog after every update: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">claude.com/docs/cowork/changelog</a>. The features in this handbook are current as of October 2026.</li>
          <li>The Claude blog: <a href="https://claude.com/blog" target="_blank" rel="noreferrer">claude.com/blog</a>. New connectors, plugins and Office features are announced there.</li>
          <li>The help centre: <a href="https://support.claude.com" target="_blank" rel="noreferrer">support.claude.com</a>. Search by the feature name.</li>
          <li>Jeff Su and Tina Huang publish a video at every major Cowork change.</li>
        </ul>
      </Block>

      <Pager current="/resources" />
    </>
  )
}
