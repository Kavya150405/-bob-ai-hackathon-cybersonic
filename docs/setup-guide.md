# Setup Guide

## 1. Overview

This guide explains how to install, configure, run, and verify the project locally.

**Important:** The commands below are a documentation structure until the final source code is available. Replace every **TO BE CONFIRMED** item with the exact commands and versions used by the completed project.

## 2. Prerequisites

Install the software required by the final implementation.

Planned prerequisites may include:

- Git
- Python
- Node.js and npm
- Database software, if required

### Required Versions

| Software | Version |
|---|---|
| Git | **TO BE CONFIRMED** |
| Python | **TO BE CONFIRMED** |
| Node.js | **TO BE CONFIRMED** |
| Database | **TO BE CONFIRMED** |

Use the versions actually tested by the team.

## 3. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
```

Replace the placeholders with the actual repository URL and folder name.

## 4. Project Structure

The final repository follows the official submission structure:

```text
project-root/
├── docs/
├── demo/
├── presentation/
├── src/
├── README.md
├── submission.yaml
└── CONTRIBUTING.md
```

The application source code must be kept inside `src/`.

## 5. Environment Variables

If the application requires environment variables:

1. Copy the example environment file.
2. Add the required local values.
3. Never commit the real `.env` file.

Example:

```bash
cp .env.example .env
```

The final `.env.example` must contain all variables required by the application without exposing real credentials.

## 6. Install Dependencies

### Backend

**TO BE CONFIRMED**

Example structure if the final application uses Python:

```bash
cd src/<backend-folder>
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Then:

```bash
pip install -r requirements.txt
```

### Frontend

**TO BE CONFIRMED**

If the final application uses a Node-based frontend:

```bash
cd src/<frontend-folder>
npm install
```

Only retain the commands that actually work for the final project.

## 7. Database Setup

**TO BE CONFIRMED**

Document:

- Database type
- Database name
- Required credentials/configuration
- Migration or table creation commands
- Seed/sample data commands, if any

If the prototype does not use a database, remove this section's database commands.

## 8. Start the Application

Document the exact commands used to start the final application.

### Backend

```bash
<ACTUAL_BACKEND_START_COMMAND>
```

### Frontend

```bash
<ACTUAL_FRONTEND_START_COMMAND>
```

If the project starts with one command, document that command instead.

## 9. Verify the Application

After starting the application:

1. Open the application URL.
2. Confirm that the dashboard loads.
3. Confirm that vessel/port data is displayed.
4. Run a congestion prediction.
5. Confirm that the system returns the expected result.
6. Check the route/resource recommendation.
7. Check that the 72-hour operations plan is generated.

The exact URL and verification steps must match the final implementation.

## 10. Demo Verification

A successful local run should allow the evaluator to follow the main user journey:

```text
Open Dashboard
      ↓
View Port Status
      ↓
Run / View Congestion Prediction
      ↓
View Recommendation
      ↓
View Berth + Crane Assignment
      ↓
View 72-Hour Operations Plan
```

## 11. Troubleshooting

### Application does not start

- Check that all prerequisites are installed.
- Check the required software versions.
- Check environment variables.
- Check dependency installation.
- Review terminal error messages.

### Database connection fails

- Confirm the database is running.
- Confirm the database credentials.
- Confirm the database name and connection string.
- Confirm that required tables/data have been created.

### Frontend cannot connect to backend

- Confirm that the backend is running.
- Confirm the API URL/configuration.
- Check for incorrect environment variables.
- Check the browser console and backend logs.

## 12. Clean-Machine Verification

Before submission, run the setup process from a fresh environment or clean terminal and verify that the documented commands are sufficient to start the project.

The final version of this file should contain **no placeholder commands**.
