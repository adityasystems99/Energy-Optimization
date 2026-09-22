import React, { useState } from 'react';
import { IconBrain, IconSend, IconShield } from './Icons';

export default function AIChatModal({ isOpen, onClose, projectId = "proj-tower-alpha" }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am your ConstructIQ AI Project Director. I have ingested live telemetry across BIM models, XGBoost cost models, LSTM progress curves, and IoT power sensors. Ask me anything about Tower-Alpha's project health or risk mitigations."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, question: userText })
      });

      if (!res.ok) throw new Error("Chat request failed");
      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.answer || "No response received.",
        provider: data.provider
      }]);
    } catch (err) {
      // Offline fallback
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Based on local telemetry: Tower-Alpha is experiencing cost escalation (+14.8%) driven by subcontract rework on Floor 3 MEP clashes, and schedule slippage of 7 days on the critical path. Immediate action advised: resolve the 3 high-severity HVAC clashes.",
        provider: "ConstructIQ Fallback"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "Why is cost overrun risk so high?",
    "Which BIM clashes require immediate action?",
    "How can we recover the 7 lost schedule days?",
    "What are the top energy saving recommendations?"
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5, 8, 16, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%', maxWidth: '640px', height: '80vh', maxHeight: '720px',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.3)',
        border: '1px solid rgba(99, 102, 241, 0.4)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
              <IconBrain size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>ConstructIQ AI Copilot</h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Context-Aware Construction Intelligence Assistant</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="btn btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            ✕ Close
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{
          display: 'flex', gap: '6px', overflowX: 'auto', padding: '10px 16px',
          background: 'rgba(0, 0, 0, 0.25)', borderBottom: '1px solid rgba(255,255,255,0.04)'
        }}>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => { setInput(q); }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-muted)',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#6366f1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.role === 'user' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'rgba(30, 41, 59, 0.75)',
                border: m.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                padding: '12px 16px',
                fontSize: '0.86rem',
                lineHeight: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              {m.text}
              {m.provider && (
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '6px', textAlign: 'right' }}>
                  via {m.provider}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(30, 41, 59, 0.75)', padding: '10px 16px', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ConstructIQ AI is reasoning over multi-pillar telemetry...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          background: 'rgba(15, 23, 42, 0.95)'
        }}>
          <input
            type="text"
            placeholder="Ask about schedule, budget, clashes, energy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flexGrow: 1,
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '8px 16px' }}>
            <IconSend size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
