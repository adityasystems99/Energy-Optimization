import React from 'react';
import { IconShield, IconChevronRight, IconBim, IconCost, IconProgress, IconEnergy } from '../Icons';

export default function DashboardPreview({ onLaunchCommandCenter }) {
  return (
    <section id="command-center" style={{
      maxWidth: '1380px',
      margin: '0 auto',
      padding: '80px 24px 120px',
      position: 'relative'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <span className="pulse-beacon" />
          <span>Interactive Operations Command</span>
        </div>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
          THE UNIFIED <br />
          <span className="gradient-editorial">COMMAND CENTER</span>
        </h2>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Experience the full operational interface. Real-time multi-model telemetry, streaming executive summaries, and interactive BIM clash matrices at your fingertips.
        </p>
      </div>

      {/* 3D Perspective Floating Preview Container */}
      <div style={{
        perspective: '1200px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <div 
          onClick={onLaunchCommandCenter}
          className="glass-surface hud-corner-tl hud-corner-br" 
          style={{
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.3)',
            transform: 'rotateX(5deg) scale(0.98)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
            background: 'linear-gradient(180deg, rgba(14,20,36,0.92) 0%, rgba(7,10,18,0.98) 100%)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotateX(0deg) scale(1)';
            e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateX(5deg) scale(0.98)';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
          }}
        >
          {/* Top Mock Window Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                ConstructIQ Enterprise Dashboard — Tower-Alpha Commercial Center
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>● LIVE OPERATIONAL</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 700 }}>Click to Enter →</span>
            </div>
          </div>

          {/* Miniature Grid Representation of Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Mini Risk Gauge */}
            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Composite Risk Index</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f87171', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>67.4</div>
              <span className="badge badge-danger">HIGH RISK PROFILE</span>
            </div>

            {/* Mini AI Brief */}
            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: 700 }}>🧠 Gemini Risk Narrator:</span>
                <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>Automated Brief</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                "Compounding operational friction detected: 12 geometric clashes on Level 08 have paused MEP work, cascading into an 8-day critical path slippage and a 73% probability of budget overrun (+14.8%). Immediate action: approve 120mm duct offset."
              </p>
            </div>
          </div>

          {/* Mini 4 Pillar Bottom Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 700 }}>BIM CLASHES</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>12 Found</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Floor 3 MEP / Beam</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: '#f87171', fontWeight: 700 }}>COST DRIFT</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>+14.8%</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>$48.2M Final Est.</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700 }}>SCHEDULE GAP</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>-7 Days</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>S-Curve Milestone</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700 }}>SITE ENERGY</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>52 kWh Sav.</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Night Standby Cut</div>
            </div>
          </div>

          {/* Interactive Overlay Call to Action */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={onLaunchCommandCenter}
              className="btn-command"
              style={{ fontSize: '1rem', padding: '14px 36px' }}
            >
              <span>Launch Live Command Center</span>
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
