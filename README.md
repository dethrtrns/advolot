# Advolot - Online Legal Consultation Platform

Advolot is a comprehensive online legal consultation platform that connects clients with lawyers for professional legal advice and consultations. The platform supports text, audio, and video consultations, along with document sharing and management capabilities.

## Features

- User authentication with Google and LinkedIn OAuth
- Client and lawyer profile management
- Consultation scheduling system
- Real-time chat with file sharing
- Audio/video calls using Twilio
- Document management system
- Responsive and modern UI

## Tech Stack

### Frontend
- Next.js (App Router)
- MantineUI + Tailwind CSS
- TypeScript
- WebRTC (Twilio)

### Backend
- NestJS
- PostgreSQL with Prisma ORM
- JWT Authentication
- WebSocket for real-time features

## Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- PostgreSQL database
- Twilio account for audio/video calls
- Google and LinkedIn OAuth credentials

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/advolot.git
   cd advolot
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required environment variables

4. Set up the database:
   ```bash
   cd backend
   yarn prisma migrate dev
   ```

5. Start the development servers:
   ```bash
   # From the root directory
   yarn dev
   ```

   The frontend will be available at `http://localhost:3000`
   The backend API will be available at `http://localhost:4000`

## Project Structure

```
advolot/
├── frontend/                  # Next.js frontend
├── backend/                   # NestJS backend
├── shared/                    # Shared code
└── docs/                      # Documentation
```

## Development

- Frontend development: `yarn workspace frontend dev`
- Backend development: `yarn workspace backend start:dev`
- Run tests: `yarn test`
- Run linting: `yarn lint`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 