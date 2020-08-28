dev:
	@docker-compose build
	@docker-compose up

dev-test:
	@docker-compose build
	@docker-compose -f docker-compose.test.yml up