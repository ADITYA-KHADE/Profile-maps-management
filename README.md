# Profile Map Management system

## Overview

The **Profile Map Management system** is a full-stack solution designed to efficiently manage and allows users to view a list of profiles and interactively explore the addresses of each profile on a map. The application aims to provide an intuitive and user-friendly way to navigate through profiles and visualise the geographic locations associated with each individual.

### Key Components:
- **Frontend**: Developed using React and Material UI (MUI) to provide a responsive and interactive user interface.
- **Backend**: Utilizes Node.js and Express to create robust API endpoints for CRUD operations on product data.
- **Database**: Employs MongoDB to store and manage product information efficiently.

## Features
- **Interactive Mapping**: Incorporate an interactive map component that can dynamically display addresses based on user interactions. This map will allow users to see the geographical location associated with each profile.
- **Profile Data Management** : Allow administrators to add, edit, or delete
profiles.
- **Search and Filter Functionality** : Provide users with the ability to search and
filter profiles based on different criteria, such as name, location, or other
attributes. This enhances the usability of the application.
- **Material UI Integration**: Ensures a consistent and modern design across the application.
- **Pagination**: Improves user experience by displaying product data in manageable chunks, especially useful for large catalogs.

## Major Technical Decisions

1. **Frontend Library**: React was selected for its component-based architecture and excellent performance. Material UI was chosen to provide a modern, consistent, and easily customizable design system.
2. **Backend Framework**: Express.js was implemented as it offers a minimal and flexible framework for building RESTful APIs, facilitating rapid development of the backend services.
3. **Database Selection**: MongoDB was chosen for its schema flexibility and efficient handling of JSON-like data structures, which is ideal for storing varied product information.
4. **Environment Management**: A `.env` file is utilized to securely manage environment variables such as database connection strings and server ports.
5. **Build Process**: A streamlined build process was implemented, allowing both frontend and backend to be set up with a single command (`npm run build`), ensuring a seamless deployment pipeline.

## Challenges and Solutions

### 1. Product Filtering and Sorting
- **Challenge**: Implementing effective filtering and sorting of products on the frontend while ensuring it integrates correctly with the backend data.
- **Solution**: Leveraged Material UI's Table component and implemented server-side filtering and sorting algorithms. The backend API was enhanced to accept query parameters (such as category, price range, sort order) and respond with appropriately filtered and sorted product data.
### 2. Map Integration
- **Challenge**: Integrating an interactive map that can display multiple addresses and handle user interactions.
- **Solution**: Utilized Google Maps JavaScript API for its robust features and ease of integration. Implemented a custom map component that can handle multiple markers and user interactions.
### 3. Responsive Design
- **Challenge**: Ensuring the application's UI is responsive and visually appealing across various devices and screen sizes.
- **Solution**: Employed Material UI's responsive design principles and implemented custom CSS to fine-tun the layout for different screen sizes.


## Mongodb schema
```javascript
const mongoose = require('mongoose');

const ProfileModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true },
  coordinates: { type: [Number], required: true },
},
{
  timestamps: true,
}
);

const ProfileModel = mongoose.model('Profile', ProfileModelSchema)

module.exports = ProfileModel

```

```javascript
const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserModelSchema);

module.exports = UserModel;

```



## Setup Instructions

### 1. Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/ADITYA-KHADE/Profile-maps-management.git
cd Products-list
```

## 2. Add ENV file 

Create a `.env` file in the root directory of the project and  add the following environment variables:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=your_desired_port_number
JWT_SECRET=any secret key
JWT_EXPIRES_IN=1h
JWT_COOKIE_EXPIRES=3600000

```

also create another `.env` file inside of frontend folder and add the following environment variables:

```plaintext
VITE_MAP_API_KEY=your Map api key

```

Replace `your_mongodb_connection_string` , `JWT_SECRET` and `your_desired_port_number` with your actual MongoDB connection string and desired port number respectively.

## 3. Install Dependencies, built dist folder and start application

run this command at terminal

```bash
npm run build
npm run start
```
