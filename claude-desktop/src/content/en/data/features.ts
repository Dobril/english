import type { Feature } from '../../../data/types'

export const featureCategories = [
  'Ways of working',
  'Context, memory and personalisation',
  'Files and outputs',
  'Research and thinking',
  'Extensions: connectors, skills, plugins',
  'Automation and background work',
  'Browser and screen',
  'Office add-ins',
  'The app: sign-in, settings, account',
] as const

export const frequencyLabel = {
  daily: 'every day',
  often: 'often',
  rare: 'rarely',
  beta: 'beta / rollout',
} as const

export const features: Feature[] = [
  {
    name: 'Chat', category: 'Ways of working', surface: 'chat', frequency: 'daily',
    what: 'A conversation with Claude: questions, explanations, drafts, rewrites, quick analysis of an uploaded file.',
    when: 'When the output is a thought, a decision or a draft you will finish yourself, and it fits in a few exchanges.',
    tip: 'If by the third message you want a file someone else will open, switch to Cowork.',
  },
  {
    name: 'Cowork', category: 'Ways of working', surface: 'cowork', frequency: 'daily',
    what: 'An agent that works in multiple steps on folders on your computer and returns finished files: Excel with formulas, PowerPoint, Word, PDF, a dashboard.',
    when: 'When the output is a file you will hand to someone, or the task spans several files and apps.',
    tip: 'Five ingredients of a good Cowork task: many inputs, a file output, it recurs, clear success criteria, a boring middle.',
    url: 'https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork',
  },
  {
    name: 'Merged Chat + Cowork', category: 'Ways of working', surface: 'both', frequency: 'beta',
    what: 'On Pro and Max the two modes merge into one conversation: you start as chat and Claude moves to working on files when needed. New sessions run in the cloud and sync across devices.',
    when: 'If you see it in your account, do not look for a separate Cowork tab: pick Cowork in the message box or just describe the outcome.',
    tip: 'Access to local folders, the browser and the screen still needs the desktop app open.',
  },
  {
    name: 'Cowork on web and mobile', category: 'Ways of working', surface: 'cowork', frequency: 'often',
    what: 'Start, steer and review Cowork tasks from claude.ai and the mobile app. Sessions run in the cloud.',
    when: 'Checking progress and answering Claude\'s questions when you are away from the computer.',
    tip: 'Local files, local connectors and the browser work only while the desktop app is open on that computer.',
    url: 'https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile',
  },
  {
    name: 'Permission modes', category: 'Ways of working', surface: 'cowork', frequency: 'daily',
    what: 'Manual: asks before every action. Auto: a safety classifier approves routine actions and stops risky ones. Skip: no pauses and no checks.',
    when: 'Manual for new or sensitive tasks. Auto for familiar processes. Skip almost never.',
    tip: 'Deleting files always asks for an explicit Allow, whatever the mode. Auto uses more usage because of the extra checks.',
  },
  {
    name: 'Code (tab)', category: 'Ways of working', surface: 'system', frequency: 'rare',
    what: 'The third tab of the desktop app: Claude Code for programming.',
    when: 'Not covered by this handbook. See the separate Claude Code handbook.',
  },

  {
    name: 'Projects (Chat)', category: 'Context, memory and personalisation', surface: 'chat', frequency: 'daily',
    what: 'A workspace with instructions, knowledge files and its own chat history. On paid plans the knowledge is retrieved with RAG and holds up to 10 times more.',
    when: 'For a recurring kind of work: the monthly report, contracts with one client, internal policies. Every chat in the project starts with the context.',
    tip: 'Free accounts get up to 5 projects. On Team and Enterprise, projects are shared with view / edit rights.',
    url: 'https://support.claude.com/en/articles/9517075-what-are-projects',
  },
  {
    name: 'Cowork projects', category: 'Context, memory and personalisation', surface: 'cowork', frequency: 'often',
    what: 'A local project: folders, standing instructions, links, a linked Chat project and its own memory. Lives only on your computer.',
    when: 'For an area of work with permanent folders: "Invoices 2026", "Board decks", "Client X".',
    tip: 'Projects in the left navigation, "+": Start from scratch, Import a project or Use an existing folder. Archiving deletes the metadata, not the folders.',
    url: 'https://claude.com/docs/cowork/guide/projects',
  },
  {
    name: 'Memory', category: 'Context, memory and personalisation', surface: 'both', frequency: 'daily',
    what: 'Claude remembers your role, preferences and current projects across conversations. In Cowork the memory lives in MEMORY.md in the folder or project.',
    when: 'Turn it on once (Settings > Capabilities > Memory). Say "remember that..." for things you do not want to repeat.',
    tip: 'Memory diet: entries of 1 to 2 sentences, under 150 lines, old entries archived. Otherwise the important bits get lost.',
  },
  {
    name: 'Instructions for Claude', category: 'Context, memory and personalisation', surface: 'chat', frequency: 'often',
    what: 'Account-wide instructions: language, tone, role, default format.',
    when: 'Things that are true in every conversation. Everything else goes in a project or a skill.',
    tip: 'Keep it short. A rule Claude follows without it gets removed.',
  },
  {
    name: 'Global instructions (Cowork)', category: 'Context, memory and personalisation', surface: 'cowork', frequency: 'often',
    what: 'Standing guidance for every Cowork session: where to save, how to name files, what never to do.',
    when: 'Settings > Cowork > Edit Global Instructions. Once, then only for a problem that repeats.',
    tip: 'Example: "Never change originals. Save to OUTPUTS/ with the date in the name. Mark uncertain values VERIFY."',
  },
  {
    name: 'CLAUDE.md and folder instructions', category: 'Context, memory and personalisation', surface: 'cowork', frequency: 'often',
    what: 'A markdown file in the working folder that Claude reads at the start of a session: structure, rules, where things are.',
    when: 'When a folder is a permanent workplace. Under 300 lines, only things not visible from the files.',
    tip: 'Open the folder in Obsidian to read the .md files comfortably.',
  },
  {
    name: 'Styles', category: 'Context, memory and personalisation', surface: 'chat', frequency: 'rare',
    what: 'Preset or custom response styles (concise, formal, explanatory) for one conversation.',
    when: 'When the tone needs to differ from the usual without touching account instructions.',
  },

  {
    name: 'Artifacts', category: 'Files and outputs', surface: 'chat', frequency: 'daily',
    what: 'A side panel where Claude builds a document, table, slides or interactive app separately from the conversation. Versions, sharing by link.',
    when: 'When you want to edit and reuse the result apart from the chat.',
    tip: 'Live artifacts (Cowork) are dashboards with code behind them that refresh when opened.',
  },
  {
    name: 'File uploads', category: 'Files and outputs', surface: 'chat', frequency: 'daily',
    what: 'PDF, Word, Excel, CSV, images, decks in the conversation. Claude reads and analyses them.',
    when: 'Quick analysis of one or a few files when you do not need a new file back.',
    tip: 'Chat limits: about 20 files per conversation and 30 MB per file. For more: a folder in Cowork.',
  },
  {
    name: 'Local folder access', category: 'Files and outputs', surface: 'cowork', frequency: 'daily',
    what: 'You give Cowork one or more folders. It reads, creates, changes and organises files in them. The home folder, Documents or a whole drive are possible.',
    when: 'Every task on real files. Work on copies in a working folder, not on the only original.',
    tip: 'Individual files are read up to 50 MB. Deleting always asks for confirmation.',
  },
  {
    name: 'Creating Excel, Word, PowerPoint, PDF', category: 'Files and outputs', surface: 'both', frequency: 'daily',
    what: 'Anthropic\'s built-in skills (xlsx, docx, pptx, pdf) activate on their own when you ask for a file. Excel with working formulas and several sheets, decks from a template, documents with styles.',
    when: 'Whenever the output is a file. Ask for the format and template explicitly.',
    tip: 'Requires Settings > Capabilities > Code execution and file creation.',
  },
  {
    name: 'Google Docs, Sheets, Slides from the Output picker', category: 'Files and outputs', surface: 'both', frequency: 'often',
    what: 'Since September 2026 the result can be created directly as a Google document, spreadsheet or presentation in your Drive.',
    when: 'When the team works in Google Workspace and the file has to be shared immediately.',
  },
  {
    name: 'Open with Claude', category: 'Files and outputs', surface: 'system', frequency: 'rare',
    what: 'Claude appears in the operating system\'s "Open with" menu for common work files.',
    when: 'A quick start on a single file from Finder or Explorer.',
  },

  {
    name: 'Research', category: 'Research and thinking', surface: 'chat', frequency: 'often',
    what: 'Deep multi-step research on the web (and in your connected apps) with sources. Takes minutes and returns a report with citations.',
    when: 'Market overview, competitors, regulations, suppliers. When you want sources, not an opinion.',
    tip: 'You can type the next messages while Research runs. Check 2 or 3 sources yourself.',
  },
  {
    name: 'Web search', category: 'Research and thinking', surface: 'both', frequency: 'daily',
    what: 'Quick web search while answering.',
    when: 'Current facts, prices, dates. Turn it off for tasks on internal data so it does not bring in outside noise.',
  },
  {
    name: 'Extended thinking', category: 'Research and thinking', surface: 'both', frequency: 'daily',
    what: 'The model reasons before answering. Always on in the newest models.',
    when: 'Analyses, planning, complex tables. Nothing to manage.',
  },
  {
    name: 'Effort level', category: 'Research and thinking', surface: 'both', frequency: 'often',
    what: 'How deeply the model thinks: low to max. More depth, more usage and time.',
    when: 'Max for analyses and important documents. Low for mechanical things: renaming, formatting, short summaries.',
  },
  {
    name: 'Model picker', category: 'Research and thinking', surface: 'both', frequency: 'often',
    what: 'Switch between models from the dropdown. Office add-ins show a curated shorter list.',
    when: 'The strongest model for thinking and writing. A faster one for routine.',
  },
  {
    name: 'Parallel sub-agents', category: 'Research and thinking', surface: 'cowork', frequency: 'often',
    what: 'Cowork splits a large task into parts and works on them at the same time: 10 files, 10 summaries, in minutes instead of half an hour.',
    when: 'Repetitive work over many files or sources. Ask for it explicitly: "a separate summary for each file".',
  },

  {
    name: 'Connectors', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'daily',
    what: 'A link to an external app over MCP: Google Drive, Gmail, Calendar, Microsoft 365, Slack, Notion, HubSpot, Stripe, QuickBooks, Canva, Figma, Linear and more. Claude reads and acts there.',
    when: 'When the data lives in an app, not a file. Turn them on per conversation from "+" in the message box.',
    tip: 'Customize > Connectors. Keep tools that write (send email, change records) on Needs approval.',
    url: 'https://claude.com/docs/connectors/getting-started',
  },
  {
    name: 'Tool permissions', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'For every connector tool: Always allow, Needs approval or Blocked. On first use: Allow once / Always allow.',
    when: 'Reading: Always allow. Writing and sending: Needs approval. Dangerous: Blocked.',
  },
  {
    name: 'Skills', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'daily',
    what: 'A folder with SKILL.md: a repeatable process or knowledge that Claude loads when the task matches the description, or that you invoke with "/".',
    when: 'A process you do the same way every time: monthly report, meeting minutes, branded deck.',
    tip: 'Customize > Skills. The built-in xlsx, docx, pptx, pdf are always there. Upload your own as a ZIP with the folder inside.',
    url: 'https://claude.com/docs/skills/overview',
  },
  {
    name: 'skill-creator', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'rare',
    what: 'A skill from Anthropic that helps you write and test your own skill, with test prompts and a comparison with and without the skill.',
    when: 'When you have done a process well once in Cowork and want to lock it in: "create a skill that captures exactly this workflow".',
  },
  {
    name: 'Plugins', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'A package of skills, connectors, agents and commands installed in one step. Anthropic\'s marketplace, a company marketplace or a GitHub repo.',
    when: 'Ready-made bundles by role: finance, marketing, legal, HR, small business. Company ones are enforced by the admin.',
    tip: 'Installing does not sign you into connectors: open the plugin\'s Connectors tab afterwards.',
    url: 'https://claude.com/docs/cowork/guide/plugins',
  },
  {
    name: 'Customize', category: 'Extensions: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'The sidebar page that gathers Connectors, Skills and Plugins. Cowork loads what is enabled here when a session starts.',
    when: 'Turning extensions on and off. Cowork does not read Claude Code\'s ~/.claude: if you have a skill there, add it here.',
  },

  {
    name: 'Scheduled tasks', category: 'Automation and background work', surface: 'cowork', frequency: 'often',
    what: 'Tasks that run on their own: hourly, daily, weekly, weekdays only or manually. The same connectors, skills and plugins as a normal task. They run in the cloud.',
    when: 'Morning briefing from mail and Slack, weekly report, Friday tidy-up. Do it manually 3 times first, then schedule it.',
    tip: '/schedule in a task or Scheduled > New task. They cannot use a local folder; they work with connectors and files in your account.',
    url: 'https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-cowork',
  },
  {
    name: 'Dispatch', category: 'Automation and background work', surface: 'cowork', frequency: 'often',
    what: 'A long-running agent in the sidebar: describe an outcome once, it splits it into child tasks and runs each as a separate Cowork session in the project you name. From your phone you can assign it work that runs on your computer.',
    when: 'Work you want to start and come back to later. Pro and Max.',
    tip: 'Permission requests come to you and are denied automatically after 10 minutes without an answer.',
    url: 'https://claude.com/docs/cowork/guide/dispatch',
  },
  {
    name: 'Several tasks at once', category: 'Automation and background work', surface: 'cowork', frequency: 'often',
    what: 'Several Cowork sessions run in parallel and show in the sidebar with a status.',
    when: 'Independent tasks. Do not put two different goals in one session.',
  },
  {
    name: 'Message queue', category: 'Automation and background work', surface: 'both', frequency: 'daily',
    what: 'Type the next message while Claude works or Research runs. It is sent when the turn ends.',
    when: 'Clarifications you think of midway. Esc / Stop if you need to stop right now.',
  },
  {
    name: 'Usage', category: 'Automation and background work', surface: 'system', frequency: 'often',
    what: 'Settings > Usage shows how much of your limit you have used and an approximate cost. Multi-step tasks, connectors and Auto mode use more.',
    when: 'Before a large task and when something has been running for a long time.',
  },

  {
    name: 'Built-in browser', category: 'Browser and screen', surface: 'cowork', frequency: 'often',
    what: 'A browser inside the app: Claude opens pages, reads, clicks, fills forms and takes screenshots while you watch. It asks Allow once / Always allow for each site. You can import logins from Chrome, Edge or Firefox site by site.',
    when: 'When the data is on a website without a connector. The app has to be open.',
    tip: 'Settings > Cowork > Preferred browser. Banking, personal data and medical information: no.',
    url: 'https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork',
  },
  {
    name: 'Claude in Chrome', category: 'Browser and screen', surface: 'both', frequency: 'often',
    what: 'An extension for Chrome and Edge: Claude works in your own browser with your tabs and logins. A side panel with Cowork on Max and Team, Pro rolling out.',
    when: 'When the work is on the page in front of you and you are already signed in.',
    url: 'https://claude.com/chrome',
  },
  {
    name: 'Computer use', category: 'Browser and screen', surface: 'cowork', frequency: 'beta',
    what: 'Claude controls apps on your screen with permission granted per application. macOS 14 or later.',
    when: 'Only when there is no connector, file or browser route. Slow and expensive.',
  },
  {
    name: 'Quick entry', category: 'Browser and screen', surface: 'chat', frequency: 'daily',
    what: 'Mac: double-tap Option (or Option+Space) opens Claude over any app. Screenshot, window sharing, dictation with Caps Lock.',
    when: 'A quick question about what is on screen without switching apps.',
    tip: 'Settings > General. Caps Lock dictation is off by default. Needs Screen recording and Accessibility permissions.',
    url: 'https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac',
  },
  {
    name: 'Dictation', category: 'Browser and screen', surface: 'both', frequency: 'often',
    what: 'The microphone in the message box turns your speech into text. Claude does not talk back. Works in the Office add-ins too.',
    when: 'Long briefs that are faster to say. Review the text before sending.',
  },

  {
    name: 'Claude for Excel', category: 'Office add-ins', surface: 'office', frequency: 'daily',
    what: 'An add-in in Excel: questions with cell-level citations, changing assumptions with formulas preserved, finding #REF! and #DIV/0, building and populating models, pivots, conditional formatting, validation. Overwrite protection.',
    when: 'When you are already in the workbook and want changes in place. Not for data tables or VBA macros.',
    tip: 'Install from Microsoft AppSource "Claude for Microsoft 365". Persistent Instructions in the add-in settings.',
    url: 'https://claude.com/docs/office-agents/excel',
  },
  {
    name: 'Claude for PowerPoint', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'An add-in in PowerPoint: reads the slide master, layouts, fonts and colours and builds slides in your template. Pinpoint edits on a selected slide, bullets into diagrams and editable charts, restructuring the storyline.',
    when: 'A deck on the corporate template that has to stay on brand.',
    url: 'https://claude.com/docs/office-agents/powerpoint',
  },
  {
    name: 'Claude for Word', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'An add-in in Word: questions with section citations, editing selected text with styles and numbering preserved, tracked changes mode, working through comments, summarising counterparty redlines, filling templates, semantic search.',
    when: 'Contracts, policies, long documents where every change has to be a visible revision.',
    tip: 'Legacy .doc files have to be saved as .docx first.',
    url: 'https://claude.com/docs/office-agents/word',
  },
  {
    name: 'Claude for Outlook', category: 'Office add-ins', surface: 'office', frequency: 'beta',
    what: 'An add-in in Outlook: inbox triage, draft replies in your voice, thread summaries, finding meeting times. The admin grants a one-time Microsoft Graph consent.',
    when: 'Morning mail processing. Nothing is sent without you.',
    url: 'https://claude.com/docs/office-agents/outlook',
  },
  {
    name: 'Working across the Office apps', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'Excel, PowerPoint, Word and Outlook share one conversation: "take the summary table from the workbook and put it on slide 3".',
    when: 'A report that moves from data to slides to email without copying.',
    url: 'https://claude.com/docs/office-agents/work-across-apps',
  },

  {
    name: 'Install and sign in', category: 'The app: sign-in, settings, account', surface: 'system', frequency: 'rare',
    what: 'claude.com/download for macOS and Windows. Sign in with the same account as claude.ai. Cowork needs a paid plan.',
    when: 'Once. The app updates itself afterwards.',
    url: 'https://claude.com/download',
  },
  {
    name: 'Settings > Capabilities', category: 'The app: sign-in, settings, account', surface: 'system', frequency: 'rare',
    what: 'Memory, Code execution and file creation (needed for skills and files), web search, which tools to load ("load tools when needed").',
    when: 'On day one. Then only when something is wrong.',
  },
  {
    name: 'Settings > Cowork', category: 'The app: sign-in, settings, account', surface: 'cowork', frequency: 'rare',
    what: 'Global instructions, default permission mode, preferred browser, folder permissions.',
    when: 'On day one and for a repeating problem you want to stop once and for all.',
  },
  {
    name: 'macOS permissions', category: 'The app: sign-in, settings, account', surface: 'system', frequency: 'rare',
    what: 'System Settings > Privacy & Security: Screen recording, Accessibility, Speech recognition for quick entry and dictation; folder access for Cowork.',
    when: 'When a feature stays silent or a button does nothing.',
  },
  {
    name: 'Team and Enterprise', category: 'The app: sign-in, settings, account', surface: 'system', frequency: 'rare',
    what: 'The Owner adds connectors and plugins for the organisation, shares projects, enforces required plugins and sees adoption. Members connect their own accounts.',
    when: 'If something is missing from Customize, ask the Owner with Request.',
  },
]
