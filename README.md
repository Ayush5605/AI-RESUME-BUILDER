# AI Resume Builder

An AI-powered Resume Builder web application that enables users to create, customize, preview, and download professional resumes with multiple templates and AI-assisted content generation.

## Features

* User Authentication using JWT
* Secure Password Hashing with bcryptjs
* Create and Edit Resumes
* Multiple Resume Templates
* Real-time Resume Preview
* Color Theme Customization
* AI-powered Professional Summary Generation
* Education, Experience, Projects, and Skills Management
* Download Resume as PDF
* Responsive UI

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* dotenv

## Project Structure

```text
AI_Resume_Builder/
│
├── Client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── Server/
│   ├── Controller/
│   ├── Model/
│   ├── Routes/
│   ├── Middleware/
│   ├── Config/
│   ├── server.js
│   └── .env
│
└── README.md
```

## Environment Variables

Create a `.env` file inside the Server folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Installation

### Clone the Repository

```bash
git clone <your-github-url>
cd AI_Resume_Builder
```

### Backend Setup

```bash
cd Server

npm install

npm run start
```

### Frontend Setup

```bash
cd Client

npm install

npm run dev
```

## API Endpoints

### Authentication

#### Register User

```http
POST /api/users/register
```

Request Body:

```json
{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"123456"
}
```

#### Login User

```http
POST /api/users/login
```

## Screenshots

Add screenshots of:

* Home Page
* Authentication Page
* Resume Builder
* Template Selection
* Resume Preview

## Future Enhancements

* AI Resume Suggestions
* Resume Score Analyzer
* ATS Compatibility Checker
* Share Resume using Public Link
* Drag and Drop Sections
* Multiple Export Formats

## Author

Ayush Auti

Third Year Computer Engineering Student

MERN Stack Developer | AI/ML Enthusiast

## License

This project is licensed under the MIT License.
