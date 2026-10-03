# System Design - патерни и концепции

Този файл е речникът на папката. Всяка система в останалите документи е сглобена от патерните долу,
затова първо се чете той, а после конкретните системи. Списъкът включва както патерните, които се
срещат в разгледаните системи, така и концепциите, които се очакват на senior ниво, дори когато не
попадат в нито една от тях (Reconciliation, CQRS, Circuit Breaker, CDC, Bulkhead, консенсус).

## Системите в тази папка

| Система | Централният проблем | Патерните, които го решават |
| --- | --- | --- |
| [URL Shortener](URL_Shortener.md) | Съотношение четене/писане 100:1, генериране на ключове | Cache-aside, negative caching, Snowflake + Base62, hash sharding |
| [Video Platform](Video_platform_like_Udemy.md) | Асинхронно транскодиране, adaptive bitrate, 70 Gbps изходящ трафик | Presigned upload, event-driven pipeline, CDN, write-behind, state machine |
| [Ticketmaster](Ticketmaster.md) | Конкуренция за 50 000 реда, разпределена транзакция | Conditional UPDATE, lock като оптимизация, Outbox, Saga, waiting room |
| [Chat System](Chat_system_WhatsApp_Slack%20_Messenger.md) | Милиони WebSocket връзки, подредба, гарантирана доставка | Session registry, sequence ID, Kafka партиция по chat_id, idempotent client |
| [Web Crawler + Rate Limiter](Distributed_Web_Crawler.md) | Дедупликация в мащаб, politeness, атомарни лимити | Bloom filter, consistent hashing по host, Lua в Redis, sliding window |
| [Notification System](Notification_system.md) | Outbox, backpressure, DLQ и replay | Transactional outbox, priority topics, circuit breaker, idempotent consumer |
| [News Feed / Timeline](News_Feed_Timeline.md) | Fan-out on write срещу on read, celebrity проблемът | Hybrid fan-out, materialized inbox, hydration, cursor pagination |
| [Geo-Proximity (Uber / Yelp)](Geo_Proximity_Uber_Yelp.md) | Пространствено индексиране, 1.25M ъпдейта/сек | Geohash / H3, in-memory index с TTL, geo sharding, atomic dispatch |
| [Distributed Key-Value Store](Distributed_Key_Value_Store.md) | Consistent hashing, кворум, конфликти, CAP | Vnodes, R + W > N, hinted handoff, read repair, Merkle, gossip, LSM |
| [File Sync (Dropbox)](File_Sync_Dropbox_Google_Drive.md) | Chunking, дедупликация, дельта синхронизация | Content-defined chunking, content-addressed storage, journal cursor, optimistic locking |
| [Search Autocomplete](Search_Autocomplete_Typeahead.md) | Под 100 ms, предварително изчислен top-K | Precomputed trie, offline/online split, edge cache, atomic snapshot swap |
| [Online Trading Game](Online_Trading_Game.md) | HIGH/LOW игра с реални цени: пари в реално време, един owner на игра, 10 000 играчи в рунд | Single writer, lease + fencing epoch, subject routing през NATS, resync вместо replay, sharded coordinator |
| [Payment System](Payment_System_Stripe_Wallet.md) | Двойно плащане, изгубен webhook, пари като данни | Idempotency до PSP, двойно счетоводство, state machine, reconciliation |
| [Hotel Reservation](Hotel_Reservation_Airbnb.md) | Инвентар по дата, последната стая, overbooking | Conditional UPDATE по редове-дати, hold с изтичане, кеш с кратък TTL |
| [Stock Exchange](Stock_Exchange_Matching_Engine.md) | Микросекунди, детерминизъм, честност на реда | Sequencer, single-threaded matching, event-sourced лог, hot standby |
| [Message Queue (Kafka)](Distributed_Message_Queue_Kafka.md) | Подредба, издръжливост, exactly-once семантики | Партиции като append-only лог, ISR, consumer groups, offset commit |
| [Distributed Cache](Distributed_Cache_Redis.md) | Консистентност кеш/база, горещи ключове, failover | Hash slots, репликация, eviction, cache-aside + single-flight |
| [Object Storage (S3)](Object_Storage_S3.md) | 11 деветки durability, милиарди малки обекти | Метаданни отделно от данните, erasure coding, чексуми, GC |
| [Job Scheduler](Distributed_Job_Scheduler.md) | Точно един планировчик, at-least-once изпълнение | Leader lease, SKIP LOCKED, idempotent runs, durable workflows |
| [Metrics & Alerting](Metrics_Monitoring_Alerting.md) | 10M активни серии, кардиналност, alert fatigue | TSDB компресия, downsampling, хистограми, SLO burn rate |
| [Ad Click Aggregation](Ad_Click_Aggregation.md) | Прозорци по event time, late events, exactly-once | Stream processing с watermarks, idempotent sink, lambda срещу kappa |
| [Collaborative Editing](Collaborative_Editing_Google_Docs.md) | Конвергенция при конкурентни редакции | OT срещу CRDT, един owner на документ, оп лог + snapshots |
| [Search Engine](Search_Engine_Inverted_Index.md) | Inverted index, scatter-gather, релевантност | Posting lists, шардиране по документ, двуфазен ranking, сегменти |
| [Auth & Sessions](Auth_Session_OAuth_SSO.md) | Сесии срещу JWT, revocation, SSO | Refresh rotation, PKCE, OIDC, JWKS ротация, RBAC/ReBAC |

