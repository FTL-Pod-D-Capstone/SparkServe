import React, { useState, useEffect, useRef } from "react";
import "../Chatbot/Chatbot.css";
import Lottie from "lottie-react";
import logo from "../../assets/logo2.png";
import sparkieAnimation from "../../assets/Sparkie.json";
import axios from "axios";

// Define quick reply options
const QUICK_REPLIES = [
  "SparkServe?",
  "Can you tell me about volunteer opportunities.",
  "What is the latest event?",
  "How can I get involved?",
  "Can you recommend something for me?",
];

// Chatbot component
const Chatbot = () => {
  // State management
  const [messages, setMessages] = useState([
    { text: "Hello! I am Sparkie. How can I help you?", from: "bot" },
  ]);
  const [message, setMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed
  const [isMinimized, setIsMinimized] = useState(true); // Start minimized
  const [isQuickRepliesMinimized, setIsQuickRepliesMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true); // Start with popup visible
  const [chatHistory, setChatHistory] = useState([]); // New state for chat history

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle popup visibility
  useEffect(() => {
    setShowPopup(true);
    const hidePopupTimeout = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    const showPopupInterval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }, 8000);
    return () => {
      clearTimeout(hidePopupTimeout);
      clearInterval(showPopupInterval);
    };
  }, []);

  // Fetch chat history when component mounts
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchChatHistory(userId);
    }
  }, []);

  // Function to fetch chat history
  const fetchChatHistory = async (userId) => {
    try {
      const response = await axios.get(
        `https://project-1-uljs.onrender.com/api/chat/history/${userId}`
      );
      // Transform the data to match the format of current messages
      const formattedHistory = response.data.flatMap((interaction) => [
        { text: interaction.prompt, from: "user" },
        { text: interaction.response, from: "bot" },
      ]);
      setChatHistory(formattedHistory.reverse()); // Reverse to show oldest first
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (textToSend) => {
    if (textToSend.trim() !== '') {  
        const newMessages = [...messages, { text: textToSend, from: 'user' }];
        setMessages(newMessages);
        const userId = localStorage.getItem('userId') || 1;

        try {
            const response = await axios.post(`https://project-1-uljs.onrender.com/api/chat`, {
                userId,
                prompt: textToSend,
            });

            setMessages([
                ...newMessages,
                { text: response.data.response, from: 'bot' },
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
    if (e.key === "Enter") {
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

  // Toggle quick replies visibility
  const toggleQuickReplies = () => {
    setIsQuickRepliesMinimized(!isQuickRepliesMinimized);
  };

  return (
    <div className={`chatbot-wrapper ${isMinimized ? "minimized" : ""}`}>
      {isMinimized ? (
        // Minimized chatbot view
        <>
          <div className={`chatbot-popup ${showPopup ? "show" : ""}`}>
            Need help? I'm here! 😊
          </div>
          <div className="chatbot-minimized" onClick={toggleChatbot}>
            <Lottie
              animationData={sparkieAnimation}
              className="minimized-logo"
            />
            <p className="minimized-text">How can I help you?</p>
          </div>
        </>
      ) : (
        // Expanded chatbot view
        <div className={`chatbot-container ${isCollapsed ? "collapsed" : ""}`}>
          {/* Chatbot header */}
          <div className="chatbot-header">
            <img src={logo} alt="Website Logo" className="chatbot-logo" />
            <div className="button-group">
              <button onClick={handleCollapse} className="collapse-button">
                {isCollapsed ? "▼" : "▲"}
              </button>
              <button onClick={toggleChatbot} className="button close-button">
                ×
              </button>
            </div>
          </div>
          {!isCollapsed && (
            <>
              {/* Messages container */}
              <div className="messages-container">
                {chatHistory.map((msg, index) => (
                  <div
                    key={`history-${index}`}
                    className={`message ${msg.from}`}
                  >
                    {msg.text}
                  </div>
                ))}
                {messages.map((msg, index) => (
                  <div
                    key={`current-${index}`}
                    className={`message ${msg.from}`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {/* Quick replies section */}
              <div className="quick-replies-container">
                <div
                  className="quick-replies-header"
                  onClick={toggleQuickReplies}
                >
                  Quick Replies {isQuickRepliesMinimized ? "▼" : "▲"}
                </div>
                {!isQuickRepliesMinimized && (
                  <div className="quick-replies">
                    {QUICK_REPLIES.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="quick-reply-button"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Input container */}
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="send-button"
                  onClick={() => handleSendMessage(message)}
                >
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
