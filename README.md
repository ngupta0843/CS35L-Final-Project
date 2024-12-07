# CS35L Final Project: Fitness is my Passion

![Fitness_is_my_passion_home](https://github.com/user-attachments/assets/ca5d8fd3-63b5-4633-8675-8530a4f835d9)


---

# Project Setup Guide

This project consists of a client-side application, a server-side API, and a Python component for machine learning. Follow the steps below to set up and run the application locally.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up the Client](#setting-up-the-client)
3. [Setting Up the Server](#setting-up-the-server)
4. [Setting Up the Python Component (ML)](#setting-up-the-python-component-ml)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)

---

## 1. Prerequisites

Ensure you have the following tools installed on your system:

- **Node.js** (for running the client and server-side code)
  - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
  - `npm` is the package manager for Node.js, used for installing dependencies.
- **Python 3.12** (for the machine learning component)
  - [Download Python](https://www.python.org/downloads/)
- **MongoDB** (for the backend database connection)
  - Set up a local or remote MongoDB instance for the backend.

---

## 2. Setting Up the Client

To set up the client-side application:

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Install the client dependencies:

    ```bash
    npm install
    ```

3. Start the client application:

    ```bash
    npm start
    ```

This will run the client application locally. By default, it will be accessible at `http://localhost:3000` or the port configured in the `client` configuration files.

---

## 3. Setting Up the Server

To set up the server-side API:

1. Navigate to the server directory:

    ```bash
    cd server
    ```

2. Install the server dependencies:

    ```bash
    npm install
    ```

3. Start the server in development mode:

    ```bash
    npm run dev
    ```

The server should now be running locally, usually accessible at `http://localhost:5000` or the port defined in the server configuration.

---

## 4. Setting Up the Python Component (ML)

To set up the Python component for machine learning:

1. Navigate to the `server/ML` directory:

    ```bash
    cd server/ML
    ```

2. **Install Python 3.12** (if you haven't already). Follow the installation instructions for your platform from the official [Python website](https://www.python.org/downloads/).

3. **Create a Python virtual environment**:

    ```bash
    python3.12 -m venv venv
    ```

4. **Activate the virtual environment**:

    - On macOS/Linux:

      ```bash
      source venv/bin/activate
      ```

    - On Windows:

      ```bash
      venv\Scripts\activate
      ```

5. **Move required files into the virtual environment**:
   
   Move the following files into the `venv` folder:
   - `gpt.py`
   - `workouts.txt`
   - `diets.txt`
   
   Ensure that the files are in the same directory as the `venv` folder.

6. **Install the required Python packages**:

    ```bash
    pip3 install numpy pandas torch==2.0.0 torchvision==0.15.0 transformers
    ```

    This will install the necessary Python packages for machine learning.

---

## 5. Environment Variables

To configure environment variables, you will need to create a `.env` file in the `server` directory.

1. Create a `.env` file inside the `server` directory.

2. Add the following variables to the `.env` file:

    ```
    PORT=[backend port number]
    CONNECTION_URL=[Mongo DB connection string]
    ```

   - Replace `[backend port number]` with the port number on which your backend server will run (default is usually `5000`).
   - Replace `[Mongo DB connection string]` with your MongoDB connection string.

---

## 6. Running the Application

After setting up all components, you can run the entire application locally by following these steps:

1. **Start the server**:

    ```bash
    cd server
    npm run dev
    ```

2. **Start the client**:

    ```bash
    cd client
    npm start
    ```

3. **Start the Python ML environment** (if needed for model inference or other ML operations):

    - Ensure the Python virtual environment is activated.
    - Run any required Python scripts (e.g., `gpt.py`) using:

      ```bash
      python gpt.py
      ```

This should start the full stack application with the client on the front-end, the server on the back-end, and the machine learning component functioning as expected.

---

## Notes

- Make sure to **ignore** generated folders like `node_modules` and `venv` from Git by adding them to your `.gitignore` file to avoid accidentally committing them to the repository.
  
  Example `.gitignore`:
  ```
  node_modules/
  venv/
  ```

- If you encounter issues with dependencies or versions, double-check the required versions and ensure your environment matches the specifications listed in this README.

---

Please contact Nikhil Gupta (owner of this GitHub) for any issues with re-producing this project.
