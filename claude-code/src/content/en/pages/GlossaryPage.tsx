import { Link } from '../../../components/Link'
import { terms } from '../data/glossary'
import { PageHead, Pager } from '../../../components/Bits'

export function GlossaryPage() {
  return (
    <>
      <PageHead mark="¶" title="Glossary" lede="The terms used in the handbook and the docs, with a short explanation and the section they lead to." />
      <ul className="terms">
        {terms.map((t) => (
          <li key={t.term}>
            <div>
              <span className="term">{t.term}</span>
              {t.en && <span className="en">{t.en}</span>}
            </div>
            <div className="def">{t.def}</div>
            {t.page && <div className="small mt"><Link to={t.page}>go to section →</Link></div>}
          </li>
        ))}
      </ul>
      <Pager current="/glossary" />
    </>
  )
}
