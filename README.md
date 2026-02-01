# LinkedIn-Type App - API Documentation

Hey there! Welcome to the documentation for this LinkedIn-inspired social media app. This is a basic CRUD (Create, Read, Update, Delete) application built with **TypeScript** and follows **Object-Oriented Programming (OOP)** principles throughout.

## What's This App About?

This is a simple social networking app where users can register, log in, and create posts - kind of like LinkedIn but way simpler! The whole codebase is written in TypeScript using classes and OOP concepts to keep things organized and maintainable.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: OOP - everything is organized in classes (Controllers, Services, Routes, Models)

## How It Works

The app follows a clean OOP structure:
- **Models**: Define how data looks in the database
- **Services**: Handle all the business logic
- **Controllers**: Deal with HTTP requests and responses
- **Routes**: Map URLs to controller methods
- **Middlewares**: Check if users are logged in

## Base URL

```
http://localhost:3000
```

---

## Authentication Routes

All authentication-related stuff lives under `/auth`. These routes help users sign up, log in, and manage their accounts.

### 1. Register a New User

**POST** `/auth/register`

This is where new users create their accounts. Just send an email and password!

**What you need to send:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**What you get back:**
```json
{
  "message": "User registered successfully",
  "userId": "some-random-user-id"
}
```

**Notes:** 
- Email must be unique (no duplicates allowed!)
- Password gets hashed automatically for security
- No authentication needed for this route

---

### 2. Login

**POST** `/auth/login`

Already have an account? Log in here to get your access token!

**What you need to send:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**What you get back:**
```json
{
  "message": "Login successful",
  "token": "your-jwt-token-here",
  "userId": "your-user-id"
}
```

**Notes:**
- Keep that token! You'll need it for protected routes
- Add it to your requests like this: `Authorization: Bearer your-token-here`

---

### 3. Get All Users

**GET** `/auth/users`

Want to see all registered users? This route shows everyone!

**What you need to send:**
Nothing! Just hit the endpoint.

**What you get back:**
```json
{
  "users": [
    {
      "_id": "user-id-1",
      "email": "john@example.com",
      "createdAt": "2026-01-15T10:30:00.000Z",
      "updatedAt": "2026-01-15T10:30:00.000Z"
    },
    {
      "_id": "user-id-2",
      "email": "jane@example.com",
      "createdAt": "2026-01-16T11:20:00.000Z",
      "updatedAt": "2026-01-16T11:20:00.000Z"
    }
  ]
}
```

**Notes:**
- Public route - no authentication needed
- Passwords are NOT included (security first!)

---

### 4. Get User By ID

**GET** `/auth/users/:userId`

Need info about a specific user? Use their ID to fetch their details.

**Example:**
```
GET /auth/users/697f570862bae9bab8d93d59
```

**What you get back:**
```json
{
  "user": {
    "_id": "697f570862bae9bab8d93d59",
    "email": "john@example.com",
    "createdAt": "2026-01-15T10:30:00.000Z",
    "updatedAt": "2026-01-15T10:30:00.000Z"
  }
}
```

**Notes:**
- No authentication needed
- If user doesn't exist, you'll get a 404 error

---

### 5. Update Password

**PUT** `/auth/update-password`

🔒 **Protected Route** - You must be logged in!

Want to change your password? This is the place!

**Headers needed:**
```
Authorization: Bearer your-jwt-token
```

**What you need to send:**
```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}
```

**What you get back:**
```json
{
  "message": "Password updated successfully"
}
```

