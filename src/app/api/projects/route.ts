import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(`
            SELECT id, name, status, sanctioned_amount, utilized_amount, 
            (COALESCE(sanctioned_amount, 0) - utilized_amount) as balance 
            FROM projects 
            ORDER BY created_at DESC
        `);
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, owning_department_id, sanctioned_amount, status } = body;

        // Basic validation
        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const result = await query(
            `INSERT INTO projects (name, description, owning_department_id, sanctioned_amount, status) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, owning_department_id, sanctioned_amount || null, status || 'PLANNED']
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
