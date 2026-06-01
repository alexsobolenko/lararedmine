# LaraRedmine

LaraRedmine - новая реализация проектного менеджера в духе Redmine на стеке Laravel 13 + React SPA + PostgreSQL.

Это не форк Redmine и не перенос его Ruby on Rails кода. Redmine используется как функциональный ориентир: проекты, задачи, роли, workflow, учет времени, wiki, файлы, уведомления, REST API и расширяемость через плагины.

## Документация

- [SPECIFICATION.md](SPECIFICATION.md) - что строим: функциональные модули, сущности, API, права, плагины, безопасность.
- [ROADMAP.md](ROADMAP.md) - в каком порядке строим: фазы от инфраструктуры до production hardening.

## Переменные окружения

Для development-окружения вручную скопируй пример переменных:

```bash
cp .env.example .env
```

Для production-конфигурации используй отдельный пример:

```bash
cp .env.production.example .env
```

После копирования заполни значения под свое окружение. Реальные `.env`-файлы не коммитятся.

## Команды

### Разработка

- `make dev-build` - собрать Docker-образы для development-конфигурации.
- `make dev-up` - запустить development-окружение в фоне.
- `make dev-down` - остановить и удалить контейнеры development-окружения.
- `make dev-logs` - открыть поток логов development-окружения.
- `make dev-frontend-build` - запустить Vite dev server в Node-контейнере после `make dev-up`.
- `make dev-test` - запустить Laravel-тесты в PHP-контейнере development-окружения.

### Production-конфигурация

- `make prod-build` - собрать Docker-образы для production-конфигурации.
- `make prod-up` - запустить production-конфигурацию в фоне.
- `make prod-down` - остановить и удалить контейнеры production-конфигурации.
- `make prod-logs` - открыть поток логов production-конфигурации.
- `make prod-frontend-build` - собрать frontend assets через Node-контейнер из production-конфигурации.
