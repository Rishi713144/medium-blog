# Blogzen 


![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)

A full-stack blogging platform inspired by Medium, built using a modern **monorepo architecture**. The application features secure user authentication, protected APIs, and database-driven content management, designed to reflect real-world production patterns.

The project is organized into **frontend**, **backend**, and **shared common** packages, enabling clean code reuse, independent deployment, and scalable development workflows.

---

## 📖 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Authentication Flow](#authentication-flow)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Deployment Strategy](#deployment-strategy)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 🚀 Project Overview

This project was built to simulate a real-world engineering environment. By using a monorepo, the application ensures that the **Frontend** and **Backend** stay perfectly in sync by sharing a **Common** package containing Zod schemas and TypeScript interfaces.

### Core Objectives:
* Implement a scalable **Monorepo** using `pnpm` workspaces.
* Achieve 100% **Type Safety** from the database to the UI.
* Master **Serverless Backend** patterns using Cloudflare Workers/Hono.
* Utilize **Prisma ORM** for efficient PostgreSQL data modeling and migrations.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** React with Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State/Data Fetching:** Axios

### Backend
* **Runtime:** Node.js / Cloudflare Workers
* **Framework:** Hono / Express
* **Auth:** JWT (JSON Web Tokens)
* **Validation:** Zod (Shared)

### Database & Tooling
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Package Manager:** pnpm (Workspaces)

---

## ✨ Key Features

* **User Management:** Secure signup and login functionality.
* **JWT Authentication:** Robust token-based auth with protected API routes.
* **Content Creation:** Full CRUD capabilities for blog posts.
* **Shared Logic:** A dedicated `common` package for validation logic used by both client and server.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

---


## 🔐 Authentication Flow

1.  **Client-Side:** User submits credentials via a React form.
2.  **Validation:** Frontend validates input using shared **Zod** schemas.
3.  **API Request:** Backend verifies user, hashes password (if signing up), and generates a **JWT**.
4.  **Token Storage:** The JWT is returned to the frontend and stored (localStorage).
5.  **Authorized Access:** Subsequent requests include the token in the `Authorization: Bearer <token>` header to access protected blog routes.

---

## 📁 Project Structure

```text
.
├── packages/
│   ├── frontend/       # React + Vite application
│   ├── backend/        # API server (Hono/Node.js)
│   └── common/         # Shared TypeScript types & Zod schemas
├── pnpm-workspace.yaml # Monorepo workspace config
├── pnpm-lock.yaml      # Unified lockfile
└── package.json        # Root scripts


```
---
## 💻 Local Development
**Prerequisites**
1. Node.js (v18+)
2. pnpm (npm install -g pnpm)
3. PostgreSQL instance (local or hosted)
---
## Step-by-Step Setup
* **Clone The Repository**

1.  git clone [https://github.com/Rishi713144/medium-blog.git](https://github.com/Rishi713144/medium-blog.git)
2. cd medium-clone
---
* **Install Dependencies**
1. pnpm install
---
* **Database Configuration Inside packages/backend, create a .env file and add your DATABASE_URL.**

1. cd packages/backend
2. npx prisma generate
3. npx prisma migrate dev --name init
---
* **Start Development Servers Run the following from the root directory to start both frontend and backend:**
1. pnpm dev
---
## 🔑 Environment Variables
Required variables for the Backend (packages/backend/.env):
* DATABASE_URL: Your PostgreSQL connection string.
* JWT_SECRET: A secure secret for signing tokens.
---
## 🔮 Future Enhancements
* [ ] Markdown Editor: Support for rich text editing.

* [ ] Engagement: Implement "Claps," comments, and likes.

* [ ] Profiles: User profile pages and customizable bios.

* [ ] Discovery: Search functionality, tagging, and pagination.








