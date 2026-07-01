# PAMOJA Backend API

Node.js/Express backend for PAMOJA - The Business Operating System

## Setup

```bash
npm install
cp .env.example .env
```

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Database

### Migrate
```bash
npm run migrate
```

### Seed
```bash
npm run seed
```

## API Endpoints

All endpoints are prefixed with `/api/v1/`

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh`

### POS
- `GET /pos/transactions`
- `POST /pos/transactions`
- `GET /pos/transactions/:id`
- `POST /pos/receipt`

### Products
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /products/search`

### Inventory
- `GET /inventory`
- `PUT /inventory/:productId`
- `POST /inventory/restock`
- `GET /inventory/low-stock`

### Invoices
- `GET /invoices`
- `POST /invoices`
- `GET /invoices/:id`
- `POST /invoices/:id/send`

### Reports
- `GET /reports/sales`
- `GET /reports/inventory`
- `GET /reports/revenue`
- `GET /reports/top-products`

### Users
- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```
