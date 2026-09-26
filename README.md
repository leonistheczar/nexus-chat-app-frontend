# 💬 Nexus

### Modern real-time messaging platform built with Next.js and TypeScript

Nexus is a modern messaging platform focused on **clean UX, smooth interactions, and scalable architecture**. The frontend is built with Next.js and React, with a modular structure designed to integrate with a production-ready backend.

> 🚧 **Status:** Active Development
>
> 🎨 **Frontend:** UI and core user flows largely complete
>
> ⚙️ **Backend:** Integration in progress

---

## ✨ Highlights

* 💬 Modern chat workspace
* 👥 Contact and conversation management
* 👤 Multi-step profile setup
* 🔐 Clerk-based authentication
* 🌓 Dark / light / system themes
* 📱 Responsive desktop, tablet, and mobile UI
* 🎞️ Smooth UI animations
* 🧩 Modular feature-based architecture
* ⚡ TanStack Query for server-state management
* 🗃️ Zustand for client-side state
* 🔌 Dedicated API integration layer
* 🗄️ PostgreSQL database with Drizzle ORM
* 🚀 Designed for real-time messaging and scalable backend integration

---

## 📸 Preview

<p align="center">
  <img
    src="./media/nexus-demo.gif"
    alt="Nexus application demo"
    width="900"
  />
</p>

The demo showcases the current frontend experience, including the public interface, authentication flow, profile setup, chat workspace, responsive layouts, and application interactions.

---

## 🏗️ Architecture

Nexus follows a layered architecture designed to keep UI, state management, networking, and domain logic separated.

```text
┌──────────────────────────────────────────────┐
│                 Next.js App                  │
├──────────────────────────────────────────────┤
│                                              │
│   Pages / Layouts                            │
│          │                                   │
│          ▼                                   │
│   Feature Components                         │
│          │                                   │
│          ▼                                   │
│   Hooks / Providers / Stores                 │
│          │                                   │
│          ├───────────────┐                   │
│          ▼               ▼                   │
│   TanStack Query      Zustand                │
│          │               │                   │
│          ▼               │                   │
│       API Layer ◄────────┘                   │
│          │                                   │
└──────────┼───────────────────────────────────┘
           │
           │ HTTPS / REST
           ▼
      Nexus Backend
           │
           ├── Authentication
           ├── Business Logic
           ├── WebSocket
           └── PostgreSQL
```

The frontend is intentionally structured so backend services can be introduced without requiring major UI refactoring.

---

## 🧱 Project Structure

