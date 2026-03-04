# 🌐 Developer Portfolio CMS

A full-stack personal portfolio with a custom admin dashboard to manage projects, experience, and achievements dynamically.
Built with a Next.js frontend and a Node.js + MongoDB backend.

---

## 🚀 Overview

This project converts a static developer portfolio into a dynamic content-managed system (CMS).
Instead of editing code to update content, an authenticated admin panel allows creating, editing, and deleting portfolio entries stored in a database.

---

## 🧱 Architecture

Frontend (Next.js) → Backend API (Node.js/Express) → MongoDB Atlas

* Public users see portfolio content
* Admin manages content via dashboard
* Images & PDFs stored securely via ImageKit
* Backend serves data to frontend

---

## ✨ Features

### Public Portfolio

* Projects showcase
* Experience timeline (Alternating UI)
* Hackathons & achievements
* Categorized Skills & Technology metrics
* Client & Colleague Reviews
* Downloadable Resume
* Responsive UI & animations (Framer Motion)

### Admin Dashboard

* Secure login (JWT)
* Add / edit / delete projects, experience, and hackathons
* Manage dynamic skill categories and proficiency levels
* Upload and update Resume PDF
* Manage client reviews
* Dynamic content updates without redeploy

---

## 🖥️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Vercel hosting

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Native MongoDB driver / Mongoose
* JWT authentication

### Media

* ImageKit (Media storage and optimization for Images & PDFs)

---

## 📂 Project Structure

```text
portfolio/
  frontend/
    app/
    components/
    public/
  
  backend/
    config/
      db.js
      imagekit.js
    controllers/
      projectController.js
      experienceController.js
      hackathonController.js
      skillController.js
      reviewController.js
      resumeController.js
    routes/
      projectRoutes.js
      experienceRoutes.js
      hackathonRoutes.js
      skillRoutes.js
      reviewRoutes.js
      resumeRoutes.js
    middleware/
      auth.js
      upload.js
    index.js
    .env

🗄️ Database Design

Database: portfolio

projects
category (eg Automation, Full stack project, FreeLance)
title
description
shortDescription
imageUrl (via ImageKit)
liveUrl
githubUrl
tags []
techStack []
screenshots []
caseStudy []
status
displayOrder
createdAt

experience
role
company
duration
workType (e.g., Hybrid, Remote, On-site)
responsibilities []
technologies []
certificateUrl []
displayOrder
createdAt

skills
category (e.g., "Frontend", "Backend", "AI")
skills []
name (e.g., "React")
proficiency (number, e.g., 95)
displayOrder

reviews
reviewerName
reviewerTitle (e.g., "Tech Lead at AI Company")
reviewText
rating (number)
displayOrder
createdAt

resume
resumeUrl (via ImageKit)
lastUpdated

hackathons
title
event
description
achievement
technologies []
links []
displayOrder
createdAt

admin_users
email
passwordHash
createdAt

🔐 Authentication
Admin authentication uses JWT:

Admin logs in with credentials

Backend verifies password hash

JWT token issued

Protected routes require token

Protected actions:

Create content

Edit content

Delete content

Upload Media (Images/PDFs)

🔄 Data Flow
Create project:

Admin UI → POST /projects → ImageKit (if media) → MongoDB → Success

Fetch projects:

Frontend → GET /projects → MongoDB → Render

Update project:

Admin UI → PUT /projects/:id → MongoDB

Delete project:

Admin UI → DELETE /projects/:id → MongoDB

⚙️ Local Development
1️⃣ Clone repo
Bash
git clone <repo-url>
cd portfolio
2️⃣ Backend setup
Bash
cd backend
npm install
Create .env:

Code snippet
mongodb_url=your_mongodb_connection_string
JWT_SECRET=your_secret
PORT=5000
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
Run backend:

Bash
npm run dev
3️⃣ Frontend setup
Bash
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:9002

Backend runs on:
http://localhost:5000

🌍 Deployment
Frontend: Vercel
Backend: Render / Railway / Fly.io
Database: MongoDB Atlas

Environment variables configured in hosting dashboard.

🎯 Goals of This Project
Learn backend integration with MongoDB

Build a real CMS-style portfolio

Practice CRUD API design

Implement JWT authentication

Integrate third-party media handling (ImageKit)

Understand full-stack deployment

Create job-ready project

📌 Future Improvements
Rich text editor for content

Draft/publish status

Admin UI enhancements

Analytics integration

👨‍💻 Author
Nikhilesh Attal

AI-powered Full-stack developer portfolio project