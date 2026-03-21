# Image Uploader — Full Stack Web Application
🌐 Live Demo: http://rohan07.pythonanywhere.com

A secure, full-stack web application built as a **Diploma Capstone Project** that allows registered users to upload, manage, and view images through a role-based access system.

---

## 🚀 Features

- **User Authentication** — Register, login, and logout with session-based security
- **Image Upload** — Upload JPG, PNG, GIF files (max 5MB) with validation
- **User Dashboard** — Each user sees only their own uploaded images
- **Admin Panel** — Admin can view, manage, and delete all users' images
- **CSRF Protection** — Secure form handling against cross-site attacks
- **Responsive UI** — Mobile-friendly design using Bootstrap 5

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.x, Django 4.x |
| Frontend | HTML5, CSS3, JavaScript, Bootstrap 5 |
| Database | SQLite3 |
| Authentication | Django Built-in Auth System |
| Tools | VS Code, Git |

---

## ⚙️ How to Run Locally

1. Clone the repository
   git clone https://github.com/rohanpatil5933-sudo/Image-uploader-django.git
   cd Image-uploader-django

2. Install dependencies
   pip install -r requirements.txt

3. Run database migrations
   python manage.py migrate

4. Create an admin account
   python manage.py createsuperuser

5. Start the development server
   python manage.py runserver

6. Open in browser
   http://127.0.0.1:8000

---

## 🔐 Security Features

- CSRF token protection on all forms
- Role-based access control (user vs admin)
- Users cannot access other users' images
- Session-based authentication

---

## 🌱 Future Improvements

- Cloud storage integration (AWS S3 / Cloudinary)
- REST API for mobile app support
- Image compression and cropping
- User profile management
- AI-based image tagging

---

## 👨‍💻 Developer

**Rohan Patil**
Diploma in Computer Science — Gulbarga University (2024–25)
📧 rohanpatil5933@gmail.com
🔗 github.com/rohanpatil5933-sudo
