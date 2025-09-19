# Route examples (request body + example response)

Base URL: http://localhost:3000
## Start server 
``` 
   redirect to  -  cd sever
   Start server -   nodemon
  ```

## Start client  
``` 
  redirect to   -   cd client
   Start server -   npm run dev
  ```

## Server's  .env file 

```
PORT=3000
DB_URL=    your backend URL   

JWT_SECRET=  you can set your own 
FRONTEND_URL= your frontend url 
```


## Client's .env file  

```
VITE_BASE_URL= {your own backend url }  or http://localhost:3000
```


Only request examples (JSON body) and example responses are listed below for each route. No route code is shown.

USER AUTH ROUTES

POST /api/auth/user/register
Request body:
```json
{
  "fname": "Alice",
  "lname": "Smith",
  "email": "alice@example.com",
  "password": "Password123"
}
```
Example response (200):
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "64ab...",
    "fname": "Alice",
    "lname": "Smith",
    "email": "alice@example.com"
  }
}
```

POST /api/auth/user/login
Request body:
```json
{
  "email": "alice@example.com",
  "password": "Password123"
}
```
Example response (200):
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "64ab...",
    "fname": "Alice",
    "lname": "Smith",
    "email": "alice@example.com"
  }
}
```

GET /api/auth/user/verify
Example response (200):
```json
{
  "verified": true,
  "user": {
    "_id": "64ab...",
    "fname": "Alice",
    "lname": "Smith",
    "email": "alice@example.com"
  }
}
```

GET /api/auth/user/logout
Example response (200):
```json
{
  "message": "Logged out"
}
```

NOTES ROUTES (protected)

POST /api/notes/create
Request body:
```json
{
  "title": "Grocery list",
  "description": "Milk, bread, eggs"
}
```
Example response (201):
```json
{
  "data": {
    "_id": "64ac...",
    "title": "Grocery list",
    "description": "Milk, bread, eggs",
    "user": "64ab...",
    "createdAt": "2025-09-18T...",
    "updatedAt": "2025-09-18T..."
  }
}
```

GET /api/notes/fetch
Example response (200):
```json
{
  "data": [
    {
      "_id": "64ac...",
      "title": "Grocery list",
      "description": "Milk, bread, eggs",
      "user": "64ab...",
      "createdAt": "2025-09-18T...",
      "updatedAt": "2025-09-18T..."
    }
  ]
}
```

PUT /api/notes/:id
Request body (example):
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```
Example response (200):
```json
{
  "message": "Note updated",
  "success": true,
  "data": {
    "_id": "64ac...",
    "title": "Updated title",
    "description": "Updated description",
    "user": "64ab...",
    "createdAt": "2025-09-18T...",
    "updatedAt": "2025-09-18T..."
  }
}
```

DELETE /api/notes/:id
Example response (201):
```json
{
  "message": "Note deleted",
  "success": true,
  "data": {
    "_id": "64ac...",
    "title": "Grocery list",
    "description": "Milk, bread, eggs",
    "user": "64ab..."
  }
}
```

Validation error example (express-validator)
```json
{
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

---

All examples use http://localhost:3000 as the base URL;