**Notes:**
- You must provide your current password (for security)
- New password gets hashed automatically
- Only updates YOUR password (can't change others!)

---

### 6. Delete User

**DELETE** `/auth/delete`

🔒 **Protected Route** - You must be logged in!

Sad to see you go! This permanently deletes your account.

**Headers needed:**
```
Authorization: Bearer your-jwt-token
```

**What you need to send:**
```json
{
  "password": "password123"
}
```

**What you get back:**
```json
{
  "message": "User deleted successfully"
}
```

**Notes:**
- Must confirm with your password
- This action cannot be undone!
- Deletes YOUR account only

---

## Post Routes

All post-related functionality lives under `/posts`. Create, read, update, and delete posts here!

### 7. Create a Post

**POST** `/posts`

🔒 **Protected Route** - You must be logged in!

Share your thoughts with the world! Create a new post.

**Headers needed:**
```
Authorization: Bearer your-jwt-token
```

**What you need to send:**
```json
{
  "content": "Just learned TypeScript! Loving OOP so far 🚀"
}
```

**What you get back:**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "post-id-here",
    "userId": "your-user-id",
    "content": "Just learned TypeScript! Loving OOP so far 🚀",
    "createdAt": "2026-02-01T14:20:00.000Z",
    "updatedAt": "2026-02-01T14:20:00.000Z"
  }
}
```

**Notes:**
- Post automatically linked to your user ID
- Content cannot be empty

---

### 8. Get All Posts

**GET** `/posts`

See what everyone's posting! Fetches all posts from all users.

**What you need to send:**
Nothing!

**What you get back:**
```json
{
  "posts": [
    {
      "_id": "post-id-1",
      "userId": "user-id-1",
      "content": "Hello world!",
      "createdAt": "2026-02-01T10:00:00.000Z",
      "updatedAt": "2026-02-01T10:00:00.000Z"
    },
    {
      "_id": "post-id-2",
      "userId": "user-id-2",
      "content": "TypeScript is awesome!",
      "createdAt": "2026-02-01T11:30:00.000Z",
      "updatedAt": "2026-02-01T11:30:00.000Z"
    }
  ]
}
```

**Notes:**
- Public route - no login needed
- Shows posts from all users

---

### 9. Get Posts by User

**GET** `/posts/user/:userId`

Want to see all posts from a specific user? This is your route!

**Example:**
```
GET /posts/user/697f570862bae9bab8d93d59
```

**What you get back:**
```json
{
  "posts": [
    {
      "_id": "post-id-1",
      "userId": "697f570862bae9bab8d93d59",
      "content": "My first post!",
      "createdAt": "2026-02-01T10:00:00.000Z",
      "updatedAt": "2026-02-01T10:00:00.000Z"
    }
  ]
}
```

**Notes:**
- Public route
- Returns empty array if user has no posts

---

### 10. Get Single Post

**GET** `/posts/:postId`

Need details about a specific post? Fetch it by its ID!

**Example:**
```
GET /posts/697f570862bae9bab8d93d59
```

**What you get back:**
```json
{
  "post": {
    "_id": "697f570862bae9bab8d93d59",
    "userId": "some-user-id",
    "content": "This is the post content",
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-01T10:00:00.000Z"
  }
}
```

**Notes:**
- Public route
- Returns 404 if post doesn't exist

---

### 11. Update a Post

**PUT** `/posts/:postId`

🔒 **Protected Route** - You must be logged in!

Made a typo? Want to edit your post? Update it here!

**Headers needed:**
```
Authorization: Bearer your-jwt-token
```

**Example:**
```
PUT /posts/697f570862bae9bab8d93d59
```

**What you need to send:**
```json
{
  "content": "Updated content here!"
}
```

**What you get back:**
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "697f570862bae9bab8d93d59",
    "userId": "your-user-id",
    "content": "Updated content here!",
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-01T14:30:00.000Z"
  }
}
```

**Notes:**
- You can only update YOUR OWN posts
- Content cannot be empty

---

### 12. Delete a Post

**DELETE** `/posts/:postId`

🔒 **Protected Route** - You must be logged in!

Regret posting something? Delete it permanently!

**Headers needed:**
```
Authorization: Bearer your-jwt-token
```

**Example:**
```
DELETE /posts/697f570862bae9bab8d93d59
```

**What you get back:**
```json
{
  "message": "Post deleted successfully"
}
```

**Notes:**
- You can only delete YOUR OWN posts
- This action cannot be undone!

---

## Error Handling

When things go wrong, you'll get helpful error messages:

```json
{
  "message": "Something went wrong",
  "error": "Detailed error description"
}
```

Common error codes:
- **400**: Bad request (missing or invalid data)
- **401**: Unauthorized (need to log in or token expired)
- **403**: Forbidden (trying to access/modify someone else's data)
- **404**: Not found (user/post doesn't exist)
- **500**: Server error (something broke on our end)

---

## OOP Architecture

This app is built with TypeScript classes throughout:

**Models** (Classes extending Mongoose Schema)
- `User.model.ts` - User data structure
- `Post.model.ts` - Post data structure

**Services** (Business Logic Classes)
- `Auth.service.ts` - Handles user registration, login, password updates
- `Post.service.ts` - Manages post creation, updates, deletion

**Controllers** (Request Handler Classes)
- `Auth.controller.ts` - HTTP handlers for auth routes
- `Post.controller.ts` - HTTP handlers for post routes

**Routes** (Route Definition Classes)
- `AuthRoutes` - Defines all /auth endpoints
- `PostRoutes` - Defines all /posts endpoints

**Middlewares** (Protection Classes)
- `AuthMiddleware` - Verifies JWT tokens

Everything is instantiated as classes and follows OOP principles like encapsulation, single responsibility, and dependency injection!

---

## Quick Start

1. Make sure MongoDB is running
2. Create a `.env` file with your MongoDB connection string and JWT secret
3. Run `npm install`
4. Run `npm run dev`
5. Server starts on `http://localhost:3000`

Happy coding! 🚀
