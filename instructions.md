**advolot**
*Project Overview*
- *Goal:* Build an online legal consultation platform, initially targeting India but scalable globally.
- *User Roles:*  
  - *Clients:* Search lawyer, signup, pay, book & schedule consultation, or consult instantly with lawyers via text, audio, video etc.
  - *Lawyers:* Sign up, Create Profile, comfirm/accept booking, Provide legal consultations via text, audio or video.
- *Primary Features:*
  - find the right lawyer by issue type and needs.
  - Scheduled appointments.  
  - Consultation interface (chat, file sharing, audio/video calls).  
  - Post-consultation features - chat history, document sharing and management, reminders, (in future) AI tools to help drafting documents, summarize, translate, suggest, etc.
  - Instant consultations (timeout-based system).


**Guidelines and instructions for the project**

"Build a full-stack online legal consultation platform-"advolot" with the
following specifications:

**Frontend:**
- Framework: Next.js (App Router).
- Styling: MantineUI + Tailwind CSS (synced themes).
- Features: Responsive UI, dynamic routing, and reusable components.

**Backend:**
- Framework: NestJS (modular architecture).
- Database: PostgreSQL with Prisma ORM.
- Authentication: JWT with Google and LinkedIn OAuth (Passport.js).
- Real-Time Communication: Twilio for chat, audio, and video calls.

**Architecture:**
- Modular monolith with clear separation of concerns.
- Adapter pattern for external dependencies (e.g., Twilio, Prisma, OAuth).
- Dependency injection using InversifyJS.

Folder Structure:

advolot/
├── frontend/                  # Next.js frontend
│   ├── public/                # Static assets (images, fonts, etc.)
│   ├── src/
│   │   ├── app/               # App Router (Next.js 13+)
│   │   │   ├── (auth)/        # Authentication pages (signup, login)
│   │   │   ├── (client)/      # Client-specific pages (dashboard, appointments)
│   │   │   ├── (lawyer)/      # Lawyer-specific pages (dashboard, bookings)
│   │   │   ├── layout.tsx     # Root layout
│   │   │   └── page.tsx       # Landing page
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions (e.g., API clients)
│   │   ├── styles/            # Global and module-specific styles
│   │   │   ├── globals.css    # Global Tailwind CSS
│   │   │   └── mantine.css    # Mantine theme overrides
│   │   └── providers/         # Context providers (e.g., AuthProvider)
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── next.config.js         # Next.js configuration
│
├── backend/                   # NestJS backend
│   ├── src/
│   │   ├── modules/           # Business modules (e.g., user, appointment, chat)
│   │   │   ├── user/          # User module (authentication, profiles)
│   │   │   ├── appointment/   # Appointment module (scheduling, bookings)
│   │   │   └── chat/          # Chat module (real-time communication)
│   │   ├── interfaces/        # Contracts for adapters and services
│   │   ├── adapters/          # Adapter implementations (e.g., TwilioAdapter)
│   │   ├── repositories/      # Data access logic (e.g., UserRepository)
│   │   ├── services/          # Business logic (e.g., AuthService)
│   │   ├── providers/         # Dependency injection configurations
│   │   ├── config/            # Configuration files (e.g., database, auth)
│   │   ├── utils/             # Utility functions (e.g., validation, logging)
│   │   └── main.ts            # Application entry point
│   ├── prisma/                # Prisma ORM
│   │   ├── schema.prisma      # Prisma schema
│   │   └── migrations/        # Database migrations
│   ├── test/                  # Unit and integration tests
│   ├── Dockerfile             # Docker configuration for backend
│   └── .env                   # Environment variables
│
├── shared/                    # Shared code between frontend and backend
│   ├── interfaces/            # Shared TypeScript interfaces (e.g., User, Appointment)
│   ├── utils/                 # Shared utility functions (e.g., date formatting)
│   └── constants/             # Shared constants (e.g., API endpoints)
│
├── docker-compose.yml         # Docker Compose for local development
├── .github/                   # GitHub Actions for CI/CD
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline
├── .env                       # Global environment variables
├── README.md                  # Project documentation
└── package.json               # Root package.json (optional for monorepo setup)

**DevOps:**
- Docker for containerization.
- Google Cloud Platform (GCP) for hosting.
- GitHub Actions for CI/CD.

**MVP Features:**
1. **MVP1:** User authentication, profile management, and consultation
scheduling.
2. **MVP2:** Real-time chat with file sharing and audio/video calls.

**Future Plans:**
- AI integration (e.g., document drafting, summarization).
- Multi-language support (e.g., English, Hindi).
- Investor pitches after initial MVP success.

**Deliverables:**
- Clean, modular, and maintainable code.
- Documentation (API docs, setup instructions).
- Testing scripts (unit, integration).

Set up the entire project with the above specifications, ensuring
scalability and flexibility for future enhancements. AI? AI!

**Roadmap**
