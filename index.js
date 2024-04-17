import { WebSocketServer } from 'ws';
import fs from 'fs';

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080, host: '0.0.0.0'});

// Read data from JSON file
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Function to send data to all connected clients
const broadcastData = (data) => {
  wss.clients.forEach((client) => {
    // if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    // }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send data 1 second after client connects
  setTimeout(() => {

    broadcastData(jsonData);
    setInterval(() => {
        broadcastData(jsonData);
    }, 10000);
  }, 1000);
});

console.log('WebSocket server started on ws://localhost:8080');
