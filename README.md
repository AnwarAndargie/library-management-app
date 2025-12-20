# miniMedia
a full‑stack media management application that organizes your images, videos, and documents in a unified dashboard. Built with a React (Vite) frontend and a Python/Flask backend, it supports user authentication, role-based dashboards, media uploads (Supabase), and an AI assistant that auto-generates metadata to improve search and discoverability.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.12-blue.svg)
![React](https://img.shields.io/badge/react-19.2-blue.svg)

## 🌟 Features

### Backend (Flask API)
- ✅ RESTful API architecture
- ✅ PostgreSQL database integration
- ✅ User authentication (registration & login)
- ✅ CRUD operations for media
- ✅ Password hashing with Werkzeug
- ✅ CORS enabled for frontend communication
- ✅ Environment-based configuration

### Frontend (React)
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ React Router for navigation
- ✅ Media management (add, view, delete)
- ✅ User authentication pages
- ✅ Real-time form validation
- ✅ Availability status indicators
- ✅ Clean, modular component architecture

## 🚀 Getting Started

### Prerequisites

- **Python 3.12+**
- **Node.js 18+** and npm
- **PostgreSQL 12+**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd miniMedia
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install flask flask-sqlalchemy flask-migrate flask-login flask-cors psycopg2-binary python-dotenv werkzeug
   ```

4. **Set up PostgreSQL database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE lms;
   CREATE USER postgres WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE lms TO postgres;
   \q
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your database password
   ```

6. **Initialize the database**
     ```python
     with app.app_context():
         db.create_all()
     ```

7. **Run the Flask server**
   ```bash
   python app.py
   ```
   Server will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will start at `http://localhost:5173`

## 🎨 Tech Stack

### Backend
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **Flask-CORS** - Cross-origin resource sharing
- **Werkzeug** - Password hashing
- **python-dotenv** - Environment management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini-media

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 📦 Dependencies

### Backend (`requirements.txt`)
```
flask==3.1.2
flask-sqlalchemy==3.1.1
flask-migrate==4.1.0
flask-login==0.6.3
flask-cors==6.0.2
psycopg2-binary==2.9.11
python-dotenv==1.2.1
werkzeug==3.1.4
```

### Frontend (`package.json`)
```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^6.x",
    "lucide-react": "^0.x",
    "tailwindcss": "^4.1.18",
    "@tailwindcss/vite": "^4.1.18"
  }
}
```

## 🧪 Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
source venv/bin/activate
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

## 📝 Code Quality

- ✅ Modular architecture
- ✅ Separation of concerns
- ✅ RESTful API design
- ✅ Environment-based configuration
- ✅ Error handling
- ✅ Clean code principles


## 📄 License

This project is licensed under the MIT License.

---
