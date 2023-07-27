# menfess-js

Menfess.app API

## Table of Contents

- [Quick run](#quick-run)
- [Database utils](#database-utils)
- [Links](#links)
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
npx run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npx run migration:run
```

Revert migration

```bash
npx run migration:revert
```

Drop all tables in database

```bash
npx run schema:drop
```

Run seed

```bash
npx run seed:run
```

## Links

- Swagger: <http://localhost:3000/docs>

## Tests

```bash
# unit tests
npm run test
