const express = require('express');
const mongoose = require('mongoose');
const Leaderboard = require('./models/score'); // Import the Leaderboard model
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://notdilbarsl:Rise1.618@gridrunner.onl43.mongodb.net/?retryWrites=true&w=majority&appName=GridRunner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});

// POST - Submit a score
app.post('/submit-score', async (req, res) => {
    const { playerName, gridSize, mineCount, tries } = req.body;

    try {
        // Create a new score entry
        const newScore = new Leaderboard({ playerName, gridSize, mineCount, tries });
        await newScore.save(); // Save the entry to the database
        res.status(200).json({ message: 'Score submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting score', error });
    }
});

// GET - Fetch the leaderboard for a specific grid size and mine count
app.get('/leaderboard', async (req, res) => {
    const { gridSize, mineCount } = req.query;

    try {
        // Fetch leaderboard sorted by 'tries' in ascending order, limit to top 10 scores
        const leaderboard = await Leaderboard.find({ gridSize, mineCount }).sort({ tries: 1 }).limit(10);
        res.status(200).json(leaderboard); // Return leaderboard data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
