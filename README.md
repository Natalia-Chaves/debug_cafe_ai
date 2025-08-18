# Debug Café IA - Assistente de IA Web

## Objetivos Gerais

- Criar uma aplicação web interativa moderna tipo chat
- Integrar com API do Google Gemini
- Implementar interface conversacional intuitiva
- Gerenciar estados de loading e erro com UX profissional
- Usar APIs do navegador (clipboard, notifications)
- Criar interfaces responsivas e acessíveis
- Aplicar boas práticas de segurança e UX/UI

---

## Estrutura do Projeto

```
debug-cafe-ia/
├── backend/
│   ├── server.js
│   ├── controllers/
│   │   └── chatController.js
│   ├── routes/
│   │   └── chatRoutes.js
│   └── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       ├── icons/
│       └── img/
├── .env
├── .gitignore
├── package.json
├── vercel.json
├── install.bat
├── start.bat
└── README.md
```

## Funcionalidades Implementadas

### ✨ Interface Moderna
- **Design tipo chat** - Interface conversacional similar ao ChatGPT
- **Tipografia Inter** - Fonte moderna e legível
- **Esquema de cores "Debug Café"** - Tons de café profissionais
- **Animações suaves** - Transições e micro-interações
- **Header/Footer fixos** - Layout profissional full-width

### 💬 Experiência de Chat
- **Mensagens em bolhas** - Visual familiar de aplicativos de chat
- **Avatares** - Usuário (👤) e IA (🤖)
- **Histórico visual** - Conversa completa mantida na tela
- **Loading animado** - Indicador "Pensando..." com dots animados
- **Textarea expansível** - Cresce automaticamente com o texto

### ⚡ Funcionalidades Avançadas
- **Sistema de notificações** - Toasts modernos no canto superior
- **Copiar mensagens** - Botão em cada resposta da IA
- **Atalhos de teclado** - Ctrl+Enter para enviar
- **Contador de caracteres** - Limite de 2000 caracteres com indicador visual
- **Validação robusta** - Entrada e tipos validados
- **Estados visuais** - Loading, success, error, warning
- **Formatação de texto** - Negrito, itálico e parágrafos automáticos
- **Markdown Rendering** - Respostas formatadas com suporte completo

### 🔒 Segurança Implementada
- **Helmet** - Headers de segurança
- **Rate Limiting** - Proteção contra spam (100 req/15min)
- **CORS específico** - Apenas origins autorizados
- **Validação de entrada** - Sanitização e validação de inputs
- **Proteção CSRF** - Headers obrigatórios
- **Winston Logger** - Logs estruturados e seguros

### 📱 Responsividade Total
- **Mobile-first** - Otimizado para dispositivos móveis
- **Breakpoints inteligentes** - Adapta em qualquer tamanho de tela
- **Touch-friendly** - Botões e áreas de toque adequadas
- **Layout flexível** - Funciona em desktop, tablet e mobile

### ♿ Acessibilidade
- **ARIA labels** - Compatível com screen readers
- **Focus management** - Navegação por teclado completa
- **Contraste adequado** - Cores acessíveis
- **Reduced motion** - Respeita preferências do usuário

---

## Configuração e Uso

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **Chave de API do Google Gemini**
- **Editor de código** (VS Code recomendado)

### Instalação Rápida

#### Opção 1: Scripts Automáticos (Windows)
```bash
# Instalar tudo automaticamente
install.bat

# Iniciar servidor
start.bat
```

#### Opção 2: Manual
```bash
# Instalar dependências
cd backend
npm install

# Configurar .env (veja seção abaixo)
# Iniciar servidor
npm start
```

#### Opção 3: Usando package.json da raiz
```bash
# Instalar dependências
npm run setup

# Iniciar servidor
npm start
```

### Configuração da API Gemini

1. **Obter chave da API Gemini**
   - Acesse https://aistudio.google.com/
   - Faça login com sua conta Google
   - Clique em "Get API Key" ou "Criar chave de API"
   - Copie a chave gerada

2. **Configurar variáveis de ambiente**
   Criar arquivo `.env` na raiz:
   ```ini
   PORT=3000
   GEMINI_API_KEY=sua_chave_aqui
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
   ```

### Fluxo da Aplicação

