const express = require('express');
const mongoose = require('mongoose');
const Leaderboard = require('./models/score');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://notdilbarsl:Rise1.618@gridrunner.onl43.mongodb.net/?retryWrites=true&w=majority&appName=GridRunner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});

app.post('/submit-score', async (req, res) => {
    const { playerName, gridSize, mineCount, tries } = req.body;

    try {
        const newScore = new Leaderboard({ playerName, gridSize, mineCount, tries });
        await newScore.save();
        res.status(200).json({ message: 'Score submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting score', error });
    }
});

module.exports = app;

app.get('/leaderboard', async (req, res) => {
    const { gridSize, mineCount } = req.query;

    try {
        const leaderboard = await Leaderboard.find({ gridSize, mineCount }).sort({ tries: 1 }).limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