## Основи и градивни блокове

| Документ | Съдържание |
| --- | --- |
| [Чеклист за нефункционални изисквания](NFR_Checklist.md) | Въпросите за първите пет минути, оценки, availability математика, от изискване към решение |
| [Message brokers](Message_Brokers_Comparison.md) | Kafka, NATS core и JetStream, RabbitMQ, SQS/SNS, Redis Streams, Postgres като опашка: способности и кога кой |
| [Консенсус и модели на консистентност](Consensus_Consistency_Models.md) | Linearizability до eventual, Raft, Paxos, ZooKeeper/etcd, fencing, часовници, FLP и CAP |
| [Мрежа и балансиране](Networking_Load_Balancing.md) | DNS, TLS, L4 срещу L7, алгоритми, health checks, HTTP/2 и 3, gRPC балансиране, CDN, service mesh |
| [Postgres отвътре](Database_Internals_Postgres.md) | Isolation levels, MVCC, локове, индекси, EXPLAIN, PgBouncer, репликация, миграции, избор на база |
| [API дизайн](API_Design.md) | REST, грешки и статус кодове, версии, идемпотентност, gRPC, GraphQL, realtime, webhooks, договори |
| [SOLID, DDD и архитектурни стилове](SOLID_DDD_Architecture_Styles.md) | SOLID с код, hexagonal/clean, bounded contexts и aggregates, modular monolith срещу microservices, strangler fig |

## Дизайн патерни с Node.js код

Отделна група документи показва класическите дизайн патерни като реален Node.js/TypeScript код и ги
свързва със системите по-долу.

| Документ | Патерни |
| --- | --- |
| [Creational](Design_Patterns_Creational.md) | Singleton, Factory, Abstract Factory, Builder, Prototype, Dependency Injection |
| [Structural](Design_Patterns_Structural.md) | Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight |
| [Behavioral](Design_Patterns_Behavioral.md) | Strategy, Observer, Command, Chain of Responsibility, State, Template Method, Iterator, Mediator |
| [Node.js архитектурни патерни](Design_Patterns_Node_Architecture.md) | Middleware, Repository и Unit of Work, DI, Outbox, Idempotency, Retry + backoff, Circuit Breaker, Bulkhead, Streams, graceful shutdown, single writer |

## Алгоритми за интервю с код

| Документ | Съдържание |
| --- | --- |
| [Основни техники](Algorithms_Core_Patterns.md) | Big-O, binary search, two pointers, sliding window, prefix sums, heap и top-K, merge K lists, интервали, сортиране |
| [Графи, дървета и низове](Algorithms_Graphs_Trees_Strings.md) | BFS/DFS, topological sort, Dijkstra, union-find, trie, LRU/LFU кеш, edit distance, rolling hash |
| [Алгоритми от разпределените системи](Algorithms_Distributed_Systems.md) | Consistent hashing, Bloom filter, Count-Min sketch, HyperLogLog, reservoir sampling, Snowflake, geohash, Merkle tree, vector clocks, backoff |
| [JavaScript и Node.js въпроси](Algorithms_JavaScript_Runtime.md) | Event loop, debounce/throttle, promise pool, retry, memoize + single-flight, Promise.all отвътре, EventEmitter, generators, deep clone |

## Патерни за устойчивост и консистентност

