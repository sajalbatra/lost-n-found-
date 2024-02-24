## Lost and Found Application

### Overview

This is a backend service for a Lost and Found application, implemented using Node.js and MongoDB. The application allows users to create items, update return information for lost items, manage user accounts, change passwords, and handle file uploads for images.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```env
   MONGODB_URI=your-mongodb-uri
   PORT=3000
   ```

   Replace `your-mongodb-uri` with the connection URI for your MongoDB database.

4. Start the server:

   ```bash
   npm start
   ```

### API Endpoints

#### Items

- **Create Item**: `POST /api/v1/item/createitem/:userid`
  - Create a new item.
  - Required parameters: `userid` (User ID), `itemimg`, `itemname`, `itemtags`, `estimated_cost`, `found_location`.
  - Returns the newly created item.

- **Update Return Information**: `POST /api/v1/item/returnto/:userid`
  - Update return information for a lost item and the associated user's return information.
  - Required parameters: `userid` (User ID), `itemname`, `returnto`.
  - Returns a success message if the update is successful.

#### Users

- **Create User**: `POST /api/v1/user/createuser`
  - Register a new user.
  - Required parameters: `username`, `phonenumber`, `email`, `password`, `address`, `gender`.
  - Returns a success message if the registration is successful.

- **Change Password**: `POST /api/v1/user/changepassword`
  - Change the password of an existing user.
  - Required parameters: `username`, `password`, `newPassword`.
  - Returns a success message if the password change is successful.

- **Login User**: `POST /api/v1/user/login`
  - Login an existing user.
  - Required parameters: `Username`, `Password`.
  - Returns the user information if the login is successful.

- **Update Account Details**: `POST /api/v1/user/updateaccount`
  - Update account details of an existing user.
  - Required parameters: `username`, `newusername`, `phonenumber`, `email`, `address`, `gender`.
  - Returns a success message if the update is successful.

#### File Uploads

- **Upload File**: `POST /api/v1/user/file/upload`
  - Upload an image file.
  - Returns the uploaded file information.

- **Get File**: `GET /api/v1/user/file/:filename`
  - Retrieve an uploaded file by filename.

- **Delete File**: `DELETE /api/v1/user/file/:filename`
  - Delete an uploaded file by filename.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt (for password hashing)
- Multer (for file uploads)

### Contributors

- [Sajal](https://github.com/sajalbatra) 
- [Aryan](https://github.com/Aryan-dev-enth)
- [Deepak](https://github.com/deepak16375)