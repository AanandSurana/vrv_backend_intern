# RBAC BACKEND RBAC Authentication and Protected Routes Project

This project demonstrates a secure authentication system with token management, logout functionality, and protection for sensitive routes like admin pages. It ensures users are redirected appropriately and prevents unauthorized access through proper route guarding.

---

## Features

- *Authentication System*: 
  - Secure login using JWT-based tokens.
  - Tokens are stored in localStorage or cookies for session management.

- *Protected Routes*:
  - Users cannot access restricted pages like /admin without being authenticated.
  - Redirects unauthorized users to the login page.

- *Logout Functionality*:
  - Removes tokens from localStorage and cookies during logout.
  - Redirects users to the login page upon logout.
  - Clears browser navigation cache to prevent revisiting protected pages.

- *Responsive Design*:
  - Fully functional on both desktop and mobile devices.

- *Secure Backend Validation*:
  - Tokens are validated on the backend for an additional layer of security.

---

## Tech Stack

- *Frontend*:
  - React.js
  - React Router DOM for navigation and route protection
  - TailwindCSS for responsive design

- *Backend*:
  - Node.js
  - Express.js
  - JWT for authentication and authorization

---