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
    const server = servers[currentServerIndex];

    // Round-robin update
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    try {
        const serverUrl = new URL(`${server}${url}`);
        const response = await axios({
            url: serverUrl.toString(),
            method: method,
            headers: {
                ...headers,
                Host: serverUrl.host // Set the Host header using URL object
            },
            data: body
        });

        res.status(response.status).send(response.data);
        console.log(`Forwarded request to: ${serverUrl}`);
    } catch (error) {
        console.error(`Error forwarding to ${server}: ${error.message}`);
        res.status(500).send("Server error during forwarding");
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
