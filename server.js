const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Proxy route to fetch data from YouTube API
app.get('/youtube', async (req, res) => {
  try {
    const response = await axios.get('ttps://www.googleapis.com/youtube/v3/search', {
      params: {
        key: 'YOUR_YOUTUBE_API_KEY',
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 10
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
