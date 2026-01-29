import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(`
            SELECT c.*, u.full_name as chairman_name 
            FROM committees c
            LEFT JOIN users u ON c.chairman_user_id = u.id
            ORDER BY c.created_at DESC
        `);
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch committees' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, department_id, chairman_user_id } = body;

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const result = await query(
            `INSERT INTO committees (name, description, department_id, chairman_user_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, description, department_id, chairman_user_id]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create committee' }, { status: 500 });
    }
}
