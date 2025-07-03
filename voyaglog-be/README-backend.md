Travel Blog API

This is the backend server for the Travel Blog application built with Express.js, Sequelize (PostgreSQL), and JWT authentication.

---

Table of Contents

- Setup
- Environment Variables
- Running the Server
- API Routes
  - User Routes
  - Post Routes
  - Auth Routes
- Authentication
- File Uploads
- Error Handling
- Static Files

---

Setup

1. Clone the repository:

   git clone <your-repo-url>
   cd <your-repo-directory>

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory with the following variables:

   DB_URL=postgres://user:password@host:port/database
   JWT_SECRET=your_jwt_secret_key
   PORT=8080
   NODE_ENV=development

4. Make sure PostgreSQL is running and accessible with your `DB_URL`.

---

Running the Server

Start the server with:

npm start

The API will be available at `http://localhost:8080`.

---

API Routes

User Routes (/api/users)

Method | Endpoint       | Description            | Authentication
-------|----------------|------------------------|----------------
GET    | /api/users     | Get all users          | No
GET    | /api/users/:id | Get user by ID         | No
POST   | /api/users     | Create a new user      | No
PUT    | /api/users/:id | Update user by ID      | No
DELETE | /api/users/:id | Delete user by ID      | No

---

Post Routes (/api/posts)

Method | Endpoint           | Description                    | Authentication
-------|--------------------|-------------------------------|----------------
GET    | /api/posts         | Get all posts                 | No
GET    | /api/posts/my-posts| Get posts of logged-in user    | Yes
GET    | /api/posts/:id     | Get post by ID                | No
POST   | /api/posts         | Create a new post             | Yes
PUT    | /api/posts/:id     | Update a post by ID           | Yes
DELETE | /api/posts/:id     | Delete a post by ID           | Yes

---

Auth Routes (/api/auth)

Method | Endpoint          | Description              | Authentication
-------|-------------------|--------------------------|---------------
POST   | /api/auth/signup  | Register a new user      | No
POST   | /api/auth/login   | Log in a user            | No
GET    | /api/auth/profile | Get current user profile | Yes
POST   | /api/auth/logout  | Log out a user           | No

---

Authentication

- Protected routes require a valid JSON Web Token (JWT).
- Send the token in the Authorization header as:

  Authorization: Bearer <your_token_here>

- Alternatively, the server supports JWT in cookies.

---

File Uploads

- Posts can include an image upload.
- Use multipart/form-data with the field name `image` when creating or updating a post.

---

Error Handling

- Errors are returned as JSON with structure:

  {
    "success": false,
    "message": "Error message here"
  }

---

Static Files

- Uploaded images are served statically at:

  http://localhost:8080/uploads/<filename>

---

Example Usage (Frontend)

Fetch all posts

fetch('http://localhost:8080/api/posts')
  .then(res => res.json())
  .then(data => console.log(data));

Login

fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identifier: 'user@example.com', password: 'password123' }),
})
  .then(res => res.json())
  .then(data => {
    // save JWT token for authenticated requests
    localStorage.setItem('token', data.token);
  });

Authenticated request example (get my posts)

const token = localStorage.getItem('token');

fetch('http://localhost:8080/api/posts/my-posts', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then(data => console.log(data));

---

If you have questions or want help with frontend integration, just ask!

---

Happy coding! 🚀
