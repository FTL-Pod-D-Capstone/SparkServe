import React, { useState, useEffect, useRef } from 'react';
import '../Chatbot/Chatbot.css';
import Lottie from 'lottie-react';
import logo from '../../assets/logo2.png'; // Adjust this path if necessary
import sparkieAnimation from '../../assets/Sparkie.json'; //this is the sparkie.json for the lottie
const quickReplies = [
    "Tell me about volunteer opportunities.",
    "What is the latest event?",
    "How can I get involved?",
    "Can you recommend something for me?"
];

const Chatbot = () => {
    const [messages, setMessages] = useState([{ text: 'Hello! I am Sparkie. How can I help you?', from: 'bot' }]);
    const [message, setMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const newMessages = [...messages, { text: message, from: 'user' }];
            setMessages(newMessages);
            const userId = 1; // Replace with the actual user ID not hardcoded 

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

    const handleQuickReply = async (text) => {
        setMessage(text);
        
        const newMessages = [...messages, { text: text, from: 'user' }];
        setMessages(newMessages);
        const userId = 1; // Replace with the actual user ID not hardcoded 
    
        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, prompt: text }),
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

    return (
        <>
            {!isMinimized ? (
                <div className={`chatbot-container ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="chatbot-header">
                        <img src={logo} alt="Website Logo" className="chatbot-logo" />
                        <p>Hello, let&apos;s chat!</p>
                        <div className="button-group">
                            <button onClick={handleCollapse} className="collapse-button">
                                {isCollapsed ? (
                                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
                                        <title>collapse-line</title>
                                        <path className="clr-i-outline clr-i-outline-path-1" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path>
                                        <path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path>
                                        <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                                    </svg>
                                ) : (
                                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" >
                                        <title>collapse-line</title>
                                        <path className="clr-i-outline clr-i-outline-path-1" d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"></path>
                                        <path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path>
                                        <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
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
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="quick-replies">
                                {quickReplies.map((reply, index) => (
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
                        </>
                    )}
                </div>
            ) : (
                <div className="chatbot-minimized" onClick={() => setIsMinimized(false)}>
                    <Lottie animationData={sparkieAnimation} className="minimized-logo" />
                    <p className="minimized-text">How can I help you?</p>
                </div>
            )}
        </>
    );
};

export default Chatbot;
