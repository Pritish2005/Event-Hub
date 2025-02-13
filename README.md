---

# EventHub - Event Management System 🎉

EventHub is a full-stack event management application that allows users to create, manage, and view events. It includes features like user authentication, event creation, event filtering, and a responsive UI. Built with React, React Router, and Tailwind CSS for the frontend, and a Node.js/Express backend.

---

## Features ✨

### 1. **User Authentication**
   - **Login/Signup**: Users can create an account or log in to access protected features.
   - **Protected Routes**: Certain routes (e.g., Create Event, My Events) are only accessible to authenticated users.
   - **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).

### 2. **Event Management**
   - **Create Events**: Authenticated users can create new events with details like name, description, date, location, and attendee limit.
   - **View Events**: Users can view all events in a clean, responsive dashboard.
   - **Filter Events**: Events can be filtered by:
     - **Upcoming Events**: Events that are yet to occur.
     - **Past Events**: Events that have already taken place.
   - **Sort Events**: Events can be sorted alphabetically (A-Z or Z-A).

### 3. **My Events**
   - **Personalized Dashboard**: Authenticated users can view events they’ve created.
   - **Edit Events**: Users can update event details.
   - **Delete Events**: Users can remove events they no longer need.

### 4. **Responsive UI**
   - **Mobile-Friendly**: The application is fully responsive and works seamlessly on all devices.
   - **Modern Design**: Built with Tailwind CSS for a clean and professional look.
   - **Color Scheme**: Uses a consistent color palette (`#B82132`, `#D2665A`, `#F2B28C`, `#F6DED8`) for a cohesive design.

### 5. **Pagination**
   - **Event List Pagination**: Events are paginated for better performance and usability.

---

## Tech Stack 🛠️

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For client-side routing.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: A JavaScript runtime for the backend.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing events and user data.
- **JWT**: For secure user authentication.

---

## Installation and Setup 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (for the database)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/EventHub.git
   cd EventHub
   ```

2. **Install Dependencies**:
   - Frontend:
     ```bash
     cd client
     npm install
     ```
   - Backend:
     ```bash
     cd server
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory and add the following:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/eventhub
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Backend**:
   ```bash
   cd server
   npm start
   ```

5. **Run the Frontend**:
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

---

Enjoy using **EventHub**! 🎉
