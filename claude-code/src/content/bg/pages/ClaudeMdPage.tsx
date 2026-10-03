import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function ClaudeMdPage() {
  return (
    <>
      <PageHead
        mark="3"
        title="CLAUDE.md и памет"
        lede="Цел: Claude да знае за проекта това, което не може да прочете от кода, и нищо повече."
        chips={['CLAUDE.md', 'CLAUDE.local.md', '.claude/rules/', 'auto memory', '@import']}
      />

      <Block title="Какво е CLAUDE.md">
        <p>
          Markdown файл, който Claude чете в началото на всяка сесия. Дългосрочната памет на проекта: команди за build и тест,
          стил, който се различава от стандартния, правила за branch-ове и PR-и, известни капани. Няма задължителен формат.
          Генерираш начален с <Cmd>/init</Cmd>, после го поддържаш като код.
        </p>
      </Block>

      <Block title="Къде живее и как се зарежда">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Файл</th><th>Обхват</th><th>Кога се зарежда</th><th>В git?</th></tr></thead>
            <tbody>
              <tr><td className="k">~/.claude/CLAUDE.md</td><td>Всички твои проекти</td><td>Винаги</td><td>не</td></tr>
              <tr><td className="k">./CLAUDE.md</td><td>Проектът, споделен с екипа</td><td>Винаги</td><td>да</td></tr>
              <tr><td className="k">./CLAUDE.local.md</td><td>Проектът, само за теб</td><td>Винаги</td><td>не</td></tr>
              <tr><td className="k">packages/api/CLAUDE.md</td><td>Подпапка (monorepo)</td><td>Когато Claude работи там</td><td>да</td></tr>
              <tr><td className="k">.claude/rules/*.md</td><td>Правила за определени пътища</td><td>Когато отвори файл по шаблона в paths:</td><td>да</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Файловете са адитивни: всички нива се събират. Провери с <Cmd>/context</Cmd>, че са заредени.</p>
      </Block>

      <Block title="Какво да има вътре и какво не">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Включи</th><th>Изключи</th></tr></thead>
            <tbody>
              <tr><td>Bash команди, които Claude не може да познае (build, test, lint, миграции)</td><td>Всичко, което се вижда от кода</td></tr>
              <tr><td>Стил, който се различава от подразбирания за езика</td><td>Стандартни конвенции, които моделът знае</td></tr>
              <tr><td>Как се пускат тестове и кой runner</td><td>Подробна API документация (дай линк)</td></tr>
              <tr><td>Правила за branch-ове, commit съобщения, PR-и</td><td>Неща, които се сменят често</td></tr>
              <tr><td>Архитектурни решения, специфични за проекта</td><td>Дълги обяснения и уроци</td></tr>
              <tr><td>Особености на средата (env променливи, портове)</td><td>Описание файл по файл</td></tr>
              <tr><td>Капани и неочевидно поведение</td><td>"Пиши чист код" и други очевидности</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="rule">
          За всеки ред питай: "Ако го махна, ще сгреши ли Claude?" Ако не, режи. Дълъг CLAUDE.md кара Claude да игнорира и важните
          правила. Ако едно правило системно се пропуска, добави "IMPORTANT" само на него. Ако подчертаеш десет реда, нито един не
          изпъква.
        </Callout>
      </Block>

      <Block title="Примерен CLAUDE.md за Node/TypeScript проект">
        <Code title="CLAUDE.md">{`# Проект: Kabuto CMS (API + admin)

## Команди
- npm run dev            # API на :3000, admin на :5173
- npm test               # vitest; пускай единични файлове: npm test -- src/x.test.ts
- npm run typecheck      # tsc --noEmit, задължително преди commit
- npm run lint           # eslint + prettier check
- npm run db:migrate     # Prisma миграции; НИКОГА db:reset без изрично одобрение

## Стил
- ES modules, без CommonJS. Деструктурирай импортите.
- Коментари само за "защо", не за "какво". Без очевидни коментари.
- Без дълго тире (em dash) в текстове и съобщения; ползвай запетая или точка.

## Git
- Branch: feature/<linear-id>-<кратко>, напр. feature/KAB-123-retry-webhook
- Commit: императив, под 72 знака, тяло с "защо". Без "WIP".
- PR през gh. Не мърджвай: мърджва човек след преглед.

## Капани
- src/legacy/ не се пипа без задача, която изрично го иска.
- Тестовете за плащания ползват Stripe test mode; ключовете са в .env (не ги чети).

## При компактиране запази
- списъка с променените файлове и командите за тестове, които са пускани`}</Code>
      </Block>

      <Block title="Импорти и правила по пътища">
        <Code title="CLAUDE.md с импорти">{`Виж общите правила на екипа: @docs/engineering-rules.md
Конвенции за API: @packages/api/CONVENTIONS.md`}</Code>
        <Code title=".claude/rules/database.md">{`---
paths: ["prisma/**", "src/db/**"]
---
- Всяка промяна в схемата идва с миграция и с обновен seed.
- Никога не променяй стари миграции; добавяй нова.`}</Code>
        <p>Правилата по пътища се зареждат само когато Claude отвори съвпадащ файл. Така контекстът не се пълни с правила за база данни, докато пипаш CSS.</p>
      </Block>

      <Block title="Auto memory: това, което Claude сам запомня">
        <ul>
          <li>Между сесиите Claude си води бележки (MEMORY.md) за наученото: предпочитания, решения, особености.</li>
          <li><Cmd>/memory</Cmd> показва записите, включва/изключва функцията и отваря CLAUDE.md файловете за редакция.</li>
          <li>Можеш да кажеш "запомни, че винаги пускаме миграциите през docker compose" и бележката остава за следващата сесия.</li>
          <li>Auto memory е лично. Всичко, което екипът трябва да знае, отива в CLAUDE.md, не в паметта.</li>
        </ul>
      </Block>

      <Block title="Поддръжка: CLAUDE.md е код">
        <ul>
          <li>Всеки път, когато Claude направи повтаряща се грешка, добави ред. Създателят на Claude Code обновява екипния CLAUDE.md няколко пъти седмично.</li>
          <li>Веднъж месечно: <Cmd>/doctor</Cmd> предлага какво може да се изреже, защото се извежда от кода.</li>
          <li>Ако Claude пита неща, които са в CLAUDE.md, формулировката е двусмислена. Пренапиши я.</li>
          <li>Работни процеси, които трябват само понякога (напр. release процедура), не са за CLAUDE.md. Те са <Link to="/skills">skills</Link> и се зареждат при нужда.</li>
          <li>Нещо, което трябва да става винаги и без изключение (форматиране, забрана за запис в migrations/), не е инструкция, а <Link to="/hooks">hook</Link>.</li>
        </ul>
      </Block>
      <Pager current="/claude-md" />
    </>
  )
}
