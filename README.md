# menfess-js

Menfess.app API

## Table of Contents

- [Quick run](#quick-run)
- [Database utils](#database-utils)
- [Tests](#tests)

## Quick run

```bash
git clone https://github.com/fadhiilrachman/menfess-js.git
code menfess-js
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test
