const WebSocket = require('ws');
const fs = require('fs');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Read data from JSON file
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Function to send data to all connected clients
const broadcastData = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send data 1 second after client connects
  setTimeout(() => {
    broadcastData(jsonData);
  }, 1000);
});

console.log('WebSocket server started on ws://localhost:8080');
