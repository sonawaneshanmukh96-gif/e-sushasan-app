'use client';

import { useState } from 'react';
import SupportingDocuments from '@/components/SupportingDocuments';

// Mock Data
const SUBSECTIONS = [
    { id: 'all', name: 'All Subsections' },
    { id: 'est', name: 'Establishment' },
    { id: 'reg', name: 'Registry' },
    { id: 'rev', name: 'Revenue' }
];

const TASKS = [
    { id: 1, title: 'Process Leave Application', sub: 'est', status: 'OPEN', assignee: 'Clerk A' },
    { id: 2, title: 'Digitize GR-5991', sub: 'reg', status: 'IN_PROGRESS', assignee: 'Clerk B' },
    { id: 3, title: 'Land Survey Report', sub: 'rev', status: 'VERIFICATION_PENDING', assignee: 'Talathi' },
    { id: 4, title: 'Update Staff Roll', sub: 'est', status: 'OPEN', assignee: 'Clerk A' }
];

export default function DepartmentPage() {
    const [filter, setFilter] = useState('all');

    // Filter Logic
    const filteredTasks = filter === 'all'
        ? TASKS
        : TASKS.filter(t => t.sub === filter);

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>General Administration Dept</h1>
                <p style={{ color: '#64748b' }}>HOD Oversight Dashboard</p>
            </header>

            {/* Subsection Pills */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {SUBSECTIONS.map(sub => (
                    <button
                        key={sub.id}
                        onClick={() => setFilter(sub.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid #e2e8f0',
                            background: filter === sub.id ? '#0f172a' : 'white',
                            color: filter === sub.id ? 'white' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {sub.name}
                    </button>
                ))}
            </div>

            {/* Task List (Oversight View) */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Department Tasks</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '0.5rem' }}>Title</th>
                            <th style={{ padding: '0.5rem' }}>Subsection</th>
                            <th style={{ padding: '0.5rem' }}>Assignee</th>
                            <th style={{ padding: '0.5rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{task.title}</td>
                                <td style={{ padding: '0.5rem', color: '#64748b' }}>
                                    {SUBSECTIONS.find(s => s.id === task.sub)?.name}
                                </td>
                                <td style={{ padding: '0.5rem' }}>{task.assignee}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        background: task.status === 'VERIFICATION_PENDING' ? '#fef3c7' : '#eff6ff',
                                        color: task.status === 'VERIFICATION_PENDING' ? '#d97706' : '#2563eb'
                                    }}>
                                        {task.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Supporting Documents */}
            <SupportingDocuments contextId="101" type="DEPT" />
        </div>
    );
}
