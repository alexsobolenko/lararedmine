# Спецификация LaraRedmine

## 1. Назначение

LaraRedmine - web-приложение для управления проектами и задачами, совместимое по ключевым сценариям с Redmine, но реализованное как Laravel 13 API + React SPA.

Главный принцип: Redmine используется как функциональный ориентир, а не как кодовая база. Архитектура должна быть idiomatic Laravel/React, контейнеризованной и расширяемой.

## 2. Архитектурные принципы

- Backend предоставляет JSON:API/REST endpoints, frontend не зависит от server-rendered views.
- Нужен swagger для работы с API
- Локальная разработка в Docker, CI и deploy используют одинаковую схему сервисов.
- Все бизнес-действия проходят через роли, права, memberships и Laravel Policies.
- Изменения задач, wiki, времени и настроек пишутся в journals/activity stream.
- Плагины?

## 3. Контейнеры

Минимальная compose-топология:

`nginx` - HTTP entrypoint
`php` - Laravel app, PHP-FPM, artisan commands
`node` - Vite dev server, frontend build, linters/tests
`postgresql` - основная база данных

### 3.1 Структура репозитория

Согласованная структура проекта: Laravel 13 находится в корне репозитория. React SPA является частью Laravel-приложения и располагается в `resources/js`. Laravel остается стандартным корневым приложением, а React используется как SPA-слой через Vite внутри Laravel. Это упрощает старт проекта, `artisan`/Composer workflow и Docker Compose конфигурацию.

Планируемые дополнительные сервисы:

`redis` - queues, cache, locks, broadcast ?
`mailpit` - локальная проверка email notifications и incoming mail ?
`worker` - отдельный Laravel queue worker ?
`scheduler` - Laravel scheduler ?
`opensearch` / `meilisearch` - полнотекстовый поиск по задачам/wiki/documents ?

## 4. Функциональные модули ядра

### 4.1 Пользователи и доступ

- регистрация только администратором;
- администратор должен создаваться при разворачивании проекта;
- пользователь может иметь разные роли в разных проектах;
- группы могут добавляться в проекты как участники;
- доступы проверяются на уровне проекта и модуля.

### 4.2 Проекты

- поддержка публичных и приватных проектов;
- поддержка подпроектов;
- включение/отключение модулей на проекте: issues, time tracking, wiki, files, news, forums, repository;
- короткий `identifier` используется в URL и API.

### 4.3 Задачи

- трекеры настраиваются администратором;
- детали продвижения задачи зависят от трекера, роли и текущего статуса;
- задачи имеют автора, назначенного, статус, приоритет, категорию, версию, даты, оценку, процент готовности;
- задачи поддерживают иерархию parent/child;
- список задач поддерживает фильтры, сортировку, группировку и сохраненные запросы;
- журналы фиксируют изменение полей и комментарии.

### 4.4 Настраиваемые поля

Области применения:

- issues;
- projects;
- users;
- time entries;
- versions;
- documents.

Типы:

- string, text, integer, float, boolean;
- date, datetime;
- list, multi-list;
- user, version;
- link/email как форматируемые строки.

### 4.5 Трудозатраты

- время вводится на уровне проекта или задачи;
- отчетность по пользователю, трекеру, задаче, проекту, версии;
- доступы отдельно контролируют просмотр, создание и редактирование чужого времени.

### 4.6 Версии и дорожная карта (спринты)

- версия (спринт) принадлежит проекту;
- version status: open, locked, closed;
- roadmap показывает задачи, сгруппированные по версии;
- прогресс версии вычисляется по задачам.

### 4.7 Wiki

- wiki включается на проекте;
- страницы имеют историю ревизий;
- поддерживаются attachments;
- форматирование выбирается отдельно: Markdown как основной формат, Textile compatibility как будущий импортный слой.

### 4.8 News, Documents, Files, Forums

- файлы прикрепляются к задачам, wiki, news, documents;
- documents группируются категориями;
- forums работают на уровне проекта;
- news попадает в project activity и уведомления.

### 4.9 Уведомления

- email notifications по изменениям задач, wiki, forums, news;
- watchers на задачах и wiki pages;
- user preferences для частоты и типов уведомлений;
- digest notifications как отдельный этап.

### 4.10 Repository / SCM

- хранить метаданные внешних репозиториев;
- связывать коммиты с задачами по шаблонам `#123`, `refs #123`, `fixes #123`.

## 5. API

Предпочтительный формат - JSON:API там, где он удобно ложится на ресурсы и отношения Laravel 13. Для совместимости с Redmine REST API допускаются adapter endpoints или compatibility mode.

Требования к API:

- pagination, sorting, filtering;
- sparse fieldsets и relationship includes;
- consistent error format;
- idempotency keys для опасных повторяемых операций;
- OpenAPI specification генерируется или поддерживается вручную.

## 6. Frontend SPA

Дубрирует внешний вид redmine, для начала.

Ключевые экраны:

- dashboard пользователя;
- список проектов;
- overview проекта;
- issue list с фильтрами;
- issue detail с journal timeline;
- создание/редактирование задачи;
- roadmap/version detail;
- spent time report;
- wiki page view/edit/history;
- project settings;
- admin settings.

UX-требования:

- интерфейс должен быть плотным, рабочим, без маркетинговой landing page;
- таблицы и фильтры оптимизированы для ежедневной работы;
- все критические действия имеют loading/error/empty states;
- deep links сохраняют фильтры и выбранные представления.

## 7. Плагины

Избранные redmine плагины должны быть интегрированы в код проекта, как и прочие модули.

Планируемые направления:

- Agile: Kanban/Scrum boards, swimlanes, story points, sprints.
- Checklists: чек-листы внутри задач, прогресс по пунктам.
- CRM/Helpdesk: контакты, компании, обращения, email-to-ticket.
- Knowledge base: улучшенная wiki/documentation структура.
- Reporting: burnup/burndown, SLA, workload, custom dashboards.

## 8. Безопасность

- все write endpoints требуют аутентификацию;
- CSRF защищает cookie-based SPA flows;
- API tokens имеют scopes и expiration;
- file uploads проверяются по MIME, размеру и permissions;
- audit log для административных изменений;
- rate limiting для auth, API tokens и public endpoints.

## 9. Импорт и совместимость

Целевой импорт:

- проекты;
- пользователи и группы;
- роли и memberships;
- trackers/statuses/workflows;
- issues, journals, relations;
- attachments;
- wiki pages;
- time entries;
- versions и categories.

Возможные источники:

- Redmine database dump через ETL scripts;
- Redmine REST API;
- CSV для issues/time entries.
