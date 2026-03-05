# Surfboard Rental Management System

A full-stack web application designed for managing surfboard and diving equipment rentals. This project demonstrates a complete equipment booking lifecycle, from user registration and authentication to equipment selection and reservation management.

## Live Demo

* **Frontend (Vercel)**: [https://surfboard-rental-management.vercel.app](https://surfboard-rental-management.vercel.app)
* **Backend API (Render)**: Hosted on Render Cloud

## Technical Architecture

### Backend
* **Language**: Java 21
* **Framework**: Spring Boot 3
* **Database**: TiDB (MySQL compatible distributed SQL database)
* **Security**: Spring Security with JWT (Stateless Authentication)
* **ORM**: Spring Data JPA
* **Containerization**: Docker

### Frontend
* **Framework**: React.js
* **Styling**: Tailwind CSS
* **HTTP Client**: Axios
* **Routing**: React Router

### Deployment & DevOps
* **Frontend**: CI/CD pipeline via Vercel
* **Backend**: Docker container deployment via Render
* **Version Control**: GitHub

> Note: The backend runs on Render Free Tier, so the first request after inactivity may take ~30–60 seconds due to cold start. The login page includes a warm-up request to reduce perceived delay.

## Key Features

* **Authentication**: Secure user registration and login system implementing JWT standards.
* **Inventory Management**: Admin capabilities to add, update, and remove rental equipment (surfboards, diving gear).
* **Reservation System**: Users can browse available inventory and book equipment for specific dates.
* **Order History**: Users can view their past and active rental records.
* **Responsive UI**: Optimized interface for both desktop and mobile devices.

## Demo Accounts

For evaluation and demonstration purposes, you may use the following test accounts:

### Admin Account
- **Email:** admin@email.com  
- **Password:** 123456

### User Account
- **Email:** lucy@email.com  
- **Password:** 1234567

> ⚠️ These are demo credentials only.  
> Please do not use real personal information.

## Local Development Setup

To run this project locally, ensure you have the following installed:
* Java JDK 21
* Node.js & npm
* Maven

### 1. Backend Setup
Navigate to the backend directory and start the Spring Boot application.

```bash
cd backend
# Build the project
mvn clean install
# Run the application
mvn spring-boot:run

```

The backend server will start at `http://localhost:8080`.

### 2. Frontend Setup

Navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
# Install dependencies
npm install
# Start React development server
npm start

```

The frontend application will run at `http://localhost:3000`.

## Contact

**Lucy Zhang**

* Email: luciazhang890@gmail.com
* LinkedIn: https://www.linkedin.com/in/lucyzhang-au/


