# Дорожная карта LaraRedmine

> Redmine-inspired project management application built with **Laravel 13** and **React 19**.

LaraRedmine — это open-source система управления проектами, вдохновлённая Redmine. Цель проекта — создать современную, расширяемую и удобную альтернативу с API-first подходом, Docker-first инфраструктурой и PostgreSQL в качестве основной БД.

---

## Технологический стек

| Компонент | Технология |
|-----------|------------|
| **Backend** | PHP 8.3, Laravel 13 |
| **Frontend** | React 19, TypeScript, Vite, Bootstrap 5, SCSS |
| **База данных** | PostgreSQL |
| **Инфраструктура** | Docker Compose, Nginx, PHP-FPM |
| **Качество кода** | PHPStan, Psalm, PHPCS, ESLint, Stylelint, Pint |
| **Тестирование** | PHPUnit, Larastan |
| **Git hooks** | Husky, Commitlint |

---

## Требования

- **Docker** и **Docker Compose** (рекомендуется Docker Desktop или Docker Engine + docker compose plugin)
- **Make** (для удобного запуска команд)

---

## Быстрый старт

### 1. Клонирование и настройка

```bash
git clone <repo-url>
cd lararedmine
cp .env.example .env
```

### 2. Сборка и запуск (dev-окружение)

```bash
make dev-build    # сборка образов
make dev-up       # запуск контейнеров
```

### 3. Установка зависимостей

```bash
# PHP-зависимости (внутри контейнера)
docker compose -f docker-compose.dev.yml exec php composer install

# Генерация ключа приложения
docker compose -f docker-compose.dev.yml exec php php artisan key:generate

# Миграции БД
docker compose -f docker-compose.dev.yml exec php php artisan migrate

# Frontend-зависимости (внутри контейнера)
docker compose -f docker-compose.dev.yml exec node npm install
```

### 4. Запуск фронтенда в режиме разработки

```bash
make dev-frontend-build
```

Приложение будет доступно по адресу: `http://localhost`

---

## Команды Makefile

### Разработка

| Команда | Описание |
|---------|----------|
| `make dev-build` | Сборка Docker-образов для разработки |
| `make dev-up` | Запуск контейнеров в фоне |
| `make dev-down` | Остановка и удаление контейнеров |
| `make dev-logs` | Просмотр логов всех контейнеров (follow) |
| `make dev-frontend-build` | Запуск Vite dev-сервера для фронтенда |
| `make dev-lint` | Запуск всех линтеров (ESLint, Stylelint, PHPStan, PHPCS, Psalm) |
| `make dev-test` | Запуск PHPUnit тестов |
| `make dev-ps` | Список запущенных контейнеров |
| `make dev-exec <cmd>` | Выполнить произвольную команду в контейнере |

### Продакшн

| Команда | Описание |
|---------|----------|
| `make prod-build` | Сборка продакшн-образов |
| `make prod-up` | Запуск продакшн-контейнеров |
| `make prod-down` | Остановка продакшн-контейнеров |
| `make prod-logs` | Просмотр логов продакшн-контейнеров |
| `make prod-frontend-build` | Сборка фронтенда для продакшна (через profile build) |
| `make prod-ps` | Список продакшн-контейнеров |
| `make prod-exec <cmd>` | Выполнить команду в продакшн-контейнере |

---

## Полезные команды (внутри контейнера)

### PHP-контейнер

```bash
# Запуск миграций
php artisan migrate

# Очистка кеша конфигурации
php artisan config:clear

# Запуск тестов
composer test

# PHPStan статический анализ
vendor/bin/phpstan analyse

# PHP CodeSniffer
vendor/bin/phpcs -n

# Psalm статический анализ
vendor/bin/psalm --no-cache
```

### Node-контейнер

```bash
# Установка зависимостей
npm install

# Запуск Vite dev-сервера
npm run dev

# Сборка для продакшна
npm run build

# Линтинг JS/TS
npm run lint

# Линтинг стилей
npm run stylelint

# Полная проверка фронтенда
npm run check
```

---

## Лицензия

Проект распространяется под лицензией MIT. См. файл [LICENSE.txt](LICENSE.txt).