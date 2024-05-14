# Contact REST API

## Description

This project is a backend application for managing contacts, built using Node.js with TypeScript, Express.js, and Nodemon. It handles database operations using MySQL with Sequelize ORM. The project provides CRUD (Create, Read, Update, Delete) functionalities for managing contacts.

## Built With

- Node.js with TypeScript
- Express.js
- Nodemon
- MySQL
- Sequelize

## Features

- CRUD operations for managing contacts

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Set up your MySQL database and update the database configuration in the `.env` file.
5. Run the development server by running `npm run dev`.

## Usage

Once the server is running, you can interact with the API using tools like Postman or curl. Here are the available endpoints:

- `GET /api/contacts`: Get all contacts
- `GET /api/contacts/:id`: Get a contact by ID
- `POST /api/contacts`: Create a new contact
- `PUT /api/contacts/:id`: Update an existing contact
- `DELETE /api/contacts/:id`: Delete a contact

## Author

This project was built by Fitra Zul Fahmi.

