Job Search App
A full-featured job search application with authentication, job liking functionality, user profile creation, and job recommendations.

🔗 Live API
This project uses the free JSearch API
⚠️ Note: Limited to 200 requests/month — suitable for 2-3 days of usage.

🚀 Functional Features
🔍 Search Jobs: Users can search for jobs by title. Results are displayed as a list of job cards.

📄 Job Details: Each job has a detail page with full information. Route: /job-details/:id

❤️ Liked Jobs: Users can like jobs. Liked jobs are saved in localStorage and shown on the /liked page.

❌ Unlike: Users can remove jobs from the liked list.

👤 User Profile: Users can create a simple profile (name, desired job, about me) stored in localStorage. Route: /create-profile

🤖 Job Recommendations: On the /jobs page, users receive recommended jobs based on their profile. If no profile exists, a search input is shown.

🔐 Authentication Backend: A simple Express.js backend handles user auth (email + password), using MongoDB via Mongoose. Can be deployed to Render (free tier).

🛠 Technologies Used
Next.js 14 with TypeScript

Tailwind CSS

Formik for form management

Yup for validation

Axios with SWR for data fetching

Express.js for backend

MongoDB with Mongoose for database management

🧱 Project Structure
bash
Копировать
Редактировать
.
├── app/                         # Next.js App Router pages
│   ├── api/                     # API routes (Next.js handlers)
│   │   ├── jobs/
│   │   ├── job-details/
│   │   └── auth/
│   ├── auth/                    # Frontend pages: login, profile creation
│   ├── jobs/                    # Jobs listing and recommendations
│   ├── liked/                   # Liked jobs page
│   └── profile/                 # User profile page
│
├── components/                 # Reusable UI components
│   ├── AuthUI/
│   └── Header/
│
├── constants/                  # Constants (e.g. auth messages, static texts)
│   └── auth.constants.ts
│
├── contexts/                   # React Context Providers
│   └── AuthProvider.tsx
│
├── formik-schemes/            # Yup validation schemas for Formik
│   └── auth-validation.schemes.ts
│
├── lib/                        # Utility libraries
│   ├── auth.ts                 # Auth logic (e.g. login/register)
│   ├── axios.ts                # Axios instance with interceptors
│   └── fetcher.ts              # SWR fetcher wrapper
│
├── public/                     # Public assets
│   ├── gray-heart.png
│   └── red-heart.png
│
├── types/                      # TypeScript types
│   ├── auth-formik-types.ts
│   └── jobs.types.ts
│
└── jobs/                       # Job-related UI components
├── JobCard/
├── PagBtn/
├── Loader/
└── RecommendJobs/
📦 Backend (Express.js)
A simple Express app is used for user registration and login with email/password.
It connects to a MongoDB cluster and provides REST API endpoints.
Deployment: Can be hosted on Render using a free plan.

📝 Notes
All forms use Formik and Yup for seamless validation.

localStorage is used for storing the user profile and liked jobs (no server DB).

Recommended jobs are based on profile data (title, keywords).

Clean UI with minimal design using Tailwind — focused on readability and structure.

📄 License
This project is open-source and free to use.