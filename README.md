# Event-Driven System Monorepo with Real-time Dashboard

This repository contains all the components for an event-driven system, complete with a real-time dashboard that provides a visualization of what's happening in the system.

## Components

### 1. Frontend

A UI component to simulate user interactions.

### 2. API

Receives user interactions, parses the body, and based on the `eventType`, it sends a message to either `topic1` or `topic2` of the queue.

- `eventType: passiveEvent` → `topic1`
- `eventType: activeEvent` → `topic2`
- Message Format: `{eventType: active|passiveEvent, create_date: createdate}`

### 3. RabbitMQ

The message queue of the system.

- Image: `rabbitmq:management-alpine`
- Port: `5672`
- **Management Console**: Accessible via the public domain. Explore endpoints programmatically with `{public-domain}/api/{route}`.
- Documentation: `{public-domain}/api/index.html`

### 4. Service1 (Node app)

On initial deployment of the Railway Template, a migration is run from this service deployment, to insert the appropriate tables into the PostGres DB. _(Migration file located in `service1/migrations/`.)_

Listens for messages from `topic1` and `topic2` and processes them as detailed:

- For `topic1`: Acknowledges the message, processes it, adds a `processed_date`, and inserts it into the `topic1` table of the DB.
- For `topic2`: Processes, modifies it with a decrypted value, and puts the message back into the queue on `topic3`. _(See `service1/index.js:8`)_

### 5. Service2 (Node app)

Listens for messages from `topic3`, decrypts the decrypted value, and inserts the processed data into the `topic3` table of the DB.

### 6. PostgreSQL Database

Not present in this repo, but included in the [Railway Template](https://railway.app/new/template/Cjw6ce).

Consists of three tables - `topic1`, `topic2`, `topic3` - storing event metrics corresponding to the topics.

The tables are created during the initial deployment of `service1` during the build step.

### 7. Dashboard-API

Backend for the Dashboard-UI. Fetches data from the PostgreSQL database. Future enhancements might include fetching metrics directly from RabbitMQ.

### 8. Dashboard-UI

Real-time visualization dashboard showing metrics from the topics. Refreshes every 5 seconds. Essential for visualizing system internals in response to user interactions.

## Future Development Notes

- **Monorepo Structure**: Current usage of `lerna` is not optimal. Consider restructuring, possibly introducing a top-level utilities folder for shared utilities.
- **Database Migrations**: Using `node-pg-migrate` to create tables in PostgreSQL on template deployment. Remember to delete the migration file from `service1/migrations` on subsequent builds to prevent build failures. Might switch to another migration tool in the future.
- **CI/CD**: Look into incorporating CI/CD pipelines, possibly integrating the Railway CLI.
- **Optimizations**: More work is needed to optimize the node services to utilize replicas.
- **Documentation**:  Detailed documentation on each service should be included in the component directories

---

This is a WIP :D