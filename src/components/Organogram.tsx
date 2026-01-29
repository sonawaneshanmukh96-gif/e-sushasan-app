'use client';

import React from 'react';
import { ChevronRight, ChevronDown, User, Folder } from 'lucide-react';

type DepartmentNode = {
    id: number;
    name: string;
    hod?: string;
    subsections?: { id: number; name: string }[];
    children?: DepartmentNode[];
};

// Mock Data
const MOCK_Structure: DepartmentNode = {
    id: 1,
    name: 'District Collectorate',
    hod: 'Dr. Aditi Garg (IAS)',
    children: [
        {
            id: 2,
            name: 'General Administration',
            hod: 'Dy. Collector (Gen)',
            subsections: [
                { id: 101, name: 'Establisment Desk' },
                { id: 102, name: 'Registry Desk' }
            ]
        },
        {
            id: 3,
            name: 'Revenue Department',
            hod: 'Dy. Collector (Rev)',
            subsections: [
                { id: 201, name: 'Land Records' },
                { id: 202, name: 'Tenancy Desk' }
            ],
            children: [
                {
                    id: 4,
                    name: 'Tehsil Office - Nandurbar',
                    hod: 'Tehsildar'
                }
            ]
        }
    ]
};

const TreeNode = ({ node }: { node: DepartmentNode }) => {
    const [expanded, setExpanded] = React.useState(true);

    return (
        <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <button onClick={() => setExpanded(!expanded)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                    {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <Folder size={16} style={{ marginRight: '5px', color: '#2563eb' }} />
                <span style={{ fontWeight: 'bold' }}>{node.name}</span>
                {node.hod && <span style={{ marginLeft: '10px', fontSize: '0.85em', color: '#666' }}><User size={12} style={{ display: 'inline' }} /> {node.hod}</span>}
            </div>

            {expanded && (
                <div>
                    {node.subsections?.map(sub => (
                        <div key={sub.id} style={{ marginLeft: '35px', color: '#555', fontSize: '0.9em' }}>
                            • {sub.name}
                        </div>
                    ))}
                    {node.children?.map(child => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Organogram() {
    return (
        <div className="card">
            <h3>Administrative Setup</h3>
            <TreeNode node={MOCK_Structure} />
        </div>
    );
}
