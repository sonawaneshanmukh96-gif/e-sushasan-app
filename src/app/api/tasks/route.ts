import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('project_id');
        const committeeId = searchParams.get('committee_id');

        let q = `SELECT * FROM tasks WHERE 1=1`;
        const params = [];

        if (projectId) {
            params.push(projectId);
            q += ` AND project_id = $${params.length}`;
        }
        if (committeeId) {
            params.push(committeeId);
            q += ` AND committee_id = $${params.length}`;
        }

        q += ` ORDER BY created_at DESC`;

        const result = await query(q, params);
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, priority, due_date, project_id, committee_id, creator_id } = body;

        if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

        const result = await query(
            `INSERT INTO tasks (title, description, priority, due_date, project_id, committee_id, creator_id, task_type, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'ASSIGNMENT', 'OPEN') RETURNING *`,
            [title, description, priority || 'MEDIUM', due_date, project_id, committee_id, creator_id || 1] // Default creator ID 1 for now
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