```text
nexus-frontend/

│
├── app/
│   ├── (public)/                  # Public routes and layouts
│   ├── (protected)/               # Protected application routes
│   ├── layout.tsx                 # Root layout and providers
│   └── main.css                   # Global styles
│
├── components/
│   ├── AboutPage/
│   ├── AuthPage/
│   ├── ChatPage/
│   ├── ContactPage/
│   ├── FeaturesPage/
│   ├── HomePage/
│   ├── ProfilePage/
│   └── SharedComponents/
│
├── hooks/                         # Reusable React hooks
│
├── lib/
│   ├── api/                       # Backend/API integration
│   ├── providers/                 # Application providers
│   └── getContacts.ts             # Temporary mock data loader
│
├── public/
│   ├── assets/
│   └── test-json-data/
│
├── docs/
│   └── media/                     # README demos and documentation media
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

### Core

| Technology        | Purpose               |
| ----------------- | --------------------- |
| ⚛️ React 19       | UI                    |
| ▲ Next.js 16      | Application framework |
| 📘 TypeScript     | Type safety           |
| 🎨 Tailwind CSS 4 | Styling               |
| 🎬 Framer Motion  | Animations            |

### State & Data

| Technology             | Purpose                      |
| ---------------------- | ---------------------------- |
| ⚡ TanStack React Query | Server state and API caching |
| 🐻 Zustand             | Client-side/global UI state  |
| 🔗 Axios               | HTTP client                  |

### UI & Utilities

| Technology     | Purpose          |
| -------------- | ---------------- |
| 🎨 next-themes | Theme management |
| ✨ lucide-react | Icons            |
| 🎯 react-icons | Additional icons |
| 🧹 ESLint      | Code quality     |

### Backend

```text
Node.js
Express
TypeScript
Clerk
PostgreSQL
Drizzle ORM
Zod
WebSocket
```

---

## 🚀 Current Status

### ✅ Implemented

#### 🌐 Public Experience

* [x] Home page
* [x] About page
* [x] Features page
* [x] Contact page
* [x] Shared navbar and footer
* [x] Responsive layouts
* [x] Dark / light / system themes
* [x] Animated sections

#### 🔐 Authentication

* [x] Clerk authentication
* [x] Sign in / sign up flow
* [x] Protected route handling
* [x] Authenticated frontend-to-backend requests
* [x] Authentication middleware on backend

#### 💬 Chat Workspace

* [x] Contacts sidebar
* [x] Conversation panel
* [x] User profile panel
* [x] Responsive chat layout
* [x] Message interaction UI
* [x] Settings modal
* [x] Add user flow
* [x] Create group UI
* [x] Logout confirmation
* [x] Mobile/tablet interactions

#### 👤 Profile

* [x] Multi-step profile setup
* [x] Local validation
* [x] Zustand-based step state
* [x] Backend mutation scaffold

#### ⚙️ Backend Foundation

* [x] Express + TypeScript setup
* [x] Clerk middleware integration
* [x] PostgreSQL database setup
* [x] Drizzle ORM integration
* [x] Database schema foundation
* [x] Environment configuration
* [x] Versioned API structure

---

## 🚧 In Progress

The project is transitioning from a **frontend-first prototype** toward a fully connected full-stack application.

Current focus:

* [ ] User persistence
* [ ] User profile API
* [ ] User search
* [ ] Conversation APIs
* [ ] Message APIs
* [ ] Persistent message history
* [ ] Real-time messaging
* [ ] WebSocket infrastructure
* [ ] Authorization rules

---

## 🗺️ Roadmap

### Phase 1. Backend Foundation

* [x] Express + TypeScript setup
* [x] Environment configuration
* [x] API architecture
* [ ] Centralized error handling
* [ ] Request validation
* [ ] Logging

### Phase 2. Authentication & Users

* [x] Clerk integration
* [ ] User synchronization
* [ ] User profile API
* [ ] User search
* [ ] Authorization rules

### Phase 3. Messaging

* [ ] Conversation API
* [ ] Message API
* [ ] Persistent message history
* [ ] Cursor-based pagination
* [ ] Message editing
* [ ] Message deletion
* [ ] Read / delivery status

### Phase 4. Real-Time Communication

* [ ] WebSocket infrastructure
* [ ] Real-time messages
* [ ] Typing indicators
* [ ] Online/offline presence
* [ ] Read receipts
* [ ] Real-time reactions

### Phase 5. Groups

* [ ] Group creation
* [ ] Member management
* [ ] Group roles
* [ ] Admin permissions
* [ ] Group settings

### Phase 6. Advanced Features

* [ ] File attachments
* [ ] Image/media sharing
* [ ] Message reactions
* [ ] Reply / thread support
* [ ] Search
* [ ] Notifications
* [ ] Privacy settings

### Phase 7. Production

* [ ] Unit testing
* [ ] Integration testing
* [ ] End-to-end testing
* [ ] Performance optimization
* [ ] Security hardening
* [ ] Production deployment
* [ ] Monitoring and observability

---

## 🔄 Frontend Data Flow

Nexus separates UI state from server state.

```text
User Action
     │
     ▼
React Component
     │
     ▼
Custom Hook
     │
     ▼
TanStack Query
     │
     ▼
API Client
     │
     │ HTTPS
     ▼
Nexus Backend
     │
     ▼
PostgreSQL
```

For real-time functionality:

```text
Nexus Backend
      │
      │ WebSocket Event
      ▼
WebSocket Client
      │
      ▼
TanStack Query Cache
      │
      ▼
React UI
```

REST APIs remain responsible for persistent application state, while WebSockets are intended to handle real-time state synchronization.

---

## 🔐 Authentication

Nexus uses **Clerk** for authentication.

Clerk is responsible for identity and authentication, while the Nexus backend handles application-specific authorization and user data.

```text
Clerk
  │
  │ Authenticated Identity
  ▼
Nexus Backend
  │
  │ Authorization
  ▼
Nexus Database
```

The backend uses the authenticated Clerk user identity to associate requests with Nexus users.

---

## 📡 API Communication

Backend communication is isolated under:

```text
lib/api/
```

This keeps networking concerns separate from UI components.

The intended API structure is:

```text
lib/api/
├── users.ts
├── conversations.ts
├── messages.ts
└── groups.ts
```

The frontend communicates with the backend through:

```text
HTTPS
  +