| Термин / Патерн | Какво представлява? | Кога и защо се използва? |
| --- | --- | --- |
| **Transactional Outbox** | Бизнес данните и съобщението за опашката се записват в **една** релационна транзакция. Отделен Outbox Relayer чете таблицата и публикува в брокера, после маркира реда. | Решава dual-write проблема: "запиши в базата и прати в Kafka" не са атомарни. Без outbox или губиш събитие (брокерът е долу), или пращаш събитие за запис, който после е rollback-нат. |
| **Change Data Capture (CDC)** | Инструмент (Debezium), който чете transaction log-а на базата (WAL / binlog) и превръща всяка промяна в събитие. | Най-често се използва като **relayer за outbox таблицата** (Debezium Outbox Event Router), защото не polling-ва и не пропуска редове. Може и директно да излъчва промени по таблици, но тогава събитията са "ред се промени", а не бизнес събития. |
| **Reconciliation (Reconciler)** | Асинхронен процес, който периодично сравнява данни от две системи и отстранява или сигнализира разминаванията. | Финансови потоци: сравняване на вътрешните записи със сетълмент файла на Stripe в края на деня. Признание, че Saga компенсацията понякога не минава, и последната защита срещу "платено без билет". |
| **Saga Pattern (Compensating Actions)** | Поредица от локални транзакции в отделни сървиси с дефинирано компенсиращо действие за всяка. Orchestration (централен координатор, напр. Temporal) или choreography (всеки реагира на събития). | За разпределени транзакции без 2PC, който държи ресурсите заключени и блокира при падане на координатора. Външен платежен доставчик изобщо не говори 2PC. |
| **Two-Phase Commit (2PC)** | Координатор пита всички участници "готови ли сте" (prepare), и чак при единодушно "да" праща commit. | Вътре в една база или между бази под общ контрол (XA). В микросървиси е анти-патерн: блокира при падане на координатора и държи локове по време на мрежови обиколки. Знай го, за да обясниш защо избираш Saga. |
| **Idempotency Key** | Уникален ключ (UUID), генериран от **клиента**, с който сървърът гарантира, че повтаряща се заявка се обработва само веднъж и връща същия отговор. | Плащания, резервации, съобщения при нестабилна мрежа. Имплементация: `SET key NX EX` в Redis или `UNIQUE` колона в базата. Ключът се генерира от клиента, защото само той знае, че двете заявки са едно и също намерение. |
| **Idempotent Consumer** | Консуматорът пази обработените `event_id` и отхвърля повторенията. | Единственият практичен начин да получиш ефект "exactly-once" върху at-least-once транспорт като Kafka или JetStream. Exactly-once доставка end-to-end не съществува; съществува "effectively once" обработка. |
| **Circuit Breaker** | Спира заявките към сринала се зависимост за определено време (Open), после пуска пробна заявка (Half-Open) и при успех се затваря. | Предпазва от каскадни сривове и от изчерпване на connection pool-а с таймаути. Библиотеки: `opossum` в Node.js, Resilience4j в Java. |
| **Bulkhead Pattern** | Изолиране на ресурсите (thread pools, connection pools, памет, инстанции) за различни части на системата. | Авария в един модул да не събори останалите: отделен pool за плащания и друг за аналитика; отделни worker-и за критичните и за bulk известията. |
| **Retry с Exponential Backoff + Jitter** | Нарастващи паузи между опитите (1 s, 2 s, 4 s...) плюс случайно отклонение. | Без jitter всички клиенти ретрайват едновременно и създават синхронизирани вълни след всеки инцидент. Retry само за преходни грешки (5xx, таймаут, 429), никога за 4xx. |
| **Timeout Budget** | Всяко ниво във веригата получава по-малък timeout от извикващия го; остатъкът се предава надолу. | Без бюджет една бавна зависимост изчерпва всички връзки нагоре по веригата. Пример от Online Trading Game: Gateway чака game node до 300 ms, клиентът чака Gateway до 1 s. |
| **Load Shedding** | Съзнателно отхвърляне на част от заявките при претоварване, вместо всички да се влачат бавно. | По-добре 20% от потребителите да получат 503 веднага, отколкото 100% да чакат 30 секунди и да ретрайват. Приоритизира се: първо се реже bulk, после безплатните потребители, накрая платените. |
| **Backpressure** | Консуматорът контролира темпото на производителя: пауза на четенето, ограничен буфер, отказ при пълна опашка. | Защита на паметта и на външните API-та. Механизми: Node.js Streams и `pause()/resume()`, `socket.bufferedAmount` при WebSocket, consumer lag като сигнал за autoscale, HTTP 429 с `Retry-After`. Двете стратегии са опашка (работата чака) или отказ (изпращачът разбира веднага). |
| **Queue-Based Load Leveling** | Опашка между производител и консуматор поглъща пиковете, а консуматорите работят с постоянен дебит. | За работа, която може да закъснее (транскодиране, известия, аналитика). Никога по критичния път на потребител, който чака отговор: там опашката само скрива забавянето. |
| **Dead Letter Queue (DLQ) + Replay** | Отделна опашка за съобщения, провалили се след N опита, с инструмент за анализ и повторно пускане. | Изолира отровните съобщения, за да не блокират потока. Replay минава през същите проверки за идемпотентност и rate limit, иначе "Replay all" е самопричинен DDoS. |
| **Distributed Lock (Redis Redlock)** | Лок върху ресурс с TTL през един или няколко Redis възела. **Не е гаранция за коректност:** GC пауза, clock drift или network partition го нарушават (критиката на Kleppmann). | Оптимизация, която спира 99.9% от конкурентните заявки преди базата. Истинската гаранция е условен `UPDATE` / `UNIQUE` constraint, или fencing token. |
| **Fencing Token / Epoch** | Монотонно нарастващ номер, издаван при всяко взимане на лок или lease; хранилището и получателите отхвърлят операции с по-стар номер. | Единственият начин разпределен лок или lease да е безопасен при GC пауза или мрежово забавяне. Пази от split brain: "zombie" owner не може да презапише новия. |
| **Leader Election / Lease** | Един възел държи наем (lease) с TTL и е лидер, докато го подновява; при пропуснато подновяване друг го взима. | Планировчици, които трябва да работят точно веднъж, собственост върху шард или игра, координатор на задачи. Реализация: `SET NX PX` в Redis/Valkey, session в etcd/Zookeeper, или Raft. |
| **Single Writer Principle** | Всеки елемент от състоянието се променя от точно един процес; останалите четат или пращат команди към него. | Премахва нуждата от локове по горещото състояние (ledger на игра, инвентар на събитие). Цената: този елемент не може да е по-голям от един процес, затова се шардира. Kafka партиция с един консуматор е същата идея. |
| **Optimistic срещу Pessimistic Locking** | Оптимистично: четеш версия, пишеш с `WHERE version = X`, при 0 реда ретрайваш. Песимистично: `SELECT ... FOR UPDATE` държи реда заключен. | Оптимистично при рядки конфликти (редакция на профил, commit на файл в Dropbox). Песимистично при чести конфликти върху малко редове, но кратки транзакции. |
| **Split Brain** | Два възела едновременно смятат, че са лидер или собственик на едно и също. | Причината за fencing и за кворум при leader election: лидер без мажоритет трябва сам да се откаже. |
| **Graceful Degradation** | Системата губи функции по приоритет, вместо да падне цялата: без препоръки, но с търсене; без аналитика, но с плащания. | Дизайн решение, което се взима предварително: кои зависимости са задължителни и кои са "nice to have" с fallback (кеширан или празен отговор). |

