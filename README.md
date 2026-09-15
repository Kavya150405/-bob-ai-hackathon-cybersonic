# PortIQ — AI-Powered Container Congestion Prediction & Port Operations Optimisation

## Overview

PortIQ is a proposed AI-assisted decision-support solution for the **L1 — Container Congestion Predictor & Port Operations Optimiser** challenge.

The system is designed to help port operations teams predict congestion, recommend alternate routing strategies, optimise berth and crane assignments, and generate a 72-hour port operations plan.

## Problem

Port operators may need to coordinate many vessels with limited berths and cranes. The L1 challenge highlights that congestion hotspots can be identified reactively after vessels are already queuing, while alternate routing decisions may come too late to help.

The project addresses this by combining prediction and operational recommendations into one workflow.

## Solution

The planned workflow is:

```text
Vessel / Port Data
        ↓
Data Processing
        ↓
Congestion Prediction
        ↓
Route Recommendation
        ↓
Berth + Crane Optimisation
        ↓
72-Hour Operations Plan
        ↓
Dashboard
```

## Key Features

- Port dashboard
- Congestion prediction
- Alternate route recommendation
- Berth and crane optimisation
- 72-hour operations plan

## Technology Stack

The roadmap recommends:

- React + TypeScript
- Python + FastAPI
- Python + Pandas + Scikit-learn
- PostgreSQL or SQLite for prototype data storage
- IBM BoB for AI-assisted development

**The final README must be updated to list only technologies actually used in the completed project.**

## Repository Structure

```text
.
├── docs/
│   ├── problem-statement.md
│   ├── solution-overview.md
│   ├── architecture.md
│   └── setup-guide.md
├── demo/
│   ├── demo-video-link.txt
│   ├── live-demo-url.txt
│   └── screenshots/
├── presentation/
├── src/
├── README.md
├── submission.yaml
└── CONTRIBUTING.md
```

## Running the Project

See [`docs/setup-guide.md`](docs/setup-guide.md).

The final setup guide must contain the exact commands tested by the team.

## Demo

### Live Demo

**TO BE CONFIRMED**

If the application is not deployed:

```text
NOT DEPLOYED
```

### Demo Video

**TO BE CONFIRMED**

The demo should show the application starting, a real user journey, and actual output. The hackathon template specifies a 3–5 minute demo video.

## Screenshots

The final repository should contain at least three application screenshots:

- `01-home-dashboard.png`
- `02-query-input.png`
- `03-result-output.png`

These should show the actual completed application.

## IBM BoB

IBM BoB is used as part of the AI-assisted development workflow.

The final submission must explain the team's actual IBM BoB usage, including relevant development, planning, coding, debugging, or review activities.

No IBM technology or service should be claimed unless it was actually used.

## Results and Impact

The intended impact is to support port operators with earlier congestion awareness and coordinated operational decisions.

Potential measures include:

- Congestion prediction performance
- Vessel waiting time
- Berth utilisation
- Crane utilisation
- Planning efficiency
- Routing-related waiting-time savings

**No performance numbers should be added until they have been measured using the completed system.**

## Limitations

The prototype may use simulated data where real port operational data is unavailable. Other limitations should be added after testing the completed system.

## Team

| Member | Role |
|---|---|
| **TO BE CONFIRMED** | **TO BE CONFIRMED** |
| **TO BE CONFIRMED** | **TO BE CONFIRMED** |
| **TO BE CONFIRMED** | **TO BE CONFIRMED** |

## Submission Checklist

Before submission, verify:

- [ ] Repository was created from the official template.
- [ ] Repository is public.
- [ ] `submission.yaml` is complete.
- [ ] All source code is inside `src/`.
- [ ] Documentation is complete.
- [ ] Setup instructions were tested.
- [ ] Demo video is available.
- [ ] Live demo URL is added, or `NOT DEPLOYED` is used.
- [ ] At least three screenshots are included.
- [ ] Final presentation is included.
- [ ] No real credentials or `.env` files are committed.
- [ ] GitHub Actions `Validate Submission` is green.
