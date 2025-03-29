# Project Documentation

## Introduction
This document provides instructions on how to set up and run the application.

## Creating a Vite App
Create a Vite app by running the following command in your Terminal or Command Prompt:
      npm create vite@latest my-react-app --template react

- The first time, you won't have Vite installed. Type `y` to proceed. Then you'll be asked to select a framework. Use your down arrow to select `React`.

- You'll be asked to select a variant, select `Javascript`.

## Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **MongoDB Compass** (For database management)

## Installation
1. Navigate to the project directory:
   <br>
      ``` cd "Project Todo" ```
    
3. Install dependencies:
   <br>
       ``` npm install ```
    

## Running the Application
### Start the Backend Server
Run the following command to start the backend server:
<br>
      ``` npm run server ```

### Start the Frontend
Run the following command to start the frontend:
<br>
     ``` npm run dev ```

## Directory Structure
<pre> <code>
.
├── .env                 # Environment variables
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
├── server.js            # Backend server file
├── vite.config.js       # Vite configuration
├── public/              # Static assets (CSS file)
├── src/                 # Frontend source code
└── ...
</pre></code>

## Additional Notes
- Ensure MongoDB is running before starting the backend.
- If you encounter dependency issues, try deleting `node_modules` and `package-lock.json`, then reinstall dependencies:
      rm -rf node_modules package-lock.json
      npm install