## Данни, консистентност и мащабиране

| Термин / Патерн | Какво представлява? | Кога и защо се използва? |
| --- | --- | --- |
| **CAP / PACELC** | При мрежово разделяне избираш между консистентност и достъпност (CAP); когато няма разделяне, между латентност и консистентност (PACELC). | Езикът, с който обосноваваш избора на база. PACELC е по-честният модел, защото описва и нормалната работа, не само аварията. Dynamo/Cassandra са PA/EL, Spanner е PC/EC. |
| **Консенсус (Raft / Paxos)** | Протокол, при който мажоритет от възли се съгласява за всяка стойност в лога; има лидер и term/epoch. | Метаданни и координация (etcd, Zookeeper, Consul), строго консистентни бази (Spanner, CockroachDB). Бавен за горещия път на данните, затова Dynamo-стилът го избягва. |
| **Consistent Hashing** | Възли и ключове се подреждат на пръстен; ключът отива на първия възел по часовника. Добавяне или махане на възел размества само около `K/N` ключа. **Виртуални възли** изравняват разпределението. | Шардиране на кеш и бази, разпределяне на домейни между crawler worker-и, партициониране на сесии. Алтернативата `hash % N` премества почти всичко при смяна на N. |
| **Quorum (R + W > N)** | Записът се потвърждава от W реплики, четенето пита R; ако `R + W > N`, четенето задължително среща последния запис. **Sloppy quorum** брои и временни заместници и губи тази гаранция. | Настройване на консистентността на ниво заявка вместо веднъж за системата. `R = W = 2, N = 3` е стандартният баланс. |
| **Hinted Handoff / Read Repair / Anti-Entropy** | Записът за паднала реплика се пази при съсед и се доставя после; при четене изостаналата реплика се поправя асинхронно; Merkle дървета намират разликите за рядко четените ключове. | Трите механизма, с които leaderless база остава достъпна за запис при паднал възел и после се "самолекува". |
| **Vector Clocks / Version Vectors** | Всяка реплика носи брояч; системата различава "версия A наследява B" от "A и B са конкурентни". | Откриване на истински конфликти вместо тихо презаписване (LWW). Цената: клиентът трябва да слива, а версиите растат. Cassandra избра LWW + timestamps за простота. |
| **Last-Write-Wins (LWW)** | Печели записът с най-новия timestamp. | Просто и предвидимо, но clock skew може тихо да изхвърли верния запис. Приемливо за данни, при които последната стойност е и правилната (позиция на шофьор, presence). |
| **CRDT** | Структури, които се сливат детерминистично по конструкция (G-Counter, OR-Set, LWW-Register). Няма конфликт по дефиниция. | Активно-активна репликация, офлайн редактиране, collaborative editing. Не всяка структура може да се изрази така. |
| **Gossip Protocol** | Всеки възел периодично разменя състояние с няколко случайни съседа; информацията се разпространява епидемично за O(log N) рунда. | Membership и failure detection без централен монитор (Cassandra, Consul). |
| **Write-Ahead Log (WAL)** | Промяната се записва в append-only лог, преди да се приложи върху данните. | Основата на durability в базите и източникът, който CDC чете. Същата идея е Kafka: логът е базата. |
| **LSM Tree (Memtable + SSTable + Compaction)** | Записът е append в лог и сортирана структура в паметта; при напълване се флъшва като неизменяем файл; compaction слива файловете. | Write-optimized хранилища (Cassandra, RocksDB, LevelDB). Четенето плаща с проверка на няколко файла, смекчена от Bloom filter на файл. |
| **Tombstone** | Маркер за изтрито вместо реално триене в append-only система. | Без него изостанала реплика би "възкресила" изтритата стойност при анти-ентропия. Чисти се при compaction след `gc_grace_period`. |
| **Database Sharding** | Разделяне на база на по-малки самостоятелни бази по shard key. Range, hash или directory-based. | Когато една база не побира данните или записите. Изборът на ключ решава всичко: `hash(id)` разпределя равномерно, `created_at` прави hot partition. |
| **Hot Partition / Hotspot** | Един шард поема непропорционален дял от трафика заради лош partition key или celebrity ключ. | Обяснява защо се шардира по hash, а не по време, и защо се добавя случаен суфикс към горещи ключове или се кешира клиентски. |
| **Read Replicas & Connection Pooling** | Primary за запис и реплики за четене; pooler (PgBouncer) споделя малък брой реални връзки между много клиенти. | Скалиране на четенето. Внимание: реплика може да изостава (replication lag), затова "прочети това, което току-що записах" отива към primary. |
| **CQRS** | Разделяне на модела за писане (commands) от модела за четене (queries). Често, но не задължително, с отделни хранилища. | При голямо разминаване между формата на записа и формата на четенето: нормализирана база за запис, денормализиран изглед в Elasticsearch/Redis за четене. Цената е eventual consistency между двете. |
| **Event Sourcing** | Пази се пълната хронология от събития, а текущото състояние е производно и се пресмята или кешира като snapshot. | Банкови сметки, ledger-и, одит: всяко състояние може да се възстанови или превърти назад. Върви ръка за ръка с CQRS и със snapshot-и за бързо зареждане. |
| **Materialized View / Precomputed Aggregates** | Производната стойност се изчислява веднъж при промяна и се чете наготово. | Лийдърборди, броячи, top-K в autocomplete, feed inbox-и. Изчисляването им на всяка заявка е най-честата причина за бавен endpoint. |
| **Cache-aside / Write-through / Write-behind** | Кой пише в кеша: приложението при miss; синхронно заедно с базата; или асинхронно на партиди. | Cache-aside е по подразбиране. Write-behind за много чести и некритични записи (прогрес на гледане, броячи). Write-through когато кешът трябва винаги да е актуален. |
| **Cache Stampede / Thundering Herd** | Изтичане на TTL на горещ ключ праща хиляди едновременни заявки към базата. | Single-flight (една заявка попълва кеша, другите чакат), jitter в TTL, проактивно опресняване преди изтичане. |
| **Negative Caching** | Кеширане и на отговора "не съществува" с кратък TTL. | Защита от cache penetration: бот, който удря случайни несъществуващи ключове. Комбинира се с Bloom filter пред базата. |
| **Cursor (Keyset) Pagination** | Следващата страница се взима с `WHERE id < last_seen LIMIT N`, не с `OFFSET`. | `OFFSET` сканира и изхвърля N реда и дава повторения, когато в списъка влизат нови елементи. Задължително за feed-ове, чат история, журнали. |
| **Fan-out on Write vs on Read** | Копираш съобщението в inbox-а на всеки получател при писане, или всички четат от общ източник при четене. | Timeline-и, групови чатове, известия. Хибрид: fan-out on write за нормалните, on read за акаунтите с милиони последователи или каналите с 50 000 души. |
| **Snapshot + Replay** | Периодична снимка на състоянието плюс лог от промени след нея; възстановяване = snapshot + replay на опашката. | Online Trading Game snapshot-ите във Valkey, Event Sourcing snapshot-ите, Redis RDB + AOF. Прави restart и takeover бързи. |
| **Geo-replication / Multi-region** | Активно-пасивно (един пишещ регион) или активно-активно (конфликти + резолюция). | Активно-активно изисква CRDT или LWW и почти винаги е грешният отговор, ако не е поискано изрично. Данните на потребител се държат в "домашния" му регион. |
| **Cell-based Architecture** | Системата се разделя на независими "клетки", всяка с пълен набор от сървиси и данни за подмножество от потребители. | Ограничава blast radius на инцидент до една клетка и позволява канарски деплой по клетка. Скъпа операционно, за много големи системи. |

