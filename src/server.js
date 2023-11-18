import 'dotenv/config'; // Reemplaza require('dotenv').config();
import express from 'express';
import { OpenAI } from 'openai'; // Nota el uso de destructuring aquí
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Utiliza la clave API desde las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// bodyParser.json() es parte de express a partir de la versión 4.16+
app.use(express.json());

app.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;

        // Cambios en la API pueden requerir que ajustes esta parte
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