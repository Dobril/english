import type { Shortcut } from '../../../data/types'

export const shortcuts: Shortcut[] = [
  { group: 'Навигация в приложението', keys: 'Cmd+K / Ctrl+K', what: 'Търсене и команди: разговори, проекти, настройки.', note: 'Най-бързият начин да стигнеш до стар разговор.' },
  { group: 'Навигация в приложението', keys: 'Cmd+Shift+O / Ctrl+Shift+O', what: 'Нов разговор.' },
  { group: 'Навигация в приложението', keys: 'Cmd+, / Ctrl+,', what: 'Настройки.' },
  { group: 'Навигация в приложението', keys: 'Cmd+N / Ctrl+N', what: 'Нов прозорец.' },
  { group: 'Навигация в приложението', keys: 'Cmd+W / Ctrl+W', what: 'Затваря прозореца. Разговорът остава в историята.' },

  { group: 'В полето за съобщение', keys: 'Enter', what: 'Изпраща съобщението.' },
  { group: 'В полето за съобщение', keys: 'Shift+Enter', what: 'Нов ред без изпращане.', note: 'Брифовете се пишат на няколко реда: резултат, входове, формат, критерии.' },
  { group: 'В полето за съобщение', keys: '/', what: 'Списък със skills и команди: /schedule, /resume, /mcp, собствените ти skills.' },
  { group: 'В полето за съобщение', keys: '+', what: 'Прикачане на файлове, включване на connectors за разговора, избор на инструменти.' },
  { group: 'В полето за съобщение', keys: 'Esc', what: 'Спира текущия отговор или действие на Claude. Свършеното остава.' },
  { group: 'В полето за съобщение', keys: 'Писане, докато работи', what: 'Съобщението се нарежда на опашка и се праща, когато ходът свърши.' },
  { group: 'В полето за съобщение', keys: 'Иконата микрофон', what: 'Диктовка: речта става текст в полето.' },

  { group: 'Quick entry (само Mac)', keys: 'Option Option (двоен)', what: 'Отваря Claude над текущото приложение.', note: 'Settings > General: може да е Option+Space или собствена комбинация.' },
  { group: 'Quick entry (само Mac)', keys: 'Caps Lock', what: 'Диктовка в quick entry прозореца.', note: 'Изключена по подразбиране, защото заема Caps Lock. Иска macOS 14+.' },
  { group: 'Quick entry (само Mac)', keys: 'Иконата камера', what: 'Скрийншот или избор на прозорец, който да прикачиш към въпроса.', note: 'Иска право Screen recording.' },

  { group: 'Cowork', keys: 'Режим на разрешения', what: 'Manual, Auto или Skip се избира от менюто на задачата или по подразбиране в Settings > Cowork.', note: 'Manual за нови задачи, Auto за познати процеси.' },
  { group: 'Cowork', keys: '/schedule', what: 'Превръща задачата в насрочена: честота, режим, модел.' },
  { group: 'Cowork', keys: '/resume', what: 'Връща предишна сесия.' },
  { group: 'Cowork', keys: '/mcp', what: 'Показва свързаните MCP сървъри и състоянието им.' },
  { group: 'Cowork', keys: 'Stop', what: 'Спира задачата. Можеш да пренасочиш със следващо съобщение.' },
  { group: 'Cowork', keys: 'Allow / Always allow / Deny', what: 'Отговор на заявка за разрешение. Always allow се помни за този инструмент или сайт.', note: 'Dispatch отказва автоматично след 10 минути без отговор.' },
]

export const settingsMap: { where: string; what: string; when: string }[] = [
  { where: 'Settings > General', what: 'Quick entry клавиш, диктовка, стартиране при вход, тема.', when: 'Първия ден.' },
  { where: 'Settings > Capabilities', what: 'Memory, Code execution and file creation, web search, Research, "load tools when needed".', when: 'Първия ден. Code execution трябва да е включен за файлове и skills.' },
  { where: 'Settings > Cowork', what: 'Global instructions, режим на разрешения, предпочитан браузър (built-in или Chrome), папки с достъп.', when: 'Първия ден и при повтарящ се проблем.' },
  { where: 'Settings > Instructions for Claude', what: 'Инструкции за целия акаунт в Chat.', when: 'Кратко. Езикът, ролята, форматът по подразбиране.' },
  { where: 'Settings > Usage', what: 'Изразходван лимит и приблизителна цена.', when: 'Преди голяма задача.' },
  { where: 'Customize > Connectors', what: 'Discover, свързване, tool permissions, disconnect.', when: 'При нова система, с която работиш.' },
  { where: 'Customize > Skills', what: 'Твоите skills, от организацията, споделени, от Anthropic. Качване на ZIP.', when: 'Когато фиксираш процес.' },
  { where: 'Customize > Plugins', what: 'Marketplace, инсталиране, собствен marketplace от GitHub.', when: 'Готови пакети по роля.' },
  { where: 'Projects (ляв панел)', what: 'Cowork проекти: папки, инструкции, линкове, памет.', when: 'За всяка постоянна област на работа.' },
  { where: 'Scheduled (ляв панел)', what: 'Насрочени задачи: изпълнения, пауза, редакция, ръчно пускане.', when: 'Седмичен преглед на изпълненията.' },
  { where: 'Dispatch (ляв панел)', what: 'Фонов агент и неговите подзадачи.', when: 'Работа, към която се връщаш по-късно.' },
  { where: 'System Settings > Privacy & Security (macOS)', what: 'Screen recording, Accessibility, Speech recognition, Files and Folders.', when: 'Когато функция не работи без обяснение.' },
]