## Структури от данни и алгоритми, които се появяват в дизайните

| Термин | Какво представлява? | Къде се среща в тази папка |
| --- | --- | --- |
| **Bloom Filter** | Вероятностна структура за "виждан ли е този елемент": "не" е 100% вярно, "да" може да е false positive с избрана вероятност. ~10 бита на елемент при 1% грешка. | URL дедупликация в crawler-а, защита от cache penetration, пропускане на SSTable файлове в LSM базите. |
| **HyperLogLog** | Приблизително броене на уникални елементи в ~12 KB памет с грешка около 1%. | Уникални посетители на линк, уникални зрители, без да се пази set от милиони ID-та. |
| **Consistent Hashing Ring + Vnodes** | Виж по-горе. | KV store, шардиране на кеш, crawler по host. |
| **Geohash / QuadTree / S2 / H3** | Свеждане на двумерно пространство до индексируем ключ: рекурсивни квадранти като низ (geohash), адаптивно дърво (quadtree), клетки върху сфера (S2) или шестоъгълници (H3). | Geo-proximity. Търсенето винаги пита клетката и съседите ѝ заради граничния проблем. |
| **Trie с предварително изчислен top-K** | Дърво по префикс, в което всеки възел пази готовите си топ 5-10 довършвания. Търсенето е O(дължина на префикса). | Autocomplete. Алтернатива: Redis sorted set с `ZRANGEBYLEX`. |
| **SimHash / MinHash** | Locality-sensitive хеширане: почти еднакви документи дават хешове с малко Hamming разстояние. | Near-duplicate детекция на страници в crawler-а, за разлика от MD5, който хваща само побитово еднакви. |
| **Content-Defined Chunking (Rabin fingerprint)** | Границите на блоковете се определят от съдържанието чрез rolling hash, не от позицията; вмъкване в началото променя само един блок. | Дельта синхронизация на файлове и дедупликация. |
| **Content-Addressed Storage** | Името на обекта е хешът на съдържанието му; еднакво съдържание = един обект. | Блоковото хранилище на Dropbox, Git, Docker layers. Дава безплатна дедупликация и версии като списъци от указатели. |
| **Snowflake ID** | 64-битово ID: timestamp + worker id + sequence. K-sortable, без координация. | URL shortener, съобщения в чат, всяко място, където auto-increment би бил точка на сериализация. |
| **Merkle Tree** | Дърво от хешове, при което различие в лист променя пътя до корена; две реплики сравняват корените и слизат само по различаващите се клони. | Анти-ентропия в Dynamo/Cassandra, Git, блокчейни. |
| **Sorted Set (Redis ZSET)** | Множество с score, подредено; O(log N) вмъкване, range по score или rank, trim по rank. | Feed inbox-и, лийдърборди, sliding window log, планировчик на отложени съобщения. |
| **Rate limiting алгоритми** | Token bucket (позволява bursts), leaky bucket (изглажда), fixed window (прост, двоен трафик на границата), sliding log (точен, скъп), sliding window counter (почти точен, константна памет). | Rate limiter, politeness в crawler-а, throttling на известия. Изпълнението е атомарно чрез Lua скрипт в Redis. |

