'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'ADMIN' | 'HOD' | 'SUBORDINATE';

interface RoleContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    user: {
        name: string;
        title: string;
    };
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>('ADMIN');

    const getUserDetails = (r: UserRole) => {
        switch (r) {
            case 'HOD': return { name: 'Dr. A. Patil', title: 'District Health Officer' };
            case 'SUBORDINATE': return { name: 'Mr. S. Deshmukh', title: 'Taluka Health Officer' };
            default: return { name: 'Admin User', title: 'District Collectorate' };
        }
    };

    return (
        <RoleContext.Provider value={{ role, setRole, user: getUserDetails(role) }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
