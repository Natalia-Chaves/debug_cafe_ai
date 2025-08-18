const express = require("express");
const winston = require('winston');
const { handleChat } = require("../controllers/chatController");

const router = express.Router();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Simple CSRF-like protection by checking headers
const simpleCSRFProtection = (req, res, next) => {
  const requestedWith = req.get('X-Requested-With');
  if (req.method === 'POST' && !requestedWith) {
    return res.status(403).json({ error: 'Forbidden: Missing required header' });
  }
  next();
};

router.post("/ask", simpleCSRFProtection, handleChat);

logger.info('Rotas do chat carregadas com sucesso');

module.exports = router;