## Комуникация, API и инфраструктура

| Термин / Патерн | Какво представлява? | Кога и защо се използва? |
| --- | --- | --- |
| **API Gateway / BFF** | Единствената входна точка: TLS, auth, rate limiting, маршрутизиране. BFF (Backend for Frontend) е gateway, оформен за конкретен клиент. | Централизира сигурността и скрива вътрешната топология. Не бива да съдържа бизнес логика. |
| **Long Polling / WebSocket / SSE** | Три начина сървърът да "бута" данни: заявка, която чака до събитие; двупосочна постоянна връзка; еднопосочен поток по HTTP. | WebSocket за чат, игри и локации (двупосочно, често). SSE за feed от събития към браузър (просто, минава през HTTP инфраструктурата). Long polling като fallback зад корпоративни proxy-та. |
| **Stateless срещу Stateful слой** | Stateless инстанциите са взаимозаменяеми и скалират с добавяне; stateful (WebSocket сървъри, game node-ове) държат нещо, което не може просто да се премести. | Дизайн правило: държи stateful слоя тънък и изолиран, с регистър (кой е къде) или с subject routing, и с процедура за drain при деплой. |
| **Sticky Sessions** | Клиентът винаги се връща на същия сървър. | Обикновено анти-патерн (пречи на скалирането и на деплоя). Online Trading Game го избягва с resync; чатът го избягва със session registry и Pub/Sub. |
| **Heartbeat / Ping-Pong** | Периодичен сигнал по връзка или към регистър, който доказва, че отсрещната страна е жива. | Открива мъртви TCP връзки, подновява TTL на сесии и lease-ове. Без heartbeat мъртва връзка изглежда жива с часове. |
| **Service Discovery срещу Subject Routing** | Discovery: регистър (Consul, DNS, k8s Service) казва къде е инстанцията. Subject routing: пращаш на логически адрес (NATS subject, Kafka partition), а брокерът знае кой слуша. | Subject routing премахва регистъра и остарелите записи в него; цената е зависимост от брокера по критичния път. |
| **Request/Reply срещу Event** | Request/reply: питаш и чакаш отговор (HTTP, gRPC, NATS request). Event: излъчваш факт и не чакаш никого. | Правило: всичко, което потребителят чака, е request/reply с timeout budget; всичко останало е събитие. Смесването ("чакам Kafka консуматор да ми отговори") дава най-лошото от двете. |
| **Presigned URL / Direct Upload** | Сървърът издава подписан временен URL, а клиентът качва или тегли направо от обектното хранилище. | Видео, файлове, медия в чат. Приложните сървъри не бива да пренасят байтове, за които не добавят стойност. |
| **CDN + Signed URL / Cookie** | Статичното съдържание се раздава от edge сървъри; достъпът се контролира с подпис, проверяван на edge-а. | Видео сегменти, autocomplete отговори, seat map snapshot-и. Egress трафикът, а не съхранението, определя сметката. |
| **Sidecar Pattern** | Спомагателен процес до основното приложение в същия Pod/host. | Service mesh (Envoy, Istio) за mTLS, retries, метрики, без да се пипа кодът на приложението. |
| **Blue-Green / Canary Deploy** | Новата версия получава първо малък процент трафик или работи паралелно със старата. | Отговорът на "как деплойвате без downtime", особено при stateful WebSocket слой, който изисква graceful drain. |
| **Feature Flags / Kill Switch** | Функция се включва или изключва по конфигурация, без деплой, по процент потребители или сегмент. | Постепенно пускане, бързо изключване на счупена функция, A/B тестове. |
| **Observability (RED / USE) + SLO** | RED: Rate, Errors, Duration за услуги. USE: Utilization, Saturation, Errors за ресурси. Плюс разпределен tracing (trace id през всички hop-ове) и SLO с error budget. | Въпросът "как ще разберете, че се е счупило" идва почти винаги накрая. Отговорът е метрики и SLO, не логове. Примери: consumer lag, p99 латентност, saga compensation rate, crash window. |
| **Chaos Engineering** | Съзнателно предизвикване на откази (убит възел, забавена мрежа, паднал Redis) в контролирана среда. | Проверява, че fencing, takeover, failover и circuit breaker-ите работят, преди инцидентът да ги провери вместо теб. |

