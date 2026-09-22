import React from 'react';

export default function ArchitectureFlow() {
  const pipeline = [
    {
      step: "01",
      layer: "DATA INGESTION",
      title: "HETEROGENEOUS STREAMS",
      items: ["IFC 3D BIM Models", "IoT Power Sensors", "ERP Cost Cashflows", "Primavera P6 Schedules"],
      color: "#06b6d4"
    },
    {
      step: "02",
      layer: "ML INFERENCE",
      title: "PREDICTIVE ENSEMBLES",
      items: ["AABB Clash Detector", "XGBoost + LSTM Stacking", "CNN-LSTM Hybrid S-Curve", "IsolationForest Anomaly"],
      color: "#6366f1"
    },
    {
      step: "03",
      layer: "CORRELATION",
      title: "RISK SYNTHESIZER",
      items: ["Weighted Composite Index", "Root-Cause Isolation", "Cross-Domain Impact Link", "Tolerance Thresholding"],
      color: "#fbbf24"
    },
    {
      step: "04",
      layer: "COGNITIVE REASONING",
      title: "GEMINI 1.5 PRO LAYER",
      items: ["Contextual Plain English Briefs", "Prioritized Mitigations", "Conversational Q&A Copilot", "SSE Streaming Telemetry"],
      color: "#a855f7"
    },
    {
      step: "05",
      layer: "EXECUTIVE ACTION",
      title: "COMMAND CENTER",
      items: ["Glassmorphic Dashboard", "Subcontractor Escalations", "Automated Standby Shutdown", "Critical Path Recovery"],
      color: "#10b981"
    }
  ];

  return (
    <section id="architecture" style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '80px 24px 120px',
      position: 'relative'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <span className="pulse-beacon" />
          <span>System Topology</span>
        </div>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
          END-TO-END <br />
          <span className="gradient-editorial">DATA PIPELINE</span>
        </h2>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          An engineering architecture built for high-throughput sensor telemetry, distributed ML model inference, and low-latency LLM synthesis.
        </p>
      </div>

      {/* Horizontal / Grid Pipeline Topology */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        position: 'relative'
      }}>
        {pipeline.map((p, idx) => (
          <div
            key={idx}
            className="glass-surface hud-corner-tl"
            style={{
              padding: '24px',
              borderTop: `2px solid ${p.color}`,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Step Number */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: p.color, fontWeight: 700 }}>
                {p.layer}
              </span>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontWeight: 800 }}>
                {p.step}
              </span>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
              {p.title}
            </h3>

            {/* Pipeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              {p.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  › {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Pulse Indicator */}
      <div style={{
        marginTop: '32px',
        textAlign: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-dim)'
      }}>
        <span className="pulse-beacon" />
        <span>FLOW RATE: 24,000 SAMPLES/SEC · LATENCY: 85ms END-TO-END · STATE: SYNCHRONIZED</span>
      </div>
    </section>
  );
}
