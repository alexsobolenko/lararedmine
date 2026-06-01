DEV_COMPOSE = docker compose -f docker-compose.dev.yml
PROD_COMPOSE = docker compose -f docker-compose.prod.yml


.PHONY: dev-build dev-up dev-down dev-logs dev-frontend-build dev-lint dev-test

dev-build:
	$(DEV_COMPOSE) build

dev-up:
	$(DEV_COMPOSE) up -d

dev-down:
	$(DEV_COMPOSE) down

dev-logs:
	$(DEV_COMPOSE) logs -f

dev-frontend-build:
	$(DEV_COMPOSE) exec node npm run dev -- --host 0.0.0.0

dev-lint:
	$(DEV_COMPOSE) exec -T node npm run lint
	$(DEV_COMPOSE) exec -T node npm run stylelint
	$(DEV_COMPOSE) exec -T php vendor/bin/phpstan analyse
	$(DEV_COMPOSE) exec -T php vendor/bin/phpcs -n
	$(DEV_COMPOSE) exec -T php vendor/bin/psalm --no-cache

dev-test:
	$(DEV_COMPOSE) exec -T php composer test

dev-ps:
	$(DEV_COMPOSE) ps

dev-exec:
	$(DEV_COMPOSE) exec $(filter-out $@,$(MAKECMDGOALS))


.PHONY: prod-build prod-up prod-down prod-logs prod-frontend-build

prod-build:
	$(PROD_COMPOSE) build

prod-up:
	$(PROD_COMPOSE) up -d

prod-down:
	$(PROD_COMPOSE) down

prod-logs:
	$(PROD_COMPOSE) logs -f

prod-frontend-build:
	$(PROD_COMPOSE) --profile build run --rm node npm run build

prod-ps:
	$(PROD_COMPOSE) ps

prod-exec:
	$(PROD_COMPOSE) exec $(filter-out $@,$(MAKECMDGOALS))

# заглушка для работы с exec
%:
	@:
