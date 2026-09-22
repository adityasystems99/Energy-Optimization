import React, { useState, useEffect } from 'react';
import { IconBrain, IconCheck, IconRefresh } from '../Icons';

export default function AIRiskNarratorSection() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [reasoningStep, setReasoningStep] = useState("Correlating multi-domain telemetry...");

  const scenarios = [
    {
      label: "Cross-Domain Root Cause",
      riskScore: 67,
      riskLevel: "HIGH",
      text: `CONSTRUCTIQ AI EXECUTIVE BRIEFING
────────────────────────────────────────────────
TIMESTAMP: 2026-09-22 | TELEMETRY CONFIDENCE: 98.4%
PROJECT RISK: 67 / 100 [HIGH RISK PROFILE]

CORRELATION ANALYSIS:
Three critical spatial clashes detected on Level 08 between structural framing and MEP air ducting are directly correlated with a 4.7-day schedule delay. Subcontractors have paused field installation on Grid C.

CONSEQUENCE TRAJECTORY:
The resulting labor idle-time increases the probability of subcontract cost drift by +14.8% over the next two procurement cycles.

PRIORITIZED DIRECTIVE:
1. Convene an emergency virtual MEP coordination review (next 24h) to approve the 120mm duct offset.
2. Reallocate secondary trade crews to Critical Path Sector 4 to absorb the 4.7-day slippage.`
    },
    {
      label: "Energy Anomaly Diagnostic",
      riskScore: 42,
      riskLevel: "MODERATE",
      text: `CONSTRUCTIQ AI EXECUTIVE BRIEFING
────────────────────────────────────────────────
TIMESTAMP: 2026-09-22 | TELEMETRY CONFIDENCE: 99.1%
PROJECT RISK: 42 / 100 [MODERATE ENVELOPE]

CORRELATION ANALYSIS:
IsolationForest telemetry identified 2 anomalous standby power spikes from Tower Crane 01 between 23:00 and 04:00 during non-operational hours.

CONSEQUENCE TRAJECTORY:
Unnecessary idling draws 52 kWh/day in waste, compounding equipment hydraulic wear and increasing monthly site ESG utility costs by ~$1,280.

PRIORITIZED DIRECTIVE:
1. Deploy automated standby shutdown protocol at 22:00 nightly.
2. Inspect crane hydraulic valve seals for micro-leakage during scheduled maintenance.`
    },
    {
      label: "Cost Variance Forecast",
      riskScore: 73,
      riskLevel: "CRITICAL",
      text: `CONSTRUCTIQ AI EXECUTIVE BRIEFING
────────────────────────────────────────────────
TIMESTAMP: 2026-09-22 | TELEMETRY CONFIDENCE: 96.8%
PROJECT RISK: 73 / 100 [CRITICAL RISK PROFILE]

CORRELATION ANALYSIS:
Stacking ensemble models (XGBoost + LSTM) detect that current weekly spend velocity deviates +8.4% from the baseline cash curve at Week 12 milestone.

CONSEQUENCE TRAJECTORY:
Unmitigated escalation projects a final budget overrun of +$6.2M on the core package before super-structure topping out.

PRIORITIZED DIRECTIVE:
1. Implement temporary commitment cap on non-critical purchase requisitions.
2. Audit high-variance subcontract line items against certified progress milestones.`
    }
  ];

  const currentScenario = scenarios[activePrompt];

  // Typewriter streaming effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayText("");
    setReasoningStep("Ingesting multi-pillar telemetry...");

    const stepTimer = setTimeout(() => {
      setReasoningStep("Google Gemini 1.5 synthesizing root cause correlations...");
    }, 600);

    let i = 0;
    const fullText = currentScenario.text;
    const speed = 10;
    const chunkSize = 4;

    const interval = setInterval(() => {
      i += chunkSize;
      if (i >= fullText.length) {
        setDisplayText(fullText);
        setIsTyping(false);
        setReasoningStep("Synthesis complete. Directives issued.");
        clearInterval(interval);
      } else {
        setDisplayText(fullText.slice(0, i));
      }
    }, speed);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(interval);
    };
  }, [activePrompt]);

  return (
    <section id="ai-narrator" style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 24px 100px',
      position: 'relative'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <span className="pulse-beacon" />
          <span>The Reasoning Layer</span>
        </div>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
          DATA ISN'T THE ANSWER. <br />
          <span className="gradient-editorial">CONTEXT IS.</span>
        </h2>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          A 40-page chart deck does not prevent an overrun. The <strong>ConstructIQ AI Risk Narrator</strong> transforms raw sensor telemetry, geometric clashes, and cost forecasts into natural language project director briefings.
        </p>
      </div>

      {/* Futuristic AI Terminal Container */}
      <div className="glass-surface hud-corner-tl hud-corner-br" style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '0',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(99,102,241,0.25)'
      }}>
        {/* Terminal Header */}
        <div style={{
          padding: '14px 20px',
          background: 'rgba(10, 14, 26, 0.95)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ffffff', fontWeight: 700 }}>
              CONSTRUCTIQ_REASONING_ENGINE v1.5
            </span>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(168,85,247,0.18)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>
              GEMINI PRO LAYER
            </span>
          </div>

          {/* Reasoning Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            <span className="pulse-beacon" />
            <span>{reasoningStep}</span>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(5, 7, 13, 0.7)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          overflowX: 'auto'
        }}>
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={activePrompt === idx ? "btn-command" : "btn-ghost-hud"}
              style={{
                padding: '6px 14px',
                fontSize: '0.75rem',
                borderRadius: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Streaming Output Body */}
        <div style={{
          padding: '28px',
          background: 'rgba(5, 8, 16, 0.95)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          lineHeight: 1.7,
          color: '#e2e8f0',
          minHeight: '340px',
          whiteSpace: 'pre-wrap',
          position: 'relative'
        }}>
          {displayText}
          {isTyping && (
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              background: '#06b6d4',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'beaconPulse 0.8s infinite'
            }} />
          )}
        </div>

        {/* Terminal Footer */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(10, 14, 26, 0.9)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>STATUS: EXECUTIVE DECISION DIRECTIVE ACTIVE</span>
          <span style={{ color: currentScenario.riskLevel === 'CRITICAL' ? '#f87171' : '#34d399' }}>
            ● RISK EVALUATION: {currentScenario.riskScore}/100
          </span>
        </div>
      </div>
    </section>
  );
}
