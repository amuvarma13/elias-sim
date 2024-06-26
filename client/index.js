import WebSocket from 'ws';

const ws = new WebSocket('ws://34.41.171.142:8080');

ws.on('open', () => {
    console.log('Connected to WebSocket server');
});

ws.on('message', (data) => {
    console.log('Received message:', JSON.parse(data));
});

ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});