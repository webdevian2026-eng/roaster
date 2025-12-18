# Roster Management System - Setup Instructions

## 🚀 Quick Start

### Demo Login

For testing the application without Supabase setup:
- **Email:** test@test.com
- **Password:** test

**Note:** This is a demo mode. To use real data and full functionality, complete the Supabase setup below.

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details

2. **Run the SQL Schema**
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy the entire content from `SUPABASE_SCHEMA.sql`
   - Paste and run it

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy:
     - Project URL
     - Anon/Public Key

### 2. Environment Configuration

1. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual Supabase credentials

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## 📋 Features Implemented

### ✅ Core Features

- **Authentication**: Email/password login with Supabase Auth
- **Roster Lifecycle**: Draft → Published → Archived workflow
- **CSV Upload**: Parse Excel/CSV files with roster data
- **Business Rules**: Validation for shift coverage and constraints
- **ADO Tracking**: Automatic detection and tracking of adjusted day offs
- **Holiday Management**: Mark government holidays
- **Agent Management**: Manage workforce data

### 🔐 Security

- Row Level Security (RLS) enabled on all tables
- User-scoped data access
- Protected routes
- Audit logging

### 📊 Database Schema

- **teams**: 5 predefined teams
- **designations**: Officer, TL, Manager
- **shift_master**: 24 shift types across all categories
- **leave_types**: OFF, CL, SL, GH, ADO, A, LWP
- **agents**: Employee records
- **rosters**: Roster metadata with status
- **roster_entries**: Daily shift/leave assignments
- **holidays**: Government holidays
- **ado_records**: ADO tracking
- **audit_logs**: System audit trail

## 🎯 Usage Workflow

### 1. Upload Roster

1. Go to **Draft Roster** page
2. Click "Upload CSV"
3. Select your Excel/CSV file
4. System parses and validates data

### 2. Edit Draft

1. View parsed roster in calendar/table view
2. Click cells to edit shifts or leaves
3. Changes are marked as manual edits
4. Warnings appear for rule violations

### 3. Generate/Shuffle

1. Click "Generate Roster"
2. System creates roster based on business rules
3. Review and adjust as needed

### 4. Publish

1. Click "Publish Roster"
2. Review validation warnings
3. Confirm publication
4. Previous published roster is archived
5. New roster becomes the Main Roster

### 5. Track ADOs

1. System automatically detects work on holidays
2. Go to **ADO Tracker**
3. View pending ADOs
4. Assign adjusted off dates
5. Mark as completed

## 📁 CSV Format

Your CSV/Excel file should have:

### Structure

- **Column A**: Gender (M/F)
- **Column B**: Employee ID
- **Column C**: Name
- **Column D**: Designation
- **Columns E+**: One column per date

### Headers

- **Row 1**: Week numbers (49, 50, 51...)
- **Row 2**: Day numbers (1-31)
- **Row 3+**: Agent data

### Team Headers

- Merged cells with team names (e.g., "Ad Review", "Email Support")

### Cell Values

- Shift codes: M, M1, D, D1, E, E1, SE, SE1, N, etc.
- Leave codes: OFF, CL, SL, GH, ADO, A, LWP

## 🔧 Business Rules

### Ad Review / Moderation

- Minimum 2 Morning shifts
- Minimum 3 Super Evening shifts
- Minimum 1 Night shift
- Minimum 1 Evening shift

### Help Desk & Email Support

- Minimum 1 Morning shift
- Minimum 1 Evening shift

### Team Leaders

- Maximum 1 TL can be OFF per day

### Global Rules

- Minimum 1 OFF per agent per week
- No Night → Morning transitions
- ADO earned when working on government holiday

## 🎨 Color Coding

- **Shifts**: Blue shades
- **OFF**: Gray
- **CL**: Blue
- **SL**: Orange
- **GH**: Green
- **ADO**: Purple
- **A**: Red
- **LWP**: Dark red
- **Manual edits**: Yellow border

## 🚨 Troubleshooting

### "Invalid Supabase credentials"

- Check your `.env` file
- Ensure URL and key are correct
- Restart dev server after changing `.env`

### "Failed to parse CSV"

- Ensure file has correct structure
- Check for merged cells in team headers
- Verify date columns start after "Designation"

### "RLS policy violation"

- Ensure you're logged in
- Check user permissions in Supabase
- Verify RLS policies are enabled

## 📦 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

Add environment variables in Vercel dashboard.

### Netlify

```bash
npm run build
netlify deploy --prod
```

Add environment variables in Netlify dashboard.

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify Supabase connection
3. Review SQL schema execution
4. Check RLS policies

---

**Built with ❤️ using Next.js + Supabase**
