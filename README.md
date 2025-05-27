# Code Sharing App - NoteCode

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge&logo=vercel)]([https://your-demo-link.vercel.app](https://coding-sharing-master.vercel.app/))

This project is a solution to the **Code Sharing App** challenge from [DevChallenges](https://devchallenges.io/challenge/code-shraing-app-note-code). It’s a full-stack web application that enables users to create, save, and share code snippets easily.

## 🚀 Project Overview

- **Purpose:**  
  Build a simple but functional code-sharing app where users can write code snippets, save them with a unique ID, and share them via a link.

- **Core Features:**  
  - Load a default HTML snippet in the code editor on initial load.  
  - Users can write or edit code snippets in multiple languages with selectable themes.  
  - The **Share** button generates a unique ID, saves the snippet, and disables itself until the user edits the code again.  
  - Snippets can be accessed and loaded via their unique URLs.  
  - Responsive design to support all devices.

- **Technical Highlights:**  
  - Frontend built with React, using a powerful code editor component (such as Monaco Editor).  
  - Backend implemented as serverless API routes on Vercel.  
  - MongoDB Atlas used for storing snippets and generating unique snippet IDs using MongoDB’s built-in ObjectIDs.  
  - State management handled with React hooks (`useState`, `useEffect`).  
  - Styling through CSS with responsiveness ensured via media queries.


## ✨ Features

- Create and save code snippets with syntax highlighting  
- Share snippets via unique URLs  
- Responsive and user-friendly interface  

## 🛠️ Technologies Used

- Frontend: React.js  
- Backend: Serverless API routes on Vercel  
- Database: MongoDB Atlas  
- Deployment: Vercel  

## ⚙️ Getting Started

### Prerequisites

- Node.js (version X.X.X or later)  
- npm or yarn  
- MongoDB Atlas account and connection string  
- Vercel CLI installed (`npm i -g vercel`)  

### Installation

1. Clone the repository:

       git clone https://github.com/Shishwami/coding-sharing-master.git
       cd coding-sharing-master

2. Install dependencies:

       npm install
       # or
       yarn install

3. Create a `.env` file in the root directory and add your environment variables:

       MONGODB_URI=your-mongodb-atlas-connection-string
       DB_NAME=codeSharing
       COLLECTION=snippets

4. Run the development server with Vercel CLI:

       vercel dev

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📡 API Routes

This app uses serverless API routes on Vercel for backend logic, such as:

- `POST /api/snippets` — Save a new snippet  
- `GET /api/snippets/:id` — Retrieve a snippet by ID  

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License.
