# PAMOJA Setup Guide

## Prerequisites

- Node.js v16+
- PostgreSQL v12+
- Flutter SDK v3+
- npm or yarn
- Git

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and update:
- Database credentials
- JWT secrets
- Payment gateway keys
- Email configuration

### 3. Setup Database
```bash
# Create database
psql -U postgres
CREATE DATABASE pamoja_db;

# Run migrations
npm run migrate

# Seed sample data
npm run seed
```

### 4. Start Backend
```bash
npm run dev  # Development
npm start    # Production
```

Backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend-web
npm install
```

### 2. Start Development Server
```bash
npm start
```

Frontend will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Mobile App Setup

### 1. Install Dependencies
```bash
cd mobile-app
flutter pub get
```

### 2. Run on Device/Emulator
```bash
# List available devices
flutter devices

# Run app
flutter run
```

### 3. Build APK (Android)
```bash
flutter build apk
```

### 4. Build IPA (iOS)
```bash
flutter build ios
```

## Verification

### Check Backend
```bash
curl http://localhost:5000/health
```

### Check Frontend
Open `http://localhost:3000` in browser

### Check Mobile
Launch app on device/emulator

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database `pamoja_db` exists

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Set PORT environment variable
- Mobile: Specify different port in config

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- For Flutter: Run `flutter clean` then `flutter pub get`

## Next Steps

1. Start the backend server
2. Launch the web dashboard
3. Test on mobile
4. Create your first store
5. Add products
6. Make your first sale!

**Happy selling with PAMOJA!** 🚀
