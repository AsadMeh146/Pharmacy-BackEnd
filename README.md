# Pharmacy Management System (Node.js Express.js Backend)

This repository contains the backend implementation of the Pharmacy Management System, which is built using Node.js, Express.js, and MongoDB. The backend serves as the foundation for the system, handling data storage, retrieval, and business logic.

## Prerequisites

Before setting up the backend, ensure that you have the following installed on your system:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/) (version 12 or above).
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/) and make sure the MongoDB service is running.

## Installation

To set up the backend for the Pharmacy Management System, follow these steps:

1. Clone the repository from GitHub:
git clone https://github.com/AsadMeh146/Pharmacy-BackEnd.git


2. Install the required dependencies:
npm install

3. Configure the database connection:
     "mongodb+srv://AzeemaSiddique:AzeemaSiddique@cluster0.odj1yil.mongodb.net/Test";

4. Start the backend server:
     npm start


5. The backend server will run on `http://localhost:8001` by default.

## Project Structure

The backend project has the following structure:

- `app.js`: The entry point of the application where the server is created and configured.
- `config/`: This directory contains configuration files for the application, such as database connection settings.
- `controllers/`: The controllers handle the business logic and request handling for each API endpoint.
- `models/`: This directory contains the Mongoose models that define the structure and behavior of the data stored in MongoDB.
- `routes/`: The routes directory defines the API endpoints and maps them to their respective controllers.


## Conclusion

The backend implementation of the Pharmacy Management System, built with Node.js, Express.js, and MongoDB, provides the necessary functionality to handle data storage, retrieval, and business logic. By following the installation instructions and reviewing the project structure, you can easily set up and start using this backend for your pharmacy management system. The API endpoints provided offer the necessary functionalities to manage admins, pharmacies, employees, stock, manufacturers, shippers, customers, orders, and employee loans.
