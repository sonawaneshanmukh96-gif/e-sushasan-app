'use client';

import Link from 'next/link';
import { Home, Briefcase, Users, FileText, CheckSquare, Layers, Menu, X } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import { useRole } from '@/context/RoleContext';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useRole();

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Backdrop (Mobile) */}
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <img
                        src="/logo.png"
                        alt="Nandurbar District Logo"
                        style={{ maxHeight: '40px', width: 'auto', objectFit: 'contain' }}
                    />
                    <span>Nandurbar Admin</span>
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navItem} onClick={() => setIsOpen(false)}>
                        <Home size={20} /> Dashboard
                    </Link>
                    <Link href="/approvals" className={styles.navItem} onClick={() => setIsOpen(false)}>
                        <Users size={20} /> Approvals
                    </Link>
                    <Link href="/departments" className={styles.navItem} onClick={() => setIsOpen(false)}>
                        <Layers size={20} /> Departments
                    </Link>
                    <div className={styles.navGroup}>
                        <Link href="/committees" className={styles.navItem} onClick={() => setIsOpen(false)}>
                            <Users size={20} /> Committees
                        </Link>
                        <Link href="/committees/create" className={styles.subItem} onClick={() => setIsOpen(false)}>
                            + Create New
                        </Link>
                    </div>
                    <div className={styles.navGroup}>
                        <Link href="/projects" className={styles.navItem} onClick={() => setIsOpen(false)}>
                            <Briefcase size={20} /> Projects
                        </Link>
                        <Link href="/projects/create" className={styles.subItem} onClick={() => setIsOpen(false)}>
                            + Create New
                        </Link>
                    </div>
                </nav>

                <div className={styles.footer}>
                    <div className={styles.user}>{user.name}</div>
                    <div className={styles.role}>{user.title}</div>
                </div>
            </aside>
        </>
    );
}
