# GoMobile AI Tire Check Assistant

## Overview

GoMobile AI Tire Check Assistant is a full-stack web application that helps users receive quick safety recommendations for tire-related issues using Google's Gemini AI.

Users can enter a description of a tire problem through a simple web interface. The application sends the request to a Node.js and Express backend, which securely communicates with the Gemini API and returns AI-generated advice to the user.

This project demonstrates full-stack development concepts including REST API development, frontend-backend communication, API integration, asynchronous programming, environment variable management, and error handling.

---

## Features

- AI-powered tire issue analysis
- User-friendly web interface
- RESTful API built with Express.js
- Secure API key management using environment variables
- Input validation and error handling
- Frontend-backend communication using Fetch API
- Integration with Google's Gemini AI model

---

## Tech Stack

### Frontend
- HTML5
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js

### AI Integration
- Google Gemini API
- @google/genai SDK

### Additional Packages
- dotenv
- cors

---

## Project Architecture

```text
User Interface (HTML + JavaScript)
            |
            v
     Fetch API Request
            |
            v
     Express.js Backend
            |
            v
      Gemini AI API
            |
            v
   AI Generated Advice
            |
            v
      Display to User
```

---

## How It Works

### 1. User Enters a Tire Issue

The user types a tire-related issue into the text area.

Example:

```text
My tire pressure warning light came on while driving.
```

### 2. Frontend Sends Request

When the user clicks the button, JavaScript sends a POST request to the backend.

```javascript
const response = await fetch(
  "http://localhost:3000/api/tire-check",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      issueDescription: text
    })
  }
);
```

### 3. Backend Receives Request

The Express server receives the request through the following endpoint:

```javascript
app.post('/api/tire-check', async (req, res) => {
```

The request body is extracted using:

```javascript
const { issueDescription } = req.body;
```

### 4. Input Validation

The server checks whether the user provided an issue description.

```javascript
if (!issueDescription) {
  return res.status(400).json({
    error: "Please describe the tire issue."
  });
}
```

### 5. Gemini AI Processes the Request

The backend securely initializes the Google GenAI SDK using an environment variable.

```javascript
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
```

The application sends the issue description to Gemini AI.

```javascript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `You are a GoMobile expert mechanic.
  A customer reports: "${issueDescription}".
  Provide 2 quick safety steps and the specific tools needed.
  Keep it short.`
});
```

### 6. Backend Returns the Response

The AI-generated advice is returned to the frontend.

```javascript
return res.status(200).json({
  advice: response.text
});
```

### 7. Frontend Displays the Advice

The response is displayed to the user.

```javascript
document.getElementById("reply").innerText =
  result.advice;
```

---

## API Documentation

### POST /api/tire-check

#### Request Body

```json
{
  "issueDescription": "My tire pressure warning light is on."
}
```

#### Success Response

```json
{
  "advice": "Check tire pressure immediately and inspect for visible damage. Tools needed: tire pressure gauge and air compressor."
}
```

#### Error Response

```json
{
  "error": "Please describe the tire issue."
}
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/gomobile-ai-tire-assistant.git
cd gomobile-ai-tire-assistant
```

### Initialize the Project

```bash
npm init -y
```

### Install Dependencies

```bash
npm install express dotenv cors @google/genai
```

### Configure package.json

Add the following line:

```json
"type": "module"
```

### Create Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

### Start the Server

```bash
node server.js
```

Expected output:

```text
Server running smoothly on port 3000
```

---

## Frontend Interface

The frontend consists of:

- Text area for entering tire issues
- Submit button
- Dynamic response area

The application communicates with the backend using the Fetch API and displays AI-generated recommendations without refreshing the page.

---

## Security Measures

### Environment Variables

API keys are stored securely in a `.env` file instead of being hardcoded.

### Input Validation

The application validates incoming requests before processing.

### Error Handling

The backend uses try/catch blocks to prevent crashes and provide meaningful error responses.

### .gitignore

```gitignore
node_modules/
.env
```

---

## Concepts Demonstrated

- Full Stack Development
- REST API Design
- Express.js
- Node.js
- Async/Await
- JSON Data Handling
- Frontend-Backend Communication
- Third-Party API Integration
- Environment Variable Management
- Error Handling
- Input Validation
- AI Application Development

---

## Future Improvements

- React Frontend
- MongoDB Integration
- User Authentication
- Request History Tracking
- Cloud Deployment
- Vehicle Service Recommendations
- Admin Dashboard

---

## Author

Developed as a learning project to explore Full Stack Software Engineering, REST APIs, and AI-powered applications using Node.js, Express.js, and Google's Gemini AI.
