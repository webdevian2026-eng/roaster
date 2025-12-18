# 🎯 Roster Management System

A production-ready workforce management application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## ✨ Features

### 🔐 Authentication
- Supabase email/password authentication
- Protected routes
- User-scoped data access

### 📅 Roster Lifecycle
- **Draft** → **Published** → **Archived** workflow
- Only ONE published roster per month
- Published rosters are read-only
- Draft rosters are fully editable

### 📤 CSV Upload & Parsing
- Upload Excel/CSV files
- Automatic parsing and validation
- Support for complex roster structures
- Team-based organization

### 🔀 Generate/Shuffle Roster
- Auto-generate rosters based on business rules
- Intelligent shift distribution
- Preserve weekly OFF days
- Avoid invalid transitions (Night → Morning)

### ⚠️ Business Rule Validation
- **Ad Review**: Minimum shift coverage requirements
- **Help Desk**: Morning/Evening coverage
- **Email Support**: Morning/Evening coverage
- **Team Leaders**: OFF conflict detection
- Real-time warnings (non-blocking)

### 🎁 ADO Tracker
- Automatic detection of work on government holidays
- Track pending ADOs
- Assign adjusted off dates
- Mark as completed

### 📆 Holiday Management
- Mark government holidays
- Add notes and descriptions
- Automatic ADO creation

### 👥 Agent Management
- Manage workforce data
- Team and designation assignment
- Employee records

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Routing**: React Router v6
- **Build Tool**: Vite
- **UI Components**: Radix UI

## 🚀 Quick Start

### Demo Credentials

For testing purposes, use these credentials:
- **Email:** test@test.com
- **Password:** test

### Prerequisites

- Node.js 18+
- Supabase account (for production)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd roster-management-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Supabase**

- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL schema from `SUPABASE_SCHEMA.sql`
- Get your project URL and anon key

4. **Configure environment**

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Run development server**

```bash
npm run dev
```

## 📖 Documentation

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed setup and usage instructions.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   └── Layout.tsx       # Main layout with sidebar
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── MainRosterPage.tsx
│   ├── DraftRosterPage.tsx
│   ├── ADOTrackerPage.tsx
│   ├── HolidaysPage.tsx
│   └── AgentsPage.tsx
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── utils.ts         # Utility functions
├── utils/
│   ├── csvParser.ts     # CSV parsing logic
│   ├── businessRules.ts # Validation engine
│   └── shuffleAlgorithm.ts # Roster generation
├── types/
│   └── index.ts         # TypeScript types
└── App.tsx              # Main app component
```

## 🗃️ Database Schema

### Core Tables

- `teams` - 5 predefined teams
- `designations` - Officer, TL, Manager
- `shift_master` - 24 shift types
- `leave_types` - 7 leave types
- `agents` - Employee records
- `rosters` - Roster metadata with status
- `roster_entries` - Daily assignments
- `holidays` - Government holidays
- `ado_records` - ADO tracking
- `audit_logs` - System audit trail

### Row Level Security

All tables have RLS enabled with appropriate policies for:
- Public read access
- Authenticated write access
- User-scoped data access

## 🎯 Business Rules

### Shift Coverage

**Ad Review / Moderation**
- 2× Morning (M, M1)
- 3× Super Evening (SE, SE1)
- 1× Night (N)
- 1× Evening (E, E1)
- Rest: Day shifts (D, D1)

**Help Desk**
- ≥1 Morning shift
- ≥1 Evening shift

**Email Support**
- ≥1 Morning shift
- ≥1 Evening shift

### Global Rules

- 1 OFF per agent per week
- No Night → Morning transitions
- Two TLs cannot be OFF on same day
- ADO earned when working on government holiday

## 🎨 UI/UX

- Sidebar navigation
- Monthly calendar view
- Table view with sticky headers
- Color-coded shifts and leaves
- Real-time validation warnings
- Mobile responsive design

## 📦 Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

Don't forget to add environment variables in your deployment platform.

## 🔒 Security

- Supabase Auth for authentication
- Row Level Security (RLS) on all tables
- Protected routes
- User-scoped data access
- Audit logging

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

**Built with ❤️ for workforce management**