REST API
  +
WebSocket
```

API endpoints follow versioned routes such as:

```text
/api/v1/users
/api/v1/conversations
/api/v1/messages
/api/v1/groups
```

---

## ⚡ Performance Principles

Nexus is being designed around several performance principles:

* ⚡ Server-state caching with TanStack Query
* 📄 Cursor-based pagination for message history
* 🔄 Optimistic updates where appropriate
* 📡 WebSockets for latency-sensitive events
* 🧠 Minimal API payloads
* 🗃️ Database indexing
* 🧩 Component-level state isolation
* ♻️ Cache updates instead of unnecessary refetching
* 📦 Lazy loading where appropriate

---

## 🛡️ Security Principles

Security is enforced primarily at the backend boundary.

Planned and implemented measures include:

* 🔐 Clerk-based authentication
* 🛂 Server-side authorization
* ✅ Zod request validation
* 🚦 Rate limiting
* 🔒 HTTPS / WSS in production
* 🔑 Environment-based secrets
* 📦 Request body limits
* 🧹 Input validation and sanitization
* 🗄️ Parameterized database access through Drizzle ORM
* 👥 Conversation and group membership checks

> Frontend validation is treated as a UX feature, never as a security boundary.

---

## 🧑‍💻 Getting Started

### Prerequisites

* Node.js 18+
* pnpm, npm, yarn, or bun
* Git

### 1. Clone the repository

```bash
git clone https://github.com/leonistheczar/nexus-chat-app-frontend.git

cd nexus-chat-app-frontend
```

### 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

or npm:

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Configure the required environment variables for the current development setup.

### 4. Start the development server

Using pnpm:

```bash
pnpm dev
```

or npm:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 5. Build for production

```bash
pnpm build
pnpm start
```

### 6. Run linting

```bash
pnpm lint
```

---

## 📜 Available Scripts

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start development server     |
| `pnpm build` | Build production application |
| `pnpm start` | Start production server      |
| `pnpm lint`  | Run ESLint                   |

---

## 🧩 Development Guidelines

When contributing to Nexus:

1. Keep domain-specific code inside its feature folder.
2. Keep API/network operations inside `lib/api`.
3. Use TanStack Query for server state.
4. Use Zustand only for appropriate client/global state.
5. Keep components focused on presentation and interaction.
6. Keep business logic outside UI components.
7. Preserve the public/protected route-group architecture.
8. Validate backend-dependent flows gracefully while APIs are unavailable.
9. Prefer reusable hooks over duplicated data-fetching logic.
10. Maintain strict TypeScript types.

---

## 🌱 Development Philosophy

Nexus is being developed with a **frontend-first, backend-ready** approach.

The goal isn't simply to create a chat interface that looks good. The project is intended to evolve into a complete full-stack system with:

```text
Polished UI
     +
Clean architecture
     +
Typed API contracts
     +
Secure authentication
     +
Persistent data
     +
Real-time communication
     +
Scalable backend
```

---

## 📌 Project Status

| Area                  | Status             |
| --------------------- | ------------------ |
| Public UI             | 🟢 Complete        |
| Chat UI               | 🟢 Mostly Complete |
| Profile UI            | 🟢 Mostly Complete |
| Authentication        | 🟢 Integrated      |
| API Layer             | 🟡 Scaffolded      |
| Backend               | 🟡 In Development  |
| PostgreSQL            | 🟡 Integrated      |
| Drizzle ORM           | 🟡 Integrated      |
| User persistence      | 🟡 In Development  |
| Real-time messaging   | 🔴 Planned         |
| Groups                | 🟡 UI scaffolded   |
| Attachments           | 🔴 Planned         |
| Production deployment | 🔴 Planned         |

---

## 🤝 Contributing

Contributions, suggestions, and discussions are welcome.

If you'd like to contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, run the project checks, and open a pull request.

For larger changes, consider opening an issue first to discuss the proposed architecture or feature.

---

## 📄 License

This project is currently under development.

License information will be added when the project reaches its intended public release stage.

---

## 👨‍💻 Author

**Muhammad Ali**

Full-stack developer in progress, building Nexus to explore modern web application architecture, real-time systems, scalable backend design, and production-oriented development.

---

<p align="center">
  Built with ❤️ using Next.js, React, TypeScript, and modern web technologies.
</p>

<p align="center">
  ⭐ Star the repository if you find the project interesting.
</p>
