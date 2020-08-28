dev:
	@docker-compose -f docker-compose.development.yml build
	@docker-compose up

dev-test:
	@docker-compose -f docker-compose.test.yml build
	@docker-compose -f docker-compose.test.yml up