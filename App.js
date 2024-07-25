const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const dbConnect=require('./config/dbconnect')
const userAuth=require('./route/userroute')
const task=require('./route/taskroute')


// Initialize Express app
const app = express();


// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({
    origin: "*",
    credentials: true
}));


// Database connection
dbConnect();

app.use('/api/user',userAuth)
app.use('/api/task',task)

app.get('/',(req,resp)=>{
    resp.send('Welcome to the task app')
})

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
