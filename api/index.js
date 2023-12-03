import 'dotenv/config';
import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors'; // Importa cors

const app = express();
const port = process.env.PORT || 3000;
console.log("Hola soy el servidor")

// Utiliza la clave API desde las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Habilita CORS para todas las rutas
app.use(cors());

// bodyParser.json() es parte de express a partir de la versión 4.16+
app.use(express.json());

app.post('/api/ask', async (req, res) => {
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

app.post('/api/test', (req, res) => {
    res.json({ message: 'Test endpoint works!' });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
