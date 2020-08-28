dev:
	@docker-compose -f docker-compose.development.yml build
	@docker-compose up

dev-test:
	@docker-compose -f docker-compose.local_test.yml build
	@docker-compose -f docker-compose.local_test.yml up