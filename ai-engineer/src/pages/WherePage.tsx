import { Link } from 'react-router-dom'
import { PageHead } from '../components/Bits'

interface Box {
  title: string
  lang: 'python' | 'ts' | 'infra' | 'model'
  tools: string
  note: string
}

const rows: { label: string; boxes: Box[] }[] = [
  {
    label: 'Потребителят',
    boxes: [
      { title: 'Chat интерфейс', lang: 'ts', tools: 'Next.js, Vercel AI SDK (useChat)', note: 'Стрийминг на отговора, показване на извикани инструменти, бутони за feedback.' },
      { title: 'Бот в Slack / Telegram', lang: 'ts', tools: 'Node.js, Bolt или grammY, Vercel AI SDK', note: 'Каналът, историята по потребител, прости отговори директно от модела.' },
      { title: 'Вътрешен прототип', lang: 'python', tools: 'Streamlit, Gradio, Chainlit', note: 'За демо пред колеги за 30 минути. Не за продукт.' },
    ],
  },
  {
    label: 'API слой',
    boxes: [
      { title: 'AI backend', lang: 'python', tools: 'FastAPI, Pydantic, sse-starlette, httpx', note: 'Приема заявките, оркестрира retrieval, модел и инструменти, стриймва обратно. Центърът на системата.' },
      { title: 'Опашка и worker', lang: 'python', tools: 'arq или Celery, Redis', note: 'Ingestion на документи и дълги задачи извън заявката.' },
    ],
  },
  {
    label: 'Модел и инструменти',
    boxes: [
      { title: 'Cloud модел', lang: 'model', tools: 'Claude API, OpenAI API, през LiteLLM за fallback', note: 'Качеството и reasoning-ът. Плащаш на токен.' },
      { title: 'Локален или self-hosted модел', lang: 'model', tools: 'Ollama (разработка), vLLM (продукция на GPU)', note: 'Поверителност, цена при голям трафик, fine-tune-нати модели.' },
      { title: 'MCP сървъри', lang: 'ts', tools: 'MCP Python SDK или TypeScript SDK', note: 'Инструментите на агента: файлове, бази, вътрешни системи. Python, ако докосват данни; TypeScript, ако живеят до frontend или ще се ползват от Claude Code.' },
    ],
  },
  {
    label: 'Данни и retrieval',
    boxes: [
      { title: 'Ingestion pipeline', lang: 'python', tools: 'Docling, chunking код, sentence-transformers или embedding API', note: 'Парсва, реже, embed-ва, записва. Качеството на RAG се решава тук.' },
      { title: 'База с вектори', lang: 'infra', tools: 'Postgres + pgvector (или Qdrant)', note: 'Chunk-ове, вектори, full-text за hybrid, история на разговори, checkpoints на агенти.' },
      { title: 'Reranker', lang: 'python', tools: 'bge-reranker локално или Cohere Rerank', note: 'Преподрежда top-20 преди генерацията.' },
    ],
  },
  {
    label: 'Измерване и деплой',
    boxes: [
      { title: 'Tracing и evals', lang: 'python', tools: 'Langfuse, promptfoo, RAGAS, GitHub Actions', note: 'Всяка заявка е trace. Всяка промяна в prompt минава през eval suite в CI.' },
      { title: 'Инфраструктура', lang: 'infra', tools: 'Docker Compose, Redis, Sentry, един cloud', note: 'Всичко в контейнери. GPU се наема само когато трябва (Modal, RunPod).' },
      { title: 'Fine-tuning (отделно от продукцията)', lang: 'python', tools: 'Unsloth, TRL, Colab или нает GPU', note: 'Офлайн процес. Резултатът е модел, който се сервира през Ollama или vLLM.' },
    ],
  },
]

const langLabel = { python: 'Python', ts: 'TypeScript / Node', infra: 'инфраструктура', model: 'модел' }

export function WherePage() {
  return (
    <>
      <PageHead
        mark="⇄"
        title="Къде какво се ползва"
        lede="Типична AI система, разглобена на части, с езика и инструментите за всяка. Четеш отгоре надолу: от потребителя до данните."
        chips={['Python в средата', 'TypeScript по краищата', 'една база за всичко']}
      />

      <div className="legend">
        <span><i className="dot python" />Python</span>
        <span><i className="dot ts" />TypeScript / Node</span>
        <span><i className="dot model" />модел</span>
        <span><i className="dot infra" />инфраструктура</span>
      </div>

      <div className="arch">
        {rows.map((r, i) => (
          <div key={r.label} className="arch-row">
            <div className="arch-label">
              <span className="eyebrow">{r.label}</span>
              {i < rows.length - 1 && <span className="arch-arrow" aria-hidden="true">↓</span>}
            </div>
            <div className="arch-boxes">
              {r.boxes.map((b) => (
                <div key={b.title} className={`arch-box ${b.lang}`}>
                  <div className="arch-title">{b.title}</div>
                  <div className="arch-lang">{langLabel[b.lang]}</div>
                  <div className="arch-tools">{b.tools}</div>
                  <div className="muted small">{b.note}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="grid-2">
        <div className="panel">
          <h3>Python: къде и защо</h3>
          <ul>
            <li>Всичко, което докосва модел или данни: RAG сървър, ingestion, embeddings, reranking, агенти, evals, fine-tuning.</li>
            <li>Защо: всяка ML библиотека, всеки нов модел и всеки туториал излизат първо на Python. Пишеш на Python, за да не превеждаш.</li>
            <li>Какво значи "RAG сървър": FastAPI приложение, което приема въпрос, търси в pgvector, вика модела и връща отговор с цитати. Това е Python проект.</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Node.js: къде и защо</h3>
          <ul>
            <li>Интерфейси (Next.js с Vercel AI SDK), ботове за Slack и Telegram, MCP сървъри на TypeScript, edge функции, webhooks.</li>
            <li>Защо: екосистемата за UI е на JavaScript, стриймингът в браузъра е естествен там, и половината MCP сървъри са на TypeScript.</li>
            <li>Къде не се ползва: embeddings, chunking, reranking, fine-tuning, evals. Библиотеките или липсват, или са превод от Python с една версия назад.</li>
            <li>Кога стига сам: прост chat или асистент с инструменти, без RAG и без ingestion. Vercel AI SDK говори с Claude и OpenAI директно. Щом се появят документи, векторна база или evals, добавяш Python услуга.</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Как говорят помежду си</h3>
          <ul>
            <li>Node интерфейсът вика Python API-то по HTTP (REST или SSE за стрийминг). Нищо повече.</li>
            <li>Или: Node вика модела директно с инструмент search_docs, който отива към Python RAG endpoint. Моделът решава кога да търси.</li>
            <li>Общи неща: една Postgres база, един Redis, един Docker Compose. Проектът <Link to="/projects?p=node-bot">бот на Node</Link> показва точно това.</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Три типични системи</h3>
          <ul>
            <li><strong>Асистент за документи в компания:</strong> Next.js UI, FastAPI RAG, pgvector, Claude, Langfuse. Python 70%, TypeScript 30%.</li>
            <li><strong>Агент за автоматизация (support, обработка на заявки):</strong> FastAPI или LangGraph, MCP сървъри към вътрешните системи, опашка, човек в цикъла през Slack бот. Python 80%.</li>
            <li><strong>Продукт с AI функция в съществуващо Node приложение:</strong> Vercel AI SDK в Node за прости задачи, Python микроуслуга за RAG и evals. TypeScript 60%, Python 40%.</li>
          </ul>
        </div>
      </section>
    </>
  )
}
