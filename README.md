# I-Camp Backend

Backend server for I-Camp registration system built with Node.js, Express, and MongoDB. Handles student registration with comprehensive input validation.

## Features

* Register KIIT & Non-KIIT students
* Input validation with regex (name, phone, email)
* Prevents duplicate phone registrations
* Stores data in MongoDB
* CORS enabled for frontend integration

## Tech Stack
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB with Mongoose ODM
* Security: CORS, Input Validation
* Environment: dotenv
* Development: Nodemon (dev dependency)

## Installation
1. Clone the repository:


```bash
git clone https://github.com/SkSin19/E-Cell_Probation_I-Camp.git
cd backend
```
2.Install dependencies:
```bash
npm install
```

3. Create .env file in the root directory:
```bash
PORT=8000
MONGO_URL=mongodb+srv://uixphuke:E-Cell_Probation_I-Camp@cluster0.ifu7ahd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

```

## Running the Server
```bash
nodemon
npm start
```
Server runs at: [http://localhost:8000](http://localhost:8000)

## API Testing (POST request)
```bash
http://localhost:8000/api/v1/register
```
* Request Body:
```bash
{
  "firstName": "Ruhon",
  "lastName": "Borah",
  "isFromKiit": true,
  "emailKiit": "2570160@kiit.ac.in",
  "phone": "8011088795",
  "internshipType": "Technical"
}
```
* Success Response (201):
```bash
{
    "success": true,
    "message": "Registration successful!",
    "data": {
        "firstName": "Ruhon",
        "lastName": "Borah",
        "isFromKiit": true,
        "emailKiit": "2570160@kiit.ac.in",
        "emailNonKiit": null,
        "phone": "8011088795",
        "internshipType": "Technical",
        "_id": "68f5a02bffaf4cee24a6505a",
        "createdAt": "2025-10-20T02:36:27.905Z",
        "updatedAt": "2025-10-20T02:36:27.905Z",
        "__v": 0
    }
}
```

## Validation Rule

* Name: Letters only (alphabetic characters)
* Phone: 10 digits
* KIIT Email: Must end with @kiit.ac.in
* Non-KIIT Email: Standard email format validation

## Error Handling
* Returns appropriate HTTP status codes (400, 500, etc.)
* Descriptive error messages for validation failures
* Duplicate phone number detection