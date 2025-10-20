//Import Express
const express = require('express');

//Create an Express app
const app = express();

//testing route
app.get('/', (req, res) => {
  res.send('I Camp Server');
});

//Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});