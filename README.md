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

The project is structured into several main directories. The app folder contains all the pages, built using the Next.js App Router. Inside app, the api folder contains server-side routes: jobs is used to fetch job listings, job-details fetches specific job details by ID, and auth handles authentication-related routes. The auth directory includes the login and create-profile pages. The jobs directory contains the main page where users can search for jobs and see recommendations. The liked folder includes the page for displaying liked jobs, and profile includes the user profile page.

The components directory holds reusable UI elements such as AuthUI and Header, along with their subcomponents.

The jobs folder contains components related to job functionality, including JobCard for displaying individual job posts, PagBtn for pagination controls, Loader for loading states, and RecommendJobs for recommended listings based on user profile data.

The constants folder stores static values such as predefined messages. The contexts directory contains the AuthProvider, which manages and provides global authentication state using React Context.

The lib folder includes utility functions and logic, such as auth.ts for authentication handling, axios.ts for configuring the Axios client, and fetcher.ts for use with SWR hooks.

The types folder contains all custom TypeScript definitions, organized by feature like auth and jobs.

The formik-schemes directory includes Yup validation schemas for working with Formik forms.

The public folder stores static files like images and icons, such as heart icons used for the like feature.

There is also an Express.js backend application created for handling user authentication using email and password. It connects to a free MongoDB Atlas cluster and exposes REST API endpoints. This backend can be deployed using Render.


📝 Notes
All forms use Formik and Yup for seamless validation.

localStorage is used for storing the user profile and liked jobs (no server DB).

Recommended jobs are based on profile data (title, keywords).

Clean UI with minimal design using Tailwind — focused on readability and structure.

📄 License
This project is open-source and free to use.