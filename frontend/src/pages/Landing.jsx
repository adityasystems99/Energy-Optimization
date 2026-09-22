import React from 'react';
import { IconBim, IconCost, IconProgress, IconEnergy, IconBrain, IconShield, IconChevronRight } from '../components/Icons';

export default function Landing({ onLaunchDashboard }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(7, 10, 18, 0.75)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🏗️</span>
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Construct<span style={{ color: '#818cf8' }}>IQ</span>
            </span>
            <span style={{ fontSize: '0.65rem', marginLeft: '6px', padding: '2px 6px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', borderRadius: '4px', border: '1px solid rgba(99,102,241,0.3)', textTransform: 'uppercase' }}>
              Enterprise AI
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}>AI Pillars</span>
            <span style={{ cursor: 'pointer' }} onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}>Architecture</span>
            <span style={{ cursor: 'pointer' }} onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}>Industry Impact</span>
          </div>
          <button onClick={onLaunchDashboard} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Launch Command Center <IconChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div className="badge gradient-badge" style={{ marginBottom: '20px', padding: '6px 14px', fontSize: '0.8rem' }}>
          ✨ Unified Multi-Pillar Construction Intelligence
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.15,
          maxWidth: '960px', marginBottom: '24px'
        }}>
          Transforming Construction Risk into <br />
          <span className="gradient-text">Predictive Actionable Intelligence</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)',
          maxWidth: '780px', lineHeight: 1.6, marginBottom: '36px'
        }}>
          Unifying <strong>BIM Model Validation</strong>, <strong>Cost Overrun Forecasting</strong>, <strong>Schedule Progress Tracking</strong>, and <strong>Site Energy Optimization</strong> with an intelligent LLM risk narrator.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          <button onClick={onLaunchDashboard} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            Open Live Project Command Center <IconChevronRight size={18} />
          </button>
          <button 
            onClick={() => document.getElementById('narrator-preview')?.scrollIntoView({ behavior: 'smooth' })} 
            className="btn btn-secondary" 
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Explore AI Narrator Demo
          </button>
        </div>

        {/* Live Teaser Ticker */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px', width: '100%', maxWidth: '1000px'
        }}>
          <div className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>12 Clashes</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>AABB Spatial Interference</div>
          </div>
          <div className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>73% Prob</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Cost Overrun Drift (+14.8%)</div>
          </div>
          <div className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>-7 Days</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>S-Curve Milestone Delay</div>
          </div>
          <div className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>52 kWh/day</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Reclaimable Standby Energy</div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section id="pillars" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Four Autonomous AI Analytical Engines</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            Traditional tools operate in silos. ConstructIQ runs 4 specialized machine learning models simultaneously to synthesize interconnected project risks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {/* Pillar 1 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '20px' }}>
              <IconBim size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>BIM Model Validator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Geometric Axis-Aligned Bounding Box (AABB) clash detection combined with Random Forest + LSTM fault scoring and IsolationForest anomaly filtering.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>• Automated MEP-to-Structural checking</div>
            <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600, marginTop: '4px' }}>• Prioritized ESCALATE / REVIEW tiers</div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', marginBottom: '20px' }}>
              <IconCost size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Cost Overrun Predictor</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              XGBoost on static site parameters stacked with an LSTM weekly financial sequence predictor to forecast budget variance before claims crystallize.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600 }}>• 73% Overrun probability alert</div>
            <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600, marginTop: '4px' }}>• Stacking meta-regressor calibration</div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '20px' }}>
              <IconProgress size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Progress & Schedule AI</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Dynamic S-curve tracker powered by a hybrid CNN-LSTM network that predicts next-day completion percentage and early-warns critical path slippage.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>• Planned vs Actual S-curve deviation</div>
            <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600, marginTop: '4px' }}>• Cascade schedule bottleneck alerts</div>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '20px' }}>
              <IconEnergy size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Site Energy Optimizer</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Equipment power telemetry ingestion with LSTM load curves, unsupervised IsolationForest anomaly detection, and greedy shutdown schedules.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>• Standby night-draw elimination</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>• ~52 kWh daily carbon footprint reduction</div>
          </div>
        </div>
      </section>

      {/* Narrator Preview Section */}
      <section id="narrator-preview" style={{ maxWidth: '1000px', margin: '40px auto 80px', padding: '0 24px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '36px', border: '1px solid rgba(99, 102, 241, 0.4)', background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(10,15,30,0.95) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <IconBrain size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>The Differentiator: AI Risk Narrator</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered by Google Gemini 1.5 & Cross-Domain Reasoning</span>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.7 }}>
            <p style={{ color: '#ffffff', marginBottom: '12px' }}>
              <strong style={{ color: '#f87171' }}>🧠 Executive Health Brief: Tower-Alpha (Index: 67/100 — HIGH RISK)</strong>
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
              "Your project has an elevated <strong>73% probability of budget overrun</strong> (+14.8% projected final drift). Concurrently, geometric validation flagged <strong>12 clashes on Floor 3</strong> where primary MEP ducting intersects W24 steel girders. Critical path progress is <strong>7 days behind the planned S-curve</strong> because subcontractors are holding field work for clash resolution."
            </p>
            <p style={{ color: '#818cf8', fontWeight: 600 }}>
              Action Priority: Convene emergency MEP-Structural coordination to unlock Floor 3; reallocate secondary trade manpower to the critical path; implement crane automated standby shutdown.
            </p>
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <button onClick={onLaunchDashboard} className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Launch Full Dashboard & Run Analysis <IconChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '28px 48px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)',
        flexWrap: 'wrap', gap: '12px'
      }}>
        <div>ConstructIQ — Unified AI Command Center for Construction Intelligence</div>
        <div>Built with FastAPI, TensorFlow, XGBoost, Scikit-learn, React & Gemini</div>
      </footer>
    </div>
  );
}
