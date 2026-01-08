const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let history = [];

// Save evaluation results
app.post('/api/report', (req, res) => {
    const report = req.body;
    history.push(report);
    res.json({ message: "Report saved!", report });
});

// Get all past reports
app.get('/api/history', (req, res) => {
    res.json(history);
});

app.listen(5000, () => console.log("Backend running on port 5000"));