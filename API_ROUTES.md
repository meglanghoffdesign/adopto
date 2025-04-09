# API Route Documentation - Pet Adoption App

This document provides an overview of all backend API routes, including their HTTP methods, expected inputs (parameters, body data), outputs (responses, status codes), and JWT authentication usage for protected routes.

---

## Table of Contents
1. [Authentication](#authentication)
2. [User Routes](#user-routes)
3. [Pet Routes](#pet-routes)
4. [Using JWT Authentication](#using-jwt-authentication)
5. [Common Responses](#common-responses)

---

## Authentication

### **Login**
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates the user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "token": "jwt_token_string"
    }
    ```
  - **Failure (401)**:
    ```json
    {
      "error": "Incorrect email or password"
    }
    ```
## Test Scenarios

### **Scenario 1: Invalid Credentials**
**GIVEN**: A user enters invalid credentials.  
**WHEN**: They attempt to register or log in.  
**THEN**: The system displays the appropriate error message (e.g., "Incorrect username or password" or "Password confirmation does not match").

### **Scenario 2: Valid Credentials**
**GIVEN**: A user enters valid credentials.  
**WHEN**: They attempt to register or log in.  
**THEN**: The system allows them into the application.
---

### **Register**
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Creates a new user account and returns a JWT token.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "message": "User registered successfully",
      "token": "jwt_token_string"
    }
    ```
  - **Failure (400)**:
    ```json
    {
      "error": "Password confirmation does not match"
    }
    ```

---
## Test Scenario

### **Scenario: Successful Registration**
**GIVEN**: A user navigates to the registration page.  
**WHEN**: They input valid information and submit the form.  
**THEN**: The system correctly creates a user account, generate a JWT token, and return it for access.

---

## User Routes

### **Get User Profile**
- **URL**: `/api/users/id`
- **Method**: `GET`
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**:
  - `Authorization: Bearer jwt_token_string`
- **Response**:
  - **Success (200)**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "createdAt": "2025-01-01T12:00:00Z"
    }
    ```
  - **Failure (401)**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

---

## Pet Routes

### ** All Pets**
- **URL**: `/api/pets/search`
- **Method**: `POST`
- **Description**: Retrieves a list of all pets available for adoption.
- **Example Query Parameters**:
  {
  "species": "dog",
  "size": "medium",
  "location": "New York, NY",
  "age": "young",
  "status": "adoptable"
}
- **Response**:
  - **Success (200)**:
    ```json
    {
		"id": 75937494,
		"organization_id": "NY602",
		"url": "https://www.petfinder.com/cat/charlotte-75937494/ny/cortland/cny-snap-ny602/?referrer_id=1f90fc87-2770-4a0d-9bc9-6ead1a33dc08&utm_source=api&utm_medium=partnership&utm_content=1f90fc87-2770-4a0d-9bc9-6ead1a33dc08",
		"type": "Cat",
		"species": "Cat",
		"breeds": 
			"primary": "Domestic Short Hair",
			"secondary": null,
			"mixed": false,
			"unknown": false
}

    ```


    ```
  - **Failure (404)**:
    ```json
    {
      "error": "Pet not found"
    }
    ```


## Using JWT Authentication

### **Step 1: Log In to Obtain a Token**
- Use the `/auth/login` endpoint to log in and receive a JWT token in the response.

### **Step 2: Include the Token in Requests**
- Add the following header to all protected routes:
  ```
  Authorization: Bearer jwt_token_string
  ```
### **Step 3: Access OAuth Token**
-POST to the `https://api.petfinder.com/v2/oauth2/token` endpoint to receive a OAuth token with the Form Data with the following four headers: {  "username": "username",  "password": "password"}, grant_type, client_id, and client_secret.

### **Step 4: Handle Token Expiry**
- Tokens are valid for a specific duration (e.g., 1 hours). If a token expires, the system will respond with a `401 Unauthorized` error. Log in again to receive a new token.

```

---

## Common Responses

| **Status Code** | **Description**                  |
|------------------|----------------------------------|
| 200              | Request was successful.         |
| 201              | Resource was created.           |
| 400              | Bad request (e.g., validation). |
| 401              | Unauthorized (invalid Credentials).   |
| 404              | Resource not found.             |
| 500              | Unexpected server error.          |

---

This documentation provides a comprehensive overview of the backend API and how to integrate with it using JWT authentication. If you encounter any issues, please contact the development team.