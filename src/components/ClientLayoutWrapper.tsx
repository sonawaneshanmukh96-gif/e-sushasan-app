'use client';

import { RoleProvider } from '@/context/RoleContext';
import DebugRoleSwitcher from '@/components/DebugRoleSwitcher';
import ChatWidget from '@/components/ChatWidget';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <RoleProvider>
            {children}
            <ChatWidget />
            <DebugRoleSwitcher />
        </RoleProvider>
    );
}
