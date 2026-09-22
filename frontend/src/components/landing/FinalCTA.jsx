import React from 'react';
import { IconChevronRight } from '../Icons';

export default function FinalCTA({ onLaunchCommandCenter }) {
  return (
    <section style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '80px 24px 140px',
      position: 'relative',
      textAlign: 'center'
    }}>
      <div className="glass-surface hud-corner-tl hud-corner-br" style={{
        padding: '72px 32px',
        border: '1px solid rgba(99, 102, 241, 0.5)',
        background: 'linear-gradient(180deg, rgba(14,20,36,0.92) 0%, rgba(5,7,13,0.98) 100%)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(99, 102, 241, 0.3)'
      }}>
        {/* Background Atmospheric Glow Rings */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '16px' }}>
            <span className="pulse-beacon" />
            <span>Operational Foresight</span>
          </div>

          <h2 className="editorial-title" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', marginBottom: '18px' }}>
            BUILD WITH <br />
            <span className="gradient-editorial">FORESIGHT.</span>
          </h2>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Turn compounding construction complexity into proactive predictive intelligence. Experience ConstructIQ on your next project.
          </p>

          <button
            onClick={onLaunchCommandCenter}
            className="btn-command"
            style={{ fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px' }}
          >
            <span>ENTER CONSTRUCTIQ</span>
            <IconChevronRight size={20} />
          </button>

          <div style={{ marginTop: '28px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
            DEPLOYED IN 85 COUNTRIES · ZERO CLIENT INSTALLATION REQUIRED
          </div>
        </div>
      </div>
    </section>
  );
}
