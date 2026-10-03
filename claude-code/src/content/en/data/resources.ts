import type { Resource } from '../../../data/types'

// All links verified on 3 October 2026.
export const officialVideos: Resource[] = [
  { kind: 'video', title: 'How Claude Code Works', by: 'Claude (official channel)', url: 'https://www.youtube.com/watch?v=6bs5b4FltCU', note: 'A short official explanation of the agentic loop: how Claude reads, plans, edits and verifies. Watch this first.' },
  { kind: 'video', title: 'The Explore → Plan → Code → Commit workflow in Claude Code', by: 'Claude (official channel)', url: 'https://www.youtube.com/watch?v=xJQuF02NAK8', note: 'The official demo of the recommended workflow: explore in plan mode, plan, implement, commit. The basis of section 4.' },
  { kind: 'video', title: 'Mastering Claude Code in 30 Minutes (Boris Cherny, Code with Claude 2025)', by: 'upload by BeastAI', url: 'https://www.youtube.com/watch?v=B_KAEqiC-0Q', note: 'The workshop by the creator of Claude Code: CLAUDE.md, permissions, slash commands, parallel sessions, headless. The densest 30 minutes on the topic. The original is from the Code with Claude conference.' },
  { kind: 'video', title: 'Introducing Cowork: Claude Code for the rest of your work', by: 'Anthropic', url: 'https://www.youtube.com/watch?v=UAmKyyZ-b9E', note: 'How the same agent is used outside code. Useful for documentation, reports and Linear.' },
]

