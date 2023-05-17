const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const userResponsesList = [];

app.post('/responses', (req, res) => {
  const userResponse = req.body;
  userResponsesList.push(userResponse);
  res.status(200).json({ message: 'Data stored successfully' });
});

app.get('/data', (req, res) => {
  res.json(userResponsesList);
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

