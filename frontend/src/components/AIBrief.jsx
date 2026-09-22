import React, { useState, useEffect } from 'react';
import { IconBrain, IconRefresh, IconCheck, IconAlert } from './Icons';

export default function AIBrief({ narrative = {}, onRefresh, isRefreshing = false }) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullText = narrative?.markdown || "Analyzing telemetry across BIM, Cost, Progress, and Energy modules...";

  // Typewriter effect on initial load or narrative change
  useEffect(() => {
    if (!fullText) return;
    setIsTyping(true);
    setDisplayText("");

    let i = 0;
    const speed = 12; // ms per char block
    const chunkSize = 4;
    const interval = setInterval(() => {
      i += chunkSize;
      if (i >= fullText.length) {
        setDisplayText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayText(fullText.slice(0, i));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic markdown-to-HTML parser for headers, bold, bullet points, and code
  const formatMarkdown = (md) => {
    if (!md) return null;
    const lines = md.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: '12px 0 6px' }}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} style={{ fontSize: '0.98rem', fontWeight: 700, color: '#818cf8', margin: '14px 0 6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('---')) {
        return <hr key={idx} style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
            <span dangerouslySetInnerHTML={{ __html: parseInlines(line.replace('- ', '')) }} />
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} style={{ 
            padding: '8px 12px', background: 'rgba(0,0,0,0.2)', 
            borderRadius: '8px', marginBottom: '6px', 
            fontSize: '0.86rem', borderLeft: '3px solid #6366f1' 
          }}>
            <span dangerouslySetInnerHTML={{ __html: parseInlines(line) }} />
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} style={{ height: '6px' }} />;
      }
      return (
        <p key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', lineHeight: 1.6 }}>
          <span dangerouslySetInnerHTML={{ __html: parseInlines(line) }} />
        </p>
      );
    });
  };

  const parseInlines = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff; font-weight: 700;">$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; font-family: var(--font-mono);">$1</code>');
  };

  return (
    <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '10px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' 
          }}>
            <IconBrain size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>AI Risk Narrator</h3>
              <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                {narrative?.provider || 'Gemini 1.5 Pro'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Cross-domain ML synthesis & executive recommendations
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={handleCopy} 
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            title="Copy briefing to clipboard"
          >
            {copied ? <IconCheck size={14} /> : null}
            {copied ? "Copied" : "Copy Brief"}
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onRefresh} 
            disabled={isRefreshing}
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            <IconRefresh size={14} className={isRefreshing ? "spin-slow" : ""} />
            {isRefreshing ? "Synthesizing..." : "Re-Analyze"}
          </button>
        </div>
      </div>

      {/* Briefing Content */}
      <div style={{ 
        background: 'rgba(10, 15, 30, 0.75)', 
        borderRadius: '12px', 
        padding: '20px', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {formatMarkdown(displayText)}
        {isTyping && (
          <span style={{ 
            display: 'inline-block', width: '8px', height: '16px', 
            background: '#818cf8', marginLeft: '4px', verticalAlign: 'middle',
            animation: 'pulseGlow 0.8s infinite'
          }} />
        )}
      </div>
    </div>
  );
}
