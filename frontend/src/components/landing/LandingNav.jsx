import React, { useState, useEffect } from 'react';
import { IconChevronRight } from '../Icons';

export default function LandingNav({ onLaunchCommandCenter }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? '14px 36px' : '22px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      background: scrolled ? 'rgba(5, 7, 13, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent'
    }}>
      {/* Brand Wordmark */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          fontSize: '1.1rem'
        }}>
          🏗️
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', fontFamily: 'var(--font-sans)' }}>
              CONSTRUCT<span style={{ color: 'var(--accent-indigo)' }}>IQ</span>
            </span>
            <span className="pulse-beacon" />
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Construction Intelligence
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }}>
        <button 
          onClick={() => scrollTo('intelligence')}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          Intelligence
        </button>
        <button 
          onClick={() => scrollTo('ai-narrator')}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          AI Narrator
        </button>
        <button 
          onClick={() => scrollTo('command-center')}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          Command Center
        </button>
        <button 
          onClick={() => scrollTo('architecture')}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          Architecture
        </button>
      </div>

      {/* Launch CTA */}
      <div>
        <button 
          onClick={onLaunchCommandCenter}
          className="btn-command"
          style={{ padding: '10px 20px', fontSize: '0.85rem' }}
        >
          <span>Launch Command Center</span>
          <IconChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
