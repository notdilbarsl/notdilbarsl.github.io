const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://notdilbarsl.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Application servers for load balancing
const servers = [
    "https://notdilbarsl-github-io.onrender.com",
    "https://notdilbarsl-github-io-1.onrender.com"
];
let currentServerIndex = 0;

// Cooldown tracking for unavailable servers
const cooldownMap = new Map();  // Stores {serverUrl: availableAtTimestamp}

// Function to handle requests and forward them in a round-robin manner with cooldown
const handler = async (req, res) => {
    const { method, url, headers, body } = req;

    // Loop through servers until finding an available one
    let attempts = 0;
    let server;
    while (attempts < servers.length) {
        const serverIndex = (currentServerIndex + attempts) % servers.length;
        server = servers[serverIndex];
        const cooldown = cooldownMap.get(server);

        // Check if the server is under cooldown
        if (!cooldown || cooldown < Date.now()) {
            currentServerIndex = (serverIndex + 1) % servers.length;  // Set the next server for round-robin
            break;
        }

        attempts++;
    }

    // If all servers are unavailable, send an error response
    if (attempts === servers.length) {
        return res.status(500).send("All servers are currently under cooldown. Please try again later.");
    }

    try {
        const response = await axios({
            url: `${server}${url}`,
            method: method,
            headers: headers,
            data: body
        });
        
        res.status(response.status).send(response.data);
        console.log(`Request successfully forwarded to: ${server}`);
    } catch (error) {
        console.error(`Error forwarding to ${server}: ${error.message}`);
        
        // Set server on cooldown for 10 seconds
        cooldownMap.set(server, Date.now() + 10000);
        res.status(500).send("Server error: Unable to process your request.");
    }
};

app.get('/favicon.ico', (req, res) => res.status(204).send());
app.use(handler);

// Start the load balancer on port 8080
app.listen(8080, err => {
    if (err) {
        console.error("Failed to start load balancer on PORT 8080");
    } else {
        console.log("Load Balancer listening on PORT 8080");
    }
});
