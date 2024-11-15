const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://notdilbarsl.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

let servers = [
    { url: "https://notdilbarsl-github-io.onrender.com", host: "notdilbarsl-github-io.onrender.com", healthy: true },
    { url: "https://notdilbarsl-github-io-1.onrender.com", host: "notdilbarsl-github-io-1.onrender.com", healthy: true }
];
let currentServerIndex = 0;

function getNextServer() {
    const healthyServers = servers.filter(server => server.healthy);
    if (healthyServers.length === 0) {
        throw new Error("No healthy servers available");
    }
    const server = healthyServers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % healthyServers.length;
    return server;
}

async function checkServerHealth() {
    for (const server of servers) {
        try {
            const healthResponse = await axios.get(`${server.url}/health`);
            server.healthy = healthResponse.status === 200;
            console.log(`${server.url} is healthy`);
        } catch (error) {
            server.healthy = false;
            console.error(`${server.url} is unhealthy: ${error.message}`);
        }
    }
}

setInterval(checkServerHealth, 10000);

const handler = async (req, res) => {
    const { method, url, headers, body } = req;
    try {
        const server = getNextServer();
        const requestUrl = `${server.url}${url}`;
        console.log(`Forwarding request to: ${requestUrl} with method ${method}`);
        const response = await axios({
            url: requestUrl,
            method: method,
            headers: {
                ...req.headers,
                Host: server.host,
            },
            data: body,
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(`Error forwarding request: ${error.message}`);
        res.status(500).send("Server error!");
    }
};

app.get('*', handler);
app.post('*', handler);

app.listen(8080, err => {
    if (err) {
        console.error("Failed to start load balancer on PORT 8080");
    } else {
        console.log("Load Balancer listening on PORT 8080");
    }
});

checkServerHealth();
