# DevTinder Backend API Documentation

Welcome to the DevTinder Backend API documentation. This document provides a comprehensive list of available API endpoints categorized by their functionality.

---

## **Authentication API**
Handles user authentication and session management.

- **POST** `/login`
  - Logs in a user and creates a session.

- **POST** `/signUp`
  - Registers a new user on the platform.

- **POST** `/logout`
  - Logs out a user and terminates the session.

---

## **Profile API**
Manages user profiles and account settings.

- **GET** `/profile/view`
  - Retrieves the details of the authenticated user’s profile.

- **PATCH** `/profile/edit`
  - Updates the authenticated user’s profile information.

- **PATCH** `/profile/password`
  - Updates the password for the authenticated user.

---

## **Connection API**
Facilitates sending and reviewing connection requests.

- **POST** `/request/send/intrested/:userId`

- **POST** `/request/send/ignored/:userId`

- **POST** `/request/review/acepted/:userId`
  - Accepts a connection request from a specified user.

- **POST** `/request/review/rejected/:userId`
  - Rejects a connection request from a specified user.

---

## **User Router API**
Provides user-specific data and actions.

- **GET** `/user/connections`
  - Retrieves the list of all connected users.

- **GET** `/user/requests`
  - Retrieves the list of all pending connection requests.

- **GET** `/user/feed`
  - Retrieves a feed of other user profiles for the authenticated user to accept or reject.

---

### **Usage Notes:**
- Replace `:userId` in the URL with the actual user ID when making requests.
- Ensure proper authentication headers (e.g., Bearer Token) are included in all requests.
- API responses will include appropriate HTTP status codes and error messages for easy debugging.

---
