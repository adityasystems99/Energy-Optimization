import React, { useState } from 'react';
import { IconShield, IconCheck, IconAlert } from './Icons';

export default function FlaggedTable({ flaggedComponents = [] }) {
  const [items, setItems] = useState(
    flaggedComponents.length > 0 ? flaggedComponents : [
      { id: "C0042", category: "MEP / HVAC", score: 0.94, action: "ESCALATE", reason: "Major geometric intersection with beam structural envelope", status: "PENDING" },
      { id: "C0187", category: "Structural Frame", score: 0.82, action: "ESCALATE", reason: "Level elevation delta mismatch against architectural model", status: "PENDING" },
      { id: "C0341", category: "Plumbing", score: 0.61, action: "REVIEW", reason: "Spatial anomaly detected by IsolationForest filter", status: "PENDING" },
      { id: "C0499", category: "Electrical Tray", score: 0.53, action: "REVIEW", reason: "Abnormal edit frequency detected in commit history", status: "PENDING" },
      { id: "C0612", category: "Architectural Wall", score: 0.38, action: "OK", reason: "Minor bounding box touch within allowable 15mm tolerance", status: "CLEARED" }
    ]
  );

  const handleAction = (id, newStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(239, 68, 68, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#f87171' 
          }}>
            <IconAlert size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Flagged Model Components</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Random Forest + LSTM + IsolationForest Fault Ranking</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-danger">
            {items.filter(i => i.status === 'PENDING' && i.action === 'ESCALATE').length} Require Escalation
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="ciq-table">
          <thead>
            <tr>
              <th>Component ID</th>
              <th>Category</th>
              <th>Fault Score</th>
              <th>Action Tier</th>
              <th>Diagnostic Root Cause</th>
              <th>Workflow Status</th>
              <th>Decision Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#818cf8' }}>
                  {item.id}
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{item.category}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: item.score >= 0.7 ? '#ef4444' : item.score >= 0.5 ? '#f59e0b' : '#10b981' }}>
                      {item.score.toFixed(2)}
                    </span>
                    <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.score * 100}%`, height: '100%', background: item.score >= 0.7 ? '#ef4444' : item.score >= 0.5 ? '#f59e0b' : '#10b981' }} />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${item.action === 'ESCALATE' ? 'badge-danger' : item.action === 'REVIEW' ? 'badge-warning' : 'badge-success'}`}>
                    {item.action}
                  </span>
                </td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
                  {item.reason}
                </td>
                <td>
                  <span style={{ 
                    fontSize: '0.72rem', fontWeight: 600, 
                    color: item.status === 'CLEARED' ? '#10b981' : item.status === 'ESCALATED' ? '#f87171' : '#fbbf24',
                    textTransform: 'uppercase' 
                  }}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.status === 'PENDING' ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => handleAction(item.id, 'ESCALATED')}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#f87171' }}
                      >
                        Escalate
                      </button>
                      <button 
                        onClick={() => handleAction(item.id, 'CLEARED')}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#34d399' }}
                      >
                        Clear
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Action Recorded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
