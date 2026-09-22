import React from 'react';

export default function LandingFooter({ onLaunchCommandCenter }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 7, 13, 0.95)',
      padding: '48px 48px 36px',
      fontSize: '0.82rem',
      color: 'var(--text-dim)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        paddingBottom: '32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            CONSTRUCT<span style={{ color: 'var(--accent-indigo)' }}>IQ</span>
          </div>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.06em', marginTop: '4px' }}>
            PREDICTIVE CONSTRUCTION INTELLIGENCE
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '28px', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('intelligence')}>Intelligence</span>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('ai-narrator')}>AI Narrator</span>
          <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('architecture')}>Architecture</span>
          <span style={{ cursor: 'pointer' }} onClick={onLaunchCommandCenter}>Command Center</span>
          <a href="https://github.com/adityasystems99/Energy-Optimization" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            GitHub Repository
          </a>
        </div>

        {/* Operational Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: '#34d399',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem'
        }}>
          <span className="pulse-beacon" />
          <span>SYSTEM STATUS: OPERATIONAL</span>
        </div>
      </div>

      {/* Sub-Footer */}
      <div style={{
        maxWidth: '1360px',
        margin: '24px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.74rem'
      }}>
        <div>© 2026 ConstructIQ Technologies Inc. All rights reserved.</div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>FASTAPI · TENSORFLOW · XGBOOST · GEMINI 1.5 PRO</div>
      </div>
    </footer>
  );
}
