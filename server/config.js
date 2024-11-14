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

    // Attempt to find an available server
    let attempts = 0;
    let server;
    while (attempts < servers.length) {
        const serverIndex = (currentServerIndex + attempts) % servers.length;
        server = servers[serverIndex];
        const cooldown = cooldownMap.get(server);

        // Check if the server is under cooldown
        if (!cooldown || cooldown < Date.now()) {
            currentServerIndex = serverIndex;  // Set the next available server as current
            break;
        }

        attempts++;
    }

    if (!server) {
        return res.status(500).send("All servers are unavailable due to cooldown periods.");
    }

    // Update to the next server for round-robin
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    try {
        const response = await axios({
            url: `${server}${url}`,
            method: method,
            headers: headers,
            data: body
        });
        
        res.status(response.status).send(response.data);
        console.log(`Forwarded request to: ${server}`);
    } catch (error) {
        console.error(`Error forwarding to ${server}: ${error.message}`);

        // If error, set server on cooldown for 10 seconds
        cooldownMap.set(server, Date.now() + 10000);

        // Attempt a fallback to the next server in case of an error
        const fallbackServer = servers[(currentServerIndex + 1) % servers.length];
        try {
            const fallbackResponse = await axios({
                url: `${fallbackServer}${url}`,
                method: method,
                headers: headers,
                data: body
            });
            
            res.status(fallbackResponse.status).send(fallbackResponse.data);
            console.log(`Fallback to: ${fallbackServer}`);
        } catch (fallbackError) {
            console.error(`Fallback error to ${fallbackServer}: ${fallbackError.message}`);
            res.status(500).send("All servers are unavailable");
        }
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