export const communityVideos: Resource[] = [
  { kind: 'video', title: 'FULL Claude Code Tutorial for Beginners in 2026! (Step-By-Step)', by: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=qYqIhX9hTQk', note: 'A complete beginner course: installation, first tasks, CLAUDE.md, modes. If you are starting from zero.' },
  { kind: 'video', title: 'I Have Spent 1000+ Hours With Claude Code. This Is What I Learned', by: 'The Coding Sloth', url: 'https://www.youtube.com/watch?v=YAsxyoTWFDA', note: 'Lessons from long practice: what works, what does not, how not to waste time.' },
  { kind: 'video', title: 'How I use Claude Code (Meta L7 Senior Staff Engineer Tips)', by: 'John Kim', url: 'https://www.youtube.com/watch?v=mZzhfPle9QU', note: 'How an experienced engineer fits Claude Code into a disciplined process: small steps, review, tests.' },
  { kind: 'video', title: '5 Claude Code skills I use every single day', by: 'Matt Pocock', url: 'https://www.youtube.com/watch?v=EJyuu6zlQCg', note: 'Concrete skills for everyday work. A good companion to section 11.' },
  { kind: 'video', title: 'Every Claude Code Concept Explained for Normal People', by: 'Simon Scrapes', url: 'https://www.youtube.com/watch?v=ZlDnsf_DOzg', note: 'The concepts (skills, subagents, hooks, MCP) in plain words. If the glossary feels like a lot.' },
  { kind: 'video', title: '800+ hours of Learning Claude Code in 8 minutes', by: 'Edmund Yong', url: 'https://www.youtube.com/watch?v=Ffh9OeJ7yxw', note: 'A quick tour of less known tricks.' },
  { kind: 'video', title: 'Claude Code Tutorial - Build Apps 10x Faster with AI', by: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=IuyVVtr1uhY', note: 'A classic, well structured lesson for the first week.' },
  { kind: 'video', title: 'I was wrong about Claude Code (UPDATED AI workflow tutorial)', by: 'Chris Raroque', url: 'https://www.youtube.com/watch?v=gNR3XI5Eb0k', note: 'An honest look at changing your workflow and the mistakes along the way.' },
  { kind: 'video', title: 'Claude Agent SDK [Full Workshop]', by: 'Thariq Shihipar, Anthropic', url: 'https://www.youtube.com/watch?v=TqC1qOfiVcQ', note: 'For when you want to embed the same agent in your own tool. Advanced.' },
]

export const officialDocs: Resource[] = [
  { kind: 'docs', title: 'Best practices for Claude Code', url: 'https://code.claude.com/docs/en/best-practices', note: 'The official best practices. The most important page in the docs. Much of this handbook builds on it.' },
  { kind: 'docs', title: 'How Claude Code works', url: 'https://code.claude.com/docs/en/how-claude-code-works', note: 'Agentic loop, tools, context management.' },
  { kind: 'docs', title: 'Explore the context window', url: 'https://code.claude.com/docs/en/context-window', note: 'Interactive walkthrough: what loads at startup and what each file read costs.' },
  { kind: 'docs', title: 'Common workflows', url: 'https://code.claude.com/docs/en/common-workflows', note: 'Step-by-step recipes: debugging, tests, PRs, documentation.' },
  { kind: 'docs', title: 'Prompt library for Claude Code', url: 'https://code.claude.com/docs/en/prompt-library', note: 'Ready prompts for common tasks.' },
  { kind: 'docs', title: 'CLAUDE.md and memory', url: 'https://code.claude.com/docs/en/memory', note: 'Where the files live, @import syntax, .claude/rules/.' },
  { kind: 'docs', title: 'Commands (full list)', url: 'https://code.claude.com/docs/en/commands', note: 'The current list of all slash commands with versions.' },
  { kind: 'docs', title: 'Interactive mode (keys)', url: 'https://code.claude.com/docs/en/interactive-mode', note: 'All keyboard shortcuts, shell mode, message queue, /btw, /diff.' },
  { kind: 'docs', title: 'CLI reference', url: 'https://code.claude.com/docs/en/cli-reference', note: 'All flags: --model, --permission-mode, -p, --worktree, --resume.' },
  { kind: 'docs', title: 'Permission modes', url: 'https://code.claude.com/docs/en/permission-modes', note: 'Manual, accept edits, plan, auto, bypass. When to use which.' },
  { kind: 'docs', title: 'Configure permissions', url: 'https://code.claude.com/docs/en/permissions', note: 'Syntax of allow/deny rules.' },
  { kind: 'docs', title: 'Settings files and precedence', url: 'https://code.claude.com/docs/en/settings', note: 'User, project, local, managed. Which wins on conflict.' },
  { kind: 'docs', title: 'Automate actions with hooks', url: 'https://code.claude.com/docs/en/hooks-guide', note: 'Guide with examples. The reference is at /hooks.' },
  { kind: 'docs', title: 'Hooks reference', url: 'https://code.claude.com/docs/en/hooks', note: 'All events, input/output, exit codes.' },
  { kind: 'docs', title: 'Create custom subagents', url: 'https://code.claude.com/docs/en/sub-agents', note: 'Format of .claude/agents/*.md and all frontmatter fields.' },
  { kind: 'docs', title: 'Extend Claude with skills', url: 'https://code.claude.com/docs/en/skills', note: 'SKILL.md, arguments, disable-model-invocation, dynamic content.' },
  { kind: 'docs', title: 'Connect Claude Code to tools via MCP', url: 'https://code.claude.com/docs/en/mcp', note: 'claude mcp add, scopes, authentication, .mcp.json.' },
  { kind: 'docs', title: 'Run parallel sessions with worktrees', url: 'https://code.claude.com/docs/en/worktrees', note: 'claude -w, isolation, cleanup.' },
  { kind: 'docs', title: 'Run Claude Code programmatically (headless)', url: 'https://code.claude.com/docs/en/headless', note: 'claude -p, output formats, --allowedTools, --max-turns.' },
  { kind: 'docs', title: 'Claude Code GitHub Actions', url: 'https://code.claude.com/docs/en/github-actions', note: '@claude in PRs and issues.' },
  { kind: 'docs', title: 'Checkpointing (rewind)', url: 'https://code.claude.com/docs/en/checkpointing', note: 'What /rewind restores and what it does not.' },
  { kind: 'docs', title: 'Manage sessions', url: 'https://code.claude.com/docs/en/sessions', note: '--continue, --resume, session names.' },
  { kind: 'docs', title: 'Manage costs effectively', url: 'https://code.claude.com/docs/en/costs', note: 'How to spend fewer tokens without losing quality.' },
  { kind: 'docs', title: 'Keep Claude working toward a goal (/goal)', url: 'https://code.claude.com/docs/en/goal', note: 'How the goal evaluator works.' },
  { kind: 'docs', title: 'Use Claude Code with Chrome', url: 'https://code.claude.com/docs/en/chrome', note: 'Claude tests the UI in your browser.' },
  { kind: 'docs', title: 'Extend Claude Code (which extension when)', url: 'https://code.claude.com/docs/en/features-overview', note: 'Table: skills vs subagents vs hooks vs MCP.' },
  { kind: 'docs', title: 'Glossary', url: 'https://code.claude.com/docs/en/glossary', note: 'The official glossary.' },
  { kind: 'docs', title: 'Linear MCP documentation', url: 'https://linear.app/docs/mcp', note: 'Linear\'s server, URLs, read-only variant, authentication.' },
  { kind: 'docs', title: 'Prompt engineering overview (Claude API)', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', note: 'General principles for prompting Claude: clear and direct, examples, XML tags.' },
  { kind: 'docs', title: 'Use XML tags', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags', note: 'How to separate context, instructions and examples in a long prompt.' },
]

export const articles: Resource[] = [
  { kind: 'article', title: 'How the creator of Claude Code actually uses Claude Code (13 tips by Boris Cherny)', by: 'Push to Prod', url: 'https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually', note: 'Parallel sessions, plan mode first, shared CLAUDE.md, formatting hooks, /permissions instead of bypass, verification loop.' },
  { kind: 'article', title: 'Agentic Engineering Patterns', by: 'Simon Willison', url: 'https://simonwillison.net/guides/agentic-engineering-patterns/', note: 'A living guide of patterns: Red/Green TDD, run the tests first, git with agents, subagents, anti-patterns. Weekly reading.' },
  { kind: 'article', title: 'AI Coding Notes #1: AI-Ready Tasks', by: 'Dan Leshem', url: 'https://aicoding.substack.com/p/ai-ready-tasks', note: 'The five criteria for a task an agent will do well. The basis of section 5 (Linear).' },
  { kind: 'article', title: 'Write issues, not user stories', by: 'Linear Method', url: 'https://linear.app/method/write-issues-not-user-stories', note: 'How Linear writes issues: short, plain language, one issue one owner.' },
  { kind: 'article', title: 'Linear Method (the whole guide)', by: 'Linear', url: 'https://linear.app/method', note: 'The philosophy of working with cycles, projects and issues.' },
  { kind: 'article', title: 'How Anthropic teams use Claude Code', by: 'Anthropic', url: 'https://www.anthropic.com/news/how-anthropic-teams-use-claude-code', note: 'Real examples from Anthropic teams: infrastructure, security, data science, product.' },
  { kind: 'article', title: 'Effective context engineering for AI agents', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', note: 'Why context is the most important resource and how to manage it. The theory behind /clear and subagents.' },
  { kind: 'article', title: 'Writing effective tools for agents, with agents', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents', note: 'If you build your own MCP tools or skills.' },
  { kind: 'article', title: 'Building agents with the Claude Agent SDK', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk', note: 'The same harness that powers Claude Code, as a library.' },
  { kind: 'article', title: 'Claude Code sandboxing', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/claude-code-sandboxing', note: 'How isolation works and why it allows fewer permission prompts.' },
  { kind: 'article', title: 'How we built our multi-agent research system', by: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/multi-agent-research-system', note: 'Lessons on orchestrating many agents. Advanced, but explains why subagents return only a summary.' },
]

export const tools: Resource[] = [
  { kind: 'tool', title: 'anthropics/claude-code (GitHub)', url: 'https://github.com/anthropics/claude-code', note: 'Issues, changelog, examples.' },
  { kind: 'tool', title: 'anthropics/claude-code-action', url: 'https://github.com/anthropics/claude-code-action', note: 'GitHub Action for @claude in PRs.' },
  { kind: 'tool', title: 'anthropics/skills', url: 'https://github.com/anthropics/skills', note: 'Official skills for documents, spreadsheets, presentations and more.' },
  { kind: 'tool', title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/introduction', note: 'The spec and the list of MCP servers.' },
  { kind: 'tool', title: 'Linear + Claude integration', url: 'https://linear.app/integrations/claude', note: 'The official connection page.' },
  { kind: 'tool', title: 'GitHub CLI (gh)', url: 'https://cli.github.com/', note: 'Required for PRs from Claude. brew install gh, then gh auth login.' },
]
