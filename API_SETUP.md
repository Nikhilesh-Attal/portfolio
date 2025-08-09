# Setting Up Your Dynamic Portfolio API

This guide will help you set up an external API to manage your projects and reviews dynamically.

## Quick Setup Options

### Option 1: Supabase (Recommended)
1. Create a new Supabase project
2. Create these tables:

\`\`\`sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  image TEXT,
  live_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Live',
  screenshots TEXT[] DEFAULT '{}',
  case_study TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

3. Update `lib/api.ts`:
\`\`\`typescript
const USE_EXTERNAL_API = true
const API_BASE_URL = "https://your-project.supabase.co/rest/v1"
\`\`\`

### Option 2: Firebase Firestore
1. Create a Firebase project
2. Set up Firestore with collections: `projects` and `reviews`
3. Create API endpoints using Firebase Functions

### Option 3: Simple JSON API
1. Create a simple Express.js server
2. Use JSON files or a lightweight database
3. Deploy to Vercel, Railway, or Heroku

## API Endpoints Required

Your API should provide these endpoints:

- `GET /projects` - Get all projects
- `GET /projects?featured=true` - Get featured projects
- `POST /projects` - Add new project
- `GET /reviews` - Get all reviews
- `POST /reviews` - Add new review

## Admin Panel (Future)

You can build a simple admin panel to manage content:

\`\`\`typescript
// Example admin functions
import { addProject, addReview } from '@/lib/api'

// Add new project
const newProject = {
  title: "My New Project",
  description: "Description here...",
  // ... other fields
}
await addProject(newProject)

// Add new review
const newReview = {
  name: "John Doe",
  role: "Developer",
  company: "Tech Corp",
  content: "Great work!",
  rating: 5
}
await addReview(newReview)
\`\`\`

## Environment Variables

Add these to your `.env.local`:

\`\`\`
NEXT_PUBLIC_API_URL=your-api-endpoint
API_KEY=your-api-key (if needed)
\`\`\`

## Testing

1. Start with local data (USE_EXTERNAL_API = false)
2. Set up your API
3. Switch to external API (USE_EXTERNAL_API = true)
4. Test that everything loads correctly

The system will automatically fall back to local data if the API fails, ensuring your portfolio always works!
