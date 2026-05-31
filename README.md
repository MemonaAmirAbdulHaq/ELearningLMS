# ELearning LMS

> An interactive E-Learning platform where all students can learn and grow together.

🌐 **Live Demo:** [e-learning-lms-xi.vercel.app](https://e-learning-lms-xi.vercel.app/)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## About

ELearning LMS is a full-stack Learning Management System built to empower learners worldwide with next-generation courses and industry-leading mentors. It provides a seamless experience for students to browse, enroll in, and complete courses across a variety of tech and programming disciplines.

---

## Features

- 📚 Browse and search a catalog of courses
- 🔐 User authentication (Login / Register)
- 🎓 Student dashboard to track enrolled courses
- 👨‍🏫 Instructor pages and course management
- 💳 Pricing plans for course access
- ⭐ Student reviews and ratings
- 📋 FAQ, About, and Policy pages
- 📬 Newsletter subscription
- 📱 Fully responsive design

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js, TypeScript, CSS          |
| Backend    | Node.js, TypeScript, EJS          |
| Deployment | Vercel (frontend)                 |

---

## Project Structure

```
ELearningLMS/
├── client/          # Next.js frontend application
├── server/          # Node.js backend API
├── .gitignore
└── package-lock.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MemonaAmirAbdulHaq/ELearningLMS.git
   cd ELearningLMS
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Set up the client**

   ```bash
   cd client
   npm install
   ```

4. **Set up the server**

   ```bash
   cd ../server
   npm install
   ```

---

## Environment Variables

Create `.env` files in both the `client` and `server` directories. Below are the typical variables you may need:

**`server/.env`**
```env
PORT=
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**`client/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> Update these values based on your actual configuration.

---

## Scripts

### Run the development servers

**Frontend (from `/client`)**
```bash
npm run dev
```

**Backend (from `/server`)**
```bash
npm run dev
```

### Build for production

**Frontend**
```bash
npm run build
npm start
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is open source. Feel free to use and modify it for your own purposes.

---

<p align="center">Made with ❤️ by <a href="https://github.com/MemonaAmirAbdulHaq">MemonaAmirAbdulHaq</a></p>
