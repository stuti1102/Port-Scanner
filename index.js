const express = require('express');
const path = require('path');
const { scanIPRange } = require('./scanner');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/scan', async (req, res) => {
    const { ip, ports, timeout } = req.body;
    if (!ip || !ports) {
        return res.status(400).json({ error: 'Please provide IPs and ports.' });
    }

    const results = await scanIPRange(ip, ports, parseInt(timeout) || 2000);
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
