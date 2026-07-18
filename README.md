# Project_3_CS5610

Project 3 as described by the NEU CS 5610 Summer 2026 course. Important note about this app is that it is super ugly on purpose,
I prioritized making the app functional over beautiful because I noticed that Project 4 is intended to be an iteration on this 
project but with an eye for design, user experience, and other important updates currently missing.

## Author
 
Logan Sanderson

## Class
 
[Web Development, Online, Summer 2026](https://johnguerra.co/classes/webDevelopment_online_summer_2026/)

# ai usage

Claude helped a lot with authentication. I followed same patterns as professor's demo, but Claude helped a lot in linking that with the MongoDB database storing all the user info

Claude also helped a lot with managing the Cooper Hewitt API, it is managed with a tool called GraphQL which I've never heard of or used before, so Claude streamlined that process a lot for me.  
 
## Screenshot
 
![image info](./Screenshot.png)
 
## Live Demo
 
https://lcs003.onrender.com
 
## Tech Stack
 
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB (native driver, no Mongoose)
- **Authentication:** Passport (local strategy) + express-session
- **External data source:** [Cooper Hewitt Collections API](https://apidocs.cooperhewitt.org/) (GraphQL)
## Instructions to Build and Run Locally
 
### Prerequisites
- Node.js installed
- A MongoDB database (e.g. a free MongoDB Atlas cluster)
 
### 1. Backend setup
```
npm install
```
 
Start the backend:
```
npm start
```
The backend runs on `http://localhost:3000`.
 
### 2. Frontend setup
In a separate terminal:
```
cd FRONTEND
npm install
npm run dev
```
The frontend dev server runs on `http://localhost:5173`, proxying `/api`
requests to the backend.
 
### 3. Building for production
```
cd FRONTNED
npm run build
```
This outputs a production build that the backend serves directly from
`http://localhost:3000` (no separate frontend server needed once built).
 
## License
 
This project is licensed under the MIT License — see [LICENSE](./LICENSE)
for details.