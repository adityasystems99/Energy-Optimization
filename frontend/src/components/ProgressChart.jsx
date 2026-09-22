import React, { useState } from 'react';
import { IconProgress, IconAlert } from './Icons';

export default function ProgressChart({ progressData = {} }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Generate or read S-curve data points (Days 0 to 180)
  const days = progressData?.curve_points || [
    { day: 0, planned: 0, actual: 0, predicted: null },
    { day: 20, planned: 5, actual: 4, predicted: null },
    { day: 40, planned: 14, actual: 12, predicted: null },
    { day: 60, planned: 28, actual: 23, predicted: null },
    { day: 80, planned: 46, actual: 39, predicted: null },
    { day: 100, planned: 65, actual: 56, predicted: 56 }, // Today
    { day: 120, planned: 82, actual: null, predicted: 72 },
    { day: 140, planned: 92, actual: null, predicted: 84 },
    { day: 160, planned: 98, actual: null, predicted: 93 },
    { day: 180, planned: 100, actual: null, predicted: 98 }
  ];

  const slippage = progressData?.schedule_slippage_days || 7;
  const delayProb = Math.round((progressData?.delay_probability || 0.64) * 100);

  // SVG dimensions
  const width = 500;
  const height = 220;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 30;

  const maxDay = 180;
  const maxVal = 100;

  const getX = (d) => padL + (d / maxDay) * (width - padL - padR);
  const getY = (v) => height - padB - (v / maxVal) * (height - padT - padB);

  // Build SVG path strings
  const plannedPath = days.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.day)} ${getY(p.planned)}`).join(' ');

  const actualPoints = days.filter(p => p.actual !== null);
  const actualPath = actualPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.day)} ${getY(p.actual)}`).join(' ');

  const predPoints = days.filter(p => p.predicted !== null);
  const predPath = predPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.day)} ${getY(p.predicted)}`).join(' ');

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(245, 158, 11, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#fbbf24' 
          }}>
            <IconProgress size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Progress S-Curve</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Planned Baseline vs Hybrid LSTM Forecast</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-warning">
            -{slippage} Days Behind
          </span>
          <span className="badge badge-danger">
            {delayProb}% Delay Prob
          </span>
        </div>
      </div>

      {/* SVG S-Curve Chart */}
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line 
                x1={padL} y1={getY(v)} 
                x2={width - padR} y2={getY(v)} 
                stroke="rgba(255,255,255,0.06)" 
                strokeDasharray="4,4" 
              />
              <text x={padL - 8} y={getY(v) + 4} fill="var(--text-dim)" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
                {v}%
              </text>
            </g>
          ))}

          {/* Time indicator (Day 100: Current Status) */}
          <line 
            x1={getX(100)} y1={padT} 
            x2={getX(100)} y2={height - padB} 
            stroke="rgba(255, 255, 255, 0.25)" 
            strokeDasharray="3,3" 
          />
          <text x={getX(100)} y={padT - 4} fill="#818cf8" fontSize="10" textAnchor="middle" fontWeight="bold">
            Current Day (100)
          </text>

          {/* Planned Curve (Gray solid) */}
          <path d={plannedPath} fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2.5" />

          {/* Predicted Curve (Purple dotted) */}
          <path d={predPath} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />

          {/* Actual Curve (Vibrant Amber) */}
          <path d={actualPath} fill="none" stroke="#f59e0b" strokeWidth="3" />

          {/* Interactive dots for Actual points */}
          {actualPoints.map(p => (
            <circle
              key={p.day}
              cx={getX(p.day)}
              cy={getY(p.actual)}
              r={hoveredPoint?.day === p.day ? 6 : 4}
              fill="#f59e0b"
              stroke="#0f172a"
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* X Axis Labels */}
          {[0, 40, 80, 120, 160, 180].map(d => (
            <text key={d} x={getX(d)} y={height - 10} fill="var(--text-dim)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
              D{d}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontWeight: 'bold', color: '#fbbf24', marginBottom: '2px' }}>Day {hoveredPoint.day}</div>
            <div>Actual: <strong style={{ color: '#fff' }}>{hoveredPoint.actual}%</strong></div>
            <div>Planned: <strong style={{ color: 'var(--text-muted)' }}>{hoveredPoint.planned}%</strong></div>
            <div style={{ color: '#ef4444' }}>Variance: -{hoveredPoint.planned - hoveredPoint.actual}%</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ width: '12px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }}></span>
          Planned Baseline
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#fbbf24' }}>
          <span style={{ width: '12px', height: '3px', background: '#f59e0b', borderRadius: '2px' }}></span>
          Actual Progress
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#c084fc' }}>
          <span style={{ width: '12px', height: '3px', background: '#a855f7', borderRadius: '2px', borderStyle: 'dashed' }}></span>
          LSTM Forecast
        </div>
      </div>
    </div>
  );
}
