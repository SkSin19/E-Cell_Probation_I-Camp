//Import Express
const express = require('express');
const app = express();

const connectDB = require('./config/db')
const PORT=process.env.PORT

//testing route
app.get('/', (req, res) => {
  res.send('I Camp Server');
});

//connect to database
connectDB()

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});