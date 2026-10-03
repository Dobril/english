import type { Shortcut } from '../../../data/types'

export const shortcuts: Shortcut[] = [
  { group: 'Navigating the app', keys: 'Cmd+K / Ctrl+K', what: 'Search and commands: conversations, projects, settings.', note: 'The fastest way to reach an old conversation.' },
  { group: 'Navigating the app', keys: 'Cmd+Shift+O / Ctrl+Shift+O', what: 'New conversation.' },
  { group: 'Navigating the app', keys: 'Cmd+, / Ctrl+,', what: 'Settings.' },
  { group: 'Navigating the app', keys: 'Cmd+N / Ctrl+N', what: 'New window.' },
  { group: 'Navigating the app', keys: 'Cmd+W / Ctrl+W', what: 'Closes the window. The conversation stays in the history.' },

  { group: 'In the message box', keys: 'Enter', what: 'Sends the message.' },
  { group: 'In the message box', keys: 'Shift+Enter', what: 'New line without sending.', note: 'Briefs are written on several lines: outcome, inputs, format, criteria.' },
  { group: 'In the message box', keys: '/', what: 'List of skills and commands: /schedule, /resume, /mcp, your own skills.' },
  { group: 'In the message box', keys: '+', what: 'Attach files, turn connectors on for the conversation, choose tools.' },
  { group: 'In the message box', keys: 'Esc', what: 'Stops Claude\'s current answer or action. What is done stays.' },
  { group: 'In the message box', keys: 'Typing while it works', what: 'The message is queued and sent when the turn ends.' },
  { group: 'In the message box', keys: 'Microphone icon', what: 'Dictation: speech becomes text in the box.' },

  { group: 'Quick entry (Mac only)', keys: 'Option Option (double-tap)', what: 'Opens Claude over the current app.', note: 'Settings > General: can be Option+Space or a custom combination.' },
  { group: 'Quick entry (Mac only)', keys: 'Caps Lock', what: 'Dictation in the quick entry window.', note: 'Off by default because it takes over Caps Lock. Needs macOS 14+.' },
  { group: 'Quick entry (Mac only)', keys: 'Camera icon', what: 'Screenshot or window pick to attach to the question.', note: 'Needs the Screen recording permission.' },

  { group: 'Cowork', keys: 'Permission mode', what: 'Manual, Auto or Skip is chosen from the task menu or as a default in Settings > Cowork.', note: 'Manual for new tasks, Auto for familiar processes.' },
  { group: 'Cowork', keys: '/schedule', what: 'Turns the task into a scheduled one: frequency, mode, model.' },
  { group: 'Cowork', keys: '/resume', what: 'Brings back a previous session.' },
  { group: 'Cowork', keys: '/mcp', what: 'Shows the connected MCP servers and their state.' },
  { group: 'Cowork', keys: 'Stop', what: 'Stops the task. You can redirect with the next message.' },
  { group: 'Cowork', keys: 'Allow / Always allow / Deny', what: 'Answer to a permission request. Always allow is remembered for that tool or site.', note: 'Dispatch denies automatically after 10 minutes without an answer.' },
]

export const settingsMap: { where: string; what: string; when: string }[] = [
  { where: 'Settings > General', what: 'Quick entry shortcut, dictation, launch at login, theme.', when: 'Day one.' },
  { where: 'Settings > Capabilities', what: 'Memory, Code execution and file creation, web search, Research, "load tools when needed".', when: 'Day one. Code execution must be on for files and skills.' },
  { where: 'Settings > Cowork', what: 'Global instructions, permission mode, preferred browser (built-in or Chrome), folders with access.', when: 'Day one and for a repeating problem.' },
  { where: 'Settings > Instructions for Claude', what: 'Account-wide instructions in Chat.', when: 'Short. Language, role, default format.' },
  { where: 'Settings > Usage', what: 'Used limit and approximate cost.', when: 'Before a large task.' },
  { where: 'Customize > Connectors', what: 'Discover, connect, tool permissions, disconnect.', when: 'Whenever you work with a new system.' },
  { where: 'Customize > Skills', what: 'Your skills, from the organisation, shared, from Anthropic. ZIP upload.', when: 'When you lock in a process.' },
  { where: 'Customize > Plugins', what: 'Marketplace, install, your own marketplace from GitHub.', when: 'Ready-made bundles by role.' },
  { where: 'Projects (left panel)', what: 'Cowork projects: folders, instructions, links, memory.', when: 'For every permanent area of work.' },
  { where: 'Scheduled (left panel)', what: 'Scheduled tasks: runs, pause, edit, run manually.', when: 'Weekly review of the runs.' },
  { where: 'Dispatch (left panel)', what: 'The background agent and its child tasks.', when: 'Work you come back to later.' },
  { where: 'System Settings > Privacy & Security (macOS)', what: 'Screen recording, Accessibility, Speech recognition, Files and Folders.', when: 'When a feature does not work and gives no explanation.' },
]
