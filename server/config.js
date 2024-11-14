const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://notdilbarsl.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const servers = [
    { url: "https://notdilbarsl-github-io.onrender.com", host: "notdilbarsl-github-io.onrender.com" },
    { url: "https://notdilbarsl-github-io-1.onrender.com", host: "notdilbarsl-github-io-1.onrender.com" }
];
let currentServerIndex = 0;

const handler = async (req, res) => {
    const { method, url, headers, body } = req;

    // Select the server based on currentServerIndex for round-robin
    const server = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length; // Update for round-robin

    // Set Host header conditionally based on current server
    const hostHeader =
        currentServerIndex === 0
            ? 'notdilbarsl-github-io.onrender.com'
            : 'notdilbarsl-github-io-1.onrender.com';

    try {
        // Construct the full request URL
        const requestUrl = `${server}${url}`;

        const response = await axios({
            url: requestUrl,
            method: method,
            headers: {
                ...headers,
                Host: hostHeader,
            },
            data: body,
        });

        res.status(response.status).send(response.data);
        console.log(`Forwarded request to: ${requestUrl}`);
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
