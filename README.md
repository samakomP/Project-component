[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/1HIz9w_9)

# AI Passport

## Group Information
**Group Name:**   
**Course:** SE331 Component-Based Software Development  
**Term Project I**

### Team Members
- **Student ID:** 672115021 - Teanchai Charoenporn
- **Student ID:** 672115047 - Samakom Prompanya

## Project Overview
AI Passport is a web application created for managing user level tiers, AI services, learning courses, and level-up exams. Users start at Level 1 and can upgrade their level by taking online exams. Higher levels unlock more AI models and higher monthly token limits.

### Key Features
- **User Levels and Services:** Start at Level 1. Higher levels unlock more AI models in the home prompt box.
- **Level Up Exams:** Multiple-choice exams with automated grading. Passing upgrades the user level automatically.
- **User Profile & History:** View level badges, edit profile details, and track exam history.
- **Admin Control Panel:** Manage user list, toggle active status, filter users, update level services, and edit exam questions.

## Features Implemented
- Login and Sign Up for users and admins.
- User Home prompt box with AI model selector based on level.
- Course list and video tutorial player.
- Level-up exam interface with automated score evaluation.
- Admin User List with filter sidebar and pagination URL query parameters (`?page=...&limit=...`).
- Admin Level List for managing level services and monthly token benefits.
- Admin Exam List and Edit Exam interface.

### Login & Register Page
- **Display:** Login form for users and admins, and registration form for new accounts starting at Level 1.

### AI Chat Page
- **Display:** AI prompt box with model selector dropdown that updates available models based on user level.

### Profile Page
- **Display:** Editable personal information, current level token benefits, unlocked badges, and past exam history.

### e-learning Page
- **Display:** AI course catalog and video tutorial player with lesson navigation.

### Exam Page
- **Display:** Multiple-choice level-up exam with dynamic pass criteria score calculation and instant level upgrade.

### Admin User List & Adjust Page
- **Display:** User management table, access status toggle (Active/Disabled), filter sidebar, and URL query pagination.

### Admin Level List & Edit Page
- **Display:** Level tier overview, service model management (Add/Remove Service), and token benefit editor.

### Admin Exam List & Edit Page
- **Display:** Exam list overview and exam editor for pass criteria percentage, questions, choices, and correct answers.

## Technical Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Development Tools
- **Prettier** - Code formatting
- **Vue DevTools** - Development debugging

## Project Structure
```
src/
├── assets/                 # Static assets (styles)
|   |--- base.css
|   |--- style.css
├── components/             
│   ├── AnswerOption.vue             
|   ├── AttemptField.vue
|   ├── BackHome.vue
|   ├── CardAuth.vue
|   ├── CardBase.vue
|   ├── Detail.vue
|   ├── EditForm.vue
|   ├── HistoryExam.vue
|   ├── NavBar.vue
|   ├── PillLevel.vue
|   ├── QuestionNavButton.vue
|   ├── StatTile.vue
│   └── UserProfileCard.vue
├── router/                 # Vue Router configuration
│   └── index.ts
├── services/               # Service layer
│   ├── ElearningService.ts
│   ├── ExamService.ts
│   ├── LevelService.ts
│   ├── UserService.ts
│   └── UserServices.ts
├── stores/                 # Pinia state management
│   ├── Auth.ts
│   ├── counter.ts
│   ├── Exam.ts
│   ├── message.ts
│   └── user.ts
├── views/                  # Page components / Views
│   ├── admin/              # Admin pages
│   |   ├── events/
|   |   |   ├── AdminEditview.vue
|   |   |   ├── AdminUserDetail.vue
|   |   |   ├── AdminUserHistory.vue
|   |   |   ├── EditLevel.vue
|   |   |   └── ExamDetail.vue
│   │   ├── AdminLevel.vue
│   │   ├── AdminUserProfile.vue
│   │   ├── HomePage.vue
│   │   ├── LevelDetail.vue
│   │   └── UserManage.vue
│   ├── user/               # User pages
│   |   ├── events/
|   |   |   ├── HistoryExam.vue
|   |   |   ├── UserBadge.vue
|   |   |   ├── UserDetail.vue
|   |   |   ├── UserDetailEdit.vue
|   |   |   └── UserServices.vue
│   │   ├── ExamView.vue
│   │   ├── LearningView.vue
│   │   ├── LevelBenefit.vue
│   │   ├── MainUser.vue
│   │   ├── PrepExam.vue
│   │   ├── ResultView.vue
│   │   ├── UserAService.vue
│   │   └── UserProfile.vue
│   ├── LoginView.vue
│   ├── NetworkErrorView.vue
│   ├── NotFoundView.vue
│   └── RegisterView.vue
├── App.vue                 # Root component
├── main.ts                 # Application entry point
└── types.ts                # TypeScript interfaces and types
```

## Mock Data

The application includes comprehensive mock data with:
- **accounts:** User credentials, level, province, and access status.
- **courses:** AI courses and YouTube video tutorial links.
- **levelDetail:** Level tier details, services, token benefits, and pass criteria.
- **examData:** Exam questions, choices, and answer key per level.
- **examHistory:** Historical exam results per user email.

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or >=22.12.0)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/chartchai-class/se331-2026-project01-se331-2026-project01.git](https://github.com/chartchai-class/se331-2026-project01-so-cool-so-handsome.git)
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - TypeScript type checking

## Deployment

### Vercel Deployment
The application is deployed on Vercel for easy access and scalability.

**Live Demo:** [https://se331-2026-project01-se331-2026-pro.vercel.app](https://project-component-beta.vercel.app/)

### Build for Production
```bash
npm run build
```

## Demo Video

**Demo Video URL:** [https://youtu.be/7Mly05_bI-k?si=xDf7Bee9iu0Oplpv](https://www.youtube.com/watch?v=phYSZMGhNjE)

The demo video showcases:
- Login and Register demonstration
- User profile, level badges, and exam history tracking demonstration
- AI Chat page functionality and AI model selector demonstration
- e-learning List page and video tutorial features demonstration
- Level-up exam and score evaluation demonstration
- Admin user list filtering,level services,level edit and exam editor demonstration
- Routing 404 handler page demonstration


## Key Implementation Details

### State Management
- Uses Pinia for centralized state management (`userStore`, `AuthStore`, `examStore`).
- Live reactivity between Admin edits and User views.

### Data Storage
- Pure client-side application (No backend server).
- Mock data stored in JSON format (`db.json`).
