# SkillTrack 

**SkillTrack** is my fullstack growth tracking platform, helping users build skills, maintain practice streaks, and visualize their progress over time.

---

## 🏗️ Project Structure

This is a **monorepo** containing:

| Folder              | Description                            |
|---------------------|----------------------------------------|
| `/server`        | NestJS backend (API, Auth, Skill APIs) |
| `/client-user`   | Next.js frontend for users             |
| `/client-admin`  | Next.js frontend for admins            |
| `/packages/common`    | Shared types, utils, and constants     |

---

## 🚀 Tech Stack

- **Backend**: [NestJS](https://nestjs.com/) (TypeScript)
- **Frontend**: [Next.js](https://nextjs.org/) (TypeScript, TailwindCSS)
- **Database**: PostgreSQL (via Prisma or TypeORM)
- **Queue** (Future): Redis (BullMQ possibly)
- **Authentication**: JWT (planned)

---

## 🎯 Main Features (MVP)

- User signup/login
- Add and manage skills
- Log practice sessions
- Weekly goals & reminders
- Streak tracking
- Visualize skill progress over time

---

## 🛣️ Roadmap

- [x] Setup monorepo structure
- [ ] Scaffold NestJS server with Auth
- [ ] Scaffold Next.js user client
- [ ] Connect frontend to backend (REST/GraphQL)
- [ ] Add Skill CRUD
- [ ] Add Practice Session logging
- [ ] Integrate Data Visualizations (charts)
- [ ] Email Reminders (background jobs)
- [ ] Admin panel setup

---

## 📚 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/skill-track.git

# Install dependencies
pnpm install

# Start development
pnpm dev
