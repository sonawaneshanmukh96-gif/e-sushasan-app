'use client';

import { FileText, Link as LinkIcon, Download, Upload } from 'lucide-react';
import styles from './SupportingDocuments.module.css';

type Doc = {
    id: number;
    title: string;
    type: 'PDF' | 'DOCX' | 'XLSX' | 'URL';
    url: string;
    uploadedBy: string;
    date: string;
};

// Mock Data
const MOCK_DOCS: Doc[] = [
    { id: 1, title: 'GR-2026-XYZ Guidelines', type: 'PDF', url: '#', uploadedBy: 'Admin', date: '2026-01-20' },
    { id: 2, title: 'Project Budget Sheet', type: 'XLSX', url: '#', uploadedBy: 'Accts Officer', date: '2026-01-22' }
];

export default function SupportingDocuments({ contextId, type }: { contextId: string, type: 'DEPT' | 'COMM' | 'PROJ' }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Supporting Documents</h3>
                <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    <Upload size={14} style={{ marginRight: '5px' }} /> Upload New
                </button>
            </div>

            <div className={styles.grid}>
                {MOCK_DOCS.map(doc => (
                    <div key={doc.id} className={styles.docCard}>
                        <div className={styles.icon}>
                            {doc.type === 'URL' ? <LinkIcon /> : <FileText />}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>{doc.title}</div>
                            <div className={styles.meta}>
                                {doc.type} • {doc.uploadedBy} • {doc.date}
                            </div>
                        </div>
                        <a href={doc.url} className={styles.download}>
                            <Download size={16} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
