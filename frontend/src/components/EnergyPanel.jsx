import React from 'react';
import { IconEnergy, IconAlert, IconCheck } from './Icons';

export default function EnergyPanel({ energyData = {} }) {
  const anomalies = energyData?.anomalies || [
    { device: "tower_crane_01", metric: "Active Standby Spikes", detected_at: "23:45 Night Shift", severity: "HIGH", note: "Hydraulic motor kept idling without load" },
    { device: "concrete_pump_02", metric: "Phase Imbalance", detected_at: "14:15 Day Shift", severity: "MEDIUM", note: "Power factor dropped to 0.74" }
  ];

  const shutdownActions = energyData?.shutdown_recommendations || [
    { device: "tower_crane_01", action: "Auto Standby Cutoff (22:00 - 06:00)", savings_kwh: 28.5, impact: "$42.75 / day" },
    { device: "temp_hvac_site_office", action: "Eco Temperature Setback (24°C)", savings_kwh: 14.0, impact: "$21.00 / day" },
    { device: "curing_blanket_heaters", action: "Duty Cycle Modulation (50%)", savings_kwh: 9.5, impact: "$14.25 / day" }
  ];

  const totalDailyKwh = energyData?.daily_consumption_kwh || 412;
  const potentialSavingsKwh = energyData?.estimated_daily_savings_kwh || 52.0;
  const potentialSavingsPct = energyData?.potential_savings_kwh_pct || 12.6;

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(16, 185, 129, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#10b981' 
          }}>
            <IconEnergy size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Site Energy & IoT Telemetry</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LSTM Load Predictor & IsolationForest Anomaly Engine</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-warning">
            {anomalies.length} Anomalies Flagged
          </span>
          <span className="badge badge-success">
            {potentialSavingsKwh} kWh/day Savings
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Daily Site Consumption</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            {totalDailyKwh} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>kWh</span>
          </div>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px 16px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.72rem', color: '#34d399' }}>Optimized Potential Savings</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
            ↓ {potentialSavingsPct}% <span style={{ fontSize: '0.8rem', color: '#34d399' }}>(-{potentialSavingsKwh} kWh)</span>
          </div>
        </div>
      </div>

      {/* Anomaly Callout */}
      {anomalies.length > 0 && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.08)', 
          border: '1px solid rgba(239, 68, 68, 0.25)', 
          borderRadius: '10px', 
          padding: '10px 14px', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <IconAlert size={20} className="pulse-danger" style={{ color: '#f87171', flexShrink: 0 }} />
          <div style={{ fontSize: '0.78rem' }}>
            <strong style={{ color: '#f87171' }}>{anomalies[0].device} Anomaly:</strong> {anomalies[0].note} ({anomalies[0].detected_at})
          </div>
        </div>
      )}

      {/* Greedy Shutdown Optimization Table */}
      <div style={{ marginTop: 'auto' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Greedy Equipment Shutdown Recommendations:
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          {shutdownActions.map((item, idx) => (
            <div key={idx} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.78rem'
            }}>
              <div>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{item.device}</span>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{item.action}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#34d399', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>+{item.savings_kwh} kWh</span>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{item.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
