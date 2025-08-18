require("dotenv").config({ path: require("path").resolve(__dirname, "..", "..", ".env") });
const winston = require("winston");
const validator = require("validator");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// Validate Gemini API URL
if (GEMINI_API_URL && !validator.isURL(GEMINI_API_URL, { protocols: ['https'] })) {
  throw new Error('GEMINI_API_URL deve ser uma URL HTTPS válida');
}

logger.info('ChatController inicializado com sucesso');

async function handleChat(req, res) {
  const { question } = req.body;

  // Input validation
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Pergunta é obrigatória e deve ser texto.' });
  }



  // Sanitize input for logging
  const sanitizedQuestion = validator.escape(question.substring(0, 100));

  try {
    if (!GEMINI_API_KEY || !GEMINI_API_URL) {
        logger.error('Configuração do servidor incompleta');
        return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
    }

    logger.info(`Processando pergunta: ${sanitizedQuestion}...`);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: question,
          }],
        }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error(`Erro da API Gemini: ${response.status}`);
      return res.status(response.status).json({ error: `⚠️ Erro ao obter resposta do Gemini. Status: ${response.status}` });
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta';

    res.json({ answer });

  } catch (error) {
    logger.error('Erro no servidor:', { message: error.message });
    res.status(500).json({ error: '❌ Ocorreu um erro no servidor!!' });
  }
}

module.exports = { handleChat };