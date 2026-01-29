'use client';

import { useRole, UserRole } from '@/context/RoleContext';
import { Settings, User, Shield, Users } from 'lucide-react';
import { useState } from 'react';

export default function DebugRoleSwitcher() {
    const { role, setRole } = useRole();
    const [isOpen, setIsOpen] = useState(false);

    const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
        { id: 'ADMIN', label: 'Admin (Collector)', icon: <Shield size={16} /> },
        { id: 'HOD', label: 'HOD (District Officer)', icon: <User size={16} /> },
        { id: 'SUBORDINATE', label: 'Subordinate (Taluka)', icon: <Users size={16} /> },
    ];

    if (process.env.NODE_ENV === 'production') return null;

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}>
            {isOpen && (
                <div style={{
                    marginBottom: '10px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    border: '1px solid #e2e8f0',
                    minWidth: '200px'
                }}>
                    <div style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
                        Debug: Switch Role
                    </div>
                    {roles.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => { setRole(r.id); setIsOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.75rem',
                                border: 'none',
                                background: role === r.id ? '#eff6ff' : 'transparent',
                                color: role === r.id ? '#2563eb' : '#334155',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '0.9rem',
                                fontWeight: role === r.id ? 600 : 400
                            }}
                        >
                            {r.icon} {r.label}
                        </button>
                    ))}
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
            >
                <Settings size={24} />
            </button>
        </div>
    );
}
