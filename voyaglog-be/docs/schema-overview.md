# Schema Overview

## User Schema

| Field      | Type     | Required | Description              |
|------------|----------|----------|--------------------------|
| _id        | ObjectId | Yes      | MongoDB ID               |
| username   | String   | Yes      | Unique username          |
| email      | String   | Yes      | User email address       |
| password   | String   | Yes      | Hashed password          |
| createdAt  | Date     | No       | Auto-generated date      |

---

## Post Schema

| Field      | Type     | Required | Description                     |
|------------|----------|----------|---------------------------------|
| _id        | ObjectId | Yes      | MongoDB ID                      |
| title      | String   | Yes      | Post title                      |
| content    | String   | Yes      | Post body                       |
| imageUrl   | String   | No       | Link to image                   |
| author     | ObjectId | Yes      | Reference to the User (_id)     |
| createdAt  | Date     | No       | Auto-generated creation date    |

---