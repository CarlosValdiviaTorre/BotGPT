const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Asegúrate de reemplazar esto con tu clave de API real y mantenerla protegida.
const openai = new OpenAI('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');

app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.createCompletion({
            model: "gpt-4",
            prompt: message,
            max_tokens: 150
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
