import React, { useState } from 'react';
import { IconBim, IconAlert } from './Icons';

export default function ClashTable({ bimData = {} }) {
  const [selectedFloor, setSelectedFloor] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');

  const clashes = bimData?.clashes || [
    { id: "CL-0104", floor: "Floor 3", compA: "HVAC-Duct-302", compB: "BEAM-Steel-W24", type: "Hard Clash", distance_mm: -45, severity: "HIGH", action: "Re-route duct lower by 120mm" },
    { id: "CL-0105", floor: "Floor 3", compA: "Fire-Sprinkler-Main", compB: "Cable-Tray-Elec", type: "Clearance Violation", distance_mm: 12, severity: "HIGH", action: "Shift cable tray 200mm North" },
    { id: "CL-0211", floor: "Floor 1", compA: "Sanitary-Drain-Pipe", compB: "Column-RC-04", type: "Penetration Failure", distance_mm: -18, severity: "HIGH", action: "Sleeve penetrations detail needed" },
    { id: "CL-0308", floor: "Floor 3", compA: "Supply-Air-Duct-3B", compB: "Plumbing-Vent", type: "Clearance Violation", distance_mm: 30, severity: "MEDIUM", action: "Coordinated offset on vent" },
    { id: "CL-0419", floor: "Floor 5", compA: "Drywall-Track", compB: "Conduit-Telecom", type: "Soft Clash", distance_mm: 5, severity: "LOW", action: "Field adjustment during stud install" }
  ];

  const filteredClashes = clashes.filter(c => {
    if (selectedFloor !== 'ALL' && c.floor !== selectedFloor) return false;
    if (selectedSeverity !== 'ALL' && c.severity !== selectedSeverity) return false;
    return true;
  });

  const totalClashes = bimData?.clash_summary?.total_clashes || clashes.length;
  const highSev = bimData?.clash_summary?.high_severity || clashes.filter(c => c.severity === 'HIGH').length;

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'rgba(99, 102, 241, 0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#818cf8' 
          }}>
            <IconBim size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>BIM Geometric Clashes</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AABB Spatial Interference Matrix</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Floor filter */}
          <select 
            value={selectedFloor} 
            onChange={(e) => setSelectedFloor(e.target.value)}
            style={{ 
              background: 'rgba(15, 23, 42, 0.8)', color: 'var(--text-main)', 
              border: '1px solid var(--border-subtle)', borderRadius: '6px', 
              padding: '4px 8px', fontSize: '0.75rem', outline: 'none' 
            }}
          >
            <option value="ALL">All Levels</option>
            <option value="Floor 1">Floor 1</option>
            <option value="Floor 3">Floor 3</option>
            <option value="Floor 5">Floor 5</option>
          </select>

          <span className="badge badge-danger">
            {highSev} Critical
          </span>
          <span className="badge badge-info">
            {totalClashes} Total
          </span>
        </div>
      </div>

      {/* Clashes Table */}
      <div className="table-container" style={{ flexGrow: 1, maxHeight: '280px', overflowY: 'auto' }}>
        <table className="ciq-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Interference (A ↔ B)</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClashes.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#818cf8' }}>
                  {c.id}
                </td>
                <td>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.floor}</span>
                </td>
                <td>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{c.compA}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>↔ {c.compB}</div>
                </td>
                <td>
                  <span style={{ fontSize: '0.75rem' }}>{c.type}</span>
                </td>
                <td>
                  <span className={`badge ${c.severity === 'HIGH' ? 'badge-danger' : c.severity === 'MEDIUM' ? 'badge-warning' : 'badge-info'}`}>
                    {c.severity}
                  </span>
                </td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-main)', maxWidth: '180px' }}>
                  {c.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