## Кой патерн къде се среща

| Патерн | URL | Video | Tickets | Chat | Crawler | Notif | Feed | Geo | KV | Files | Auto | Game |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Idempotency key / consumer | | ✓ | ✓ | ✓ | | ✓ | | | | | | ✓ |
| Transactional outbox / CDC | | | ✓ | | | ✓ | | | | | | |
| Saga + компенсации | | | ✓ | | | | | | | | | |
| Lock като оптимизация + DB гаранция | | | ✓ | | | | | ✓ | | | | |
| Lease + fencing / single owner | | | (алт.) | | ✓ | | | | | | | ✓ |
| Consistent hashing | | | | | ✓ | | | | ✓ | | | |
| Bloom filter | ✓ | | | | ✓ | | | | ✓ | | | |
| Kafka партиция по ключ за подредба | | | | ✓ | | | | | | | | |
| Fan-out on write / on read | | | | ✓ | | ✓ | ✓ | | | ✓ | | ✓ |
| Cache-aside + negative caching + stampede | ✓ | | ✓ | | | | ✓ | | | | ✓ | |
| Write-behind | | ✓ | | | | | ✓ | | | | | |
| Presigned URL / CDN | | ✓ | | ✓ | | | ✓ | | | ✓ | ✓ | |
| Backpressure / load shedding | | | ✓ | ✓ | ✓ | ✓ | | | | | | ✓ |
| DLQ + replay | | ✓ | ✓ | | | ✓ | | | | | | ✓ |
| Circuit breaker | | | | | | ✓ | | | | | | |
| Quorum / hinted handoff / Merkle | | | | | | | | | ✓ | | | |
| State machine с изтичане | | ✓ | ✓ | | | ✓ | | ✓ | | ✓ | | |
| Cursor pagination / journal cursor | | | | ✓ | | | ✓ | | | ✓ | | |
| Offline build + atomic swap | | | | | | | | | | | ✓ | |
| Snapshot + takeover | | | | | | | | | | | | ✓ |

