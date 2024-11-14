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
    { url: "https://notdilbarsl-github-io.onrender.com", host: "notdilbarsl-github-io.onrender.com" },
    { url: "https://notdilbarsl-github-io-1.onrender.com", host: "notdilbarsl-github-io-1.onrender.com" }
];
let currentServerIndex = 0;

// Function to handle requests and forward them with the correct host header
const handler = async (req, res) => {
    const { method, url, body } = req;
    const server = servers[currentServerIndex];

    // Update to the next server for round-robin
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    const requestUrl = `${server.url}${url}`;
    console.log(`Forwarding request to: ${requestUrl}`);

    try {
        const response = await axios({
            url: requestUrl,
            method: method,
            headers: {
                ...req.headers,
                Host: server.host // Set the Host header explicitly
            },
            data: body,
            timeout: 5000
        });

        res.status(response.status).send(response.data);
        console.log(`Forwarded request to: ${server.url}`);
    } catch (error) {
        console.error(`Error forwarding to ${server.url}: ${error.message}`);
        res.status(500).send("Server error");
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
