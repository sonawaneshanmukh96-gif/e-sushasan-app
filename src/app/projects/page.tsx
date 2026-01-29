'use client';

import { useState, useEffect } from 'react';
import SupportingDocuments from '@/components/SupportingDocuments';
import CreateTaskModal from '@/components/CreateTaskModal';
import { AlertTriangle } from 'lucide-react';

interface Project {
    id: number;
    name: string;
    status: string;
    sanctioned_amount: number | null;
    utilized_amount: number;
    balance: number;
    tasks: Task[]; // We'll attach tasks here
}

interface Task {
    id: number;
    title: string;
    status: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(undefined);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/projects');
            const projectData = await res.json();

            // Fetch tasks for each project
            const projectsWithTasks = await Promise.all(projectData.map(async (p: any) => {
                const tasksRes = await fetch(`/api/tasks?project_id=${p.id}`);
                const tasks = await tasksRes.json();
                return { ...p, tasks: tasks || [] };
            }));

            setProjects(projectsWithTasks);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openTaskModal = (projectId: number) => {
        setSelectedProjectId(projectId);
        setIsTaskModalOpen(true);
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading Projects...</div>;

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Projects Dashboard</h1>
                <p style={{ color: '#64748b' }}>Monitor progress and financial utilization.</p>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                {projects.map(p => (
                    <div key={p.id} className="card split-card-grid">
                        {/* Left Column: Details & Tasks */}
                        <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        background: p.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                                        color: p.status === 'ACTIVE' ? '#166534' : '#991b1b',
                                        fontWeight: '500'
                                    }}>
                                        {p.status}
                                    </span>
                                </div>
                                {p.status === 'BUDGET_PENDING' || !p.sanctioned_amount ? (
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626', background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>
                                        <AlertTriangle size={18} style={{ marginRight: '5px' }} />
                                        <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Budget Allocation Pending</span>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Balance</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#6366f1' }}>
                                            ₹ {Number(p.balance).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Project Tasks Section */}
                            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>Project Tasks</h4>
                                    <button
                                        onClick={() => openTaskModal(p.id)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                    >
                                        + Create Task
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {p.tasks.length === 0 && <div style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>No tasks assigned yet.</div>}
                                    {p.tasks.map(t => (
                                        <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem' }}>
                                            <span>{t.title}</span>
                                            <span style={{
                                                color: t.status === 'COMPLETED' ? '#166534' : '#d97706',
                                                background: t.status === 'COMPLETED' ? '#dcfce7' : '#fef3c7',
                                                padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600
                                            }}>
                                                {t.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {p.status === 'ACTIVE' && p.sanctioned_amount && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                                        <span>Utilized: ₹ {Number(p.utilized_amount).toLocaleString('en-IN')}</span>
                                        <span>{(Number(p.utilized_amount) / Number(p.sanctioned_amount) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(Number(p.utilized_amount) / Number(p.sanctioned_amount) * 100)}%`, background: '#6366f1', height: '100%' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Documents */}
                        <div>
                            <SupportingDocuments contextId={`PROJ_${p.id}`} type="PROJ" />
                        </div>
                    </div>
                ))}
            </div>

            <CreateTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSuccess={fetchData}
                projectId={selectedProjectId}
            />
        </div>
    );
}