## Как да структурираш отговора в интервюто

Повечето провалени интервюта не са заради липса на знания, а заради скачане направо в диаграмата.
Редът, който интервюиращите оценяват:

1. **Изясни изискванията (5 мин).** Функционални и нефункционални. Колко потребители? Какво
   съотношение четене/писане? Каква латентност е приемлива? Има ли изискване за консистентност?
   Задай поне три въпроса, преди да рисуваш.
2. **Оразмери (5 мин).** QPS, съхранение, пропускливост, памет за кеш. Тези числа после **обосновават
   всяко твое решение** ("116k RPS четене, затова кеш, не база").
3. **Дефинирай API-то.** Три-четири ендпойнта с вход и изход. Показва, че мислиш за договора, не
   само за кутийките.
4. **Модел на данните.** Какъв е partition key-ът и защо. Тук се хващат hot partition проблемите.
5. **Високо ниво (10 мин).** Кутийки и стрелки. Дръж го просто, без да добавяш компонент, който не
   можеш да защитиш. Всяка стрелка има протокол и гаранция (sync/async, at-least-once/at-most-once).
6. **Задълбочаване (15 мин).** Интервюиращият ще посочи една част. Обикновено е тази с
   конкуренцията, консистентността или мащаба.
7. **Бутилкови гърла и компромиси (5 мин).** Кажи сам къде системата ще се счупи първо и как ще
   разбереш, че се е счупила. Това е разликата между mid и senior оценка.

### Числа, които трябва да знаеш наизуст

| Величина | Стойност | За какво служи |
| --- | --- | --- |
| Секунди в ден | 86 400 (≈ 10^5 за бързи сметки) | Дневен обем → QPS |
| Redis GET / SET | 0.1-1 ms, 100k+ ops/s на инстанс | Защо кешът поема четенето |
| SSD случайно четене | ~100 µs | Защо базата е 100x по-бавна от кеша |
| Мрежова обиколка в един DC | 0.5-1 ms | Цена на всеки допълнителен hop |
| Мрежова обиколка между континенти | 100-150 ms | Защо multi-region е сложен |
| Postgres single node | 5-20k записа/s, много повече четения с реплики | Кога трябва шардиране |
| Kafka партиция | десетки MB/s, милиони съобщения/s на клъстер | Почти никога не е бутилковото гърло |
| WebSocket връзки на Node процес | 50-100k при внимание за паметта | Брой инстанции за stateful слоя |
| Bloom filter | ~10 бита на елемент при 1% false positive | Памет за дедупликация |

### Изречения, които печелят точки

- "Тук избирам eventual consistency за четенето, но записът трябва да е строго консистентен, защото..."
- "Това е at-least-once, значи консуматорът трябва да е идемпотентен."
- "Ще шардирам по `hash(id)`, а не по дата, за да не си направя hot partition."
- "Този лок е оптимизация; гаранцията е `UNIQUE` constraint в базата."
- "Ако тази зависимост падне, предпочитам fail open с по-строг локален лимит, защото..."
- "Не бих сложил това в критичния път на заявката; излъчвам събитие и го обработвам асинхронно."
- "Всяка стрелка тук има гаранция: тази е request/reply с бюджет 300 ms, тази е at-least-once."
- "Този компонент е stateful, затова има lease, snapshot и процедура за drain при деплой."
- "Ще разбера, че се е счупило, по consumer lag и p99, не по логовете."
