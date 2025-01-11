# nextAuth

A comprehensive Next.js authentication application with MongoDB integration, JWT-based authentication, and secure user management features.

## Features

- User signup and login functionality.
- JWT-based authentication and authorization.
- Email verification for new users.
- Secure password hashing using bcrypt.
- Protected routes for authenticated users.
- Easy-to-use API routes built with Next.js.
- Logout functionality with token invalidation.

---

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Libraries Used**:
  - `axios` for making HTTP requests.
  - `bcrypt` for password hashing.
  - `jsonwebtoken` for token-based authentication.
  - `mongoose` for MongoDB object modeling.
  - `react-hot-toast` for notification handling.
  - `tailwindcss` for styling.

---

## Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (Local or hosted instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LikhithPalya/nextAuth.git
   cd nextAuth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=<your_mongodb_connection_string>
   TOKEN_SECRET=<your_jwt_secret>
   DOMAIN=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Authentication

1. **Signup**:  
   `POST /api/users/signup`  
   Body: `{ username, email, password }`

2. **Login**:  
   `POST /api/users/login`  
   Body: `{ email, password }`

3. **Verify Email**:  
   `POST /api/users/verifyemail`  
   Body: `{ token }`

4. **Logout**:  
   `GET /api/users/logout`

5. **Get User Profile**:  
   `GET /api/users/user-profile`  
   (Protected route)

---

## Folder Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── users/
│   │   │   │   ├── signup/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   └── user-profile/
│   ├── components/
│   ├── db/
│   │   ├── db.connect.ts
│   ├── helper/
│   │   ├── GetDataFromToken.ts
│   ├── models/
│   │   ├── user.model.ts
├── styles/
├── .env.local
├── package.json
└── README.md
```

---

## Future Enhancements

- Add OAuth support for third-party providers (Google, Facebook, etc.).
- Implement user role-based authorization.
- Add forgot password and reset password functionality.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- Author: **Likhith Palya**  
- GitHub: [https://github.com/LikhithPalya](https://github.com/LikhithPalya)

