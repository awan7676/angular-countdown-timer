const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const SIMULATE_ERROR = false;

app.get('/api/deadline', (req, res) => {
  if (SIMULATE_ERROR) {
    return res.status(500).json({ 
      message: 'Failed to fetch deadline data' 
    });
  }
  
  res.json({ secondsLeft: 86400 });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/api/deadline`);
});