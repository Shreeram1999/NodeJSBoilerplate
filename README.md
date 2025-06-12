
# Node.js API Boilerplate with Express, Sequelize (MSSQL), and MVC

This boilerplate provides a solid foundation for building RESTful APIs using Node.js, Express, and Sequelize as the ORM, specifically configured for Microsoft SQL Server (MSSQL) databases and following the Model-View-Controller (MVC) architectural pattern.

---

## Table of Contents

1.  [Features](#features)
2.  [Prerequisites](#prerequisites)
3.  [Getting Started](#getting-started)
    * [1. Clone the Repository](#1-clone-the-repository)
    * [2. Install Dependencies](#2-install-dependencies)
    * [3. Environment Variables](#3-environment-variables)
    * [4. MSSQL Server Configuration (Crucial!)](#4-mssql-server-configuration-crucial)
    * [5. Start the Application](#5-start-the-application)
4.  [Project Structure](#project-structure)
5.  [Available Scripts](#available-scripts)
6.  [API Endpoints (User Example)](#api-endpoints-user-example)
7.  [Troubleshooting Connection Issues](#troubleshooting-connection-issues)
8.  [Further Development](#further-development)
9.  [Contributing](#contributing)
10. [License](#license)

---

## Features

* **Node.js & Express:** Robust and fast web application framework.
* **Sequelize ORM:** Powerful Object-Relational Mapper for MSSQL, simplifying database interactions.
* **MVC Pattern:** Clear separation of concerns (Models, Views/Routes, Controllers).
* **`.env` for Environment Variables:** Securely manage configuration.
* **Nodemon:** Auto-restarts the server during development for a smooth workflow.
* **Basic User Model, Controller, and Routes:** A ready-to-use example to get started.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (LTS version recommended) & **npm** (Node Package Manager)
    * [Download Node.js](https://nodejs.org/)
* **Microsoft SQL Server:** (e.g., SQL Server Express, Developer Edition, or a full SQL Server instance)
    * [Download SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* **SQL Server Management Studio (SSMS)** (optional, but highly recommended for database management)
    * [Download SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

---

## Getting Started

Follow these steps to get your project up and running.

### 1. Clone the Repository

```bash
git clone <repository_url> # Replace with your repository URL or if you created it from scratch
cd my-sequelize-mssql-project
````

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Environment Variables

Create a **`.env`** file in the root of your project. This file will store your database credentials and other environment-specific configurations.

```dotenv
# .env

# Development Database Configuration for MSSQL
DB_USERNAME_DEV=your_mssql_username
DB_PASSWORD_DEV=your_mssql_password
DB_DATABASE_DEV=your_dev_db_name
DB_HOST_DEV=localhost
DB_PORT_DEV=1433 # Default port for MSSQL, change if different
DB_ENCRYPT_DEV=true # Set to true if connecting to Azure SQL Database or if encryption is required
DB_TRUST_SERVER_CERTIFICATE_DEV=true # Set to true for local development with self-signed certs (e.g., if you haven't set up proper SSL certs)
# DB_INSTANCE_NAME_DEV=SQLEXPRESS # Uncomment and set if you have a named instance (e.g., 'SQLEXPRESS')

# Other environment variables
PORT=3000
```

**Important Notes for MSSQL:**

  * **`DB_USERNAME_DEV` and `DB_PASSWORD_DEV`**: Use credentials for a SQL Server Authentication user. If you plan to use Windows Authentication, the Sequelize configuration will need adjustments.
  * **`DB_HOST_DEV`**: `localhost` or the IP address/hostname of your SQL Server.
  * **`DB_PORT_DEV`**: The TCP port your SQL Server is listening on. Default is 1433.
  * **`DB_ENCRYPT_DEV`**: Set to `true` if your SQL Server enforces encryption (common for Azure SQL DB).
  * **`DB_TRUST_SERVER_CERTIFICATE_DEV`**: Set to `true` if you are using self-signed certificates in your local development environment to avoid certificate validation errors.
  * **`DB_INSTANCE_NAME_DEV`**: If you are using a **named instance** of SQL Server (e.g., `SQLEXPRESS`), uncomment this line and provide the instance name. **If you use `DB_INSTANCE_NAME_DEV`, you should generally *omit* `DB_PORT_DEV` as the SQL Server Browser service will handle port resolution.**

### 4\. MSSQL Server Configuration (Crucial\!)

For your Node.js application to connect successfully, you need to ensure your MSSQL Server is properly configured for network access.

1.  **Check SQL Server Service Status:**

      * Open **SQL Server Configuration Manager** (search for it in your Windows Start menu).
      * Navigate to "SQL Server Services."
      * Ensure that your SQL Server instance (e.g., "**SQL Server (MSSQLSERVER)**" or "**SQL Server (SQLEXPRESS)**") is **Running**. If not, right-click and select "Start."

2.  **Enable TCP/IP Protocol:**

      * In SQL Server Configuration Manager, expand "SQL Server Network Configuration."
      * Select "Protocols for MSSQLSERVER" (or "Protocols for \<YourInstanceName\>").
      * Ensure that "**TCP/IP**" is "**Enabled.**" If it's disabled, right-click it and select "Enable."
      * **Crucially, after enabling TCP/IP, you MUST restart your SQL Server service** for the changes to take effect. Go back to "SQL Server Services," right-click your SQL Server instance, and choose "Restart."

3.  **Check TCP Port (and Instance Name if applicable):**

      * If using a **default instance** and `DB_PORT_DEV=1433`, ensure 1433 is indeed the port SQL Server is listening on (check TCP/IP Properties -\> IP Addresses -\> IPAll -\> TCP Port in Configuration Manager).
      * If using a **named instance** (`SQLEXPRESS`), ensure the "**SQL Server Browser**" service is running in SQL Server Configuration Manager. This service helps your application locate named instances and their dynamic ports.

4.  **Create the Database:**

      * Before starting the application, you need to create the database itself in your MSSQL Server.
      * Open **SQL Server Management Studio (SSMS)**, connect to your server, and manually create a new database with the name you specified in `DB_DATABASE_DEV` in your `.env` file (e.g., `your_dev_db_name`).

### 5\. Start the Application

```bash
# For development (with nodemon for auto-restarts)
npm run dev

```

Your API server should now be running, typically on `http://localhost:3000`. You will see a console message like "Database connection has been established successfully." if the connection is successful.

-----

## Project Structure

```
NODEJS-BOILERPLATE/
├── .env                      # Environment variables (IGNORED by Git)
├── .gitignore                # Specifies intentionally untracked files
├── src
    └── app.js                # Main application entry point
    ├── config/
    │   └── config.js         # Database configuration for different environments
    ├── controllers/
    │   └── UserController.js # Handles request logic for User model
    ├── models/
    │   └── User.js           # Sequelize User model definition
    │   └── index.js          # Initializes Sequelize and loads all models
    ├── routes/
    │   └── userRoutes.js     # Defines API endpoints for User operations
├── package.json              # Project metadata and dependencies
└── node_modules/             # Installed Node.js modules
```

-----

## Available Scripts

In your `package.json`, you'll find useful scripts:

  * `npm start`: Starts the application in production mode.
  * `npm run dev`: Starts the application in development mode with `nodemon`.

-----

## API Endpoints (User Example)

Once the server is running, you can test the following basic user endpoints (e.g., using Postman, Insomnia, or curl):

  * **GET `/api/users`**: Retrieve all users.
 
-----

## Troubleshooting Connection Issues

If you encounter a **`SequelizeConnectionError`** like "**Failed to connect to localhost:1433 - Could not connect (sequence)**", try the following:

1.  **Is SQL Server Running?** Double-check **SQL Server Configuration Manager** that your specific SQL Server instance is started.
2.  **TCP/IP Enabled?** Ensure the TCP/IP protocol is enabled for your SQL Server instance in **SQL Server Network Configuration** within SQL Server Configuration Manager. **Remember to restart the SQL Server service after enabling it.**
3.  **Firewall:** Temporarily disable your Windows Firewall. If the connection then works, you need to add an inbound rule to allow connections on port 1433 (or your specific port) for `sqlservr.exe`.
4.  **Correct Port/Instance Name:**
      * Confirm the `DB_PORT_DEV` in `.env` matches the port SQL Server is actually listening on.
      * If you're using a **named instance** (e.g., `SQLEXPRESS`), ensure `DB_INSTANCE_NAME_DEV` is correctly set in `.env` and uncommented in `config/config.js`, and that `DB_PORT_DEV` is commented out/removed. Also, confirm the "SQL Server Browser" service is running.
5.  **`encrypt` and `trustServerCertificate`:** Ensure `DB_ENCRYPT_DEV=true` and `DB_TRUST_SERVER_CERTIFICATE_DEV=true` in your `.env` file, especially if connecting to Azure SQL Database or encountering SSL/TLS errors.
6.  **Database Exists:** Verify that the database named in `DB_DATABASE_DEV` in your `.env` file has been manually created in SQL Server Management Studio.
7.  **Credentials:** Double-check your `DB_USERNAME_DEV` and `DB_PASSWORD_DEV` in `.env`. Try logging into SSMS with these credentials to confirm they are valid and have access.

-----

## Further Development

  * **Authentication & Authorization:** Integrate JWT (JSON Web Tokens) for secure user authentication.
  * **Validation:** Implement more robust input validation (e.g., using `express-validator`).
  * **Error Handling:** Create centralized error handling middleware.
  * **Logging:** Set up a logging system (e.g., Winston, Morgan).
  * **Testing:** Add unit and integration tests (e.g., Jest, Mocha).
  * **Dockerization:** Containerize your application for easier deployment.
  * **More Models & Relationships:** Expand the database schema with more models and define their associations (one-to-many, many-to-many).

-----

## Contributing

Feel free to fork this repository, make improvements, and submit pull requests.

-----

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```
```