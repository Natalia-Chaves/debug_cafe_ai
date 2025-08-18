// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const chatForm = document.getElementById('chatForm');
const messagesContainer = document.getElementById('messagesContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
const charCount = document.getElementById('charCount');
const toastContainer = document.getElementById('toastContainer');



// State
let isLoading = false;
let messageHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  validateDOMElements();
  setupEventListeners();
  setupTextareaAutoResize();
  updateCharCount();
  setupMarkdown();
});

// DOM Validation
function validateDOMElements() {
  const requiredElements = {
    messageInput, sendBtn, clearBtn, chatForm, 
    messagesContainer, charCount, toastContainer
  };
  
  for (const [name, element] of Object.entries(requiredElements)) {
    if (!element) {
      console.error(`Elemento DOM não encontrado: ${name}`);
    }
  }
}

// Event Listeners
function setupEventListeners() {
  if (chatForm) {
    chatForm.addEventListener('submit', handleSubmit);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearChat);
  }
  
  if (messageInput) {
    messageInput.addEventListener('input', updateCharCount);
    messageInput.addEventListener('keydown', handleKeydown);
  }
  

}

// Auto-resize textarea
function setupTextareaAutoResize() {
  if (!messageInput) return;
  
  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
  });
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();
  
  if (!messageInput || isLoading) return;
  
  const message = messageInput.value.trim();
  if (!message) {
    showToast('Digite uma mensagem antes de enviar', 'warning');
    return;
  }
  
  if (message.length > 2000) {
    showToast('Mensagem muito longa (máximo 2000 caracteres)', 'error');
    return;
  }
  
  await sendMessage(message);
}

// Send message
async function sendMessage(message) {
  if (!messagesContainer) return;
  
  // Hide welcome message
  if (welcomeMessage) {
    welcomeMessage.style.display = 'none';
  }
  
  // Add user message
  addMessage(message, 'user');
  messageHistory.push({ role: 'user', content: message });
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  updateCharCount();
  
  // Set loading state
  setLoading(true);
  
  // Add loading message
  const loadingId = addLoadingMessage();
  
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ question: message })
    });
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Remove loading message
    removeLoadingMessage(loadingId);
    
    // Add AI response
    const aiMessage = data.answer || 'Desculpe, não consegui gerar uma resposta.';
    addMessage(aiMessage, 'assistant');
    messageHistory.push({ role: 'assistant', content: aiMessage });
    

    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    
    // Remove loading message
    removeLoadingMessage(loadingId);
    
    // Add error message
    addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.', 'assistant', true);
    
    showToast('Erro ao conectar com o servidor', 'error');

    
  } finally {
    setLoading(false);
  }
}

// Add message to chat
function addMessage(content, sender, isError = false) {
  if (!messagesContainer) return;
  
  const messageEl = document.createElement('div');
  messageEl.className = `message ${sender}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = sender === 'user' ? '👤' : '🤖';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  if (isError) bubble.style.background = 'var(--error)';
  
  // Format text for better readability
  if (sender === 'assistant') {
    // Simple text formatting for better readability
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n\n/g, '</p><p>') // Double line breaks = new paragraph
      .replace(/\n/g, '<br>'); // Single line breaks = line break
    
    bubble.innerHTML = `<p>${formattedContent}</p>`;
  } else {
    bubble.textContent = content;
  }
  
  const actions = document.createElement('div');
  actions.className = 'message-actions';
  
  if (sender === 'assistant') {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'action-btn';
    copyBtn.textContent = 'Copiar';
    copyBtn.onclick = () => copyToClipboard(content);
    actions.appendChild(copyBtn);
  }
  
  messageContent.appendChild(bubble);
  messageContent.appendChild(actions);
  
  messageEl.appendChild(avatar);
  messageEl.appendChild(messageContent);
  
  messagesContainer.appendChild(messageEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  return messageEl;
}

// Add loading message
function addLoadingMessage() {
  if (!messagesContainer) return null;
  
  const loadingEl = document.createElement('div');
  loadingEl.className = 'message assistant';
  loadingEl.id = `loading-${Date.now()}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = '🤖';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = `
    <span>Pensando</span>
    <div class="loading-dots">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  `;
  
  bubble.appendChild(loading);
  messageContent.appendChild(bubble);
  loadingEl.appendChild(avatar);
  loadingEl.appendChild(messageContent);
  
  messagesContainer.appendChild(loadingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  return loadingEl.id;
}

// Remove loading message
function removeLoadingMessage(loadingId) {
  if (!loadingId) return;
  const loadingEl = document.getElementById(loadingId);
  if (loadingEl) {
    loadingEl.remove();
  }
}

// Clear chat
function clearChat() {
  if (!messagesContainer) return;
  
  messagesContainer.innerHTML = '';
  messageHistory = [];
  
  if (welcomeMessage) {
    welcomeMessage.style.display = 'block';
  }
  
  showToast('Conversa limpa', 'success');
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Texto copiado!', 'success');
  } catch (error) {
    console.error('Erro ao copiar:', error);
    showToast('Erro ao copiar texto', 'error');
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Update character count
function updateCharCount() {
  if (!messageInput || !charCount) return;
  
  const length = messageInput.value.length;
  charCount.textContent = `${length}/2000`;
  
  if (length > 1800) {
    charCount.style.color = 'var(--error)';
  } else if (length > 1500) {
    charCount.style.color = 'var(--warning)';
  } else {
    charCount.style.color = 'var(--text-muted)';
  }
}

// Handle keyboard shortcuts
function handleKeydown(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    handleSubmit(e);
  }
}

// Set loading state
function setLoading(loading) {
  isLoading = loading;
  
  if (sendBtn) {
    sendBtn.disabled = loading;
    const span = sendBtn.querySelector('span');
    if (span) {
      span.textContent = loading ? 'Enviando...' : 'Enviar';
    }
  }
  
  if (messageInput) {
    messageInput.disabled = loading;
  }
}



// Text Formatting Setup
function setupMarkdown() {
  // Simple text formatting - no external library needed
  console.log('Text formatting initialized');
}

// Export for debugging
window.debugCafe = {
  sendMessage,
  clearChat,
  messageHistory,
  showToast
};