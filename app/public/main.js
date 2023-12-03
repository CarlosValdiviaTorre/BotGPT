document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messageArea = document.getElementById('message-area');

    // Función para enviar el mensaje y recibir la respuesta
    async function sendMessage(message) {
        try {
            const response = await fetch('/api/test', {  // Cambiado a /test
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            displayMessage(data.message, 'bot');  // Cambiado para mostrar el mensaje de prueba
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    }

    // Función para mostrar el mensaje en la pantalla
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;

        messageArea.appendChild(messageDiv);

        // Desplaza el área de mensajes al último mensaje
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();

        if (message) {
            displayMessage(message, 'user');
            sendMessage(message);
            userInput.value = ''; // Limpia el campo de entrada
        }
    });

    // Opcional: enviar mensaje al presionar 'Enter'
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
});
