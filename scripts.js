async function sendMessage() {
    const inputField = document.getElementById('message-input');
    const messageText = inputField.value.trim();
    if (messageText === "") return;

    const chatBody = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `
        <div class="avatar user-avatar"></div>
        <div class="message-content">
            <span class="message-text">${messageText}</span>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
    `;
    chatBody.appendChild(userMessage);

    inputField.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: messageText }]
            })
        });

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.innerHTML = `
            <div class="avatar bot-avatar"></div>
            <div class="message-content">
                <span class="message-text">${data.choices[0].message.content}</span>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'bot-message');
        errorMessage.innerHTML = `
            <div class="avatar bot-avatar"></div>
            <div class="message-content">
                <span class="message-text">Error: Unable to fetch response</span>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatBody.appendChild(errorMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Add event listener for Enter key
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});