# Playwright UI Test Automation

This project contains automated UI tests using Playwright for the Sauce Demo application.

## Prerequisites

- Node.js (v14 or higher) - [Download Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- Git (for version control)

## System Setup

1. Install Node.js:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download and install the LTS (Long Term Support) version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. Install Git:
   - Visit [git-scm.com](https://git-scm.com/)
   - Download and install for your operating system
   - Verify installation:
     ```bash
     git --version
     ```

## Project Setup

1. Install project dependencies:
```bash
npm install
```

2. Install Playwright browsers (required for test execution):
```bash
npx playwright install
```

3. Create environment files:
```bash
# Copy example environment file
cp .env.example .env.development
```

## Running Tests

Run tests in different environments:

```bash
# Development environment (default)
npm run test

# Development environment with UI mode
npm run test:ui

# Development environment with debug mode
npm run test:debug

# Staging environment
npm run test:staging

# Production environment
npm run test:prod
```

## Environment Configuration

The project uses different environment files for different contexts:
- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

Copy `.env.example` to create your environment files and update the values as needed.

## Project Structure

```
├── tests/              # Test files
├── pages/             # Page Object Models
├── .env.example       # Example environment configuration
└── playwright.config.js # Playwright configuration
```

## Available Scripts

- `npm run test` - Run tests in development environment
- `npm run test:ui` - Run tests with Playwright UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:staging` - Run tests in staging environment
- `npm run test:prod` - Run tests in production environment
