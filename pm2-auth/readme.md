## Auth Service

### Install Dependencies
```bash
npm install --save express mongoose body-parser dotenv
```

### Service endpoint (when hosted locally)

```
POST http://localhost:4000/auth/login
```
payload
```json
{
	"email": "adam@gmail.com",
	"password": "password123"
}
```

response:
```json
{
    "token": "cGFzc3dvcmQxMjM=",
    "_id": "5ce9a12115e39ce4064196e6",
    "name": "adam",
    "email": "adam@gmail.com",
    "password": "password123",
    "__v": 0
}
```