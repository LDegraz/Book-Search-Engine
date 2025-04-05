# 📚 Book Search Engine

A full-stack MERN application that allows users to search for books via the Google Books API, sign up or log in, and save their favorite books to their account. Originally built using a RESTful API, the application has been refactored to use GraphQL with Apollo Server for improved performance and scalability.

---

## 🚀 Live Demo
👉 [View the deployed app on Render](https://book-search-engine-e6l6.onrender.com)

---

## ✅ Features
- Search for books using the Google Books API
- Create an account or log in using secure authentication
- View a personalized list of saved books
- Save books directly from the search results
- Remove saved books from your collection
- Fully integrated GraphQL API powered by Apollo Server

---

## 🛠️ Technologies Used
- **Frontend:** React, React Router, Apollo Client, Bootstrap
- **Backend:** Node.js, Express.js, Apollo Server, GraphQL
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Hosting:** Render (Frontend and Backend), MongoDB Atlas

---

## 📁 Project Structure
```
Book-Search-Engine/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
├── server/                # Express backend with Apollo Server
│   ├── models/
│   ├── schemas/
│   │   ├── resolvers.ts
│   │   └── typeDefs.ts
│   ├── auth/
│   │   └── auth.ts
│   └── server.ts
├── package.json           # Root with scripts to run both frontend/backend
```

---

## ⚙️ Installation
1. Clone the repository:
```bash
git clone git@github.com:LDegraz/Book-Search-Engine.git
cd book-search-engine
```

2. Install dependencies:
```bash
npm install
cd client && npm install
cd ../server && npm install
```

3. Create a `.env` file in the root or server directory with your MongoDB Atlas URI and JWT secret:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

4. Run the development server:
```bash
npm run develop
```

This will start both the client and server using `concurrently`.

---

## 🔧 GraphQL API Overview
### Queries
- `me`: Returns the currently logged-in user's data

### Mutations
- `login(email, password)`: Logs in an existing user
- `addUser(username, email, password)`: Creates a new user
- `saveBook(bookData)`: Saves a book to the user's profile
- `removeBook(bookId)`: Removes a book from the user's profile

---

## 🧪 Testing the App
- Run a book search with or without logging in
- Use the modal to log in or sign up
- Save books to your profile
- View saved books via the saved books tab
- Delete books from your collection

---

## 📸 Screenshots
![Book Search Engine Screenshot](../Book-Search-Engine/client/src/assets/homepage.png "Screenshot of the Book Search Engine")

---

## 📦 Deployment
- **Frontend & Backend:** Deployed on [Render](https://render.com)
- **Database:** MongoDB Atlas

---

## 📄 License
This project is licensed under the MIT License.

---

✍️ Contributors

- [Lauren DeGrazia](https://github.com/LDegraz/Book-Search-Engine.git)- Project Creator
- Xpert Learning Assistant - The AI Learning Assistant for support and guidance throughout the bootcamp
- Rutgers Bootcamp for starter code
- Lesley Vaden- T.A., providing guidance and support throughout the assignment
- Kevin Ferguson- Instructor, providing guidance and support throughout the assignment

📨 Contact

If you have any questions, feel free to reach out!
- **GitHub:** [LDeGraz](https://github.com/LDegraz)
- **Email:** [degrazial3@gmail.com](mailto:degrazial3@gmail.com)

### How to Contact

You can contact me via email for any inquiries or feedback regarding this project. Alternatively, you can open an issue on GitHub if you encounter any problems or have suggestions for improvements. I will do my best to respond promptly!

