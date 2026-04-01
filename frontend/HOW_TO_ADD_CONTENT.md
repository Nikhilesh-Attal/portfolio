# How to Add Projects and Reviews

This guide shows you exactly where and how to add new projects and reviews to your portfolio.

## 📁 Adding New Projects

### Step 1: Prepare Your Assets
1. **Screenshots**: Add 3 project screenshots to the `public/` folder
   - Main dashboard/homepage screenshot
   - Key feature screenshot  
   - Results/analytics screenshot
   - Name them descriptively: `your-project-dashboard.png`

2. **Project Image**: Add a main project image to `public/`
   - This will be the card thumbnail
   - Recommended size: 600x400px

### Step 2: Add Project Data
Open `components/projects.tsx` and find the `projects` array (around line 15).

Copy this template and add it to the array:

\`\`\`javascript
{
  id: "your-project-id", // unique, lowercase, no spaces
  title: "Your Project Title",
  description: "Detailed description of what your project does, who it helps, and its impact. Be specific about the problem it solves.",
  shortDescription: "Tech Stack → Main outcome/benefit",
  image: "/your-project-image.png",
  liveUrl: "https://your-live-url.com",
  githubUrl: "https://github.com/your-username/your-repo",
  tags: ["React", "Node.js", "AI", "Firebase"], // Max 4-5 main techs
  status: "Live", // "Live", "Open Source", or "In Development"
  screenshots: [
    "/your-project-screenshot1.png",
    "/your-project-screenshot2.png", 
    "/your-project-screenshot3.png"
  ],
  caseStudy: [
    "Key achievement or feature you built",
    "Technical challenge you solved",
    "Impact or results you achieved", 
    "What users/clients gained from it"
  ],
  techStack: [
    "List", "All", "Technologies", "Used", "In", "Detail"
  ],
},
\`\`\`

### Step 3: Test Your Project
1. Save the file
2. Check that your project appears in the grid
3. Click on it to test the modal
4. Verify all links work

## 🌟 Adding New Reviews

### Step 1: Prepare Avatar (Optional)
- Add reviewer's photo to `public/` folder as `avatar-name.png`
- If no photo, the system will auto-generate initials

### Step 2: Add Review Data  
Open `components/reviews.tsx` and find the `reviews` array (around line 15).

Copy this template and add it to the array:

\`\`\`javascript
{
  id: "unique-id", // Use numbers like "7", "8", etc.
  name: "Reviewer Full Name",
  role: "Their Job Title", 
  company: "Company Name",
  content: "What they said about you or your work. Keep it authentic and specific. Mention specific projects, skills, or results if possible. Make it personal and genuine.",
  rating: 5, // 1-5 stars (most should be 4-5)
  avatar: "/avatar-name.png", // Optional, remove if no image
},
\`\`\`

### Step 3: Test Your Review
1. Save the file
2. Check that your review appears in the grid
3. Verify the star rating displays correctly
4. Check that avatar or initials show properly

## 💡 Pro Tips

### For Projects:
- **Be specific** in descriptions - mention actual numbers, timeframes, users
- **Use action words** - "Built", "Integrated", "Achieved", "Reduced"
- **Show impact** - "Saved 10 hours/week", "Increased efficiency by 40%"
- **Keep screenshots current** - update them as your project evolves

### For Reviews:
- **Ask for specifics** when requesting reviews
- **Mix different types** - colleagues, clients, users, mentors
- **Keep them recent** - reviews from the last 1-2 years are most relevant
- **Be authentic** - real reviews are better than perfect ones

### File Organization:
\`\`\`
public/
├── startup-hq-dashboard.png
├── job-scraper-dashboard.png  
├── kindling-help-platform.png
├── avatar-arjun.png
├── avatar-priya.png
└── your-new-project-image.png
\`\`\`

## 🚀 Quick Checklist

Before adding new content:
- [ ] Images are optimized (under 500KB each)
- [ ] All URLs work and are live
- [ ] Project descriptions are clear and specific
- [ ] Reviews sound authentic and personal
- [ ] No typos in names, companies, or content
- [ ] All required fields are filled

## 🔄 Future Updates

When you're ready to make this dynamic:
1. Set up a database (Supabase recommended)
2. Create an admin panel
3. Move this data to the database
4. Update the components to fetch from API

For now, this simple approach lets you update content by editing the files directly!
