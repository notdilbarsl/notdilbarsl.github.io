const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for specific origin
app.use(cors({
    origin: 'https://notdilbarsl.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Application servers for load balancing
const servers = [
    { url: "https://notdilbarsl-github-io.onrender.com", host: "notdilbarsl-github-io.onrender.com" },
    { url: "https://notdilbarsl-github-io-1.onrender.com", host: "notdilbarsl-github-io-1.onrender.com" }
];
let currentServerIndex = 0;

// Helper to get the current server and increment for round-robin
function getNextServer() {
    const server = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;
    return server;
}

// Handler to forward requests
const handler = async (req, res) => {
    const { method, url, headers, body } = req;
    const server = getNextServer();
    console.log(`Forwarding request body: ${JSON.stringify(body)}`);
    const requestUrl = `${server.url}${url}`;
    console.log(`Forwarding request to: ${server.url}${url} with method ${method}`);
    try {
        const response = await axios({
            url: `${server.url}${url}`,
            method: method,
            headers: {
                ...req.headers,
                Host: server.host
            },
            data: body,
        });        
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(`Error forwarding to ${requestUrl}: ${error.message}`);
        res.status(500).send("Server error!");
    }
};

// Define routes for GET and POST handling
app.get('*', handler);
app.post('*', handler);

// Start the load balancer
app.listen(8080, err => {
    if (err) {
        console.error("Failed to start load balancer on PORT 8080");
    } else {
        console.log("Load Balancer listening on PORT 8080");
    }
});
