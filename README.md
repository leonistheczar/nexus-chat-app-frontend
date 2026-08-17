# 💬 Nexus

### Modern real-time messaging platform built with Next.js and TypeScript

Nexus is a modern chat platform focused on **clean UX, smooth interactions, and scalable architecture**. The frontend is built with Next.js and React, with a modular structure designed to integrate seamlessly with a production backend.

> 🚧 **Status:** Active Development
> 🎨 **Frontend:** UI and core user flows largely complete
> ⚙️ **Backend:** Integration in progress

---

## ✨ Highlights

* 💬 Modern chat workspace
* 👥 Contact and conversation management
* 👤 Multi-step profile setup
* 🔐 Authentication-ready architecture
* 🌓 Dark / light / system themes
* 📱 Responsive desktop, tablet, and mobile UI
* 🎞️ Smooth UI animations
* 🧩 Modular feature-based architecture
* ⚡ TanStack Query for server-state management
* 🗃️ Zustand for client-side state
* 🔌 Dedicated API integration layer
* 🚀 Designed for real-time messaging and scalable backend integration

---

## 📸 Preview

> Screenshots and demo links will be added as the project evolves.

| Public Experience | Chat Workspace |
| :---------------: | :------------: |
|   *Coming soon*   |  *Coming soon* |

---

## 🏗️ Architecture

Nexus follows a layered frontend architecture designed to keep UI, state, networking, and domain logic separated.

```text
┌──────────────────────────────────────────────┐
│                  Next.js App                 │
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
           └── Database
```

The frontend is intentionally designed so backend services can be introduced without requiring major UI refactoring.

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

### Planned Backend Stack

```text
Node.js
Express
TypeScript
Clerk
PostgreSQL
Prisma
WebSocket
Zod
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

#### 🔐 Authentication UI

* [x] Sign in interface
* [x] Sign up interface
* [x] Sign in / sign up mode switching
* [x] Query parameter based auth mode
* [x] Animated transitions

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

---

## 🚧 In Progress

The frontend is now transitioning from a **frontend-first prototype** toward a fully connected full-stack application.

Current focus:

* [ ] Backend architecture
* [ ] PostgreSQL database
* [ ] Prisma ORM
* [ ] Clerk integration
* [ ] User persistence
* [ ] Conversation APIs
* [ ] Message APIs
* [ ] Real-time messaging
* [ ] Persistent message history

---

## 🗺️ Roadmap

### Phase 1. Backend Foundation

* [ ] Express + TypeScript setup
* [ ] Environment configuration
* [ ] API architecture
* [ ] Error handling
* [ ] Request validation
* [ ] Logging

### Phase 2. Authentication & Users

* [ ] Clerk integration
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
Database
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

This allows REST APIs to remain responsible for persistent application state while WebSockets handle real-time state synchronization.

---

## 🔐 Authentication

Nexus uses **Clerk** for authentication.

Clerk is responsible for identity and authentication, while Nexus will handle application-specific authorization and user data.

```text
Clerk
  │
  │ User Identity
  ▼
Nexus Backend
  │
  │ Authorization
  ▼
Nexus Database
```

The backend will use the authenticated Clerk user identity to associate requests with Nexus users.

---

## 📡 API Communication

All backend communication is isolated under:

```text
lib/api/
```

This keeps networking concerns separate from UI components.

Example:

```text
lib/api/
├── users.ts
├── conversations.ts
├── messages.ts
└── groups.ts
```

The frontend will communicate with the backend using:

```text
HTTPS
  +
REST API
  +
WebSocket
```

API endpoints will follow versioned routes such as:

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

Security will be enforced primarily at the backend boundary.

Planned measures include:

* 🔐 Clerk-based authentication
* 🛂 Server-side authorization
* ✅ Request validation
* 🚦 Rate limiting
* 🔒 HTTPS / WSS in production
* 🔑 Environment-based secrets
* 📦 Request body limits
* 🧹 Input sanitization
* 🗄️ Parameterized database access through Prisma
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
git clone <repository-url>
cd nexus-frontend
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

Backend integrations will require environment variables as development progresses.

### 4. Start development server

```bash
pnpm dev
```

or:

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

The goal isn't simply to make a chat interface that looks good. The project is intended to evolve into a complete full-stack system with:

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
| Authentication UI     | 🟢 Complete        |
| API Layer             | 🟡 Scaffolded      |
| Backend               | 🟡 In Development  |
| Database              | 🟡 Planned         |
| Real-time messaging   | 🟡 Planned         |
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
