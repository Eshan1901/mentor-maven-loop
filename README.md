# TeachLoop

A modern educational platform that connects teachers and learners through an intuitive course creation and management system.

## 🚀 Features

- **Course Management**: Create, organize, and manage educational content
- **User Authentication**: Secure login and registration system
- **Interactive Dashboard**: Track progress and manage courses
- **Search Functionality**: Find courses and content easily
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Notifications**: Stay updated with course activities

## 🛠️ Technologies

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React for modern iconography
- **Backend**: Appwrite (BaaS - Backend as a Service)
- **Authentication**: Appwrite Authentication
- **Database**: Appwrite Database
- **Storage**: Appwrite Storage for file management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teachloop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Appwrite configuration:
   ```env
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_USERS_COLLECTION_ID=users
   VITE_APPWRITE_COURSES_COLLECTION_ID=courses
   VITE_APPWRITE_ENROLLMENTS_COLLECTION_ID=enrollments
   VITE_APPWRITE_LESSONS_COLLECTION_ID=lessons
   VITE_APPWRITE_PROGRESS_COLLECTION_ID=progress
   VITE_APPWRITE_COURSE_MATERIALS_BUCKET_ID=course-materials
   VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID=profile-pictures
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## ⚙️ Appwrite Setup

### 1. Create Appwrite Account
1. Visit [Appwrite Cloud](https://cloud.appwrite.io) or set up self-hosted Appwrite
2. Create a new project
3. Note down your Project ID

### 2. Database Setup
Create a database with the following collections:

**Users Collection** (`users`)
- name (string, required)
- email (string, required)
- role (string, required, default: "student")
- bio (string, optional)
- skills_teach (string[], optional)
- skills_learn (string[], optional)
- profile_picture (string, optional)

**Courses Collection** (`courses`)
- title (string, required)
- description (string, required)
- instructorId (string, required)
- category (string, required)
- level (string, required)
- price (number, optional)
- thumbnail (string, optional)
- status (string, required, default: "draft")
- enrollmentCount (number, default: 0)

**Enrollments Collection** (`enrollments`)
- userId (string, required)
- courseId (string, required)
- enrolledAt (datetime, required)
- progress (number, default: 0)
- completedAt (datetime, optional)

**Lessons Collection** (`lessons`)
- courseId (string, required)
- title (string, required)
- content (string, required)
- order (number, required)
- videoUrl (string, optional)
- duration (number, optional)

**Progress Collection** (`progress`)
- userId (string, required)
- lessonId (string, required)
- courseId (string, required)
- completed (boolean, default: false)
- completedAt (datetime, optional)

### 3. Storage Setup
Create the following storage buckets:
- `course-materials` - For course videos, documents, etc.
- `profile-pictures` - For user profile images

### 4. Authentication Setup
1. Enable Email/Password authentication
2. Configure your app's domain in the allowed origins

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── services/          # External service integrations
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features

### Authentication System
- Secure user registration and login
- Password reset functionality
- Profile management

### Course Management
- Create and edit courses
- Upload course materials
- Track student progress
- Interactive course content

### Dashboard
- Personal learning dashboard
- Course analytics
- Progress tracking
- Activity feeds

### Search & Discovery
- Advanced course search
- Category filtering
- Recommended courses
- Popular content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**TeachLoop** - Empowering education through technology. Learn • Teach • Grow
