# CivicLens – Smart Civic Issue Reporting Platform

CivicLens is a full-stack web application designed to improve civic issue reporting and resolution by providing a centralized, transparent, and location-aware platform for citizens and municipal authorities.

The platform enables users to report public issues such as road damage, garbage overflow, and water leakage with image proof and live location data, while allowing administrators to monitor, manage, and resolve issues efficiently through a secure dashboard.


##  Problem Statement

In many cities, civic issues are:
- Reported through scattered channels
- Lacking proper location or image proof
- Difficult to track or follow up
- Poorly monitored by authorities

This results in delayed responses and lack of accountability.



##  Solution Overview

CivicLens solves this problem by providing:
- A **single platform** for reporting civic issues
- **Live GPS-based location tagging** for accurate issue identification
- **Image upload** for better verification
- **Role-based access** for users and administrators
- **Real-time status tracking** (Pending → Resolved)
- An **admin dashboard** for monitoring and analytics



##  User Roles

### 1. User (Citizen)
- Registers and logs in to the platform
- Reports civic issues with description, category, image, and live location
- Views the status of all reported issues

### 2. Admin (Municipality Authority)
- Logs in using pre-created admin credentials
- Views all reported issues
- Accesses analytics and map-based visualizations
- Marks issues as resolved



## Key Features

- User registration and login system
- Secure authentication using JSON Web Tokens (JWT)
- Role-based access control (User / Admin)
- Issue reporting with image upload
- Automatic live GPS location capture during issue reporting
- Issue status tracking (Pending / Resolved)
- Admin dashboard with statistics and map visualization
- RESTful backend APIs with proper validation



## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Browser Geolocation API

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (for image upload)

### Database
- MongoDB
- Mongoose ODM



##  Project Structure

civiclens/
│
├── client/ # React frontend
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── App.js
│
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── uploads/ # Uploaded images
│ └── server.js
│
└── README.md



##  Authentication & Security (JWT Explained)

CivicLens uses **JSON Web Tokens (JWT)** for secure authentication.

### How it works:
1. User logs in with email and password
2. Backend verifies credentials
3. A JWT token is generated and sent to the frontend
4. The token is stored securely in the browser
5. For protected routes, the token is sent in request headers
6. Backend middleware verifies the token before allowing access

This ensures:
- Secure communication
- No unauthorized access
- Role-based route protection (Admin vs User)



##  Location Handling (Real-World Design)

- User location is **not collected during registration**
- Live GPS location is captured **only when reporting an issue**
- This ensures each issue is tagged with its exact real-world location
- The location is stored in the database and visualized on a map

This design mirrors real applications like Google Maps and civic grievance portals.



##  Image Upload Flow

- Users upload an image while reporting an issue
- Images are stored on the server using Multer
- Image paths are saved in MongoDB
- Both users and admins can view the images in the dashboard



##  Frontend–Backend Integration

- Frontend sends requests using Axios
- Backend exposes REST APIs for authentication and issue management
- JWT tokens are attached to protected requests
- Backend validates requests and interacts with MongoDB
- Responses are displayed dynamically in the frontend UI

This ensures a seamless full-stack workflow.



##  How to Run the Project Locally

### Backend
bash
cd server
npm install
npm run dev
Frontend
cd client
npm install
npm start


Open the app in the browser at:

http://localhost:3000

## Future Enhancements

Email notifications for issue status updates

Ward or zone-based filtering

Cloud deployment

Mobile app version

User comments on issues

## Learning Outcomes

This project demonstrates:

Full-stack application development

Secure authentication and authorization

REST API design

Database modeling

Real-world problem solving

Frontend–backend integration

Debugging and system thinking

## Conclusion

CivicLens is a practical, real-world, and internship-ready project that showcases strong fundamentals in full-stack development and system design. It reflects industry-level practices and can be extended further for production use.





