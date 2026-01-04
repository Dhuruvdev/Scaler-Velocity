# Overview

This is a personal portfolio website for "Dhuruv M" - a software engineering intern. The application is a full-stack TypeScript project featuring a React frontend with a modern design aesthetic and an Express backend with PostgreSQL database. It showcases projects, skills, blog posts, and includes an AI-powered chat feature that represents the portfolio owner.

The core purpose is to present professional work, track an internship journey through a timeline, and provide an interactive way for visitors to learn about the developer through an AI chat assistant.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: GSAP and Framer Motion for smooth transitions
- **Smooth Scrolling**: Lenis by Studio Freight
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable components in `client/src/components/`
- Custom hooks in `client/src/hooks/` for data fetching (projects, posts, skills, timeline)
- UI primitives from shadcn/ui in `client/src/components/ui/`

## Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type safety
- **Database ORM**: Drizzle ORM with PostgreSQL

The backend uses a storage abstraction pattern (`server/storage.ts`) implementing `IStorage` interface, making it easy to swap database implementations.

## Data Storage
- **Database**: PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Drizzle Kit (`drizzle.config.ts`)

Database tables:
- `timeline` - Internship journey entries by week
- `projects` - Portfolio projects with detailed case study fields
- `skills` - Technical skills with evidence and categories
- `posts` - Blog posts with markdown content
- `conversations` and `messages` - AI chat history

## Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle table definitions and Zod insert schemas
- `routes.ts` - API route definitions with path patterns and response schemas
- `models/chat.ts` - Chat-specific schema definitions

## AI Chat Integration
Located in `server/replit_integrations/chat/`:
- Uses xAI API (Grok) for the AI assistant
- Represents "Dhuruv AI" - a digital representative of the portfolio owner
- Stores conversation history in PostgreSQL

## Additional Integrations
- `server/replit_integrations/batch/` - Batch processing utilities with rate limiting
- `server/replit_integrations/image/` - Image generation using OpenAI-compatible API

# External Dependencies

## Database
- **PostgreSQL** - Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM** - Type-safe database queries
- **connect-pg-simple** - Session storage (available but not currently used)

## AI Services
- **xAI API** - Chat completion for the AI assistant (`XAI_API_KEY` env variable)
- **OpenAI-compatible API** - Image generation (`AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`)

## Frontend Libraries
- **shadcn/ui** - UI component library built on Radix UI primitives
- **Radix UI** - Accessible component primitives (dialog, dropdown, tooltip, etc.)
- **TanStack React Query** - Data fetching and caching
- **react-markdown** - Blog post content rendering
- **date-fns** - Date formatting
- **GSAP** - Animation library
- **Framer Motion** - React animation library
- **Lenis** - Smooth scroll library

## Build & Development
- **Vite** - Frontend build tool with HMR
- **esbuild** - Server bundling for production
- **TypeScript** - Type checking across the stack
- **Tailwind CSS** - Utility-first CSS framework