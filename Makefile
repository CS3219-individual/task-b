run:
	@docker-compose -f docker-compose.development.yml build
	@docker run --network host billchee1997/express-backend:0.1.0

dev:
	@docker-compose -f docker-compose.development.yml build
	@docker-compose -f docker-compose.development.yml up

dev-test:
	@docker-compose -f docker-compose.local_test.yml build
	@docker-compose -f docker-compose.local_test.yml up