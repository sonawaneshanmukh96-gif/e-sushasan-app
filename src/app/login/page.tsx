'use client';

export default function LoginPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#f1f5f9'
        }}>
            <div className="card" style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                {/* Logo Section */}
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="/logo.png"
                        alt="Nandurbar District Logo"
                        style={{ maxHeight: '100px', width: 'auto', marginBottom: '1rem', objectFit: 'contain' }}
                    />
                    <h2 style={{ margin: 0, color: '#0f172a' }}>e-Sushasan</h2>
                    <p style={{ margin: 0, color: '#64748b' }}>Nandurbar District Administration</p>
                </div>

                {/* Credentials Box */}
                <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter Officer ID"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', justifyContent: 'center' }}
                    >
                        Login
                    </button>
                </form>

                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Restricted Access. Government Officials Only.</p>
            </div>
        </div>
    );
}