1. Usuário acessa `http://localhost:3000`
2. Interface de chat carrega com mensagem de boas-vindas
3. Usuário digita pergunta no campo de texto
4. Clica "Enviar" ou usa Ctrl+Enter
5. IA processa e responde em tempo real
6. Usuário pode copiar respostas ou limpar conversa
7. Histórico mantido durante a sessão

---

# Desenvolvimento

## Arquitetura

### Backend (Node.js + Express)
- **server.js** - Servidor principal com middlewares de segurança
- **chatController.js** - Lógica de integração com API Gemini
- **chatRoutes.js** - Rotas da API com validação
- **Middlewares**: Helmet, Rate Limiting, CORS, Winston Logger

### Frontend (Vanilla JS + CSS)
- **index.html** - Estrutura semântica moderna com acessibilidade
- **style.css** - Design system com variáveis CSS e responsividade
- **script.js** - Lógica de chat com validação e UX avançada

### Segurança Implementada
- Headers de segurança (Helmet)
- Rate limiting (100 req/15min)
- CORS restritivo
- Validação de entrada
- Sanitização de logs
- Proteção CSRF via headers

### Melhorias de Qualidade
- Logs estruturados (Winston)
- Validação DOM robusta
- Error handling completo
- Notificações visuais
- Estados de loading
- Tipografia profissional

## Dependências

### Backend
```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.3.1", 
  "express": "^4.19.2",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "validator": "^13.11.0",
  "winston": "^3.11.0"
}
```

### Frontend
- **Vanilla JavaScript** - Sem frameworks para performance
- **CSS Variables** - Sistema de design consistente
- **Inter Font** - Tipografia moderna do Google Fonts
- **Formatação de texto** - Sistema próprio para negrito, itálico e parágrafos
- **Marked.js** - Biblioteca para renderização de Markdown

## Scripts Disponíveis

### Raiz do projeto
- `npm run setup` - Instala dependências do backend
- `npm start` - Inicia o servidor
- `npm run dev` - Modo desenvolvimento com nodemon

### Backend
- `npm start` - Inicia servidor em produção
- `npm run dev` - Modo desenvolvimento com auto-reload

## Testes

### Teste via Terminal
```bash
# Windows PowerShell
curl.exe -X POST http://localhost:3000/api/ask `
  -H "Content-Type: application/json" `
  -H "X-Requested-With: XMLHttpRequest" `
  -d "{\"question\": \"Olá, como você está?\"}"

# Linux/Mac
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  -d '{"question": "Olá, como você está?"}'
```

### Teste via Navegador
1. Acesse `http://localhost:3000`
2. Digite uma pergunta
3. Verifique a resposta da IA
4. Teste funcionalidades (copiar, limpar, etc.)

---

## Deploy no Vercel

### 🚀 Deploy Rápido

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer deploy
vercel

# 3. Configurar variáveis no dashboard Vercel
```

### 📋 Passo a Passo

1. **Preparar código**
   ```bash
   git add .
   git commit -m "feat: deploy ready"
   git push origin main
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Conecte com GitHub
   - Confirme configurações
   - Deploy automático

3. **Configurar variáveis**
   - Acesse dashboard Vercel
   - Vá em Settings > Environment Variables
   - Adicione:
     - `GEMINI_API_KEY` = sua_chave_real
     - `NODE_ENV` = production

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### ⚙️ Configuração Automática

O arquivo `vercel.json` já está configurado:
- Build: Node.js
- Rotas: API + Static files
- Ambiente: Production

### 🌐 Variáveis Necessárias
```ini
GEMINI_API_KEY=sua_chave_real
NODE_ENV=production
```

---

## Contribuição

### Padrões de Código
- **ESLint** - Linting JavaScript
- **Prettier** - Formatação de código
- **Semantic commits** - Mensagens de commit padronizadas
- **CSS BEM** - Metodologia para classes CSS

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: ajustes de estilo/formatação
refactor: refatoração de código
test: adiciona/modifica testes
```

---

## Licença

© 2025 Debug Café - Assistente de IA

---

## Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências estão instaladas
2. Confirme se a chave da API Gemini está correta
3. Verifique os logs do servidor para erros
4. Teste a conectividade com a API Gemini