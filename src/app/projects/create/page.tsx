'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProjectPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [deptId, setDeptId] = useState('1'); // Default logic needed
    const [sanctionedAmount, setSanctionedAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    owning_department_id: parseInt(deptId),
                    sanctioned_amount: sanctionedAmount ? parseFloat(sanctionedAmount) : null,
                    status: sanctionedAmount ? 'ACTIVE' : 'BUDGET_PENDING'
                })
            });

            if (res.ok) {
                router.push('/projects');
            } else {
                alert('Failed to create project');
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
                <h1>Create New Project</h1>
                <p style={{ color: '#64748b' }}>Initialize project parameters. Financials can be added later.</p>
            </header>

            <div className="card" style={{ maxWidth: '600px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Project Name *</label>
                        <input
                            type="text" required
                            value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. New Collectorate Building"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Owning Department</label>
                        <select
                            value={deptId} onChange={e => setDeptId(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        >
                            <option value="1">Public Works Department (PWD)</option>
                            <option value="2">Rural Development</option>
                        </select>
                    </div>

                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Sanctioned Amount (Optional)</label>
                        <input
                            type="number"
                            value={sanctionedAmount} onChange={e => setSanctionedAmount(e.target.value)}
                            placeholder="Leave empty if pending approval"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                            If left empty, project status will be set to <strong>BUDGET_PENDING</strong>.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', justifyContent: 'center' }}
                    >
                        {loading ? 'Initializing...' : 'Initialize Project'}
                    </button>
                </form>
            </div>
        </div>
    );
}
