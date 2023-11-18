require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Utiliza la clave API desde las variables de entorno
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.createCompletion({
            model: "gpt-4",
            prompt: message,
            max_tokens: 150
        });

        res.json({ response: compwwwletion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
