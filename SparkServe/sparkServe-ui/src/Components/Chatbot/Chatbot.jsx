import React, { useState } from 'react';
import '../Chatbot/Chatbot.css';
import logo from '../../assets/logo2.png'; // Adjust this path if necessary

const predefinedEmojis = [
    { character: '😀', slug: 'grinning' },
    { character: '😁', slug: 'grin' },
    { character: '😂', slug: 'joy' },
    { character: '🤣', slug: 'rofl' },
    { character: '😃', slug: 'smiley' },
    { character: '😄', slug: 'smile' },
    { character: '😅', slug: 'sweat_smile' },
    { character: '😆', slug: 'laughing' },
    { character: '😉', slug: 'wink' },
    { character: '😊', slug: 'blush' },
    // Add more emojis as needed
];

const Chatbot = () => {
    const [messages, setMessages] = useState([{ text: 'Hi, how can I help you?', from: 'bot' }]);
    const [message, setMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const newMessages = [...messages, { text: message, from: 'user' }];
            setMessages(newMessages);
            const userId = 3; // Replace with the actual user ID

            try {
                const response = await fetch('http://localhost:3000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, prompt: message }),
                });

                const data = await response.json();

                setMessages([
                    ...newMessages,
                    { text: data.response, from: 'bot' },
                ]);

                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClose = () => {
        setIsMinimized(true);
    };

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleEmojiClick = (emoji) => {
        setMessage(message + emoji.character);
        setShowEmojiPicker(false);
    };

    return (
        <>
            {!isMinimized ? (
                <div className={`chatbot-container ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="chatbot-header">
                        <img src={logo} alt="Website Logo" className="chatbot-logo" />
                        <p>Hello, lets chat!</p>
                        <div className="button-group">
                            <button onClick={handleCollapse} className="button collapse-button">
                                {isCollapsed ? (
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" fillRule="evenodd"></path>
                                        <path d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" fillRule="evenodd"></path>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fillRule="evenodd"></path>
                                        <path d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fillRule="evenodd"></path>
                                    </svg>
                                )}
                            </button>
                            <button onClick={handleClose} className='button close-button'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z " ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {!isCollapsed && (
                        <>
                            <div className="messages-container">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.from}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                                <button className="send-button" onClick={handleSendMessage}>
                                    <div className="svg-wrapper-1">
                                        <div className="svg-wrapper">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="15"
                                                height="15"
                                            >
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path
                                                    fill="currentColor"
                                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {showEmojiPicker && (
                                <div className="emoji-picker">
                                    {predefinedEmojis.map((emoji) => (
                                        <span key={emoji.slug} onClick={() => handleEmojiClick(emoji)}>
                                            {emoji.character}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="chatbot-minimized" onClick={() => setIsMinimized(false)}>
                    <img src={logo} alt="Chatbot Logo" className="minimized-logo" />
                    <p className="minimized-text">How can I help you?</p>
                </div>
            )}
        </>
    );
};

export default Chatbot;
