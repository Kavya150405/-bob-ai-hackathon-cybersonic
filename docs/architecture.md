# Technical Architecture

## 1. Architecture Overview

The proposed system follows a layered architecture in which vessel and port data are processed, analysed, and converted into operational recommendations.

### Planned Data Flow

```text
+---------------------------+
|      Port Supervisor      |
+-------------+-------------+
              |
              v
+---------------------------+
|     Dashboard / UI        |
+-------------+-------------+
              |
              v
+---------------------------+
|     Backend / API         |
+-------------+-------------+
              |
              v
+---------------------------+
| Data Processing &         |
| Congestion Prediction     |
+-------------+-------------+
              |
        +-----+------+
        |            |
        v            v
+---------------+  +-------------------+
| Route         |  | Berth + Crane     |
| Recommendation|  | Optimisation      |
+-------+-------+  +---------+---------+
        |                    |
        +---------+----------+
                  |
                  v
       +---------------------+
       | 72-Hour Plan        |
       +----------+----------+
                  |
                  v
       +---------------------+
       | Results / Dashboard |
       +---------------------+
```

**Important:** This is the planned architecture based on the roadmap. Replace the technology/component names and diagram with the actual architecture after the application is completed.

## 2. Components

| Component | Planned Responsibility | Final Technology |
|---|---|---|
| Dashboard / Frontend | Display vessels, congestion, recommendations, resources, and 72-hour plan | **To be confirmed** |
| Backend / API | Receive requests and connect application components | **To be confirmed** |
| Data Processing | Prepare vessel and port data for analysis | **To be confirmed** |
| Congestion Prediction | Predict congestion hotspots and periods | **To be confirmed** |
| Route Recommendation | Recommend alternate routing options | **To be confirmed** |
| Berth Optimisation | Select suitable berths | **To be confirmed** |
| Crane Optimisation | Allocate available cranes | **To be confirmed** |
| Operations Planner | Generate the 72-hour plan | **To be confirmed** |
| Data Storage | Store vessel, berth, crane, schedule, prediction, and assignment data where required | **To be confirmed** |
| IBM BoB | AI-assisted development workflow | IBM BoB |

## 3. Recommended Prototype Stack

The roadmap recommends keeping the technology stack simple:

- **Frontend:** React + TypeScript
- **Backend:** Python + FastAPI
- **AI/Data:** Python + Pandas + Scikit-learn
- **Database:** PostgreSQL

SQLite is also identified as an option for a very fast prototype.

These are **recommendations from the roadmap, not confirmed implementation details**. The final architecture document must use the technologies actually present in the source code.

## 4. Data Flow

The intended data flow is:

1. Vessel and port information enters the application.
2. The data is processed into a usable format.
3. Congestion prediction analyses vessel schedules and available capacity.
4. If congestion is expected, alternate routing recommendations can be generated.
5. Berth and crane availability are considered for resource assignment.
6. The system creates a 72-hour operations plan.
7. Results are displayed to the port supervisor through the dashboard.

## 5. Data Entities

The planned database/data model may include:

- Vessels
- Berths
- Cranes
- Schedules
- Predictions
- Assignments

The final implementation should document the actual tables, collections, files, or other data structures used.

## 6. Security Considerations

The final implementation should follow basic security practices appropriate to the prototype, including:

- Do not commit real credentials or secrets.
- Store sensitive configuration in environment variables.
- Keep `.env` out of version control.
- Validate user-provided input.
- Restrict database credentials and connection information.
- Avoid exposing unnecessary internal system information through APIs.

The official template also requires that `.env` and similar secrets are not committed to the repository.

## 7. Scalability Considerations

The solution can be extended to support:

- More vessels
- More berths and cranes
- Larger datasets
- Multiple ports or zones
- More detailed routing constraints
- Live vessel and port data
- More advanced prediction and optimisation models

The final submission should describe only scalability features that are relevant to the implemented design.

## 8. Architecture Verification

Before final submission, the team should verify that:

- Every component shown in this document exists in the actual application.
- The technology names match the source code.
- The data flow matches the implemented workflow.
- The architecture diagram matches the application.
- IBM BoB usage is described accurately.
