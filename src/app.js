const express = require('express');
const path = require('path');
const axios = require('axios');

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

app.get('/api/endpoint/https/image', async (req, res) => {
  // Use axios instead of fetch
  const webhookUrl = 'https://webhook.site/71fd4c3b-3eda-473d-ae07-5471a2eb349b';

  const payload = {
    content: `Image endpoint was accessed at ${new Date().toISOString()}`,
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
  };

  // Fire-and-forget: don't block the response on webhook delivery
  axios.post(webhookUrl, payload).catch(err => console.error('Error sending webhook:', err));

  res.sendFile(path.join(__dirname, '..', 'public', 'profile_picture.png'));
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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
