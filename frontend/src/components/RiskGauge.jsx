import React from 'react';
import { IconShield, IconAlert } from './Icons';

export default function RiskGauge({ score = 65, level = "HIGH", primaryDriver = "Cost & Budget", breakdown = {} }) {
  // SVG gauge circle calculations (semi-circle arc or 270 deg)
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Normalized 0 to 100 mapped to strokeDashoffset
  const pct = Math.min(100, Math.max(0, score)) / 100;
  const strokeDashoffset = circumference * (1 - pct * 0.75); // 270 degree sweep

  const getColor = (s) => {
    if (s >= 70) return '#ef4444'; // Red
    if (s >= 50) return '#f97316'; // Orange
    if (s >= 30) return '#eab308'; // Amber
    return '#10b981'; // Green
  };

  const color = getColor(score);

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(99, 102, 241, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#818cf8' 
          }}>
            <IconShield size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Unified Risk Score</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-Pillar Composite Index</span>
          </div>
        </div>

        <span className={`badge ${score >= 70 ? 'badge-danger pulse-danger' : score >= 50 ? 'badge-warning' : 'badge-success'}`}>
          {level} RISK
        </span>
      </div>

      {/* Gauge Visualization */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0' }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-135deg)' }}>
          {/* Background Track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {/* Active Risk Gauge Bar */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center Numbers */}
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', 
          transform: 'translate(-50%, -50%)', textAlign: 'center' 
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
            / 100 Index
          </div>
        </div>
      </div>

      {/* Driver & Breakdown */}
      <div style={{ marginTop: 'auto', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '12px', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Primary Risk Factor:</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f87171' }}>{primaryDriver}</span>
        </div>

        {/* Pillar Mini Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
              <span>Cost (35%)</span>
              <span>{breakdown.cost?.score || 68}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${breakdown.cost?.score || 68}%`, height: '100%', background: '#ef4444' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
              <span>Progress (30%)</span>
              <span>{breakdown.progress?.score || 55}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${breakdown.progress?.score || 55}%`, height: '100%', background: '#f59e0b' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
              <span>BIM (25%)</span>
              <span>{breakdown.bim?.score || 62}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${breakdown.bim?.score || 62}%`, height: '100%', background: '#818cf8' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
              <span>Energy (10%)</span>
              <span>{breakdown.energy?.score || 35}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${breakdown.energy?.score || 35}%`, height: '100%', background: '#10b981' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
