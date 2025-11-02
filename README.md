# 💪 Workout Planner

[![Quarkus](https://img.shields.io/badge/Quarkus-2.0+-red.svg)](https://quarkus.io/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

En fullstack webbapplikation för att planera träning, skapa övningar och följa din träningsprogress med Google OAuth2 inloggning.

## ✨ Funktioner

### 🔐 Autentisering
- **Google OAuth2** - Säker inloggning
- **Session-based authentication** - Quarkus OAuth2 session management
- **Automatisk sessionhantering** - Inget JWT konfiguration krävs

### 🏋️ Workout Management
- Skapa, redigera och ta bort träningspass
- Anpassningsbara workout-rutiner
- Schemalägg träning

### 💪 Exercise Library
- Bygg ditt eget bibliotek av övningar
- Lägg till beskrivning, sets, reps och vikt
- Kategorisera övningar efter muskelgrupp

### 📊 Progress Tracking
- Visualisera din styrkeutveckling
- Statistik per övning över tid
- Diagram och progressionsvyer

## 🛠 Tech Stack

### Backend
- **Quarkus** - Java framework
- **PostgreSQL** - Database
- **OAuth2** - Google authentication
- **Session Management** - Quarkus built-in sessions
- **Hibernate ORM** - Object-relational mapping
- **REST API** - Web services

### Frontend
- **React 18** - User interface
- **Modern React** - Hooks & Context
- **HTTP Client** - Fetch/Axios för API anrop
- **Chart Library** - För statistik och diagram

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🚀 Snabbstart med Docker

### Förutsättningar
- Docker och Docker Compose
- Google OAuth2 credentials

### 1. Klona och konfigurera
```bash
git clone [your-repo-url]
cd workout-planner