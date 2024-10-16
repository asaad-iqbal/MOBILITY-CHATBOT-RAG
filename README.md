```markdown
# Share Mobility Chatbot

Welcome to **Share Mobility Chatbot**, a feature-rich Next.js application that provides seamless chat interactions for users. This application leverages modern authentication methods, including GitHub OAuth and traditional email/password sign-up and sign-in, ensuring both security and flexibility for its users.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Set Up the Database](#4-set-up-the-database)
  - [5. Run Migrations](#5-run-migrations)
  - [6. Start the Development Server](#6-start-the-development-server)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
  - [GitHub OAuth](#github-oauth)
  - [Email & Password](#email--password)
- [Usage](#usage)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Chat Interface](#chat-interface)
  - [Theme Toggle](#theme-toggle)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **GitHub OAuth Authentication:** Allow users to sign in using their GitHub accounts.
- **Email & Password Authentication:** Enable users to sign up and sign in with their email and a secure password.
- **Chat Interface:** Authenticated users can engage in chat conversations.
- **Theme Toggle:** Switch between light and dark modes for an enhanced user experience.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Secure Password Storage:** Passwords are hashed using bcrypt before storing in the database.
- **Real-time Feedback:** Users receive instant notifications for actions like sign-up and sign-in using `react-toastify`.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) with React
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (GitHub OAuth & Credentials Provider)
- **Database:** [Prisma](https://www.prisma.io/) ORM with PostgreSQL (can be configured for other databases)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Version 14 or higher
- **npm or yarn:** Package manager
- **Database:** PostgreSQL (or another supported by Prisma)
- **GitHub Account:** For setting up OAuth

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/share-mobility-chatbot.git
cd share-mobility-chatbot
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# .env

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# NextAuth.js Secrets
NEXTAUTH_SECRET="your_nextauth_secret" # Generate using: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Notes:**

- **`DATABASE_URL`:** Replace with your actual database connection string.
- **`NEXTAUTH_SECRET`:** Generate a secure random string using the command provided.
- **`GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`:** Obtain these by registering an OAuth application on [GitHub Developer Settings](https://github.com/settings/developers).

### 4. Set Up the Database

Ensure your PostgreSQL (or chosen database) server is running. Create a new database if you haven't already.

```bash
# Example for PostgreSQL
createdb share_mobility_chatbot
```

### 5. Run Migrations

Use Prisma to apply the database schema.

```bash
npx prisma migrate dev --name init
```

This command will:

- Apply the migrations to your database.
- Generate the Prisma Client for database interactions.

### 6. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
share-mobility-chatbot/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts
│   │       └── signup/
│   │           └── route.ts
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── sign-in-button.tsx
│   │   │   └── sign-out-button.tsx
│   │   ├── chat-interface.tsx
│   │   ├── providers.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/
│   │   └── prisma.ts
│   ├── page.tsx
│   └── layout.tsx
├── prisma/
│   ├── schema.prisma
│   └── ...
├── public/
│   └── ...
├── styles/
│   └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## Authentication

### GitHub OAuth

Users can sign in using their GitHub accounts, providing a seamless and secure authentication method.

**Setup Steps:**

1. **Register a GitHub OAuth App:**
   - Navigate to [GitHub Developer Settings](https://github.com/settings/developers).
   - Click on "New OAuth App".
   - Set the **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
   - After registration, note down the **Client ID** and **Client Secret** and add them to your `.env` file.

2. **Sign In Flow:**
   - Click on "Sign In with GitHub".
   - Authorize the application to access your GitHub account.
   - Upon successful authorization, you'll be redirected back to the application as an authenticated user.

### Email & Password

In addition to GitHub OAuth, users can register and authenticate using their email and a secure password.

**Features:**

- **Sign Up:** Create a new account by providing a name, email, and password.
- **Sign In:** Authenticate using registered email and password.
- **Password Security:** Passwords are hashed using `bcrypt` before storage.

**Setup Steps:**

1. **Sign Up:**
   - Navigate to `/auth/signup`.
   - Fill out the registration form with your name, email, and password.
   - Upon successful registration, you'll be prompted to sign in.

2. **Sign In with Credentials:**
   - Navigate to `/auth/signin`.
   - Enter your registered email and password.
   - Submit to access the chat interface.

3. **Sign In with GitHub:**
   - Alternatively, you can use your GitHub account to sign in.

**Note:** The application ensures that emails are unique and provides feedback for any authentication errors.

## Usage

### Sign Up

1. **Access the Sign-Up Page:**

   Open [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)

2. **Fill Out the Form:**

   - **Name:** Enter your full name.
   - **Email:** Provide a valid email address.
   - **Password:** Choose a secure password (minimum 6 characters recommended).

3. **Submit:**

   Click on the "Sign Up" button. Upon successful registration, you'll be redirected to the sign-in page.

### Sign In

1. **Access the Sign-In Page:**

   Open [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)

2. **Choose Authentication Method:**

   - **Email & Password:**
     - Enter your registered email and password.
   - **GitHub OAuth:**
     - Click on "Sign In with GitHub" to authenticate via GitHub.

3. **Submit:**

   Authenticate to access the chat interface.

### Chat Interface

Once authenticated, users can access the **ChatInterface** where they can engage in conversations.

**Features:**

- **Real-Time Chat:** Engage in dynamic conversations.
- **Accessible Design:** Ensures usability for all users.
- **Responsive Layout:** Optimized for various devices.

### Theme Toggle

Users can switch between light and dark themes for a personalized experience.

**Usage:**

- Click on the theme toggle button located at the top-right corner of the application to switch themes.

## Deployment

To deploy the application, follow these general steps:

1. **Choose a Hosting Platform:**

   Popular choices include [Vercel](https://vercel.com/), [Heroku](https://www.heroku.com/), and [Netlify](https://www.netlify.com/).

2. **Set Up Environment Variables:**

   Ensure all necessary environment variables are configured on your hosting platform, mirroring those in your local `.env` file.

3. **Configure the Database:**

   Use a managed database service like [PlanetScale](https://planetscale.com/), [Heroku Postgres](https://www.heroku.com/postgres), or other providers compatible with Prisma.

4. **Run Migrations:**

   Apply Prisma migrations on your production database.

   ```bash
   npx prisma migrate deploy
   ```

5. **Deploy the Application:**

   Follow your chosen platform's deployment guides to deploy the Next.js application.

**Note:** Ensure that the `NEXTAUTH_URL` in your environment variables reflects your production URL.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

   Describe your changes and submit the pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).

---

© 2023 Share Mobility Chatbot. All rights reserved.
```

---