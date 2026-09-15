# PortVessel: Port Operations Intelligence & Congestion Management Platform
> **Enterprise-Grade Terminal Operations, Quayside Resource Allocation, AI Recommendations, and Predictive "What-If" Scenario Simulation**

---

## Table of Contents
1. [Executive Summary & Project Overview](#1-executive-summary--project-overview)
2. [Technology Stack & Architecture](#2-technology-stack--architecture)
3. [Step-by-Step Installation & Setup Guide](#3-step-by-step-installation--setup-guide)
4. [Complete Project Directory Structure](#4-complete-project-directory-structure)
5. [Core Modules & Features Breakdown](#5-core-modules--features-breakdown)
   - [Step 5.1: Real-Time Intelligence Dashboard](#step-51-real-time-intelligence-dashboard)
   - [Step 5.2: Vessel Fleet Management & Telemetry](#step-52-vessel-fleet-management--telemetry)
   - [Step 5.3: Berths & STS Gantry Cranes Management](#step-53-berths--sts-gantry-cranes-management)
   - [Step 5.4: AI Recommendations Engine](#step-54-ai-recommendations-engine)
   - [Step 5.5: 72-Hour Operations Timeline (Gantt Schedule)](#step-55-72-hour-operations-timeline-gantt-schedule)
   - [Step 5.6: "What-If" Port Scenario Simulator](#step-56-what-if-port-scenario-simulator)
   - [Step 5.7: Command Center, Global Search & Custom API Settings](#step-57-command-center-global-search--custom-api-settings)
6. [Data Architecture & TypeScript Type System](#6-data-architecture--typescript-type-system)
7. [Service & Integration Layer (`portApi.ts`)](#7-service--integration-layer-portapits)
8. [The "What-If" Mathematical Simulation Engine](#8-the-what-if-mathematical-simulation-engine)
9. [UI Design System & Maritime Dark Theme](#9-ui-design-system--maritime-dark-theme)
10. [End-to-End Operator Workflow Guide](#10-end-to-end-operator-workflow-guide)
11. [Build, Quality Assurance & Deployment](#11-build-quality-assurance--deployment)
12. [Troubleshooting & Frequently Asked Questions](#12-troubleshooting--frequently-asked-questions)

---

## 1. Executive Summary & Project Overview

**PortVessel** is an advanced maritime terminal intelligence and operational control platform. Designed for modern container ports, port authorities, harbor masters, and terminal operators, the platform aggregates telemetry across harbor approaches, outer anchorage zones, quayside berths, and container yards into a single real-time decision cockpit.

### Core Value Propositions
- **Congestion Mitigation**: Continuous real-time scoring of port congestion (0–100 scale) with multi-factor impact attribution (vessel inflow, TEU volumes, berth occupancy, crane availability, and anchorage queues).
- **Intelligent Resource Allocation**: Quayside optimization mapping incoming container vessels to berths and STS (Ship-to-Shore) gantry cranes based on vessel length overall (LOA), draft clearances, and turnaround SLAs.
- **AI-Driven Routing & Advisory**: Automated route recommendation comparing approach fairways (depth, traffic, wait time) and one-click application of AI resource reallocations.
- **Predictive "What-If" Simulation**: A client/server mathematical simulation engine allowing harbor masters to stress-test scenarios (e.g., typhoon shutdowns, holiday cargo surges, crane outages) before operational commitment.
- **72-Hour Forward Horizon**: Quayside berthing Gantt visualization providing a 3-day projection of vessel turnarounds, delays, and critical demurrage risks.

---

## 2. Technology Stack & Architecture

The application is built on modern web standards with strict type safety, modular component separation, and high-performance reactive rendering.

| Layer | Technology / Tool | Version | Description |
|---|---|---|---|
| **Runtime / UI Framework** | [React](https://react.dev/) | `^19.2.8` | Modern React 19 component hierarchy with Hooks |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `~6.0.2` | Strict type definitions across all domain models |
| **Build & Dev Tool** | [Vite](https://vite.dev/) | `^8.3.0` | Ultra-fast HMR and optimized Rollup production bundling |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.46.0` | High-clarity maritime and operational icon set |
| **Styling** | Vanilla CSS3 Variables | Native | Maritime control center dark design system (no bulky CSS runtime) |
| **State Management** | React Context API | Native | Centralized `PortOperationsContext` with reactive dispatchers |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.81.0` | High-speed Rust-based JavaScript/TypeScript linter |

### High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 USER INTERFACE                                    |
|  [Sidebar Navigation]  |  [Header & Command Bar]  |  [Terminal Switcher & Search] |
+-----------------------------------------------------------------------------------+
                                          |
+-----------------------------------------------------------------------------------+
|                                   PAGES LAYER                                     |
|  - DashboardPage         - VesselsPage           - BerthsCranesPage               |
|  - AiRecommendationsPage - Plan72hPage           - WhatIfSimulatorPage            |
+-----------------------------------------------------------------------------------+
                                          |
+-----------------------------------------------------------------------------------+
|                         CENTRAL STATE: PortOperationsContext                      |
|  * Active View               * Live Vessels / Berths / Cranes                     |
|  * Congestion Score & Trends * Route & Resource AI Recommendations               |
|  * 72h Schedule Matrix       * What-If Parameters & Calculated Outputs            |
|  * Toast Notifications       * Modal Controls (Vessel Detail, Search, Settings)   |
+-----------------------------------------------------------------------------------+
                                          |
+-----------------------------------------------------------------------------------+
|                               SERVICE & DATA LAYER                                |
|  [portApi.ts Service Client] <---> [Configurable REST API / Endpoints]            |
|               |                                                                   |
|               +---> (Fallback / Offline) ---> [mockData.ts 34KB Dataset]          |
|               +---> [Mathematical Port Simulation Calculation Engine]             |
+-----------------------------------------------------------------------------------+
```

---

## 3. Step-by-Step Installation & Setup Guide

Follow these steps to set up, develop, and run PortVessel on any development environment (Windows, macOS, Linux).

### Step 3.1: Prerequisites
Ensure your workstation has the following installed:
- **Node.js**: Version `18.x`, `20.x`, or `22.x` (LTS recommended).
- **npm**: Version `9.x` or higher (bundled with Node.js).
- **Git**: For version control.

Verify your environment by running:
```bash
node -v
npm -v
```

### Step 3.2: Clone or Access the Workspace
Navigate to the project root directory:
```bash
cd "f:/New folder"
```

### Step 3.3: Install Dependencies
Install all package dependencies defined in `package.json`:
```bash
npm install
```
*Note: This installs React 19, TypeScript, Vite, Lucide React, and Oxlint.*

### Step 3.4: Launch the Local Development Server
Start Vite's development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, Vite will start the application at:
```text
http://localhost:5173/
```
Open your browser and navigate to `http://localhost:5173/` to view the running platform.

### Step 3.5: Run Code Quality Checks (Linting)
Run Oxlint to ensure code hygiene:
```bash
npm run lint
```

### Step 3.6: Production Compilation
To compile the project and verify strict TypeScript checking:
```bash
npm run build
```
This runs `tsc -b` followed by `vite build`. Output assets are generated into the `/dist` directory.

### Step 3.7: Preview the Production Build Locally
To test the generated production bundle:
```bash
npm run preview
```

---

## 4. Complete Project Directory Structure

```text
f:/New folder/
├── .gitignore                     # Git ignored files (node_modules, dist, etc.)
├── .oxlintrc.json                 # Oxlint linter rules and schema configuration
├── index.html                     # HTML5 entry point with viewport and typography
├── package.json                   # Project scripts and dependencies
├── package-lock.json              # Locked dependency tree
├── portVissle.md                  # Complete step-by-step project documentation (this file)
├── public/                        # Static assets served at root
├── README.md                      # Vite template overview
├── tsconfig.app.json              # TypeScript compiler configuration for client app
├── tsconfig.json                  # Root TypeScript configuration
├── tsconfig.node.json             # TypeScript compiler configuration for Vite node scripts
├── vite.config.ts                 # Vite bundler configuration with React plugin
└── src/
    ├── App.css                    # App-specific auxiliary styles
    ├── App.tsx                    # Root UI shell, page switcher, and global modal bindings
    ├── index.css                  # Core design tokens, CSS variables, and layout styles
    ├── main.tsx                   # React 19 DOM entry mount (`createRoot`)
    ├── assets/                    # Static SVG/image resources
    ├── components/
    │   ├── ai/
    │   │   ├── BerthCraneRecommendation.tsx  # Quayside AI allocation cards with "Apply" action
    │   │   ├── CongestionPredictor.tsx       # Predictive congestion index and trend analysis
    │   │   └── RouteRecommendation.tsx       # Fairway channel routes (Route A, B, C) evaluation
    │   ├── berths/
    │   │   ├── BerthSection.tsx              # Berths grid, draft clearances, and vessel assignments
    │   │   └── CraneSection.tsx              # STS cranes grid, health scores, and moves/hr tracking
    │   ├── common/
    │   │   ├── CongestionGauge.tsx           # Circular SVG radial gauge for congestion index
    │   │   ├── FactorBreakdown.tsx           # Progress bars detailing operational impact drivers
    │   │   ├── KpiCard.tsx                   # Reusable telemetry KPI metric card with trends
    │   │   ├── StatusBadge.tsx               # Standardized colored pill tags for vessel/berth status
    │   │   └── Toast.tsx                     # Floating notification snackbars with auto-dismiss
    │   ├── dashboard/
    │   │   ├── CongestionSection.tsx         # Primary visual banner with gauge and factors
    │   │   ├── OperationalAlert.tsx          # Critical notifications bar with action triggers
    │   │   ├── ResourceSummary.tsx           # Quayside capacity overview with filter chips
    │   │   └── VesselActivityTable.tsx       # Real-time incoming & active vessels table
    │   ├── layout/
    │   │   ├── Header.tsx                    # Top navigation bar, terminal dropdown, search, & profile
    │   │   ├── QuickSearchModal.tsx          # Keyboard-activated (Ctrl+K) quick search drawer
    │   │   ├── SettingsModal.tsx             # REST API endpoint configuration & preferences
    │   │   └── Sidebar.tsx                   # Collapsible left navigation drawer with live counts
    │   ├── schedule/
    │   │   ├── ScheduleFilters.tsx           # Time horizon & priority filtering for schedule
    │   │   └── Timeline72h.tsx               # 72-Hour visual Gantt scheduling matrix
    │   ├── simulator/
    │   │   ├── ComparisonGrid.tsx            # Before vs. After metric comparison cards
    │   │   ├── ImpactAnalysis.tsx            # Operational impact text & mitigation recommendations
    │   │   └── SimulatorControls.tsx         # Interactive parameter sliders & scenario presets
    │   └── vessels/
    │       ├── VesselDetailModal.tsx         # Full-screen modal with deep vessel specs & cargo load
    │       ├── VesselFilters.tsx             # Search input, priority/status dropdowns, & sorting
    │       └── VesselTable.tsx               # Comprehensive vessel operations data table
    ├── context/
    │   └── PortOperationsContext.tsx         # React Context managing shared state and actions
    ├── data/
    │   └── mockData.ts                       # Comprehensive mock dataset (18 vessels, 12 berths, 25 cranes)
    ├── services/
    │   └── portApi.ts                        # Unified API client with automatic offline fallback
    └── types/
        └── port.ts                           # TypeScript domain models and interfaces
```

---

## 5. Core Modules & Features Breakdown

### Step 5.1: Real-Time Intelligence Dashboard
- **File**: `src/pages/DashboardPage.tsx`
- **Purpose**: Central command overview providing immediate situational awareness.
- **Key Subcomponents**:
  1. **CongestionSection** (`src/components/dashboard/CongestionSection.tsx`):
     - Displays the circular SVG gauge showing the current congestion score (e.g., `72/100 HIGH`).
     - Shows dynamic trend indicator (`+6.4% in last 4h`) and human-readable explanation.
     - Embeds **FactorBreakdown**, attributing congestion across 5 vectors:
       - *Incoming Vessels* (28% impact, surge in ultra-large container carriers)
       - *Container Volume* (24% impact, 12,450 TEU daily load)
       - *Available Berths* (20% impact, 2 of 12 free)
       - *Vessel Queue* (18% impact, 11 vessels anchored)
       - *Berth Occupancy* (10% impact, 84% nominal capacity)
  2. **6 Critical KPI Telemetry Cards**:
     - *Incoming Vessels*: `18 vessels` (Warning status, +16.6% trend)
     - *Container Volume*: `12,450 TEU` (88% yard capacity progress bar)
     - *Berth Utilization*: `84%` (Critical >80% red threshold, 10/12 occupied)
     - *Crane Utilization*: `76%` (19/25 STS active, amber load indicator)
     - *Outer Queue*: `11 vessels` (Avg wait 5.4 hrs, red indicator)
     - *Vessels At Risk*: `5 vessels` (Demurrage SLA breach exposure)
  3. **OperationalAlert** (`src/components/dashboard/OperationalAlert.tsx`):
     - Highlights high-priority alerts with quick action buttons (e.g., jump to AI recommendations).
  4. **VesselActivityTable** (`src/components/dashboard/VesselActivityTable.tsx`):
     - Immediate quayside activity with vessel flag, name, IMO, handling progress bar, status badges, and action triggers.
  5. **ResourceSummary** (`src/components/dashboard/ResourceSummary.tsx`):
     - Visual breakdown of available vs. occupied berths and active vs. maintenance cranes with filter tags.

---

### Step 5.2: Vessel Fleet Management & Telemetry
- **File**: `src/pages/VesselsPage.tsx`
- **Purpose**: In-depth monitoring, filtering, and inspection of all approaching, anchored, and berthed container vessels.
- **Key Capabilities**:
  - **Dynamic Filtering**: Filter by free text (name, IMO, shipping line), priority (`High`, `Medium`, `Low`), and status (`On Schedule`, `Delayed`, `At Risk`, `In Progress`, `Waiting`).
  - **Sorting**: Multi-parameter sort by TEU capacity, ETA, priority ranking, and handling duration.
  - **Interactive Vessel Detail Modal** (`src/components/vessels/VesselDetailModal.tsx`):
    - Detailed vessel specs: Length Overall (LOA), Draft, Beam, Shipping Line, Flag.
    - Container Breakdown: Inbound TEU, Outbound TEU, Refrigerated (Reefer) Units, and Hazardous Material (Hazmat) units.
    - Financial Exposure: Hourly demurrage penalty rate (e.g., `$45,000 / day`).
    - Operational Action: Current berth assignment, active STS crane IDs, handling progress, and AI-recommended optimization.

---

### Step 5.3: Berths & STS Gantry Cranes Management
- **File**: `src/pages/BerthsCranesPage.tsx`
- **Purpose**: Physical infrastructure tracking and quayside asset health.
- **Key Subcomponents**:
  1. **BerthSection** (`src/components/berths/BerthSection.tsx`):
     - Displays 12 quayside berths across Terminal 1, Terminal 2, and Terminal 4.
     - Tracks maximum vessel draft clearance (up to 16.5m) and maximum LOA (up to 400m).
     - Live berthing status: Occupied, Available, Maintenance, or Reserved.
     - Turnaround timeline: Displays active vessel name, percentage completion, remaining hours to clear quayside, and scheduled next vessel.
  2. **CraneSection** (`src/components/berths/CraneSection.tsx`):
     - Displays 25 high-capacity Ship-to-Shore (STS) gantry cranes.
     - Operational metrics: Crane moves per hour (e.g., 34 moves/hr), Safe Working Load (SWL 65T - 85T).
     - Asset health scoring: Equipment health score (e.g., 94%), cumulative operating hours, and daily container move count.
     - Direct linkage to assigned quayside berth and vessel.

---

### Step 5.4: AI Recommendations Engine
- **File**: `src/pages/AiRecommendationsPage.tsx`
- **Purpose**: Automated prescriptive intelligence to prevent fairway bottlenecks and optimize quayside turnarounds.
- **Key Subcomponents**:
  1. **CongestionPredictor** (`src/components/ai/CongestionPredictor.tsx`):
     - Dynamic forecast of port congestion trajectory over the upcoming 12 hours based on tidal windows and inbound arrival density.
  2. **RouteRecommendation** (`src/components/ai/RouteRecommendation.tsx`):
     - Analyzes and compares maritime approach channels:
       - **Route B (Deepwater Bypass)**: `Recommended` — Cost `$`, Wait `1.2 hrs`, Congestion `LOW`, Depth `17.5m`, Score `94/100`.
       - **Route A (Main Channel)**: `Alternative` — Cost `$$$`, Wait `5.4 hrs`, Congestion `HIGH`, Depth `15.5m`, Score `62/100`.
       - **Route C (Northern Estuary)**: `Avoid` — Cost `$$`, Wait `3.8 hrs`, Congestion `HIGH`, Draft limited `13.5m`, Score `41/100`.
  3. **BerthCraneRecommendation** (`src/components/ai/BerthCraneRecommendation.tsx`):
     - Suggests optimal berth swaps and crane reassignment pairings for delayed or high-priority vessels.
     - Displays expected time savings (e.g., `Save 3.5 hrs`, `Avoid $38,000 demurrage`).
     - Features an interactive **"Apply Recommendation"** button that immediately updates live application state and triggers a confirmation toast.

---

### Step 5.5: 72-Hour Operations Timeline (Gantt Schedule)
- **File**: `src/pages/Plan72hPage.tsx`
- **Purpose**: Continuous 3-day quayside operational horizon.
- **Key Subcomponents**:
  - **Timeline72h** (`src/components/schedule/Timeline72h.tsx`):
    - Visual Gantt grid mapping hours `00:00` to `72:00` across all terminal berths.
    - Interactive schedule blocks showing vessel name, container volume, assigned crane badges, and operational status.
    - Visual indicators for vessel overlaps, maintenance windows, and buffer margins.
  - **ScheduleFilters** (`src/components/schedule/ScheduleFilters.tsx`):
    - Quick-zoom filters: Next 24 Hours, 48 Hours, or Full 72-Hour schedule.
    - Priority-level highlighting (High, Medium, All).

---

### Step 5.6: "What-If" Port Scenario Simulator
- **File**: `src/pages/WhatIfSimulatorPage.tsx`
- **Purpose**: Stress-testing port dynamics and simulating cascading delays prior to making operational interventions.
- **Key Subcomponents**:
  1. **SimulatorControls** (`src/components/simulator/SimulatorControls.tsx`):
     - Interactive numeric sliders adjusting 5 primary simulation parameters:
       1. *Incoming Vessels (72h)*: 5 to 40 vessels.
       2. *Container Volume (TEU)*: 4,000 to 25,000 TEU.
       3. *Queue in Anchorage*: 0 to 25 vessels.
       4. *Available Berths*: 0 to 12 berths.
       5. *Available Cranes*: 5 to 25 STS cranes.
     - **Pre-Configured Scenario Presets**:
       - `Typhoon Warning`: Berths restricted to 4, Cranes down to 10, Queue surges to 16.
       - `Holiday Cargo Surge`: Inbound vessels up to 28, Container volume up to 19,500 TEU.
       - `Crane Mobilization`: Cranes maxed to 24, Berths optimized to 11.
       - `Reset to Baseline`: Returns parameters to baseline operations.
  2. **ComparisonGrid** (`src/components/simulator/ComparisonGrid.tsx`):
     - Side-by-side **BEFORE** vs. **AFTER** comparison of operational KPIs:
       - Congestion Index Score (`62` vs `Simulated`)
       - Anchorage Queue Count (`8` vs `Simulated`)
       - Berth Utilization (`84%` vs `Simulated`)
       - Crane Utilization (`76%` vs `Simulated`)
       - Average Outer Wait Hours (`4.2h` vs `Simulated`)
       - Turnaround Efficiency (`82%` vs `Simulated`)
  3. **ImpactAnalysis** (`src/components/simulator/ImpactAnalysis.tsx`):
     - Contextual impact summary based on the resulting simulation score.
     - Automated action items and mitigation advisory list.

---

### Step 5.7: Command Center, Global Search & Custom API Settings
- **Header & Command Bar** (`src/components/layout/Header.tsx`):
  - Sticky header with active view title, breadcrumb subtitle, and terminal selector (`Terminal 4 - North Basin`, `Terminal 2 - South Container Pier`, `Terminal 1 - Deepwater Gateway`).
  - Real-time notification badge with dropdown drawer showing unacknowledged operational alerts.
  - Manual telemetry refresh button with spinning state indicator.
- **Quick Search Modal** (`src/components/layout/QuickSearchModal.tsx`):
  - Global search overlay triggered via keyboard shortcut (`Ctrl+K` or `Cmd+K`) or search icon.
  - Instant live search across all vessels, berths, and navigation shortcuts with keyboard navigation support (`Escape` to close).
- **Settings Modal** (`src/components/layout/SettingsModal.tsx`):
  - Allows the operator to configure a live backend REST API endpoint URL (e.g., `https://api.portoperations.internal`).
  - Saved to `localStorage` (`portintel_api_url`) for persistence.
  - Fallback switch: When no API URL is specified, the application seamlessly runs on its built-in simulated data engine.
- **Toast Notifications** (`src/components/common/Toast.tsx`):
  - Global floating toast messages with `success`, `info`, and `warning` variants and auto-dismiss timers.

---

## 6. Data Architecture & TypeScript Type System

The system is strictly typed under `src/types/port.ts`. Below are the primary domain interfaces:

### Vessel Data Model
```typescript
export type CongestionLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type VesselPriority = 'High' | 'Medium' | 'Low';
export type VesselStatus =
  | 'Scheduled'
  | 'On Schedule'
  | 'Waiting'
  | 'Delayed'
  | 'At Risk'
  | 'In Progress'
  | 'Completed';
export type VesselRisk = 'Critical' | 'High' | 'Moderate' | 'Low';

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  shippingLine: string;
  flag: string;
  flagCode: string;
  loa: number;                    // Length overall in meters
  draft: number;                  // Draft in meters
  beam: number;                   // Width in meters
  teu: number;                    // Total containers
  inboundTeu: number;
  outboundTeu: number;
  reeferUnits: number;
  hazmatUnits: number;
  eta: string;
  scheduledArrival: string;
  etd: string;
  priority: VesselPriority;
  status: VesselStatus;
  berthId: string | null;
  craneIds: string[];
  handlingTimeHours: number;
  risk: VesselRisk;
  demurrageRiskCost: number;       // USD per day
  anchorageWaitHours: number;
  congestionImpactScore: number;  // 0 - 100 impact index
  operationalRecommendation: string;
  progressPercent?: number;
}
```

### Berth & Crane Models
```typescript
export type BerthStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';

export interface Berth {
  id: string;
  name: string;
  terminal: string;
  status: BerthStatus;
  occupancyPercent: number;
  capacityTeu: number;
  maxLoa: number;                 // Maximum vessel length supported
  maxDraft: number;               // Maximum allowable water depth
  currentVesselId: string | null;
  currentVesselName: string | null;
  progressPercent: number;
  timeToClearHours: number;
  nextVesselId: string | null;
  nextVesselName: string | null;
  nextVesselEta: string | null;
  assignedCraneIds: string[];
}

export type CraneStatus = 'Available' | 'Assigned' | 'Maintenance';

export interface Crane {
  id: string;
  name: string;
  status: CraneStatus;
  capacityMovesPerHour: number;
  safeWorkingLoadTons: number;
  currentVesselId: string | null;
  currentVesselName: string | null;
  assignedBerthId: string | null;
  operatingHours: number;
  healthScore: number;            // 0 - 100% equipment health
  movesToday: number;
}
```

### Congestion & Simulation Models
```typescript
export interface CongestionFactor {
  name: string;
  value: string;
  impactPercent: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  description: string;
}

export interface CongestionStatus {
  score: number;                  // 0 - 100
  level: CongestionLevel;         // 'LOW' | 'MEDIUM' | 'HIGH'
  explanation: string;
  trend: string;
  factors: CongestionFactor[];
  lastUpdated: string;
}

export interface SimulationParameters {
  incomingVessels: number;
  containerVolume: number;
  queueVessels: number;
  availableBerths: number;
  availableCranes: number;
}

export interface SimulationSituationMetrics {
  congestionScore: number;
  congestionLevel: CongestionLevel;
  queue: number;
  berthUtilization: number;
  craneUtilization: number;
  avgWaitHours: number;
  turnaroundEfficiency: number;
}

export interface SimulationResult {
  before: SimulationSituationMetrics;
  after: SimulationSituationMetrics;
  impactSummary: string;
  recommendedActions: string[];
}
```

---

## 7. Service & Integration Layer (`portApi.ts`)

The service module `src/services/portApi.ts` implements a resilient integration architecture:
1. **Dynamic REST Connection**: Queries any live backend API when `apiBaseUrl` is configured in Settings.
2. **Transparent Fallback**: If the external endpoint is unreachable or empty, calls automatically fall back to the built-in mock dataset without breaking the UI.
3. **Realistic Latency Simulation**: Incorporates asynchronous simulated network delay (`delay(180ms)`) to test loading skeletons and spinners.

### Supported API Endpoints
When connecting an external backend, the following REST endpoints are supported:
- `GET /api/congestion` -> Returns `CongestionStatus`
- `GET /api/vessels` -> Returns `Vessel[]`
- `GET /api/berths` -> Returns `Berth[]`
- `GET /api/cranes` -> Returns `Crane[]`
- `GET /api/routes` -> Returns `RouteRecommendation[]`
- `GET /api/ai/recommendations` -> Returns `ResourceRecommendation[]`
- `GET /api/schedule` -> Returns `ScheduleItem[]`
- `GET /api/alerts` -> Returns `OperationalAlertItem[]`
- `POST /api/simulate` -> Body: `SimulationParameters`, Returns `SimulationResult`

---

## 8. The "What-If" Mathematical Simulation Engine

When running simulations locally, `portApi.runWhatIfSimulation()` executes an empirical maritime formula that mirrors terminal capacity dynamics:

### Calculation Formula
```typescript
// Base Nominal Congestion
const baseCongestion = 62;

// Delta calculations weighted by operational influence
const vesselDelta = (incomingVessels - 18) * 1.5;
const volumeDelta = ((containerVolume - 12450) / 1000) * 1.8;
const queueDelta  = (queueVessels - 8) * 1.6;
const berthDelta  = (2 - availableBerths) * 3.2;   // High sensitivity to berth shortage
const craneDelta  = (6 - availableCranes) * 1.4;   // Sensitivity to crane breakdown

// Simulated Congestion Score (clamped between 12 and 99)
const simulatedScore = Math.min(
  99,
  Math.max(12, Math.round(baseCongestion + vesselDelta + volumeDelta + queueDelta + berthDelta + craneDelta))
);

// Congestion Level Classification
const simulatedLevel = simulatedScore <= 40 ? 'LOW' : simulatedScore <= 70 ? 'MEDIUM' : 'HIGH';

// Quayside Utilization Rates
const simulatedBerthUtil = Math.min(100, Math.max(25, Math.round(((12 - availableBerths) / 12) * 100)));
const simulatedCraneUtil = Math.min(100, Math.max(20, Math.round(((25 - availableCranes) / 25) * 100)));

// Projected Anchorage Waiting Hours
const simulatedWaitHours = +(2.5 + (queueVessels * 0.45) + (incomingVessels * 0.15) - (availableBerths * 0.4)).toFixed(1);

// Turnaround Efficiency Score (0 - 100%)
const simulatedEfficiency = Math.max(35, Math.min(98, Math.round(100 - (simulatedScore * 0.4) - (queueVessels * 1.5))));
```

---

## 9. UI Design System & Maritime Dark Theme

PortVessel employs a purpose-built **Maritime Control Center** dark design system defined in `src/index.css`.

### Design Tokens
```css
:root {
  /* Maritime Control Center Palette */
  --bg-deep: #070B14;               /* Deep ocean black background */
  --bg-surface: #0B1220;            /* Surface panels and sidebar */
  --bg-card: #0F1A2E;               /* Elevated card container */
  --bg-card-hover: #15233D;         /* Interactive card hover */
  --bg-input: #0A111E;              /* High-contrast input background */

  /* Borders & Dividers */
  --border-subtle: #1C2D4A;
  --border-medium: #273E66;
  --border-focus: #38BDF8;

  /* Brand Accents */
  --accent-cyan: #38BDF8;           /* High-visibility radar cyan */
  --accent-cyan-dark: #0284C7;
  --accent-blue: #0F62FE;           /* IBM Blue primary indicator */
  --accent-glow: rgba(56, 189, 248, 0.18);

  /* Status Signaling */
  --status-low: #10B981;            /* Green: Normal / Low Congestion */
  --status-medium: #F59E0B;         /* Amber: Warning / Elevated Congestion */
  --status-high: #EF4444;           /* Red: Critical / High Congestion */
  --status-info: #0284C7;           /* Blue: Informational */

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
}
```

### Visual Characteristics
- **Glassmorphism & Radial Glows**: Subtle cyan accents mimic bridge radar screens and modern terminal operating systems (TOS).
- **Tabular Numbers**: Numeric displays utilize monospaced font features for steady telemetry updates without jitter.
- **Responsive Layout**: Fluid sidebar (expandable from 76px to 260px) and responsive CSS Grid adapting from mobile tablets to large multi-monitor control displays.

---

## 10. End-to-End Operator Workflow Guide

Here is the standard operating procedure (SOP) for a terminal dispatcher using PortVessel:

1. **Step 1: Check Morning Congestion Index (Dashboard)**:
   - Review the congestion gauge. If the score exceeds `70 (HIGH)`, inspect the Factor Breakdown to identify the primary driver (e.g., high queue or berth shortfall).
2. **Step 2: Acknowledge Critical Alerts**:
   - Inspect the red operational alerts banner. If high demurrage vessels (e.g., *Maersk Mc-Kinney Moller* at `$45,000/day`) are waiting in outer anchorage, initiate priority handling.
3. **Step 3: Review AI Route Recommendations (AI Page)**:
   - Verify fairway approach statuses. Divert incoming ultra-large container carriers to **Route B (Deepwater Bypass)** to circumvent the congested main channel.
4. **Step 4: Execute Quayside Optimizations**:
   - Navigate to **AI Recommendations > Berth & Crane Allocation**.
   - Click **"Apply Recommendation"** to swap berthed vessels or assign high-speed STS cranes. Confirm the toast notification confirms the change.
5. **Step 5: Verify 72-Hour Quayside Schedule (72h Plan)**:
   - Open the 72-Hour Plan to ensure no berth overlap occurs and that minimum 2-hour safety margins are preserved between vessel berthing windows.
6. **Step 6: Stress-Test Adverse Conditions (What-If Simulator)**:
   - If adverse weather is forecast, select the **"Typhoon Warning"** preset.
   - Run the simulation to review predicted turnaround efficiency and follow the recommended mitigation checklist.

---

## 11. Build, Quality Assurance & Deployment

### Compilation Verification
The application compiles cleanly with zero TypeScript errors:
```bash
npm run build
```
Expected output:
```text
> tsc -b && vite build

vite v8.3.0 building client environment for production...
✓ 1903 modules transformed.
rendering chunks...
dist/index.html                   1.26 kB
dist/assets/index-[hash].css      8.53 kB
dist/assets/index-[hash].js     394.46 kB
✓ built in ~4.5s
```

### Production Deployment Options
- **Static Hosting (Nginx / Caddy / Cloudflare Pages / Vercel / AWS S3 + CloudFront)**:
  Deploy the generated contents of the `/dist` directory. Ensure single-page app (SPA) fallback routing is configured (rewrite all non-file routes to `/index.html`).
- **Docker Deployment**:
  A multi-stage Dockerfile can build the assets with Node.js and serve them using lightweight Nginx Alpine.

---

## 12. Troubleshooting & Frequently Asked Questions

### Q1: The application displays "Falling back to local simulation data" in the browser console. Is this normal?
**Yes.** When no external REST backend endpoint is configured in Settings (`Ctrl+K` -> Settings), PortVessel uses its built-in realistic mock dataset (`src/data/mockData.ts`) and client-side simulation engine.

### Q2: How do I connect the application to our port's live TOS (Terminal Operating System) or AIS feed?
Click the gear icon in the top header or navigate to **Settings**, enter your backend API base URL (e.g., `https://api.port.domain.com`), and click **Save**. The service layer will immediately begin requesting live telemetry from your endpoints.

### Q3: How do I quickly search for a specific vessel or berth?
Press `Ctrl + K` (or `Cmd + K` on macOS) from any view to trigger the **Quick Search Modal**. Type the vessel name, IMO, shipping line, or berth ID to jump directly to its details.

### Q4: How do I change the active terminal?
Use the terminal switcher dropdown in the top-right header to toggle between:
- `Terminal 4 - North Basin`
- `Terminal 2 - South Container Pier`
- `Terminal 1 - Deepwater Gateway`

---

*Document compiled for PortVessel Operations Intelligence Platform.*
