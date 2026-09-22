import React from 'react';
import { IconCost, IconAlert } from './Icons';

export default function CostChart({ costData = {} }) {
  const overrunProb = Math.round((costData?.overrun_probability || 0.73) * 100);
  const overrunPct = (costData?.projected_overrun_pct || 14.8).toFixed(1);
  const totalBudget = costData?.total_budget_usd || "$42.0M";
  const projectedCost = costData?.projected_final_cost_usd || "$48.2M";

  // Timeline weeks (Week 0 to Week 24)
  const weeks = costData?.cost_timeline || [
    { week: 0, baseline: 0, actual: 0, projected: null },
    { week: 4, baseline: 5, actual: 6.2, projected: null },
    { week: 8, baseline: 12, actual: 14.8, projected: null },
    { week: 12, baseline: 21, actual: 26.5, projected: 26.5 }, // Current week
    { week: 16, baseline: 30, actual: null, projected: 38.0 },
    { week: 20, baseline: 38, actual: null, projected: 44.5 },
    { week: 24, baseline: 42, actual: null, projected: 48.2 }
  ];

  // SVG dimensions
  const width = 500;
  const height = 220;
  const padL = 45;
  const padR = 20;
  const padT = 20;
  const padB = 30;

  const maxWeek = 24;
  const maxVal = 55; // in Millions USD

  const getX = (w) => padL + (w / maxWeek) * (width - padL - padR);
  const getY = (v) => height - padB - (v / maxVal) * (height - padT - padB);

  const baselinePath = weeks.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.week)} ${getY(p.baseline)}`).join(' ');
  const actualPath = weeks.filter(p => p.actual !== null).map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.week)} ${getY(p.actual)}`).join(' ');
  const projPath = weeks.filter(p => p.projected !== null).map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.week)} ${getY(p.projected)}`).join(' ');

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(239, 68, 68, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#f87171' 
          }}>
            <IconCost size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Cost & Budget Forecast</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>XGBoost + LSTM Stacking Ensemble</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-danger">
            +{overrunPct}% Overrun
          </span>
          <span className="badge badge-warning">
            {overrunProb}% Probability
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Horizontal grid lines */}
          {[0, 15, 30, 45].map(v => (
            <g key={v}>
              <line 
                x1={padL} y1={getY(v)} 
                x2={width - padR} y2={getY(v)} 
                stroke="rgba(255,255,255,0.06)" 
                strokeDasharray="4,4" 
              />
              <text x={padL - 8} y={getY(v) + 4} fill="var(--text-dim)" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
                ${v}M
              </text>
            </g>
          ))}

          {/* Current Milestone Marker */}
          <line 
            x1={getX(12)} y1={padT} 
            x2={getX(12)} y2={height - padB} 
            stroke="rgba(239, 68, 68, 0.3)" 
            strokeDasharray="3,3" 
          />
          <text x={getX(12)} y={padT - 4} fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">
            Current Week (12)
          </text>

          {/* Baseline Target (Subtle white line) */}
          <path d={baselinePath} fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="2.5" />

          {/* Projected Overrun Curve (Red dashed) */}
          <path d={projPath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4" />

          {/* Actual Spend to Date (Vibrant Red) */}
          <path d={actualPath} fill="none" stroke="#f43f5e" strokeWidth="3" />

          {/* Actual points */}
          {weeks.filter(p => p.actual !== null).map(p => (
            <circle
              key={p.week}
              cx={getX(p.week)}
              cy={getY(p.actual)}
              r="4"
              fill="#f43f5e"
              stroke="#0f172a"
              strokeWidth="2"
            />
          ))}

          {/* X Axis Labels */}
          {[0, 6, 12, 18, 24].map(w => (
            <text key={w} x={getX(w)} y={height - 10} fill="var(--text-dim)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
              W{w}
            </text>
          ))}
        </svg>
      </div>

      {/* Metrics Footer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Baseline Budget</span>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{totalBudget}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Projected Final</span>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171', fontFamily: 'var(--font-mono)' }}>{projectedCost}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Drift</span>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>+$6.2M</div>
        </div>
      </div>
    </div>
  );
}
