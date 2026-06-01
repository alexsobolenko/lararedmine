# Дорожная карта LaraRedmine

## Фаза 0. Подготовка репозитория

Цель: создать воспроизводимую основу проекта.

- `docker-compose.yml` с `nginx`, `php`, `node`, `postgresql`;
- Dockerfiles для PHP-FPM и Node;
- Laravel 13 app в корне репозитория;
- React + TypeScript + Vite SPA в `resources/js`;
- базовые `.env.example`, make/task commands;
- CI skeleton: lint, tests, build;
- ADR: API-first, Docker-first, PostgreSQL-first.

Результат: пустое приложение открывается локально через Docker Compose.

## Фаза 1. Identity, Projects, RBAC

Цель: заложить модель доступа Redmine.

- users, groups;
- projects, subprojects, project modules;
- roles, permissions, memberships;
- project visibility: public/private;
- admin UI для ролей и проектов;
- Laravel Policies для всех базовых действий.

Результат: разные пользователи видят разные проекты и действия в зависимости от роли.

## Фаза 2. Issue Tracking MVP

Цель: получить рабочее ядро задач.

- trackers, issue statuses, priorities;
- workflow transitions по tracker + role;
- issues CRUD;
- parent/child issues;
- watchers;
- journals/comments;
- attachments;
- issue list с фильтрами, сортировкой и pagination.

Результат: можно ежедневно вести задачи в проекте.

## Фаза 3. Custom Fields и Saved Queries

Цель: приблизиться к гибкости Redmine.

- custom field definitions;
- values для issues/projects/users/time entries;
- validation rules per custom field;
- custom fields в issue forms;
- custom fields как columns и filters;
- saved public/private queries.

Результат: команды могут адаптировать трекеры и списки задач под свой процесс.

## Фаза 4. Time Tracking, Versions, Roadmap

Цель: покрыть планирование и учет.

- time activities;
- spent time entries;
- time reports;
- versions;
- roadmap;
- version progress;
- due/start dates в calendar-ready формате.

Результат: есть учет времени и планирование релизов.

## Фаза 5. Wiki, Files, News, Forums

Цель: добавить проектную коммуникацию и знания.

- wiki pages, revisions, history;
- Markdown editor/viewer;
- documents/files;
- news;
- project forums;
- unified attachments;
- project activity stream.

Результат: проект хранит не только задачи, но и документацию, обсуждения и файлы.

## Фаза 6. API Compatibility и интеграции

Цель: сделать систему пригодной для автоматизации.

- OpenAPI;
- API tokens/scopes;
- Redmine-like compatibility endpoints для ключевых ресурсов;
- incoming mail prototype;
- outbound email notifications;
- webhook events;
- search endpoint.

Результат: внешние инструменты могут читать и менять основные данные.

## Фаза 7. SCM

Цель: связать задачи и код.

- repository metadata;
- commit ingestion;
- commit message rules: refs/fixes/closes;
- changeset activity;
- links commits -> issues;
- Git provider adapters.

Результат: задачи автоматически связываются с изменениями в репозиториях.

## Фаза 8. Plugin Platform

Цель: открыть систему для расширений.

- backend plugin contract;
- frontend extension registry;
- plugin migrations;
- project module registration;
- plugin permissions;
- developer guide;
- пример plugin skeleton.

Результат: можно подключать функциональность без изменения ядра.

## Фаза 9. Первые плагины

Кандидаты:

- Agile boards: Kanban, Scrum, sprints, swimlanes.
- Checklists: списки внутри задач, required items, progress.
- CRM/Helpdesk: contacts, companies, tickets from email.
- Reporting: dashboards, SLA, workload, burndown/burnup.

Результат: LaraRedmine начинает закрывать популярные сценарии из экосистемы Redmine plugins.

## Фаза 10. Production Hardening

Цель: подготовить к реальному использованию.

- backup/restore documentation;
- production compose или Helm chart;
- queue workers and scheduler;
- observability: logs, metrics, traces;
- security review;
- performance budgets;
- migration/import guide from Redmine;
- release process.

Результат: проект можно безопасно разворачивать и сопровождать.
