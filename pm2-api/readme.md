## API Service

### Install Dependencies
```bash
npm install --save express mongoose body-parser dotenv
```

### Service endpoint (when hosted locally)

```
POST http://localhost:9999/api/user
```
payload
```json
{
	"name": "admin",
	"email": "admin@gmail.com",
	"password": "password123"
}
```

response:
```json
{
  "message": "user created successfully"
}
```