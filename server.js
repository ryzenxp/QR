
const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qrcode');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
    try {
        const text = req.body.text;
        if (!text) {
            return res.status(400).json({ error: 'Please provide text.' });
        }

        const qrCode = await qr.toDataURL(text);
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
