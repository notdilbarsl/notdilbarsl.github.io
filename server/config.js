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

// Function to handle requests and forward them in a round-robin manner
const handler = async (req, res) => {
    const { method, url, headers, body } = req;
    const server = servers[currentServerIndex];
    
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
