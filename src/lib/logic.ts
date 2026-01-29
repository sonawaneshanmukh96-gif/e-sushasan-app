// This file simulates the server-side logic (Verification Loop)

type Task = {
    id: number;
    status: 'OPEN' | 'IN_PROGRESS' | 'VERIFICATION_PENDING' | 'DONE' | 'COMPLETED';
    creator_id: number;
};

// Mock Database Update
export const markTaskDone = async (task: Task, userId: number) => {
    // Logic: When a subordinate (Assignee) marks a task as DONE...
    // It moves to 'VERIFICATION_PENDING', NOT 'COMPLETED'.

    if (task.status === 'IN_PROGRESS' || task.status === 'OPEN') {
        // 1. Update Status
        const newStatus = 'VERIFICATION_PENDING';

        // 2. Alert Creator (Pseudo-code for notification system)
        sendNotification(task.creator_id, `Task ${task.id} is pending your verification.`);

        console.log(`[Logic] Task ${task.id} moved to ${newStatus}. Alert sent to Creator ${task.creator_id}.`);

        return newStatus;
    }

    return task.status;
};

export const verifyTask = async (task: Task, userId: number, action: 'APPROVE' | 'REJECT') => {
    // Only Creator can do this
    if (userId !== task.creator_id) {
        throw new Error("Only the creator can verify this task.");
    }

    if (action === 'APPROVE') {
        return 'COMPLETED'; // Final State
    } else {
        return 'IN_PROGRESS'; // Sent back for rework
    }
};

function sendNotification(userId: number, msg: string) {
    console.log(`Sending Gov-Slack message to User ${userId}: ${msg}`);
}
