// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../Chatbot/Chatbot.css';
import Lottie from 'lottie-react';
import logo from '../../assets/logo2.png';
import sparkieAnimation from '../../assets/Sparkie.json';

// Define quick reply options
const QUICK_REPLIES = [
    "Tell me about volunteer opportunities.",
    "What is the latest event?",
    "How can I get involved?",
    "Can you recommend something for me?"
];

// Chatbot component
const Chatbot = () => {
    // State management
    const [messages, setMessages] = useState([{ text: 'Hello! I am Sparkie. How can I help you?', from: 'bot' }]);
    const [message, setMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed
    const [isMinimized, setIsMinimized] = useState(true); // Start minimized
    const messagesEndRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);




    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => setShowPopup(true), 1000);
        // Hide popup after 5 seconds
        const hideTimer = setTimeout(() => setShowPopup(false), 6000);
        
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Handle sending a message
    const handleSendMessage = async (textToSend) => {
        if (textToSend.trim() !== '') {
            const newMessages = [...messages, { text: textToSend, from: 'user' }];
            setMessages(newMessages);
            const userId = 1; // TODO: Replace with actual user ID

            try {
                const response = await fetch(`https://project-1-uljs.onrender.com/api/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, prompt: textToSend }),
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

    // Handle quick reply selection
    const handleQuickReply = async (text) => {
        setMessage(text);
        await handleSendMessage(text);
    };

    // Handle key press (Enter to send)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(message);
        }
    };

    // Toggle chatbot visibility
    const toggleChatbot = () => {
        setIsMinimized(!isMinimized);
        setIsCollapsed(false);
    };

    // Toggle collapse state
    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        
        <div className={`chatbot-wrapper ${isMinimized ? 'minimized' : ''}`}>
            {isMinimized ? (
                <>
                    <div className={`chatbot-popup ${showPopup ? 'show' : ''}`}>
                        Need help? I'm here! 😊
                    </div>
                    <div className="chatbot-minimized" onClick={toggleChatbot}>
                        <Lottie animationData={sparkieAnimation} className="minimized-logo" />
                        <p className="minimized-text">How can I help you?</p>
                    </div>
                </>
            ) : (
                <div className={`chatbot-container ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="chatbot-header">
                        <img src={logo} alt="Website Logo" className="chatbot-logo" />
                        {/* <p>Hello, let's chat!</p> */}
                        <div className="button-group">
                            <button onClick={handleCollapse} className="collapse-button">
                                {isCollapsed ? '▼' : '▲'}
                            </button>
                            <button onClick={toggleChatbot} className='button close-button'>
                                ×
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
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="quick-replies">
                                {QUICK_REPLIES.map((reply, index) => (
                                    <button key={index} onClick={() => handleQuickReply(reply)} className="quick-reply-button">
                                        {reply}
                                    </button>
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
                                <button className="send-button" onClick={() => handleSendMessage(message)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            fill="currentColor"
                                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;