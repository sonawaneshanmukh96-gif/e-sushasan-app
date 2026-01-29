'use client';

import { Check, X } from 'lucide-react';

// Mock Pending Users
const PENDING_USERS = [
    { id: 45, name: 'Ramesh Patil', designation: 'Clerk', dept: 'Revenue', email: 'ramesh.p@gov.in' },
    { id: 46, name: 'Suresh More', designation: 'Peon', dept: 'General Admin', email: 'suresh.m@gov.in' }
];

export default function ApprovalsPage() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Pending User Approvals</h1>
                <p style={{ color: '#64748b' }}>Review and approve new officer signups.</p>
            </header>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '0.5rem' }}>Name</th>
                            <th style={{ padding: '0.5rem' }}>Designation</th>
                            <th style={{ padding: '0.5rem' }}>Department</th>
                            <th style={{ padding: '0.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PENDING_USERS.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem 0.5rem' }}>
                                    <div style={{ fontWeight: '500' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                                </td>
                                <td style={{ padding: '0.5rem' }}>{user.designation}</td>
                                <td style={{ padding: '0.5rem' }}>{user.dept}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', background: '#10b981' }}>
                                            <Check size={16} /> Approve
                                        </button>
                                        <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }}>
                                            <X size={16} /> Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
