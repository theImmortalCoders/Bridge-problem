# The Bridge Problem - Multithreading Visualization

## Project README

### Authors
- Marcin Bator
- Wiktor Mazur

### University
Rzeszów University of Technology, 2023

---

## Table of Contents
1. [Project Assumptions](#1-project-assumptions)
2. [Implementation Agenda](#2-implementation-agenda)
3. [Technologies](#3-technologies)
   - 3.1 [Front-end (Client Side)](#31-front-end-client-side)
   - 3.2 [Back-end (Server Side)](#32-back-end-server-side)
4. [Front-end Implementation Details](#4-front-end-implementation-details)
   - 4.1 [Overview](#41-overview)
   - 4.2 [API Communication](#42-api-communication)
5. [Back-end Implementation Details](#5-back-end-implementation-details)
   - 5.1 [Overview](#51-overview)
   - 5.2 [Endpoints (Web Layer)](#52-endpoints-web-layer)
   - 5.3 [Service (Server Layer)](#53-service-server-layer)
6. [Summary](#6-summary)
7. [Running locally](#7-running-locally)

---

### 1. Project Assumptions
The project addresses a synchronization problem on a two-way road with a narrow bridge. The goal is to ensure collision-free passage for cars from both the south and north directions.

### 2. Implementation Agenda
The solution is a web application accessible through a browser. It utilizes server-side code with multithreading implemented on the back-end server. Users can spawn cars, set their direction, and customize crossing times. The application is fully dockerized for easy deployment.

### 3. Technologies
#### 3.1 Front-end (Client Side)
- React 18
- Next.js 14.0.4
- TypeScript 5
- Tailwind CSS 3.3.0

#### 3.2 Back-end (Server Side)
- Java 17.09
- Spring Boot 3.2
- Apache Maven

### 4. Front-end Implementation Details
#### 4.1 Overview
The application features a user-friendly UI allowing car addition, directional selection, and control over passing cars. It includes a visualization of cars, red/green lights, and queue status. Car crossing times are randomly generated upon addition.

#### 4.2 API Communication
Front-end communicates with the back-end API on port 8080, using standard JS fetch and await every 10 milliseconds to get car states.

### 5. Back-end Implementation Details
#### 5.1 Overview
The back-end utilizes Spring Boot with 6 REST endpoints, handling car addition, retrieval, direction, passing limits, and scheduled removal of processed cars.

#### 5.2 Endpoints (Web Layer)
- `GET('/api/cars')`: Returns the list of all cars.
- `POST('/api/add-car')`: Adds a new car to the program.
- `GET('/api/direction')`: Returns the current direction.
- `GET('/api/max-cars')`: Returns the current passing limit.
- `POST('/api/max-cars')`: Sets a new passing limit.
- `SCHEDULED`: Deletes cars passed the bridge for at least 5 seconds.

#### 5.3 Service (Server Layer)
The core class, `BridgeService`, manages car queues and threading. It ensures synchronized single-car bridge crossing.

### 6. Summary
The multithreading solution in Java addresses the bridge problem. Using React and Spring Boot, the web application enhances understanding of multithreading concepts in a visual and interactive manner.

### 7. Running locally
Clone repository, then open in the terminal and launch
`docker-compose up`.
