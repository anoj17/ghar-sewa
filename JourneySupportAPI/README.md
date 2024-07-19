
### 4. Setup Environment Variables
Create a `.env` file in the root of your project directory and add the following variables:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
CLIENT_PORT=3000
```
Replace `your_mongodb_uri` with your MongoDB connection URI. Customize the `PORT` and `CLIENT_PORT` variables if needed.

### 5. Start the Development Server
Run the following command to start the development server:
```bash
npm start
```

### 6. Access the App
Open your web browser and navigate to `http://localhost:3000` to access the app. You can now use the app locally on your machine, connected to your MongoDB database using the URI specified in the `.env` file.

### 7. Note
The project may not work if you do not install dependencies in both the front end and backend. So you will have to apply steps 2 and 3 twice, once in the frontend and once in the backend.

---
