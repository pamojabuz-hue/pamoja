# PAMOJA API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+255123456789"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token",
  "refreshToken": "refresh_token",
  "user": { ... }
}
```

### Products

#### Get All Products
```
GET /products?store_id=<store_id>&page=1&limit=20
```

#### Create Product
```
POST /products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "barcode": "1234567890",
  "sku": "SKU123",
  "category": "Category",
  "price": 99.99,
  "cost_price": 50.00,
  "stock_quantity": 100
}
```

#### Search by Barcode
```
GET /products/search?barcode=1234567890
```

### POS Transactions

#### Get Transactions
```
GET /pos/transactions?store_id=<store_id>&date=2024-01-01
```

#### Create Transaction
```
POST /pos/transactions
Content-Type: application/json

{
  "store_id": "uuid",
  "cashier_id": "uuid",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "unit_price": 99.99
    }
  ],
  "payment_method": "cash",
  "tax_amount": 10.00,
  "discount_amount": 5.00
}
```

### Invoices

#### Create Invoice
```
POST /invoices
Content-Type: application/json

{
  "store_id": "uuid",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "items": [
    {
      "description": "Item",
      "quantity": 1,
      "unit_price": 99.99
    }
  ],
  "due_date": "2024-02-01"
}
```

#### Send Invoice
```
POST /invoices/:id/send
```

### Reports

#### Sales Report
```
GET /reports/sales?store_id=<id>&start_date=2024-01-01&end_date=2024-01-31
```

#### Revenue Report
```
GET /reports/revenue?store_id=<id>&period=monthly
```

#### Top Products
```
GET /reports/top-products?store_id=<id>&limit=10
```

## Error Responses

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
