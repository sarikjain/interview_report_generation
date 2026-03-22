# 🎯 AI Interview Prep Tool

An AI-powered web application that analyzes your resume and generates a personalized interview preparation report based on your target job description. Built with a secure authentication system so every user gets their own private reports.

## 📸 Preview

<!-- Add your screenshots here -->

## ✨ Features

- 🔐 **User Authentication** — Secure register/login with JWT and HTTP-only cookies
- 📄 **Resume Analysis** — Upload your PDF resume and let AI analyze it
- 🎯 **Match Score** — See how well your profile matches the job description
- ❓ **Technical Questions** — Get interview questions tailored to your experience with detailed answers
- 🧠 **Behavioural Questions** — Prepare for soft skill questions with guided answers
- 📊 **Skill Gap Analysis** — Identify missing skills with severity levels (low/medium/high)
- 📅 **Day-wise Prep Plan** — Follow a structured preparation plan to crack the interview
- 🕓 **Report History** — Access all your past interview reports anytime

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- SCSS
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Multer (file uploads)
- PDF Parse
- Google Gemini AI API
- JWT Authentication
- Bcrypt (password hashing)

## 🔐 Authentication

- JWT-based authentication system
- Secure user registration and login
- Passwords hashed with bcrypt before storing in database
- Tokens stored securely with HTTP-only cookies
- Protected routes — only logged in users can generate and view reports
- Token blacklisting on logout for extra security

## 🤖 How the AI Works

1. User uploads their **PDF resume** and enters a **job description** and **self description**
2. Backend extracts text from the PDF using `pdf-parse`
3. Extracted text is sent to **Google Gemini AI** with a strict structured prompt
4. AI generates a complete interview report containing:
   - Match score (0-100) between resume and job description
   - 3 technical interview questions with intent and detailed answers
   - 2 behavioural questions with intent and detailed answers
   - Skill gaps with severity levels (low / medium / high)
   - A day-wise preparation plan
5. Report is validated, cleaned and saved to **MongoDB**
6. User can revisit all past reports anytime from the report page

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-interview-prep.git
cd ai-interview-prep
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Create `.env` file in `/backend`**
```env
PORT=3000
MONGOURL=your_mongodb_connection_string
Googlekey=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

4. **Start Backend**
```bash
node server.js
```

5. **Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

6. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structure
```
ai-interview-prep/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── ai.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── blacklist.model.js
│   │   │   └── interviewreport.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   └── services/
│   │       └── ai.service.js
│   └── server.js
│
└── frontend/
    └── src/
        └── features/
            ├── auth/
            │   ├── pages/
            │   │   ├── login.jsx
            │   │   └── register.jsx
            │   ├── components/
            │   │   └── protected.jsx
            │   ├── auth.context.jsx
            │   └── auth.api.js
            └── ai/
                ├── pages/
                │   ├── home.jsx
                │   └── interview.jsx
                ├── hooks/
                │   └── ai.hooks.js
                ├── ai.context.jsx
                └── ai.api.js
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout and blacklist token |
| POST | `/api/interview/` | Generate interview report |
| GET | `/api/interview/` | Get all reports for logged in user |
| GET | `/api/interview/report/:id` | Get single report by ID |

## 📄 Data Models

**User**
- name, email, password (hashed)

**Interview Report**
- title, matchscore
- technicalquestions [ question, intention, answer ]
- behaviourialquestions [ question, intention, answer ]
- skillsgap [ skill, severity ]
- preparationplan [ day, focus, tasks ]
- user (ref to User)

## 👨‍💻 Author

**Sarik Jain**
- LinkedIn: [your linkedin url]
- GitHub: [your github url]

## 📄 License

MIT License
