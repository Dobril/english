import { papers } from '../data/papers'
import { PageHead } from '../components/Bits'

export function PapersPage() {
  return (
    <>
      <PageHead
        mark="¶"
        title="Papers, които си струва да прочетеш"
        lede="Започни от фаза 3 нататък, по един на две седмици. Чети abstract, фигурите, метода и ограниченията. Не е нужно да разбираш всяка формула."
        chips={[`${papers.length} papers`, 'по хронология']}
      />
      <ul className="papers">
        {papers.map((p) => (
          <li key={p.url}>
            <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a> <span className="y">{p.year}</span>
            <div className="why">{p.why}</div>
          </li>
        ))}
      </ul>
      <div className="panel">
        <h3>Как да четеш paper за 30 минути</h3>
        <ol>
          <li>Abstract и заключение: какво твърдят, че са постигнали.</li>
          <li>Фигурите и таблиците: какво са измерили и спрямо какво.</li>
          <li>Методът, само колкото да можеш да го обясниш с едно изречение.</li>
          <li>Ограничения и какво не са тествали. Там е истината.</li>
          <li>Едно изречение в дневника: приложимо ли е за мен и защо.</li>
        </ol>
      </div>
    </>
  )
}
