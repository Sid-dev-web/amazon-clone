# Amazon Clone

A full-stack e-commerce web application replicating core Amazon functionalities. 

## 🚀 Tech Stack
* **Frontend:** React.js, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose

## ✨ Features (In Progress)
* RESTful API architecture
* Cloud database integration
* Dynamic product fetching
* (More to come: User Authentication, Cart Management, Checkout)

## 🗄️ Database Design
* **Products Collection:** Stores item details, pricing, categories, and image URLs.
* *(Future collections for Users and Orders will be documented here)*

## 🛠️ Local Setup Instructions

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/Sid-dev-web/amazon-clone.git
cd amazon-clone
\`\`\`

**2. Setup the Backend**
\`\`\`bash
cd server
npm install
\`\`\`
* Create a `.env` file in the `server` directory and add your MongoDB URI:
  `MONGO_URI=your_mongodb_connection_string`
* Start the server:
\`\`\`bash
node server.js
\`\`\`

**3. Setup the Frontend**
\`\`\`bash
cd ../client
npm install
npm run dev
\`\`\`