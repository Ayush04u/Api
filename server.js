const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 7001;

app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('http://110.227.220.171:7000/data/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
