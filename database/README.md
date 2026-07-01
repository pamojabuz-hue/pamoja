# PAMOJA Database

## Schema Overview

PostgreSQL database schema for PAMOJA - The Business Operating System

## Tables

### Core Tables
- **users** - User accounts and authentication
- **stores** - Business store information
- **products** - Product catalog
- **inventory** - Stock tracking
- **customers** - Customer information

### Sales Tables
- **transactions** - POS transactions
- **transaction_items** - Items in each transaction
- **receipts** - Receipt records

### Invoice Tables
- **invoices** - Invoice documents
- **invoice_items** - Line items in invoices

## Setup

### Create Database
```sql
CREATE DATABASE pamoja_db;
\c pamoja_db
```

### Run Schema
```bash
psql -U postgres -d pamoja_db -f schema.sql
```

## Views

- **daily_sales** - Daily sales summary
- **product_sales** - Product sales analytics

## Running Migrations

```bash
# From backend directory
npm run migrate
```
