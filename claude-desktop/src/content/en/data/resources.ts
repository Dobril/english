import type { Resource } from '../../../data/types'

export const officialVideos: Resource[] = [
  { kind: 'video', title: 'Introducing Cowork: Claude Code for the rest of your work', by: 'Anthropic', url: 'https://www.youtube.com/watch?v=UAmKyyZ-b9E', note: 'The official introduction: what Cowork is and why it differs from chat. Watch first.' },
  { kind: 'video', title: 'Claude Cowork and chat are now one Claude', by: 'Claude (official channel)', url: 'https://www.youtube.com/watch?v=qMUf-jwSpMo', note: 'The merger of Chat and Cowork from September 2026. Explains why on Pro and Max you no longer look for a separate tab.' },
  { kind: 'video', title: 'Claude Cowork: coming to mobile and web', by: 'Claude (official channel)', url: 'https://www.youtube.com/watch?v=XNbc2HhL7J4', note: 'Cowork outside the desktop app: what works from the phone and what needs the computer open.' },
]

export const communityVideos: Resource[] = [
  { kind: 'video', title: 'Claude Cowork: Top 5 Tips for Productivity', by: 'Jeff Su', url: 'https://www.youtube.com/watch?v=4wvLHFgnQZQ', note: 'The five habits that change the result most: the folder in Obsidian, CLAUDE.md under 300 lines, the memory diet, moving Chat projects over, when a skill and when a project. The basis of sections 3 and 12.' },
  { kind: 'video', title: 'Claude Cowork Fundamentals In 22 Minutes', by: 'Tina Huang', url: 'https://www.youtube.com/watch?v=uGwDuvSqgYI', note: 'A dense introduction with real administrative tasks. A good second video.' },
  { kind: 'video', title: 'My Full Claude Cowork Setup (steal my workflows!)', by: 'Tina Huang', url: 'https://www.youtube.com/watch?v=gdrPkpXuNks', note: 'A complete setup: folders, instructions, skills, scheduled tasks. Once the basics are a habit.' },
  { kind: 'video', title: 'Claude Cowork Tutorial for Beginners', by: 'Kevin Stratvert', url: 'https://www.youtube.com/watch?v=1oYDEa5Edho', note: 'A calm step-by-step lesson for people who work in Office. If you start from zero.' },
  { kind: 'video', title: 'How to Use Claude Cowork (Step-by-Step Tutorial)', by: 'Kevin Stratvert', url: 'https://www.youtube.com/watch?v=YYr7hw5EAtk', note: 'Files, data analysis, connecting apps, automation. A continuation of the one above.' },
  { kind: 'video', title: 'Claude Cowork - Full Course for Beginners', by: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=tf_KmDNZXzI', note: 'A long course with many examples. For a weekend.' },
  { kind: 'video', title: 'Claude Cowork Full Tutorial: How to Use Claude Cowork Better Than 99% of People', by: 'Bart Slodyczka', url: 'https://www.youtube.com/watch?v=vMo-yRCN3QM', note: 'Practical tricks for briefs and organising the work.' },
  { kind: 'video', title: 'Full Claude Cowork Tutorial for Beginners', by: 'Coupler.io Academy', url: 'https://www.youtube.com/watch?v=wp84rp3RVQY', note: 'Focused on data analysis and spreadsheets. Complements section 6.' },
  { kind: 'video', title: 'I tested Claude Cowork for 24 hours - here\'s what actually works', by: 'No Code MBA', url: 'https://www.youtube.com/watch?v=KqfTQfklbYU', note: 'An honest assessment: what works first time and what does not.' },
  { kind: 'video', title: 'I got a private lesson on Claude Cowork & Claude Code', by: 'Greg Isenberg', url: 'https://www.youtube.com/watch?v=DW4a1Cm8nG4', note: 'A conversation about the mindset of delegating work, not just the buttons.' },
]

export const officialDocs: Resource[] = [
  { kind: 'docs', title: 'Get started with Claude Cowork', url: 'https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork', note: 'What Cowork is, plans, permission modes, limits, file deletion. The most important page.' },
  { kind: 'docs', title: 'Best practices for getting started with Claude Cowork', url: 'https://claude.com/blog/best-practices-for-getting-started-with-claude-cowork', note: 'The official best practices: when chat, when Cowork, the five ingredients of a good task, the "repeat my ask and ask questions" habit. Sections 1, 4 and 5 build on it.' },
  { kind: 'docs', title: 'Cowork overview (claude.com/docs)', url: 'https://claude.com/docs/cowork/overview', note: 'A short official overview with links to projects, Dispatch, plugins.' },
  { kind: 'docs', title: 'Organize work with projects (Cowork)', url: 'https://claude.com/docs/cowork/guide/projects', note: 'What a Cowork project holds and how it differs from a Chat project.' },
  { kind: 'docs', title: 'Run tasks in the background with Dispatch', url: 'https://claude.com/docs/cowork/guide/dispatch', note: 'Background agent, child tasks, assigning from the phone.' },
  { kind: 'docs', title: 'Schedule recurring tasks in Cowork', url: 'https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-cowork', note: 'Frequencies, creation, what scheduled tasks can and cannot do.' },
  { kind: 'docs', title: 'Use Claude Cowork on web, desktop, and mobile', url: 'https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile', note: 'What works where. Local things need the desktop app open.' },
  { kind: 'docs', title: 'Use the built-in browser in Claude Cowork', url: 'https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork', note: 'The built-in browser: permissions, importing logins, when Chrome instead.' },
  { kind: 'docs', title: 'Get started with Claude in Chrome', url: 'https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome', note: 'The extension for Chrome and Edge.' },
  { kind: 'docs', title: 'Use quick entry with Claude Desktop on Mac', url: 'https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac', note: 'Double-tap Option, screenshot, Caps Lock dictation, macOS permissions.' },
  { kind: 'docs', title: 'What are Projects?', url: 'https://support.claude.com/en/articles/9517075-what-are-projects', note: 'Chat projects: knowledge, instructions, sharing, limits.' },
  { kind: 'docs', title: 'Understanding Claude\'s personalization features', url: 'https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features', note: 'Account instructions, project instructions, skills: which for what.' },
  { kind: 'docs', title: 'Understanding usage and length limits', url: 'https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits', note: 'Limits, conversation length, how to save.' },
  { kind: 'docs', title: 'Get started with connectors', url: 'https://claude.com/docs/connectors/getting-started', note: 'Adding, turning on in a conversation, tool permissions, disconnect.' },
  { kind: 'docs', title: 'Connectors directory', url: 'https://claude.com/docs/connectors/directory', note: 'All verified and community connectors.' },
  { kind: 'docs', title: 'Skills overview', url: 'https://claude.com/docs/skills/overview', note: 'How skills work, Anthropic\'s built-in ones, turning them on.' },
  { kind: 'docs', title: 'Create custom skills', url: 'https://claude.com/docs/skills/how-to', note: 'SKILL.md, the references/ assets/ scripts/ folders, ZIP, testing. The basis of section 12.' },
  { kind: 'docs', title: 'Install plugins (Cowork)', url: 'https://claude.com/docs/cowork/guide/plugins', note: 'Marketplace, a GitHub repo as a marketplace, limits.' },
  { kind: 'docs', title: 'Claude for M365 overview', url: 'https://claude.com/docs/office-agents/overview', note: 'Excel, PowerPoint, Word, Outlook add-ins and working across them.' },
  { kind: 'docs', title: 'Use Claude for Excel', url: 'https://claude.com/docs/office-agents/excel', note: 'Capabilities, example prompts, limitations, installation.' },
  { kind: 'docs', title: 'Use Claude for PowerPoint', url: 'https://claude.com/docs/office-agents/powerpoint', note: 'Templates, per-slide edits, charts, example prompts.' },
  { kind: 'docs', title: 'Use Claude for Word', url: 'https://claude.com/docs/office-agents/word', note: 'Tracked changes, comments, redlines, templates.' },
  { kind: 'docs', title: 'Claude Desktop changelog', url: 'https://claude.com/docs/cowork/changelog', note: 'What is new in every version. The app changes weekly.' },
]

export const articles: Resource[] = [
  { kind: 'article', title: 'Top 5 Claude Cowork Tips I Wish I Knew from Day One', by: 'Jeff Su', url: 'https://www.jeffsu.org/top-5-claude-cowork-tips-i-wish-i-knew-from-day-one/', note: 'The text version of the video, with templates for CLAUDE.md and MEMORY.md.' },
  { kind: 'article', title: 'Learn 80% of Claude Cowork in Under 20 Minutes', by: 'Jeff Su', url: 'https://www.jeffsu.org/learn-80-of-claude-cowork-in-under-20-minutes/', note: 'The seven capabilities of Cowork with example briefs. Chat vs Cowork, settings, memory, connectors, skills, projects, scheduled tasks.' },
  { kind: 'article', title: 'Claude best practices 2026: the complete power user guide', by: 'The AI Corner', url: 'https://www.the-ai-corner.com/p/claude-best-practices-power-user-guide-2026', note: 'A file system for Cowork (ABOUT ME, PROJECTS, TEMPLATES, OUTPUTS), prompt structure, handoff documents.' },
  { kind: 'article', title: 'Claude Cowork: Practical Tips That Actually Make a Difference', by: 'Engincan Veske', url: 'https://engincanveske.substack.com/p/claude-cowork-practical-tips-that', note: 'Short practical notes from daily use.' },
  { kind: 'article', title: 'The 15 Best Claude Cowork Use Cases for Business in 2026', by: 'AI Agents Library', url: 'https://www.aiagentslibrary.com/blog/claude-cowork-use-cases/', note: 'A list of task ideas by department. For inspiration, not for process.' },
  { kind: 'article', title: 'Claude Desktop explained: chat, Cowork and Code', by: 'Clickforest', url: 'https://www.clickforest.com/en/blog/claude-desktop-explained', note: 'The three modes in one comparison with the dates of the 2026 changes.' },
]

export const tools: Resource[] = [
  { kind: 'tool', title: 'Claude Desktop (download)', url: 'https://claude.com/download', note: 'macOS and Windows.' },
  { kind: 'tool', title: 'Claude for Microsoft 365 on AppSource', url: 'https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview', note: 'One add-in for Excel, PowerPoint, Word and Outlook.' },
  { kind: 'tool', title: 'Claude in Chrome', url: 'https://claude.com/chrome', note: 'The extension for Chrome and Edge.' },
  { kind: 'tool', title: 'Anthropic skills (GitHub)', url: 'https://github.com/anthropics/skills/tree/main/skills', note: 'Working example skills: brand-guidelines, internal-comms, pdf, skill-creator. Copy the structure.' },
  { kind: 'tool', title: 'Agent Skills specification', url: 'https://agentskills.io/specification', note: 'The open standard for SKILL.md.' },
  { kind: 'tool', title: 'Obsidian', url: 'https://obsidian.md/', note: 'A free editor for .md files. Open the Cowork folder as a vault to read CLAUDE.md and MEMORY.md.' },
]
