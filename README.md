# Social Media App

This is a general purpose social media app built for learning Next.js fullstack app development

## Key features of this App

- User Profiles
  - Profile page
  - Login mechanism
- User generate posts
  - Feed
  - Post creation page
- Followers
  - Visit profile pages using readonly mode
- Like & Comment system

## Tech Stack

- Next.js with App Dir
- Next Auth
- Prisma
- Postgres
- Shadcn UI

## Required Page Routes

- Login Page
  - /login
- Feed Page
  - /feed
- Profile Page
  - /profile
  - /profile/[userHandle]
- Home Page
  - If user isLoggedIn -> to feed
  - If not loggedIn -> to login page
