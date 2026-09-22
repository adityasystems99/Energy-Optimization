import React, { useState } from 'react';
import { IconBim, IconCost, IconProgress, IconEnergy, IconShield } from '../Icons';

export default function IntelligencePillars() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: "01",
      domain: "BIM INTELLIGENCE",
      title: "GEOMETRIC CLASH DETECTION",
      description: "Detect spatial conflicts between structural framing, MEP conduit runs, and architectural envelopes before they become multi-million dollar field work orders.",
      icon: <IconBim size={24} />,
      accentColor: "#818cf8",
      labels: ["AABB 3D OVERLAP", "RANDOM FOREST", "LSTM EDIT HISTORY", "ISOLATION FOREST"],
      metric: "12 Clashes",
      metricSub: "3 High Severity Flagged",
      renderVisual: () => (
        <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 280 150" style={{ width: '100%', height: '100%' }}>
            {/* 3D Wireframe Box 1: Structural Beam (Indigo) */}
            <path d="M40 70 L110 30 L220 30 L150 70 Z" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M40 70 L40 100 L150 100 L150 70 Z" fill="rgba(99,102,241,0.25)" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M150 70 L220 30 L220 60 L150 100 Z" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="1.5" />
            
            {/* Intersecting MEP Duct (Cyan with Red Collision Point) */}
            <path d="M90 20 L130 90 L170 90 L130 20 Z" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />
            
            {/* Clash Pulse Node */}
            <circle cx="125" cy="65" r="8" fill="#ef4444" opacity="0.8">
              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="125" cy="65" r="4" fill="#ffffff" />
            <text x="145" y="70" fill="#f87171" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">
              AABB CLASH [FLOOR 3]
            </text>
          </svg>
        </div>
      )
    },
    {
      id: "02",
      domain: "COST INTELLIGENCE",
      title: "FORECAST THE OVERRUN",
      description: "XGBoost on static site parameters stacked with an LSTM weekly financial sequence predictor to detect budget drift weeks before claims crystallize.",
      icon: <IconCost size={24} />,
      accentColor: "#f87171",
      labels: ["XGBOOST META", "LSTM CASHFLOW", "STACKING ENSEMBLE", "PROBABILITY DIAL"],
      metric: "73% Risk",
      metricSub: "+14.8% Projected Overrun",
      renderVisual: () => (
        <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 280 150" style={{ width: '100%', height: '100%' }}>
            {/* Grid */}
            <line x1="20" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.1)" />
            <line x1="20" y1="80" x2="260" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
            <line x1="20" y1="40" x2="260" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
            
            {/* Baseline Path */}
            <path d="M20 120 Q 140 100, 260 85" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <text x="260" y="80" fill="var(--text-dim)" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">Target Budget</text>

            {/* Overrun Forecast Curve */}
            <path d="M20 120 Q 110 105, 140 85 T 260 30" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,3" />
            
            {/* Current Point */}
            <circle cx="140" cy="85" r="5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
            <text x="140" y="70" fill="#f87171" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">
              Week 12 Drift
            </text>
          </svg>
        </div>
      )
    },
    {
      id: "03",
      domain: "SCHEDULE INTELLIGENCE",
      title: "SEE THE SLIPPAGE",
      description: "Compare planned, actual, and deep-learning forecasted progress. A hybrid CNN-LSTM network continuously calculates critical-path slippage in real working days.",
      icon: <IconProgress size={24} />,
      accentColor: "#fbbf24",
      labels: ["CNN-LSTM HYBRID", "S-CURVE DYNAMICS", "CRITICAL PATH", "DELAY RISK"],
      metric: "-7 Days",
      metricSub: "64% Delay Probability",
      renderVisual: () => (
        <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 280 150" style={{ width: '100%', height: '100%' }}>
            {/* S-Curve Planned */}
            <path d="M20 130 C 80 130, 100 80, 160 50 C 200 30, 240 20, 260 20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            
            {/* S-Curve Actual (Lagging Behind) */}
            <path d="M20 130 C 80 130, 100 100, 150 78" fill="none" stroke="#f59e0b" strokeWidth="2.8" />
            <circle cx="150" cy="78" r="5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
            
            {/* Delta Marker */}
            <line x1="150" y1="78" x2="150" y2="54" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="160" y="68" fill="#fbbf24" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">
              Δ 7 Days Slippage
            </text>
          </svg>
        </div>
      )
    },
    {
      id: "04",
      domain: "ENERGY INTELLIGENCE",
      title: "OPTIMIZE THE SITE",
      description: "Ingest live heavy equipment sensor feeds, identify power draw anomalies via IsolationForest, and trigger automated greedy equipment shutdown schedules.",
      icon: <IconEnergy size={24} />,
      accentColor: "#10b981",
      labels: ["LSTM POWER LOAD", "ISOLATION FOREST", "IOT TELEMETRY", "GREEDY SHUTDOWN"],
      metric: "52 kWh/day",
      metricSub: "12.6% Footprint Reduction",
      renderVisual: () => (
        <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 280 150" style={{ width: '100%', height: '100%' }}>
            {/* Waveform baseline */}
            <path d="M20 90 Q 50 60, 80 90 T 140 90 T 200 90 T 260 90" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
            
            {/* Anomaly Spike (Night shift crane) */}
            <path d="M120 90 L135 30 L150 90" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="135" cy="30" r="4" fill="#ef4444" />
            <text x="145" y="32" fill="#f87171" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">
              ANOMALY: CRANE STANDBY
            </text>

            {/* Optimized Green Zone */}
            <path d="M160 90 Q 185 70, 210 90 T 260 90" fill="none" stroke="#10b981" strokeWidth="2.5" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="intelligence" style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '120px 24px 80px',
      position: 'relative'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <span className="pulse-beacon" />
          <span>The Intelligence Layer</span>
        </div>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
          ONE PROJECT. <br />
          <span className="gradient-editorial">FOUR INTELLIGENCE LAYERS.</span>
        </h2>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Construction failures rarely stem from one isolated mistake. ConstructIQ continuously correlates geometric collisions, financial burn rates, critical path schedules, and jobsite energy into a unified diagnostic truth.
        </p>
      </div>

      {/* Connected 4 Pillars Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '60px'
      }}>
        {pillars.map((p, idx) => (
          <div
            key={p.id}
            onClick={() => setActiveTab(idx)}
            className="glass-surface hud-corner-tl"
            style={{
              padding: '28px',
              cursor: 'pointer',
              border: activeTab === idx ? `1px solid ${p.accentColor}` : '1px solid var(--border-subtle)',
              boxShadow: activeTab === idx ? `0 12px 36px -8px ${p.accentColor}33` : 'none',
              transform: activeTab === idx ? 'translateY(-4px)' : 'none',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Top Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: `rgba(255,255,255,0.04)`,
                border: `1px solid ${p.accentColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.accentColor
              }}>
                {p.icon}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dim)' }}>
                {p.id}
              </span>
            </div>

            {/* Title & Domain */}
            <div style={{ fontSize: '0.72rem', color: p.accentColor, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {p.domain}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              {p.title}
            </h3>

            {/* Interactive Visual Graph */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', margin: '14px 0', border: '1px solid rgba(255,255,255,0.04)' }}>
              {p.renderVisual()}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {p.description}
            </p>

            {/* Metric Banner */}
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {p.metric}
              </span>
              <span style={{ fontSize: '0.72rem', color: p.accentColor, fontFamily: 'var(--font-mono)' }}>
                {p.metricSub}
              </span>
            </div>

            {/* Tech Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '12px' }}>
              {p.labels.map((lbl, lIdx) => (
                <span key={lIdx} style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-dim)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  {lbl}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Connected Visual Convergence System */}
      <div className="glass-surface" style={{
        padding: '36px 24px',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        background: 'linear-gradient(180deg, rgba(14,20,36,0.85) 0%, rgba(8,11,20,0.95) 100%)',
        textAlign: 'center'
      }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '8px' }}>
          <span>Multi-Domain Convergence Node</span>
        </div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          CONSTRUCTIQ CORE SYNTHESIS
        </h3>
        <p style={{ maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Signals from all 4 analytical pipelines stream synchronously into the central risk scoring service, calculating root causes rather than symptoms.
        </p>

        {/* Dynamic Convergence Flowchart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#818cf8' }}>
            BIM (25%)
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#f87171' }}>
            COST (35%)
          </div>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <div style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 0 25px rgba(99,102,241,0.5)' }}>
            CONSTRUCTIQ CORE
          </div>
          <span style={{ color: 'var(--text-dim)' }}>←</span>
          <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>
            PROGRESS (30%)
          </div>
          <span style={{ color: 'var(--text-dim)' }}>←</span>
          <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#34d399' }}>
            ENERGY (10%)
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
          <span className="pulse-beacon" />
          <span>OUTPUT: COMPOSITE PROJECT RISK INDEX (0 - 100)</span>
        </div>
      </div>
    </section>
  );
}
