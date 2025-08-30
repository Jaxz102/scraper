import express from 'express';
import {getInstagramAccount} from './index.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint for Instagram user
app.get('/instagram/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  // Log the request
  console.log(`GET request received for Instagram user: ${userId}`);
  
  // For now, return a simple response with the user ID
  // You can extend this to actually fetch Instagram data
  const instagramData = await getInstagramAccount(userId);

  res.json(instagramData.data.user);
  
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Instagram user endpoint: http://localhost:${PORT}/instagram/user/:userId`);
});
