import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function GitPage() {
  return (
    <>
      <PageHead
        mark="8"
        title="Git, PR и мърджване"
        lede="Цел: Claude да комитва и отваря PR-и, ти да решаваш какво влиза в main. С ясни правила кога има изключения."
        chips={['branch', 'commit', 'gh', 'PR', 'merge', 'worktree', 'rewind vs git']}
      />

      <Block title="Разпределение на ролите">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Действие</th><th>Кой</th><th>Защо</th></tr></thead>
            <tbody>
              <tr><td className="cat">Създаване на branch</td><td>Claude (или worktree при старта)</td><td>Механично. Правилото за имена е в CLAUDE.md.</td></tr>
              <tr><td className="cat">Commit</td><td>Claude, по твоя команда</td><td>Вижда целия diff и разговора, пише по-добро съобщение от теб. Но ти казваш кога.</td></tr>
              <tr><td className="cat">Push и PR</td><td>Claude през gh</td><td>Описанието на PR-а идва от същия контекст. Пести ти 10 минути на задача.</td></tr>
              <tr><td className="cat">Адресиране на коментари</td><td>Claude</td><td>"Виж коментарите по PR #45 и ги адресирай". Ти преглеждаш отговорите.</td></tr>
              <tr><td className="cat">Преглед на PR</td><td>Ти, плюс @claude в чист контекст</td><td>Човекът носи отговорността. Claude в PR-а хваща това, което авторът-Claude е пропуснал.</td></tr>
              <tr><td className="cat">Merge в main</td><td><strong>Ти</strong></td><td>Необратимо за екипа. Зелен CI плюс твоя преглед.</td></tr>
              <tr><td className="cat">Force push, rebase на споделен branch, изтриване</td><td>Никой автоматично</td><td>В deny списъка.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Да мърджва ли Claude: правилата">
        <Callout kind="rule" title="Подразбирано">
          Claude не мърджва. В CLAUDE.md пише "Не мърджвай: мърджва човек след преглед." В промпта за PR пише "Не мърджвай".
          Разрешенията не включват <code>gh pr merge</code>.
        </Callout>
        <p className="mt">Изключения, които ти решаваш и записваш в CLAUDE.md:</p>
        <ul>
          <li><strong>Личен проект без екип</strong>: може Claude да мърджва след зелен CI и твое "ок" в сесията. Пак си прочел diff-а.</li>
          <li><strong>Механични PR-и</strong> (форматиране, dependency bump с минали тестове, генерирани файлове): може, с етикет и правило в CLAUDE.md.</li>
          <li><strong>Фонови задачи</strong> (<Cmd>/autofix-pr</Cmd>, routines): те бутат поправки в branch-а, не мърджват.</li>
        </ul>
        <p>Основанието: мърджът е единственото действие в процеса, което засяга всички и не се връща с /rewind. Всичко друго Claude може да прави свободно, защото branch-ът е негов пясъчник.</p>
      </Block>

      <Block title="Правила за branch-ове и commit-и (в CLAUDE.md)">
        <Code title="CLAUDE.md, секция Git">{`## Git
- Винаги в branch. Никога commit директно в main.
- Branch: feature/<linear-id>-<кратко>, fix/<linear-id>-<кратко>
- Commit: императив, под 72 знака в заглавието, празен ред, "защо" в тялото.
- Един логически commit на стъпка. Без "WIP", без "fix" без контекст.
- Комитвай само когато те помоля или когато задачата изрично го иска.
- PR през gh: заглавие като commit-а, описание с какво/защо/как е тествано/линк към задачата.
- Не мърджвай. Не прави force push. Не трий branch-ове.`}</Code>
        <p>Claude Code добавя ред за съавторство в commit съобщенията. Ако екипът не го иска, запиши го в CLAUDE.md.</p>
      </Block>

      <Block title="Типични промптове">
        <Code title="commit">{`Комитни текущите промени. Разгледай git diff и git log -5 за стила.
Едно съобщение, императив, с "защо" в тялото. Не добавяй файлове извън задачата.`}</Code>
        <Code title="PR">{`Push-ни branch-а и отвори PR към main през gh pr create. Заглавие под 70 знака.
Описание: Какво / Защо / Как е тествано (с командите) / Linear: KAB-123. Не мърджвай.`}</Code>
        <Code title="коментари от ревю">{`Виж коментарите по PR #45 (gh pr view 45 --comments и gh api за review threads).
За всеки: или го адресирай с промяна, или ми обясни защо не си съгласен. Не бутай, преди да прегледам.`}</Code>
        <Code title="конфликт">{`Rebase-ни branch-а върху main и разреши конфликтите, като запазиш поведението и от двете страни.
Пусни тестовете след това. Покажи ми конфликтните места и как си ги решил.`}</Code>
      </Block>

      <Block title="@claude в GitHub">
        <ul>
          <li><Cmd>/install-github-app</Cmd> инсталира Claude GitHub App и по желание workflow файла.</li>
          <li>След това в PR или issue: "@claude прегледай този PR за race conditions" или "@claude имплементирай това issue".</li>
          <li>Прегледът от GitHub Action е в чист контекст: не е виждал как е писан кодът. Затова хваща различни неща от сесията.</li>
          <li>Boris Cherny добавя и правило: когато @claude хване анти-шаблон, записва го в CLAUDE.md, за да не се повтаря.</li>
        </ul>
      </Block>

      <Block title="Worktrees за паралелни задачи">
        <Code title="терминал">{`claude -w KAB-123          # нов worktree в .claude/worktrees/KAB-123 на branch worktree-KAB-123
claude -w KAB-123 -r       # resume на същия
git worktree list          # какво има
git worktree remove .claude/worktrees/KAB-123`}</Code>
        <ul>
          <li>Всяка сесия в собствено копие на репото: редакциите не се бият.</li>
          <li>Claude блокира опити от worktree да пипа главния checkout.</li>
          <li><code>.worktreeinclude</code> копира gitignored файлове (.env) във всеки нов worktree.</li>
          <li>При изход Claude пита дали да запази или изтрие worktree-то. Повече в <Link to="/parallel">раздел 13</Link>.</li>
        </ul>
      </Block>

      <Block title="Rewind не е git">
        <ul>
          <li><Cmd>/rewind</Cmd> (Esc Esc) връща файловете към checkpoint преди даден твой промпт. Следи само промени през инструментите на Claude, не през Bash команди или външни процеси.</li>
          <li>Ползвай го за "пробвай рисковото, ако не стане, връщаме". Не го ползвай като замяна на commit.</li>
          <li>Малки commit-и на всяка работеща стъпка са най-сигурната мрежа. Поискай ги в промпта за рефакторинг.</li>
        </ul>
      </Block>

      <Block title="Разрешения за git в settings.json">
        <Code title=".claude/settings.json (откъс)">{`"allow": [
  "Bash(git status *)", "Bash(git diff *)", "Bash(git log *)", "Bash(git branch *)",
  "Bash(git checkout -b *)", "Bash(git add *)", "Bash(git commit *)", "Bash(git push -u origin *)",
  "Bash(gh pr create *)", "Bash(gh pr view *)", "Bash(gh pr diff *)", "Bash(gh pr list *)"
],
"deny": [
  "Bash(git push --force *)", "Bash(git push -f *)", "Bash(git reset --hard *)",
  "Bash(git branch -D *)", "Bash(git clean *)", "Bash(gh pr merge *)"
]`}</Code>
      </Block>
      <Pager current="/git" />
    </>
  )
}
