# Jobs API 🛠️

## Description 📜

This is a RESTful API built with Node.js, Express, and MongoDB for managing job-related data. It provides a framework for creating, updating, and retrieving job listings and related information.

## Features ✨

- **Authentication & Authorization** 🔐: Secure your API with JWT tokens.
- **Data Validation** ✅: Ensure data integrity with validation and sanitization.
- **Rate Limiting** ⏲️: Protect your API from excessive requests.
- **Security** 🛡️: Use Helmet for security headers and XSS cleaning.
- **Geocoding** 🌍: Integrate geocoding features with `node-geocoder`.
- **Email Sending** 📧: Send emails using `nodemailer`.

## Installation 🛠️

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/BavlyMourad/jobs_api.git

   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd jobs_api

   ```

3. **Install Dependencies**:

   ```bash
   npm install

   ```

4. **Create a .env file in the config folder and add your environment variables**:

   ```bash
   PORT=YOUR-PORT

   NODE_ENV=development

   DB_URI=YOUR-MONGO-DB-URI

   GEOCODER_PROVIDER=YOUR-GEOCODER-PROVIDER
   GEOCODER_API_KEY=YOUR-API-KEY

   JWT_SECRET=YOUR-JWT-SECRET
   JWT_EXPIRES_TIME=YOUR-JWT-EXPIRY-TIME
   COOKIE_EXPIRES_TIME=YOUR-COOKIE-EXPIRY-TIME

   SMTP_HOST=YOUR-SMTP-HOST
   SMTP_PORT=YOUR-SMTP-PORT
   SMTP_EMAIL=YOUR-SMTP-EMAIL
   SMTP_PASSWORD=YOUR-SMTP-PASSWORD
   SMTP_FROM_EMAIL=YOUR-SMTP-FROM-EMAIL
   SMTP_FROM_NAME=YOUR-SMTP-FROM-NAME

   ```

5. **Usage 🚀**: <br>
   **_Development 🧑‍💻_**: <br>
   To start the server in development mode:
   ```bash
   npm run dev
   ```
   **_Production 🌟_**: <br>
   To start the server in production mode:
   ```bash
   npm run prod
   ```
