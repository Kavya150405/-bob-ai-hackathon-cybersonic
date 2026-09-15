# Problem Statement

## 1. Background

Ports handle large numbers of vessels, containers, berths, cranes, and related operations at the same time. When many vessels are scheduled to arrive within a limited period, the available port resources can become overloaded.

The L1 challenge focuses on the **Container Congestion Predictor & Port Operations Optimiser**. The challenge is based on the operational problem of predicting congestion before vessels are already waiting, recommending alternate routing strategies, optimising berth and crane assignments, and preparing a 72-hour operations plan for shift supervisors.

## 2. Problem

Port operators may need to allocate berths, cranes, and other resources across many vessels. When these decisions are handled manually or reactively, congestion can build up before an appropriate action is taken.

The main problems are:

- Congestion hotspots may be identified only after vessels are already queuing.
- Limited berth capacity can create conflicts between arriving vessels.
- Crane availability must be considered when planning vessel handling.
- Alternate routing decisions may come too late to reduce waiting.
- Shift supervisors need an operational plan that considers the next 72 hours.
- A large number of vessels and operational resources make manual planning difficult.

The challenge specifically asks for a solution that predicts congestion hotspots using vessel schedules and berth-capacity data, recommends alternate routing strategies, optimises berth and crane assignments, and generates a 72-hour port operations plan.

## 3. Who Is Affected

The primary users of the proposed solution are:

- Port supervisors
- Port operations teams
- Port planners
- Vessel and shipping operations teams

These users need timely information about expected congestion and practical recommendations for managing available resources.

## 4. Why It Matters

Port congestion can increase vessel waiting time and create operational delays. Poor coordination of berths and cranes can also reduce the efficient use of available resources.

A predictive and optimisation-based approach can help port operations teams move from reactive decision-making toward earlier planning and coordinated resource allocation.

## 5. Existing Gap

The challenge describes a situation in which port operators allocate berths, cranes, and yard space manually in spreadsheets and congestion hotspots are identified reactively. Alternate routing decisions may therefore be made too late to help.

The proposed solution addresses this gap by bringing congestion prediction, routing recommendations, berth and crane optimisation, and short-term operational planning into one workflow.

## 6. Project Objective

The objective is to build an AI-assisted port operations solution that can:

1. Predict where and when congestion is likely to occur.
2. Recommend alternate routing strategies when congestion is expected.
3. Optimise berth and crane assignments.
4. Generate a 72-hour port operations plan.
5. Present the results in a form that supports port supervisors and operations teams.

## 7. Prototype Data

For the prototype, simulated vessel and port data can be used because real port operational data may not be available. The roadmap identifies information such as vessel schedules, arrival times, number of containers, berth capacity, and current ships waiting as relevant inputs.

The final implementation should document the actual dataset and data-generation method used by the team.
