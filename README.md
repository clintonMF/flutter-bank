# Flutter bank API

This document provides an overview of the available API endpoints for the Flutter Bank API.

## Base URL

The base URL for all API endpoints 
- Local Development: `http://localhost:3000/`
- Live Server: `https://flutter-bank.onrender.com/`
- API Documentation: `https://flutter-bank.onrender.com/api-docs`

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
    - [`App is running endpoint`](#app-is-running-endpoint)
    - [`GET All Accounts`](#get-all-accounts)
    - [`Create New Account`](#create-new-account)
    - [`GET Account Details`](#get-account-details)
- [Testing](#testing)
- [Error Handling](#error-handling)

## Prerequisites

Make sure you have the following installed on your system:
- Node.js (at least version 16.0.0)
- npm

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/clintonMF/flutter-bank.git
   ```
2. Navigate to the project directory
   ```
    cd flutter-bank
   ```
3. install dependencies 
   ```
    npm install
   ```

## Running the Application

To start the Express server, run the following command:
```bash
npm start
```

## API Endpoints

### App is running endpoint
- **Endpoint:** `/`
- **Method:** GET
- **Description:** tells the developer that the app is running properly. Very useful in deployment
- **Response:**
  - Status Code: 200 OK
  - Body: an array with msg (message)
  - Example Response Body:
    ```json
    {
        "msg": "app is running"
    }
    ```
### API documentation
- **Endpoint:** `/api-doc`
- **Method:** GET
- **Description:** brings the swagger documentation
- **Response:**
  - Status Code: 200 OK
  - Body: an array with msg (message)

### Get All Accounts

- **Endpoint:** `/api/v1/accounts`
- **Method:** GET
- **Description:** Retrieve a list of all bank accounts.
- **Response:**
  - Status Code: 200 OK
  - Body: List of account objects

### Create New Account

- **Endpoint:** `/api/v1/accounts`
- **Method:** POST
- **Description:** Create a new bank account.
- **Request Body:**
  - Type: JSON
  - Fields:
    - `accountNumber` (string, required): The account number for the new account.
    - `firstName` (string, required): The last name of the account holder.
    - `lastName` (string, required): The last name of the account holder.
    - `accountBalance` (number, required): The initial balance of the account.
    - `dob` (string, required): The date of birth of the account holder. Format: `YYYY-MM-DD`. The account holder must be 18 years or older.
  - Example Request Body:
    ```json
    {
        "firstName": "clinton",
        "lastName": "mekwunye",
        "dob": "2003-07-10",
        "accountType": "savings",
        "accountBalance": 50000,
    }
    ```
- **Response:**
  - Status Code: 201 Created
  - Body: An object with account details
  - Example Response Body:
    ```json
    {
        "firstName": "clinton",
        "lastName": "mekwunye",
        "accountType": "savings",
        "accountBalance": 50000,
        "accountNumber": 2116360114
    }
    ```


### Get Account Details

- **Endpoint:** `/api/v1/accounts/:accountNumber`
- **Method:** GET
- **Description:** Retrieve details of a specific bank account.
- **Parameters:**
  - `accountNumber`: The account number of the account to retrieve
- **Response:**
  - Status Code: 200 OK
  - Body: Account object
  - Example Response Body:
    ```json
    {
        "firstName": "clinton",
        "lastName": "mekwunye",
        "accountType": "savings",
        "accountBalance": 50000,
        "accountNumber": 2116360114
    }
    ```
## Testing
Test were created for all account API endpoints. To run the tests, input the command below into the terminal:
```bash
npm test
```

## Error Handling

In case of errors, the API returns appropriate status codes along with error messages.





