import React from 'react';

export default function TechStackSection() {
  const stack = [
    {
      category: "FRONTEND & WEBGL",
      techs: ["React 18", "Vite 5", "Three.js WebGL", "GSAP Motion", "Glassmorphic CSS System"]
    },
    {
      category: "BACKEND INFRASTRUCTURE",
      techs: ["FastAPI (Python 3)", "Uvicorn Asynchronous", "Server-Sent Events (SSE)", "RESTful Architecture"]
    },
    {
      category: "PREDICTIVE ML ENGINES",
      techs: ["TensorFlow / Keras", "XGBoost Stacking", "Scikit-Learn (IsolationForest)", "CNN-LSTM Hybrid Networks"]
    },
    {
      category: "COGNITIVE AI & REASONING",
      techs: ["Google Gemini 1.5", "Multi-Pillar Prompt Engineering", "Fallback Rule Synthesis", "Confidence Calibrator"]
    }
  ];

  return (
    <section style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '60px 24px 100px',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '10px' }}>
          <span>Production Stack</span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
          ENTERPRISE-GRADE FOUNDATION
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {stack.map((s, idx) => (
          <div key={idx} className="glass-surface" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '12px' }}>
              {s.category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {s.techs.map((t, tIdx) => (
                <div key={tIdx} style={{ fontSize: '0.86rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
