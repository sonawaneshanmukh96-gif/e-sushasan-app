'use client';

import { useRole } from '@/context/RoleContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function ChatWidget() {
    const { role } = useRole();
    const [isOpen, setIsOpen] = useState(false);

    // Mock Chats
    const chats = role === 'SUBORDINATE'
        ? [{ id: 1, name: 'Dr. A. Patil (HOD)', lastMsg: 'Please submit the report by 5 PM.', online: true }]
        : (role === 'HOD'
            ? [
                { id: 1, name: 'Mr. S. Deshmukh (Taluka HO)', lastMsg: 'Report submitted for review.', online: true },
                { id: 2, name: 'Mrs. K. Wagh (Dada Hospital)', lastMsg: 'Need urgent medicine stock.', online: false }
            ]
            : []); // Admin doesn't use this chat for now

    if (role === 'ADMIN') return null; // Hide for Admin

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '80px', zIndex: 90 }}>
            {isOpen ? (
                <div style={{
                    width: '320px',
                    height: '450px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: '#6366f1',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ fontWeight: 600 }}>Messages ({chats.length})</div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#f8fafc' }}>
                        {chats.map(chat => (
                            <div key={chat.id} style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '0.75rem',
                                background: 'white',
                                borderRadius: '12px',
                                marginBottom: '0.75rem',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#cbd5e1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: '#475569',
                                    position: 'relative'
                                }}>
                                    {chat.name.charAt(0)}
                                    {chat.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', border: '2px solid white' }}></div>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{chat.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{chat.lastMsg}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                        />
                        <button style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        background: '#6366f1',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '24px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    <MessageCircle size={20} /> Chat
                </button>
            )}
        </div>
    );
}
