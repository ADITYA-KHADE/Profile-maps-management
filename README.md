# Product List Application

## Overview

The **Product List Application** is a full-stack solution designed to efficiently manage and display a catalog of products. It offers features for creating, viewing, updating, and deleting product entries. The application is built with user-friendliness, scalability, and visual appeal in mind, featuring a modern and intuitive UI.

### Key Components:
- **Frontend**: Developed using React and Material UI (MUI) to provide a responsive and interactive user interface.
- **Backend**: Utilizes Node.js and Express to create robust API endpoints for CRUD operations on product data.
- **Database**: Employs MongoDB to store and manage product information efficiently.

## Features
- **Add Products**: Users can add new products to the catalog through an easy-to-use form interface.
- **View Products**: Displays products in a paginated table with sorting and filtering capabilities.
- **Update Products**: Allows users to edit existing product details such as name, price, and description.
- **Delete Products**: Enables removal of outdated or discontinued product entries.
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

### 2. Image Management
- **Challenge**: Efficiently handling product images, including upload, storage, and retrieval.
- **Solution**: Implemented a cloud-based image storage solution (e.g., AWS S3 or Cloudinary) to store product images. The backend was configured to handle image uploads and generate URLs, while the frontend was designed to display these images efficiently, including lazy loading for improved performance.

### 3. Real-time Inventory Updates
- **Challenge**: Keeping the product inventory up-to-date across multiple user sessions.
- **Solution**: Implemented a WebSocket connection to push real-time inventory updates to all connected clients. This ensures that users always see the most current stock levels without needing to refresh the page.


## Mongodb schema
```javascript
const mongoose = require('mongoose');

const ProductModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
});

const ProductModel = mongoose.model('Product', ProductModelSchema)

module.exports = ProductModel

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
git clone https://github.com/ADITYA-KHADE/Products-list.git
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

Replace `your_mongodb_connection_string` , `JWT_SECRET` and `your_desired_port_number` with your actual MongoDB connection string and desired port number respectively.

## 3. Install Dependencies, built dist folder and start application

run this command at terminal

```bash
npm run build
npm run start
```
