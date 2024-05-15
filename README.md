# Task Mangement System
- Project Requirement for IT 3206 (Integrative Programming and Technology)
- Deployed Web App: https://iam-migz.github.io/IT3206_TaskManagement/

### Tech Stack:
- Frontend
  - React 
  - Material UI
- Backend
  - ExpressJs
  - Firebase


## Project Setup

### Starting the frontend
- `cd /client`
- `npm run dev`

### Starting the API Server
- `cd /server`
- `npm run dev`

### Ports
- client: http://localhost:5173/IT3206_TaskManagement/
- api: http://localhost:4000

## API Documentation

### Base URL
the base URL for all API requests is: <br>
`http://localhost:4000/api`


## End Points

### `GET /`
Returns a list of all the tasks


### Response
Returns a array of JSON object with the following properties:
- `id`: Unique identifier for the task.
- `title`: Title of the task.
- `description`: Description of the task.
- `status`: Current status of the task wheather it was completed or not, Boolean.

```json
[
  {
    "id":"80kJvqy0EszN1Mrj649z",
    "title":"study DSA",
    "description":"linked list",
    "status":false
  }
]
```

---

### `POST /`
Creates a task

### Request Body
- `title`
- `description`
- `status`

### Response
- returns a status code of `201 Created`

--- 

### `PUT /:taskId`
Updates a task

### Parameters
- `taskId`

### Request Body
- `title`
- `description`

### Response
- returns a status code of `200 OK`

--- 

### `DELETE /:taskId`
Deletes a task

### Parameters
- `taskId`

### Response
- returns a status code of `200 OK`

---

### `PATCH /:taskId`
Updates a task's status

### Parameters
- `taskId`

### Response
- returns a status code of `200 OK`



## Errors
This API uses the following error codes:
- `400 Bad Request`: The request was malformed or missing required parameters.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.


### Members
- MIGUEL ANGEL REYES
- PHILIPPE PONCE TAN
- JOSHUA PHILIP MELGAREJO ABABON
- ANDRE CLEOFE LABENDIA
- JANUSZ NRICKE LIM OMAMALIN
- LORENZ LEO VILLAHERMOSA ROJAS
- ROLAN DAVE IGOT PACAMPARA
- VONNE BENEDICT BERTOS GELAGA
- ALEXANDER JAMES VELEZ
- CARL DAVE BILOTTINDOS BARRERA