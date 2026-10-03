import type { Shortcut } from '../../../data/types'

export const shortcuts: Shortcut[] = [
  { group: 'Modes and control', keys: 'Shift+Tab', what: 'Cycles the permission mode: Manual → Accept edits → Plan → (Auto / Bypass, when available).', note: 'The key you press most. Plan mode shows as "⏸ plan mode on" in the status bar.' },
  { group: 'Modes and control', keys: 'Esc', what: 'Stops Claude mid-action. Work done so far is kept; you can redirect.' },
  { group: 'Modes and control', keys: 'Esc Esc', what: 'With empty input: opens the rewind menu (restore code, conversation or both; summarize from/up to a point). With text: clears it and keeps it in history.' },
  { group: 'Modes and control', keys: 'Ctrl+C', what: 'Interrupts. On empty input, a second press exits Claude Code.' },
  { group: 'Modes and control', keys: 'Ctrl+D (twice)', what: 'Exits the session.' },
  { group: 'Modes and control', keys: 'Ctrl+G', what: 'Opens the prompt (or the plan in plan mode) in your system editor.', note: 'Long prompts and editing a plan before execution.' },
  { group: 'Modes and control', keys: 'Ctrl+B', what: 'Sends the running Bash command or agent to the background.', note: 'Dev servers, long test runs. See them with /tasks.' },
  { group: 'Modes and control', keys: 'Ctrl+O', what: 'Transcript view: full details of every tool call, with time and model.' },
  { group: 'Modes and control', keys: 'Ctrl+T', what: 'Shows/hides Claude\'s task checklist.' },
  { group: 'Modes and control', keys: 'Ctrl+Enter', what: 'Sends the messages you queued while Claude was working, right now.' },
  { group: 'Modes and control', keys: 'Option+P (Alt+P)', what: 'Switches model without losing the prompt you typed.' },
  { group: 'Modes and control', keys: 'Option+T (Alt+T)', what: 'Toggles extended thinking.', note: 'No effect on Fable and the newest Opus/Sonnet models: thinking is always on there.' },
  { group: 'Modes and control', keys: 'Option+O (Alt+O)', what: 'Fast mode on/off.' },
  { group: 'Modes and control', keys: 'Ctrl+S', what: 'Stashes the typed prompt and restores it on a second press.' },
  { group: 'Modes and control', keys: 'Ctrl+L', what: 'Redraws the screen if the terminal got garbled.' },
  { group: 'Modes and control', keys: 'Ctrl+R', what: 'Reverse search through prompt history.' },

  { group: 'Special prefixes', keys: '/', what: 'Command or skill. Tab completes the name.' },
  { group: 'Special prefixes', keys: '!', what: 'Shell mode: runs the command directly, its output enters the session and Claude can react to it.', note: '! npm test is faster than "run the tests" and does not spend a model turn.' },
  { group: 'Special prefixes', keys: '@', what: 'Mentions a file or folder with autocomplete. Claude reads them before answering.', note: 'Always point at the file with @ instead of describing it. With a letter after @ it also suggests your other live sessions.' },
  { group: 'Special prefixes', keys: '?', what: 'On an empty line shows the shortcut help panel.' },
  { group: 'Special prefixes', keys: ':name:', what: 'Emoji shortcode.' },

  { group: 'Input and editing', keys: 'Shift+Enter', what: 'New line without sending (after /terminal-setup). Alternatives: \\ then Enter, or Option+Enter.' },
  { group: 'Input and editing', keys: 'Ctrl+V / Cmd+V', what: 'Pastes an image from the clipboard as [Image #N], which you can reference in the prompt.', note: 'A screenshot of a bug or a design beats a description in words. Drag and drop works too.' },
  { group: 'Input and editing', keys: '↑ / ↓', what: 'Prompt history (or moving between lines in multiline input).' },
  { group: 'Input and editing', keys: 'Tab', what: 'Accepts autocomplete. In a permission dialog adds a comment to the answer.' },
  { group: 'Input and editing', keys: 'Ctrl+A / Ctrl+E', what: 'Start / end of line.' },
  { group: 'Input and editing', keys: 'Ctrl+K / Ctrl+U / Ctrl+W', what: 'Deletes to end of line / to start / previous word. Ctrl+Y pastes the deleted text back.' },
  { group: 'Input and editing', keys: 'Ctrl+_', what: 'Undo the last input edit.' },
]

export const permissionModes = [
  {
    name: 'Manual (default)',
    how: 'Asks before every action that changes something: file writes, Bash, MCP tools.',
    when: 'Unfamiliar code, sensitive systems, the first days in a project.',
  },
  {
    name: 'Accept edits',
    how: 'Auto-approves file writes and safe filesystem commands (mkdir, mv, cp). Asks for Bash and MCP.',
    when: 'You have an approved plan and want Claude to write without stopping, but to ask about commands.',
  },
  {
    name: 'Plan mode',
    how: 'Read-only: Claude reads, searches, asks and writes a plan. It does not edit or run anything.',
    when: 'The start of every non-trivial task. Exploring unfamiliar code. Answering an architecture question.',
  },
  {
    name: 'Auto mode',
    how: 'A separate classifier model reviews actions and blocks only the risky ones: scope escalation, unknown infrastructure, actions driven by hostile content. Routine work proceeds without prompts.',
    when: 'The default in recent versions for interactive work. Good for everyday tasks with a clear scope.',
  },
  {
    name: 'Bypass permissions',
    how: 'No checks at all. Enabled only with the --dangerously-skip-permissions flag.',
    when: 'Only in an isolated container or CI with no access to important data. Not on your machine.',
  },
]
