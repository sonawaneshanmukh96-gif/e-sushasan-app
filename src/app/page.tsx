'use client';

import Organogram from '../components/Organogram';
import { AlertCircle, FileText, CheckCircle, Clock, CheckSquare, MessageCircle } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

// Mock Stats
const ADMIN_STATS = [
    { label: 'Pending Approvals', value: 12, icon: <AlertCircle color="#f59e0b" /> },
    { label: 'Total Tasks', value: 145, icon: <FileText color="#2563eb" /> },
    { label: 'Completed Today', value: 8, icon: <CheckCircle color="#10b981" /> }
];

const HOD_STATS = [
    { label: 'Items to Verify', value: 5, icon: <CheckSquare color="#f59e0b" /> },
    { label: 'Active Dept Tasks', value: 24, icon: <FileText color="#6366f1" /> },
    { label: 'Messages', value: 3, icon: <MessageCircle color="#10b981" /> }
];

const SUB_STATS = [
    { label: 'My Pending Tasks', value: 4, icon: <Clock color="#ef4444" /> },
    { label: 'Completed Today', value: 2, icon: <CheckCircle color="#10b981" /> }
];

export default function Home() {
    const { role, user } = useRole();

    const stats = role === 'ADMIN' ? ADMIN_STATS : (role === 'HOD' ? HOD_STATS : SUB_STATS);

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Welcome, {user.name}</h1>
                    <p style={{ color: '#64748b' }}>{user.title} ({role})</p>
                </div>
                {role === 'ADMIN' && (
                    <button className="btn btn-primary">
                        Approve Requests (3)
                    </button>
                )}
                {role === 'SUBORDINATE' && (
                    <button className="btn btn-primary">
                        + Update Daily Status
                    </button>
                )}
            </header>

            {/* Stats Row */}
            <div className="card-grid" style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem', gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {stat.icon}
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Specific Views */}
            {role === 'ADMIN' && (
                <div className="layout-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr' }}>
                    <Organogram />

                    <div className="card">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Add New Department
                            </button>
                            <button className="btn" style={{ width: '100%', justifyContent: 'center', border: '1px solid #ccc' }}>
                                Un-anchor Users
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {role === 'HOD' && (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <h3>Department Overview</h3>
                    <div className="card">
                        <h4>Pending Verification</h4>
                        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
                            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Monthly Health Report - Jan</span>
                                <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Verify</button>
                            </div>
                            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Vaccination Drive Data</span>
                                <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {role === 'SUBORDINATE' && (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <h3>My Tasks</h3>
                    <div className="card">
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Compile Taluka Vaccinations</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Due: Today, 5 PM</div>
                                </div>
                                <button className="btn" style={{ border: '1px solid #10b981', color: '#10b981' }}>Mark Done</button>
                            </div>
                            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Update Asha Worker List</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Due: Tomorrow</div>
                                </div>
                                <button className="btn" style={{ border: '1px solid #10b981', color: '#10b981' }}>Mark Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
