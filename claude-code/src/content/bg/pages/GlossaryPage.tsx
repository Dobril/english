import { Link } from '../../../components/Link'
import { terms } from '../data/glossary'
import { PageHead, Pager } from '../../../components/Bits'

export function GlossaryPage() {
  return (
    <>
      <PageHead mark="¶" title="Речник" lede="Понятията, които се срещат в наръчника и в документацията, с кратко обяснение и към кой раздел водят." />
      <ul className="terms">
        {terms.map((t) => (
          <li key={t.term}>
            <div>
              <span className="term">{t.term}</span>
              {t.en && <span className="en">{t.en}</span>}
            </div>
            <div className="def">{t.def}</div>
            {t.page && <div className="small mt"><Link to={t.page}>към раздела →</Link></div>}
          </li>
        ))}
      </ul>
      <Pager current="/glossary" />
    </>
  )
}
