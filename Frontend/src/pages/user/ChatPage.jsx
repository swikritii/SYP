import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { apiClient } from '../../services/apiClient';
import { Send, User } from 'lucide-react';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // Load history
        const fetchHistory = async () => {
            try {
                const history = await apiClient.get('/chat/history');
                setMessages(history);
                scrollToBottom();
            } catch (err) {
                console.error('Failed to fetch chat history', err);
            }
        };
        fetchHistory();

        // Connect socket
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('receive_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
            scrollToBottom();
        });

        return () => newSocket.close();
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        socket.emit('send_message', {
            userId: user.id,
            userName: user.name,
            message: newMessage.trim()
        });

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-lg text-gray-900">Looking for Players / Team Hub</h2>
                    <p className="text-sm text-gray-500">Chat with other players to form teams or find a match.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No messages yet. Be the first to say hi!</div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMe = msg.user_id === user.id;
                        return (
                            <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                    <span className="text-xs text-gray-500 mb-1 px-1">{msg.user_name}</span>
                                    <div className={`px-4 py-2 rounded-2xl ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                                        <p className="text-sm">{msg.message}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
