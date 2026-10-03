import type { Resource } from '../../../data/types'

// Всички линкове са проверени на 3 октомври 2026.
export const officialVideos: Resource[] = [
  { kind: 'video', title: 'How Claude Code Works', by: 'Claude (официален канал)', url: 'https://www.youtube.com/watch?v=6bs5b4FltCU', note: 'Кратко официално обяснение на agentic loop-а: как Claude чете, планира, редактира и проверява. Гледай първо.' },
  { kind: 'video', title: 'The Explore → Plan → Code → Commit workflow in Claude Code', by: 'Claude (официален канал)', url: 'https://www.youtube.com/watch?v=xJQuF02NAK8', note: 'Официалната демонстрация на препоръчания процес: изследване в plan mode, план, изпълнение, commit. Основата на раздел 4.' },
  { kind: 'video', title: 'Mastering Claude Code in 30 Minutes (Boris Cherny, Code with Claude 2025)', by: 'качване на BeastAI', url: 'https://www.youtube.com/watch?v=B_KAEqiC-0Q', note: 'Workshop-ът на създателя на Claude Code: CLAUDE.md, разрешения, slash команди, паралелни сесии, headless. Най-плътните 30 минути по темата. Оригиналът е от конференцията Code with Claude.' },
  { kind: 'video', title: 'Introducing Cowork: Claude Code for the rest of your work', by: 'Anthropic', url: 'https://www.youtube.com/watch?v=UAmKyyZ-b9E', note: 'Как същият агент се ползва извън кода. Полезно за документация, отчети и Linear.' },
]

export const communityVideos: Resource[] = [
  { kind: 'video', title: 'FULL Claude Code Tutorial for Beginners in 2026! (Step-By-Step)', by: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=qYqIhX9hTQk', note: 'Пълен начален курс: инсталация, първи задачи, CLAUDE.md, режими. Ако започваш от нулата.' },
  { kind: 'video', title: 'I Have Spent 1000+ Hours With Claude Code. This Is What I Learned', by: 'The Coding Sloth', url: 'https://www.youtube.com/watch?v=YAsxyoTWFDA', note: 'Опит от дълга практика: кое работи, кое не, как да не губиш време.' },
  { kind: 'video', title: 'How I use Claude Code (Meta L7 Senior Staff Engineer Tips)', by: 'John Kim', url: 'https://www.youtube.com/watch?v=mZzhfPle9QU', note: 'Как опитен инженер вгражда Claude Code в дисциплиниран процес: малки стъпки, преглед, тестове.' },
  { kind: 'video', title: '5 Claude Code skills I use every single day', by: 'Matt Pocock', url: 'https://www.youtube.com/watch?v=EJyuu6zlQCg', note: 'Конкретни skills за ежедневна работа. Добро допълнение към раздел 11.' },
  { kind: 'video', title: 'Every Claude Code Concept Explained for Normal People', by: 'Simon Scrapes', url: 'https://www.youtube.com/watch?v=ZlDnsf_DOzg', note: 'Понятията (skills, subagents, hooks, MCP) с прости думи. Ако речникът ти се струва много.' },
  { kind: 'video', title: '800+ hours of Learning Claude Code in 8 minutes', by: 'Edmund Yong', url: 'https://www.youtube.com/watch?v=Ffh9OeJ7yxw', note: 'Бърз преглед на по-малко известни трикове.' },
  { kind: 'video', title: 'Claude Code Tutorial - Build Apps 10x Faster with AI', by: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=IuyVVtr1uhY', note: 'Класически структуриран урок, подходящ за първата седмица.' },
  { kind: 'video', title: 'I was wrong about Claude Code (UPDATED AI workflow tutorial)', by: 'Chris Raroque', url: 'https://www.youtube.com/watch?v=gNR3XI5Eb0k', note: 'Честен поглед върху смяната на работния процес и грешките по пътя.' },
  { kind: 'video', title: 'Claude Agent SDK [Full Workshop]', by: 'Thariq Shihipar, Anthropic', url: 'https://www.youtube.com/watch?v=TqC1qOfiVcQ', note: 'За когато поискаш да вградиш същия агент в собствен инструмент. Напреднало.' },
]

export const officialDocs: Resource[] = [
  { kind: 'docs', title: 'Best practices for Claude Code', url: 'https://code.claude.com/docs/en/best-practices', note: 'Официалните добри практики. Най-важната страница в документацията. Голяма част от този наръчник стъпва на нея.' },
  { kind: 'docs', title: 'How Claude Code works', url: 'https://code.claude.com/docs/en/how-claude-code-works', note: 'Agentic loop, инструменти, управление на контекста.' },
  { kind: 'docs', title: 'Explore the context window', url: 'https://code.claude.com/docs/en/context-window', note: 'Интерактивна разходка: какво се зарежда при старт и колко струва всяко четене на файл.' },
  { kind: 'docs', title: 'Common workflows', url: 'https://code.claude.com/docs/en/common-workflows', note: 'Рецепти стъпка по стъпка: дебъгване, тестове, PR-и, документация.' },
  { kind: 'docs', title: 'Prompt library за Claude Code', url: 'https://code.claude.com/docs/en/prompt-library', note: 'Готови промптове за чести задачи.' },
  { kind: 'docs', title: 'CLAUDE.md и памет', url: 'https://code.claude.com/docs/en/memory', note: 'Къде живеят файловете, @import синтаксис, .claude/rules/.' },
  { kind: 'docs', title: 'Commands (пълен списък)', url: 'https://code.claude.com/docs/en/commands', note: 'Актуалният списък на всички slash команди с версии.' },
  { kind: 'docs', title: 'Interactive mode (клавиши)', url: 'https://code.claude.com/docs/en/interactive-mode', note: 'Всички клавишни комбинации, shell mode, опашка от съобщения, /btw, /diff.' },
  { kind: 'docs', title: 'CLI reference', url: 'https://code.claude.com/docs/en/cli-reference', note: 'Всички флагове: --model, --permission-mode, -p, --worktree, --resume.' },
  { kind: 'docs', title: 'Permission modes', url: 'https://code.claude.com/docs/en/permission-modes', note: 'Manual, accept edits, plan, auto, bypass. Кога кой.' },
  { kind: 'docs', title: 'Configure permissions', url: 'https://code.claude.com/docs/en/permissions', note: 'Синтаксис на allow/deny правилата.' },
  { kind: 'docs', title: 'Settings files and precedence', url: 'https://code.claude.com/docs/en/settings', note: 'User, project, local, managed. Кое печели при конфликт.' },
  { kind: 'docs', title: 'Automate actions with hooks', url: 'https://code.claude.com/docs/en/hooks-guide', note: 'Ръководство с примери. Референцията е на /hooks.' },
  { kind: 'docs', title: 'Hooks reference', url: 'https://code.claude.com/docs/en/hooks', note: 'Всички събития, вход/изход, exit кодове.' },
  { kind: 'docs', title: 'Create custom subagents', url: 'https://code.claude.com/docs/en/sub-agents', note: 'Формат на .claude/agents/*.md и всички frontmatter полета.' },
  { kind: 'docs', title: 'Extend Claude with skills', url: 'https://code.claude.com/docs/en/skills', note: 'SKILL.md, аргументи, disable-model-invocation, динамично съдържание.' },
  { kind: 'docs', title: 'Connect Claude Code to tools via MCP', url: 'https://code.claude.com/docs/en/mcp', note: 'claude mcp add, обхвати, автентикация, .mcp.json.' },
  { kind: 'docs', title: 'Run parallel sessions with worktrees', url: 'https://code.claude.com/docs/en/worktrees', note: 'claude -w, изолация, почистване.' },
  { kind: 'docs', title: 'Run Claude Code programmatically (headless)', url: 'https://code.claude.com/docs/en/headless', note: 'claude -p, output формати, --allowedTools, --max-turns.' },
  { kind: 'docs', title: 'Claude Code GitHub Actions', url: 'https://code.claude.com/docs/en/github-actions', note: '@claude в PR-и и issues.' },
  { kind: 'docs', title: 'Checkpointing (rewind)', url: 'https://code.claude.com/docs/en/checkpointing', note: 'Какво връща /rewind и какво не.' },
  { kind: 'docs', title: 'Manage sessions', url: 'https://code.claude.com/docs/en/sessions', note: '--continue, --resume, имена на сесии.' },
  { kind: 'docs', title: 'Manage costs effectively', url: 'https://code.claude.com/docs/en/costs', note: 'Как да харчиш по-малко токени без да губиш качество.' },
  { kind: 'docs', title: 'Keep Claude working toward a goal (/goal)', url: 'https://code.claude.com/docs/en/goal', note: 'Как работи оценителят на целта.' },
  { kind: 'docs', title: 'Use Claude Code with Chrome', url: 'https://code.claude.com/docs/en/chrome', note: 'Claude тества UI-а в твоя браузър.' },
  { kind: 'docs', title: 'Extend Claude Code (кое разширение кога)', url: 'https://code.claude.com/docs/en/features-overview', note: 'Таблица skills vs subagents vs hooks vs MCP.' },
  { kind: 'docs', title: 'Glossary', url: 'https://code.claude.com/docs/en/glossary', note: 'Официалният речник на английски.' },
  { kind: 'docs', title: 'Linear MCP документация', url: 'https://linear.app/docs/mcp', note: 'Сървърът на Linear, URL-и, read-only вариант, автентикация.' },
  { kind: 'docs', title: 'Prompt engineering overview (Claude API)', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', note: 'Общите принципи за промптове към Claude: ясно и директно, примери, XML тагове.' },
  { kind: 'docs', title: 'Use XML tags', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags', note: 'Как да отделяш контекст, инструкции и примери в дълъг промпт.' },
]

export const articles: Resource[] = [
  { kind: 'article', title: 'How the creator of Claude Code actually uses Claude Code (13 съвета на Boris Cherny)', by: 'Push to Prod', url: 'https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually', note: 'Паралелни сесии, plan mode първо, споделен CLAUDE.md, hooks за форматиране, /permissions вместо bypass, verification loop.' },
  { kind: 'article', title: 'Agentic Engineering Patterns', by: 'Simon Willison', url: 'https://simonwillison.net/guides/agentic-engineering-patterns/', note: 'Жив наръчник с шаблони: Red/Green TDD, първо пусни тестовете, git с агенти, subagents, анти-шаблони. Четиво за всяка седмица.' },
  { kind: 'article', title: 'AI Coding Notes #1: AI-Ready Tasks', by: 'Dan Leshem', url: 'https://aicoding.substack.com/p/ai-ready-tasks', note: 'Петте критерия за задача, която агент ще свърши добре. Основата на раздел 5 (Linear).' },
  { kind: 'article', title: 'Write issues, not user stories', by: 'Linear Method', url: 'https://linear.app/method/write-issues-not-user-stories', note: 'Как Linear пишат задачи: кратко, на прост език, една задача един човек.' },
  { kind: 'article', title: 'Linear Method (цялото ръководство)', by: 'Linear', url: 'https://linear.app/method', note: 'Философията за работа с цикли, проекти и задачи.' },
  { kind: 'article', title: 'How Anthropic teams use Claude Code', by: 'Anthropic', url: 'https://www.anthropic.com/news/how-anthropic-teams-use-claude-code', note: 'Реални примери от екипите на Anthropic: инфраструктура, сигурност, data science, продукт.' },
  { kind: 'article', title: 'Effective context engineering for AI agents', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', note: 'Защо контекстът е най-важният ресурс и как да го управляваш. Теорията зад /clear и subagents.' },
  { kind: 'article', title: 'Writing effective tools for agents, with agents', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents', note: 'Ако правиш собствени MCP инструменти или skills.' },
  { kind: 'article', title: 'Building agents with the Claude Agent SDK', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk', note: 'Същият harness, който движи Claude Code, като библиотека.' },
  { kind: 'article', title: 'Claude Code sandboxing', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/claude-code-sandboxing', note: 'Как работи изолацията и защо позволява по-малко въпроси за разрешение.' },
  { kind: 'article', title: 'How we built our multi-agent research system', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/multi-agent-research-system', note: 'Уроци за оркестрация на много агенти. Напреднало, но обяснява защо subagents връщат само резюме.' },
]

export const tools: Resource[] = [
  { kind: 'tool', title: 'anthropics/claude-code (GitHub)', url: 'https://github.com/anthropics/claude-code', note: 'Issues, changelog, примери.' },
  { kind: 'tool', title: 'anthropics/claude-code-action', url: 'https://github.com/anthropics/claude-code-action', note: 'GitHub Action за @claude в PR-и.' },
  { kind: 'tool', title: 'anthropics/skills', url: 'https://github.com/anthropics/skills', note: 'Официални skills за документи, таблици, презентации и др.' },
  { kind: 'tool', title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/introduction', note: 'Спецификацията и списъкът с MCP сървъри.' },
  { kind: 'tool', title: 'Linear + Claude интеграция', url: 'https://linear.app/integrations/claude', note: 'Официалната страница за свързване.' },
  { kind: 'tool', title: 'GitHub CLI (gh)', url: 'https://cli.github.com/', note: 'Задължително за PR-и от Claude. brew install gh, после gh auth login.' },
]
