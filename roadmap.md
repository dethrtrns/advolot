# Advolot Project Roadmap

## Table of Contents
1. [Phase 1: Project Initialization](#phase-1-project-initialization)
2. [Phase 2: Frontend Development](#phase-2-frontend-development)
3. [Phase 3: Backend Development](#phase-3-backend-development)
4. [Phase 4: Shared Code Development](#phase-4-shared-code-development)
5. [Phase 5: DevOps Setup](#phase-5-devops-setup)
6. [Phase 6: MVP Feature Implementation](#phase-6-mvp-feature-implementation)
7. [Phase 7: Future Enhancements](#phase-7-future-enhancements)
8. [Phase 8: Testing and Documentation](#phase-8-testing-and-documentation)
9. [Phase 9: Deployment to Production](#phase-9-deployment-to-production)

---

## Phase 1: Project Initialization

### Task 1.1: Initialize Git Repository
**Prompt:**
```
Initialize a Git repository for the Advolot project. Create a main branch, set up a .gitignore file for Node.js projects, and make the initial commit. Push the repository to GitHub under the path `advolot/`.
```

### Task 1.2: Set Up Project Structure
**Prompt:**
```
Create the initial folder structure as outlined in the `instructions.md` file. This includes setting up the `frontend`, `backend`, and `shared` directories with their respective subdirectories.
```

### Task 1.3: Configure Environment Variables
**Prompt:**
```
Create a `.env` file in the root directory and populate it with necessary environment variables for both frontend and backend, such as database connection strings, OAuth credentials, and Twilio API keys. Ensure that sensitive information is securely managed.
```

---

## Phase 2: Frontend Development

### Task 2.1: Initialize Next.js Project
**Prompt:**
```
Initialize a Next.js project within the `frontend/` directory using the App Router. Configure TypeScript and install necessary dependencies including MantineUI and Tailwind CSS.
```

### Task 2.2: Configure Tailwind CSS and MantineUI
**Prompt:**
```
Set up Tailwind CSS and MantineUI in the Next.js project. Sync the themes between MantineUI and Tailwind by configuring `tailwind.config.js` and integrating Mantine theme overrides in `src/styles/mantine.css`.
```

### Task 2.3: Implement Routing Structure
**Prompt:**
```
Set up dynamic routing in the `frontend/src/app/` directory following the modular structure:
- `(auth)/` for authentication pages (signup, login)
- `(client)/` for client-specific pages (dashboard, appointments)
- `(lawyer)/` for lawyer-specific pages (dashboard, bookings)
Ensure that each section has a corresponding `layout.tsx` and necessary pages.
```

### Task 2.4: Develop Reusable Components
**Prompt:**
```
Create reusable UI components in `frontend/src/components/`, such as buttons, forms, navigation bars, and modals. Ensure components are responsive and adhere to the design guidelines.
```

### Task 2.5: Set Up Global Styles
**Prompt:**
```
Configure global styles in `frontend/src/styles/globals.css` using Tailwind CSS. Ensure that styles are consistent across the application and override MantineUI themes as necessary.
```

### Task 2.6: Implement Authentication Pages
**Prompt:**
```
Develop authentication pages (signup, login) within `frontend/src/app/(auth)/`. Integrate Google and LinkedIn OAuth using Passport.js for authentication. Ensure secure handling of JWT tokens.
```

---

## Phase 3: Backend Development

### Task 3.1: Initialize NestJS Project
**Prompt:**
```
Initialize a NestJS project within the `backend/` directory. Set up TypeScript, install necessary dependencies including Prisma ORM, Passport.js, and InversifyJS for dependency injection.
```

### Task 3.2: Configure Prisma ORM
**Prompt:**
```
Set up Prisma ORM in `backend/prisma/`. Define the database schema in `schema.prisma` covering models for Users, Appointments, Chats, etc. Generate Prisma Client and apply initial migrations.
```

### Task 3.3: Implement Authentication Module
**Prompt:**
```
Create the User module in `backend/src/modules/user/` handling user authentication and profile management. Integrate JWT for authentication and set up Google and LinkedIn OAuth strategies using Passport.js.
```

### Task 3.4: Develop Appointment Module
**Prompt:**
```
Implement the Appointment module in `backend/src/modules/appointment/`. This should handle scheduling, bookings, and managing appointments between clients and lawyers.
```

### Task 3.5: Create Chat Module
**Prompt:**
```
Develop the Chat module in `backend/src/modules/chat/` to facilitate real-time communication. Integrate Twilio for chat, audio, and video calls. Ensure secure handling of messages and media.
```

### Task 3.6: Set Up Adapters and Services
**Prompt:**
```
Implement adapters in `backend/src/adapters/` for external dependencies such as Twilio and Prisma. Use InversifyJS for dependency injection to manage service dependencies effectively.
```

### Task 3.7: Configure Database and Migrations
**Prompt:**
```
Configure the PostgreSQL database connection in `backend/src/config/`. Manage database migrations using Prisma, ensuring the schema is in sync with application models.
```

---

## Phase 4: Shared Code Development

### Task 4.1: Define Shared Interfaces
**Prompt:**
```
Create shared TypeScript interfaces in `shared/interfaces/` for entities like User, Appointment, and Chat. Ensure consistency between frontend and backend models.
```

### Task 4.2: Develop Shared Utilities
**Prompt:**
```
Implement shared utility functions in `shared/utils/`, such as date formatting and common validation logic, to be used across both frontend and backend.
```

### Task 4.3: Establish Shared Constants
**Prompt:**
```
Define shared constants in `shared/constants/` for API endpoints, configuration values, and other static data used across the application.
```

---

## Phase 5: DevOps Setup

### Task 5.1: Configure Docker for Backend
**Prompt:**
```
Set up Docker for containerizing the backend application. Create a `Dockerfile` in the `backend/` directory and ensure it builds the NestJS app correctly.
```

### Task 5.2: Set Up Docker Compose
**Prompt:**
```
Create a `docker-compose.yml` file in the root directory to orchestrate multi-container Docker applications, including services for the frontend, backend, and PostgreSQL database. Ensure proper networking and environment variable management.
```

### Task 5.3: Implement CI/CD Pipeline
**Prompt:**
```
Configure GitHub Actions for CI/CD by editing `.github/workflows/ci.yml`. Set up workflows to lint, test, build, and deploy the application upon commits to the main branch.
```

### Task 5.4: Configure Google Cloud Platform (GCP) Hosting
**Prompt:**
```
Set up hosting on Google Cloud Platform. Configure necessary services such as Compute Engine or Kubernetes Engine for deploying the backend and frontend. Ensure scalability and reliability configurations.
```

---

## Phase 6: MVP Feature Implementation

### Task 6.1: MVP1 - User Authentication and Profile Management
**Prompt:**
```
Implement user authentication flows, including signup, login, and profile management for both clients and lawyers. Ensure secure password handling and user data storage.
```

### Task 6.2: MVP1 - Consultation Scheduling
**Prompt:**
```
Develop the consultation scheduling feature allowing clients to search for lawyers, book appointments, and manage their schedules. Integrate calendar functionalities and notification systems.
```

### Task 6.3: MVP2 - Real-Time Chat with File Sharing
**Prompt:**
```
Implement the real-time chat feature enabling text communication between clients and lawyers. Add functionality for file sharing within chat sessions, ensuring secure file handling and storage.
```

### Task 6.4: MVP2 - Audio/Video Calls
**Prompt:**
```
Integrate audio and video call capabilities using Twilio. Ensure seamless initiation, management, and termination of calls between clients and lawyers. Handle real-time communication effectively.
```

---

## Phase 7: Future Enhancements

### Task 7.1: AI Integration for Document Handling
**Prompt:**
```
Plan and implement AI tools for document drafting, summarization, translation, and suggestion. Integrate AI models to assist lawyers and clients in managing legal documents efficiently.
```

### Task 7.2: Multi-Language Support
**Prompt:**
```
Add multi-language support to the platform, starting with English and Hindi. Implement localization throughout the frontend and backend to cater to a diverse user base.
```

### Task 7.3: Investor Relations and Pitches
**Prompt:**
```
Prepare materials and features necessary for investor pitches post-MVP success. Ensure the platform showcases scalability, user engagement, and potential for growth to attract investment.
```

---

## Phase 8: Testing and Documentation

### Task 8.1: Write Unit and Integration Tests
**Prompt:**
```
Develop comprehensive unit and integration tests for both frontend and backend components. Ensure high test coverage and reliability of the application using testing frameworks like Jest for backend and React Testing Library for frontend.
```

### Task 8.2: Create API Documentation
**Prompt:**
```
Document all API endpoints, request/response structures, and authentication mechanisms. Use tools like Swagger or Postman to generate and maintain up-to-date API documentation.
```

### Task 8.3: Prepare Setup Instructions
**Prompt:**
```
Write detailed setup instructions in the `README.md` file, outlining steps to install dependencies, configure environment variables, run the application locally, and deploy to production.
```

---

## Phase 9: Deployment to Production

### Task 9.1: Finalize Docker Configurations
**Prompt:**
```
Ensure Docker configurations are optimized for production. Minimize image sizes, secure environment variables, and set up proper networking between containers.
```

### Task 9.2: Deploy to GCP
**Prompt:**
```
Deploy the frontend and backend services to Google Cloud Platform. Set up load balancing, auto-scaling, and monitoring to ensure the application runs smoothly in a production environment.
```

### Task 9.3: Monitor and Maintain
**Prompt:**
```
Implement monitoring tools to track application performance, error rates, and user activity. Set up alerts and logging to facilitate quick identification and resolution of issues post-deployment.
```

---

## Tracking and Management

- **Progress Tracking:** Regularly update the roadmap with progress on each task. Use project management tools like GitHub Projects or Trello integrated with GitHub Issues for detailed tracking.
- **Modification and Guidance:** Continuously review and adjust the roadmap based on development progress, feedback, and any encountered challenges. Ensure flexibility to incorporate changes as needed.
- **Debugging Support:** Maintain comprehensive logging and error handling throughout the development process to facilitate easy debugging and maintenance.

---

## Conclusion

This roadmap provides a structured approach to developing the Advolot platform, ensuring all aspects from initialization to deployment are systematically addressed. By following this guide, an agentic AI can effectively build, manage, and scale the project, delivering a robust and user-friendly legal consultation platform.
