# Simple-Todo
A simple todo web app for simplify your life.  
Use [NodeJs](https://nodejs.org/en/), and [MongoDB](https://www.mongodb.com/).

## Base URL
By default, base url is at `http://localhost:3000`

## Setting up environment
Make a file called `.env` and fill it with necessary environment such as:
* PORT
* MONGODB_URI
* JWT_SECRET

and put it on server folder

---
# Routes
#### `POST /login`

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `email type: String` **required**
* `password type: String` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>
}

// error
{
    "errors": [
        "Email or password is wrong"
    ]
}
```

#### `POST /register`

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `username type: String` **required**
* `email type: String` **required**
* `password type: String mininum 6 character` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>
}

// error
{
    "errors": [
        "Email already registered"
    ]
}
```

#### `GET /users/todos`

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

response :
```js
// success
[
    {
        "_id": <id>,
        "name": <name>,
        "description": <description>,
        "dueDate": <due date>,
        "owner": <owner id>,
        "status": <status>,
        "__v": 0
    },
    {
        "_id": <id>,
        "name": <name>,
        "description": <description>,
        "dueDate": <due date>,
        "owner": <owner id>,
        "status": <status>,
        "__v": 0
    }
]

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /todos`

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

body request :
* `name type: String` **required**
* `description type: String` **required**
* `dueDate type: Date` **required**

response :
```js
// success
{
    "_id": <id>,
    "name": <name>,
    "description": <description>,
    "dueDate": <due date>,
    "owner": <owner id>,
    "status": <status>,
    "__v": 0
}

// error
{
    "errors": [
        "Cast to Date failed for value \"Invalid Date\" at path \"dueDate\"",
        "Description is required"
    ]
}
```

#### `GET /todos/<:todoId>`

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `todoId type: String` **required**

response :
```js
// success
{
    "_id": <id>,
    "name": <name>,
    "description": <description>,
    "dueDate": <due date>,
    "owner": <owner object>,
    "status": <status>,
    "__v": 0
}

// error
{
    "errors": [
        "You are not authorized"
    ]
}
```

#### `PATCH /todos/<:todoId>`

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `todoId type: String` **required**

body request :
* `name type: String`
* `description type: String`
* `dueDate type: Date`
* `status type: String` *enum: 'done', 'pending', or 'overdue'*

response :
```js
// success
{
    "_id": <id>,
    "name": <name>,
    "description": <description>,
    "dueDate": <due date>,
    "owner": <owner object>,
    "status": <status>,
    "__v": 0
}

// error
{
    "errors": [
        "Todo not found"
    ]
}
```

#### `DELETE /todos/<:todoId>`

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `todoId type: String` **required**

response :
```js
// success
{
    "message": "Success delete todo"
}

// error
{
    "errors": [
        "Todo not found"
    ]
}
```
