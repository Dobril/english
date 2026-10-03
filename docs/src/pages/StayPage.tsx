import { dietRules, newsletters, sources } from '../data/stay'
import { PageHead } from '../components/Bits'

export function StayPage() {
  return (
    <>
      <PageHead
        mark="∞"
        title="Да останеш в крак, без да се удавиш"
        lede="Около два часа седмично. Повече от това е прокрастинация, преоблечена като учене."
      />
      <section className="grid-2">
        <div className="panel">
          <h3>Newsletters и блогове</h3>
          <ul>
            {newsletters.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a>: {l.note}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Първоизточници</h3>
          <ul>
            {sources.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a>: {l.note}</li>
            ))}
          </ul>
        </div>
        <div className="panel accent">
          <h3>Правила за информационна диета</h3>
          <ul>{dietRules.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </section>
    </>
  )
}
