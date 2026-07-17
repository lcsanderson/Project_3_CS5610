# Project_3_CS5610

Project 3 as described by the NEU CS 5610 Summer 2026 course

# ai usage

Claude helped a lot with authentication. I followed same patterns as professor's demo, but Claude helped a lot in linking that with the MongoDB database storing all the user info

Claude also helped a lot with managing the Cooper Hewitt API, it is managed with a tool called GraphQL which I've never heard of or used before, so Claude streamlined that process a lot for me

## Author
 
Logan Sanderson
 
## Class
 
[Web Development, Online, Summer 2026](https://johnguerra.co/classes/webDevelopment_online_summer_2026/)
 
## Screenshot
 
<!-- TODO: replace this with an actual screenshot of the running app,
     e.g. ![Home page screenshot](./screenshot.png) -->
_Screenshot coming soon._
 
## Live Demo
 
https://lcs003.onrender.com
 
## Tech Stack
 
- **Frontend:** React, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (native driver, no Mongoose)
- **Authentication:** Passport (local strategy) + express-session
- **External data source:** [Cooper Hewitt Collections API](https://apidocs.cooperhewitt.org/) (GraphQL)
## Instructions to Build and Run Locally
 
### Prerequisites
- Node.js installed
- A MongoDB database (e.g. a free MongoDB Atlas cluster)
### 1. Clone the repository
```
git clone <your repo URL>
cd <project folder>
```
 
### 2. Backend setup
```
cd backend
npm install
```
 
Create a `.env` file in the backend folder with:
```
MONGO_URI=your-mongodb-connection-string
MONGO_DB_NAME=your-database-name
SESSION_SECRET=any-long-random-string
```
 
Start the backend:
```
npm start
```
The backend runs on `http://localhost:3000`.
 
### 3. Frontend setup
In a separate terminal:
```
cd frontend
npm install
npm run dev
```
The frontend dev server runs on `http://localhost:5173`, proxying `/api`
requests to the backend.
 
### 4. Building for production
```
cd frontend
npm run build
```
This outputs a production build that the backend serves directly from
`http://localhost:3000` (no separate frontend server needed once built).
 
## License
 
This project is licensed under the MIT License — see [LICENSE](./LICENSE)
for details.