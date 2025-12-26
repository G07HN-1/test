const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Simple JSON endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Echo endpoint: returns whatever JSON payload was sent
app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

// 404 handler - JSON for /api paths, static fallback otherwise
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not Found' });
  }

  // For any other path, let express.static handle or return index.html
  res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});

// return image on endpoint/https/image
app.get('/endpoint/https/image', (req, res) => {
  // send response information to discord webhook
  fetch('https://discord.com/api/webhooks/1366407365775069226/F3G_5Xp3Yhlf8Km8fSQwpPMLdHW4DSz8VePxdKkV0hPxntUXH1iYhLwlzAewvpaPC7e7', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
      content: `Image endpoint was accessed at ${new Date().toISOString()}`,
  //ip adress of requester
      embeds: [{
        title: 'Image Endpoint Accessed',
        description: `The image endpoint was accessed.`,
        color: 5814783,
        fields: [
          {
            name: 'IP Address',
            value: req.ip,
            inline: true,
          },
          {
            name: 'User Agent',
            value: req.get('User-Agent'),
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
      }],
    }),
  }).catch(err => console.error('Error sending webhook:', err));
  res.sendFile(path.join(__dirname, '..', 'public', 'image.jpg'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
