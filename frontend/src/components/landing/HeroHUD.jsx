import React, { useState, useEffect } from 'react';

export default function HeroHUD() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Top HUD Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* System Status */}
        <div className="glass-surface hud-corner-tl" style={{ padding: '10px 16px', maxWidth: '240px' }}>
          <div className="hud-tag">
            <span className="pulse-beacon" />
            <span>System Status</span>
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
            CONSTRUCTIQ CORE
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            ● LIVE TELEMETRY FEED
          </div>
        </div>

        {/* Project Risk Index */}
        <div className="glass-surface hud-corner-br" style={{ padding: '10px 18px', textAlign: 'right' }}>
          <div className="hud-tag" style={{ justifyContent: 'flex-end' }}>
            <span>Telemetry Baseline</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end', marginTop: '2px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              27
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.66rem', color: '#34d399', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            LOW / NOMINAL ENVELOPE
          </div>
        </div>
      </div>

      {/* Middle Floating Telemetry Nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Active Models HUD */}
        <div className="glass-surface" style={{ padding: '8px 14px', borderLeft: '2px solid var(--accent-indigo)' }}>
          <div className="hud-tag">
            <span>Ensemble Ingestion</span>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            04 ACTIVE MODELS
          </div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
            BIM · COST · PROGRESS · ENERGY
          </div>
        </div>

        {/* AI Narrator HUD */}
        <div className="glass-surface" style={{ padding: '8px 14px', borderRight: '2px solid var(--accent-violet)', textAlign: 'right' }}>
          <div className="hud-tag" style={{ justifyContent: 'flex-end' }}>
            <span>Cognitive Engine</span>
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
            GEMINI 1.5 PRO
          </div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>
            REASONING LAYER ONLINE
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Live Clock */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
        <div>
          <span>LOC: 28.5355° N, 77.3910° E</span>
          <span style={{ margin: '0 8px' }}>|</span>
          <span>GRID: ALPHA-04</span>
        </div>
        <div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
