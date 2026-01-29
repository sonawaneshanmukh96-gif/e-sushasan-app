'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateCommitteeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateCommitteeModal({ isOpen, onClose, onSuccess }: CreateCommitteeModalProps) {
    const [name, setName] = useState('');
    const [chairmanId, setChairmanId] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/committees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    chairman_user_id: 1 // Default to Admin for now as mock
                }),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                alert('Failed to create committee');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                background: 'white', padding: '2rem', borderRadius: '16px', width: '400px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>Create Committee</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Committee Name *</label>
                        <input
                            type="text" required
                            value={name} onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Chairman</label>
                        <select
                            value={chairmanId} onChange={e => setChairmanId(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        >
                            <option value="1">District Collector (Admin)</option>
                            <option value="2">Civil Surgeon</option>
                        </select>
                    </div>
                    <button
                        type="submit" disabled={loading}
                        className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}
                    >
                        {loading ? 'Creating...' : 'Create Committee'}
                    </button>
                </form>
            </div>
        </div>
    );
}
