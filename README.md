# 📝 Blog Platform API

A secure and scalable **RESTful API** for a blogging platform, built with **Node.js, Express, and MongoDB**.  
It provides **authentication, role-based access control, and CRUD operations for posts and comments**.  
Designed with best practices for **security, maintainability, and deployment on Render**.

---

## 🚀 Features
- 🔐 **User Authentication** with JWT  
- 👥 **Role-based Access Control** (Admin & User)  
- 📝 CRUD operations for **Posts**  
- 💬 Nested **Comments** system  
- ⚡ Security features: Helmet, Rate Limiting, CORS  
- ☁️ Deployment-ready on **Render + MongoDB Atlas**

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT  
- **Security**: Helmet, Rate Limiter, CORS  
- **Logging**: Morgan  

---

## 📡 Example Endpoints
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → User login + JWT token  
- `GET /api/posts` → Get all blog posts  
- `POST /api/posts` → Create new post (auth required)  
- `POST /api/comments/:id` → Add comment to a post  

---

## ⚙️ Setup
```bash
# Clone repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Environment variables (.env)
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CORS_ORIGIN=*

# Run server
npm start


🌍 Deployment

Backend: Render
Database: MongoDB Atlas

👨‍💻 Author

Built with ❤️ by Emmanuel Maurice