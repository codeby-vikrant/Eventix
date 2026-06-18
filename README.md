# 🎉 Eventix

A modern full-stack event management platform built with Next.js, TypeScript, Prisma, PostgreSQL (Neon), Neon Auth, and Tailwind CSS.

Eventix enables users to create, organize, and manage events while providing seamless RSVP functionality through secure authentication, shareable invitation links, and a responsive user experience.

## 🚀 Features

### 🔐 Authentication & Security

- User sign up and sign in using Neon Auth
- Secure cookie-based session management
- Protected routes for authenticated users
- Event ownership and authorization controls

### 📅 Event Management

- Create new events
- Edit event details
- Delete events
- View all created events
- Manage event ownership

### ✉️ RSVP System

- Generate unique invitation links using invite tokens
- RSVP to events
- Track attendee responses
- Share invitations easily

### 📊 Dashboard

- Personalized dashboard for users
- View created events
- Manage RSVPs
- Access event details and attendee information

### 🎨 User Experience

- Responsive design for desktop and mobile devices
- Modern UI built with shadcn/ui
- Form validation and error handling
- Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Neon)

### Authentication

- Neon Auth
- Cookie-based Sessions

### Deployment

- Vercel

## 🏗️ Architecture

```text
User
 │
 ▼
Neon Auth
 │
 ▼
Next.js Server Actions
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL (Neon)
```

## 📂 Database Models

### User

- Authentication information
- Event ownership
- RSVP tracking

### Event

- Event details
- Creator information
- Invite token generation
- RSVP associations

### RSVP

- Attendee responses
- Event participation tracking
- User-event relationships

## 🎯 Key Functionalities

### Event Creation & Management

Users can create, edit, and delete events while maintaining full ownership and control over their event data.

### Invitation System

Each event generates a unique invite token that can be shared with participants, enabling quick and secure event access.

### RSVP Tracking

Attendees can RSVP directly through invitation links, allowing organizers to monitor event participation efficiently.

### Personal Dashboard

A dedicated dashboard provides users with a centralized place to manage events, invitations, and attendee responses.

## 📚 Learning Outcomes

This project demonstrates:

- Full-Stack Web Development
- Authentication & Authorization
- Database Design & Relationships
- Prisma ORM Integration
- Server Actions in Next.js
- CRUD Operations
- Form Handling & Validation
- Session Management
- Environment Variable Configuration
- Production Deployment
- Real-World Application Architecture
- Debugging & Troubleshooting

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/codeby-vikrant/Eventix.git
```

### Navigate to Project

```bash
cd Eventix
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
AUTH_SECRET=

# Neon Auth Credentials
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
```

### Run Prisma Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

## 🌐 Deployment

The application is deployed using Vercel with Neon PostgreSQL and Neon Auth integration.

## 📸 Screenshots
<img width="3314" height="1950" alt="CleanShot 2026-06-18 at 13 44 38@2x" src="https://github.com/user-attachments/assets/a856d3c0-11c0-4111-92ca-f9fb251fc562" />
<img width="3334" height="1938" alt="CleanShot 2026-06-18 at 13 44 50@2x" src="https://github.com/user-attachments/assets/61060ce0-7425-48da-a11a-2a04c5514884" />
<img width="3336" height="1940" alt="CleanShot 2026-06-18 at 13 44 59@2x" src="https://github.com/user-attachments/assets/2ece4517-c999-401d-b65e-8eeb37f502a9" />
<img width="3338" height="1938" alt="CleanShot 2026-06-18 at 13 45 23@2x" src="https://github.com/user-attachments/assets/04dd5994-635a-4590-b7b6-8a027be67206" />
<img width="3320" height="1948" alt="CleanShot 2026-06-18 at 13 45 40@2x" src="https://github.com/user-attachments/assets/540ae01b-b294-4afe-9471-4867bbed7e8e" />
<img width="3316" height="1938" alt="CleanShot 2026-06-18 at 13 46 03@2x" src="https://github.com/user-attachments/assets/d44bc99c-7b9c-440e-9a14-fee66b3b2925" />

## 👨‍💻 Author

**Vikrant Vani**

Built to demonstrate modern full-stack development practices using Next.js, Prisma, PostgreSQL, Neon Auth, and Vercel.
