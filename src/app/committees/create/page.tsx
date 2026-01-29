'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCommitteePage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [chairmanId, setChairmanId] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/committees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description,
                    department_id: 1, // Default for now
                    chairman_user_id: parseInt(chairmanId)
                })
            });

            if (res.ok) {
                router.push('/committees');
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
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Create New Committee</h1>
                <p style={{ color: '#64748b' }}>Define purpose, chairman, and secretaries.</p>
            </header>

            <div className="card" style={{ maxWidth: '600px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Committee Name *</label>
                        <input
                            type="text" required
                            value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. Water Conservation Committee"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea
                            value={description} onChange={e => setDescription(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Chairman (Assign User)</label>
                        <select
                            value={chairmanId} onChange={e => setChairmanId(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        >
                            <option value="1">Dr. Aditi Garg (IAS)</option>
                            <option value="2">Dy. Collector (Rev)</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', justifyContent: 'center' }}
                    >
                        {loading ? 'Creating...' : 'Create Committee'}
                    </button>
                </form>
            </div>
        </div>
    );
}
