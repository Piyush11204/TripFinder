import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Users, MessageSquare, Volume2, Mic, MapPin, Image, Upload } from 'lucide-react';

const NameModal = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to TripFinder Community Page       !</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-500 transition duration-200"
            disabled={!name.trim()}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentRoom, setCurrentRoom] = useState('General');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(true);
  const messagesEndRef = useRef(null);
  const socket = useRef();
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userName) {
      socket.current = io('http://localhost:8080' || 'https://tripfinder-chat-app.herokuapp.com');
      socket.current.emit('join room', currentRoom);

      socket.current.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.current.on('user count', (count) => {
        setOnlineUsers(count);
      });

      setupSpeechRecognition();

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userName]);



  useEffect(() => {
    setMessages([]);
    if (socket.current) {
      socket.current.emit('leave room', currentRoom);
      socket.current.emit('join room', currentRoom);
    }
  }, [currentRoom]);

  const setupSpeechRecognition = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = `${userName}: ${input}`;
      socket.current.emit('chat message', { room: currentRoom, message });
      setInput('');
    }
  };

  const handleImageShare = () => {
    if (imageURL.trim()) {
      const message = `${userName} shared an image: <img src="${imageURL}" class="w-32 h-32 cursor-pointer" alt="Shared content" />`;
      socket.current.emit('chat message', { room: currentRoom, message });
      setImageURL('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const message = `${userName} shared an image: <img src="${reader.result}" class="w-32 h-32 cursor-pointer" alt="Shared content" />`;
        socket.current.emit('chat message', { room: currentRoom, message });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextToSpeech = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeechToText = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `
            ${userName} shared their location:
            <iframe
              src="https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"
              width="400"
              height="300"
              frameborder="0"
              style="border:0;"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              class="mt-2 w-full max-w-lg"
            ></iframe>
          `;
          socket.current.emit('chat message', { room: currentRoom, message: locationMessage });
        },
        () => {
          alert('Unable to fetch your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowModal(false);
  };

  return (
    <>
      <NameModal isOpen={showModal} onSubmit={handleNameSubmit} />
      <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
        <h2 className="text-4xl mt-14 font-extrabold text-center mb-8 text-violet-700">
          TripFinder Community {userName ? `- Welcome, ${userName}!` : ''}
        </h2>

        <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="mr-2" />
              <span className="font-bold text-lg">{currentRoom} Room</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2" />
              <span className="font-semibold">{onlineUsers} online</span>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg my-2 shadow-md ${
                  msg.includes(`${userName}:`) ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
                } max-w-3/4`}
                dangerouslySetInnerHTML={{ __html: msg }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-100">
            <form onSubmit={handleFormSubmit} className="flex space-x-2">
              <select
                className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setCurrentRoom(e.target.value)}
                value={currentRoom}
              >
                <option value="General">General</option>
                <option value="Sports">Hotels</option>
                <option value="Technology">Trips</option>
                <option value="Music">International Trips</option>
              </select>
              <input
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <Send size={20} />
              </button>
            </form>

            <div className="flex mt-4 space-x-2">
              <div className="flex-grow flex space-x-2">
                <input
                  type="url"
                  className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste image URL here..."
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
                <button
                  onClick={handleImageShare}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
                >
                  <Image size={20} className="mr-2" />
                  Share URL Image
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center"
              >
                <Upload size={20} className="mr-2" />
                Upload Image
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleTextToSpeech}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center shadow-lg"
          >
            <Volume2 size={20} className="mr-2" />
            Read Last Message
          </button>

          <button
            onClick={handleSpeechToText}
            className={`${
              isListening ? 'bg-yellow-600' : 'bg-blue-600'
            } text-white p-3 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center shadow-lg`}
          >
            <Mic size={20} className="mr-2" />
            {isListening ? 'Listening...' : 'Start Speaking'}
          </button>

          <button
            onClick={handleLocationShare}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center shadow-lg"
          >
            <MapPin size={20} className="mr-2" />
            Share Location
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatApp;