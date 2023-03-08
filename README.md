## About Project

Hello! Our project intends to implement a very useful application to facilitate the delivery of packages by transport companies.
In turn, provide a detailed user experience, about the process in which the package is, for the recipient of it.
Below you will find more specific information about the code implemented in this case, the frontend part, with React.

 

![photo](imgREADME.png)

### Project Deployment

The project is deployed using fly.dev **[here](https://fly.io/apps/buenobonitobarato2)**

### Work structure

We have developed this project using **[Trello](https://trello.com/b/ySq7J01o/proyecto-3)** to organize our workflow.

### Installation guide

Fork and clone this repo and follow the belo instructions

```
    npm install
    npm start
```

### User Roles

| Role      | Capabilities                                                                                                                                      | Properities    |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| **User/User**  | User can `login/logout` to his/her personal profile and read/delete/create new packages, modify his/her personal data and one time package is send, can track the estatus of his sending looking the real position of the Carrier | isTransporter: false |
| **User/Carrier** | Carrier have access to `login/logout` and to all packages, stored by sending day, and a map with the most optimal route to deliver his/her cargo                | isTransporter: true  |

### Routes

| Method    | Endpoint               | Description                                |
| :-------  | :--------------------- | :----------------------------------------- |
| **POST**  | `/signup`              | User register DataBase                     |
| **POST**  | `/login`               | Verifies email and password and returns a JWT  |
| **GET**   | `/verify`              | Verify  if JWT is stored on client         |
| **GET**   | `/all`                 | Send all packages to user                  |
| **POST**  | `/new`                 | Create a new package                       |
| **PUT**   | `/edit/:packageId`     | Edit a especific package by ID             |
| **DELETE**| `/delete/:packageId`   | Delete especific package base on his ID    |


### Models:

We have 2 models in our projects as below (Users, Package)

```javascript
## User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
  },
  {

    timestamps: true,
  }
);

```

```javascript
## Package model
const packageSchema = new Schema(
  {
   title: {
    type: String,
    required: true,
 
   },
   creator: {
    type: Schema.Types.ObjectId, ref: "user"
   },
   description: String,
   adress: {
    type: String,
    required: true,
   },
   filepath: {
    type: String,
   }
  },
  {
    timestamps: true,
  }
);
```
