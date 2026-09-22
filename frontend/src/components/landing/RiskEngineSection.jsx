import React from 'react';

export default function RiskEngineSection() {
  const weights = [
    { name: "Cost Overrun Drift", weight: 35, color: "#f87171", model: "XGBoost + LSTM Stacking" },
    { name: "Schedule Slippage", weight: 30, color: "#fbbf24", model: "CNN-LSTM S-Curve" },
    { name: "BIM Clash Density", weight: 25, color: "#818cf8", model: "AABB + Random Forest" },
    { name: "Site Energy Spikes", weight: 10, color: "#10b981", model: "IsolationForest Telemetry" }
  ];

  return (
    <section style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '80px 24px 100px',
      position: 'relative'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <span className="pulse-beacon" />
          <span>Composite Quantification Engine</span>
        </div>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
          THE MULTI-PILLAR <br />
          <span className="gradient-editorial">RISK EQUATION</span>
        </h2>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Rather than relying on isolated gut feelings, ConstructIQ computes an empirical, weighted composite index calibrating financial, temporal, geometric, and site telemetry risks.
        </p>
      </div>

      {/* Main Radial Architecture Container */}
      <div className="glass-surface hud-corner-tl hud-corner-br" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        padding: '48px 36px'
      }}>
        {/* Left: Animated Radial Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="280" height="280" viewBox="0 0 280 280">
            {/* Outer Track Ring */}
            <circle cx="140" cy="140" r="115" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="8" />
            
            {/* Arc 1: Cost (35%) */}
            <circle
              cx="140" cy="140" r="115"
              fill="none" stroke="#f87171" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 115 * 0.35} ${2 * Math.PI * 115 * 0.65}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.6))' }}
            />

            {/* Arc 2: Progress (30%) */}
            <circle
              cx="140" cy="140" r="95"
              fill="none" stroke="#fbbf24" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 95 * 0.30} ${2 * Math.PI * 95 * 0.70}`}
              strokeDashoffset={`${-2 * Math.PI * 95 * 0.10}`}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }}
            />

            {/* Arc 3: BIM (25%) */}
            <circle
              cx="140" cy="140" r="75"
              fill="none" stroke="#818cf8" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 75 * 0.25} ${2 * Math.PI * 75 * 0.75}`}
              strokeDashoffset={`${-2 * Math.PI * 75 * 0.25}`}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.6))' }}
            />

            {/* Arc 4: Energy (10%) */}
            <circle
              cx="140" cy="140" r="55"
              fill="none" stroke="#10b981" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 55 * 0.10} ${2 * Math.PI * 55 * 0.90}`}
              strokeDashoffset={`${-2 * Math.PI * 55 * 0.45}`}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}
            />
          </svg>

          {/* Center Callout */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              27
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
              COMPOSITE RISK
            </div>
          </div>
        </div>

        {/* Right: Weighted Pillar Breakdown */}
        <div>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            <span>Weighted Calibrated Synthesis</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {weights.map((w, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.25)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>{w.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 800, color: w.color }}>
                    {w.weight}% Weight
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  <span>Engine: {w.model}</span>
                </div>
                {/* Visual Bar */}
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${w.weight * 2.5}%`, height: '100%', background: w.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
            ∑ TOTAL WEIGHT ALLOCATION = 100.0% · DYNAMIC REAL-TIME SENSITIVITY CALIBRATION
          </div>
        </div>
      </div>
    </section>
  );
}
