import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LandingNav from '../components/landing/LandingNav';
import HeroScene from '../components/landing/HeroScene';
import HeroHUD from '../components/landing/HeroHUD';
import IntelligencePillars from '../components/landing/IntelligencePillars';
import AIRiskNarratorSection from '../components/landing/AIRiskNarratorSection';
import DashboardPreview from '../components/landing/DashboardPreview';
import RiskEngineSection from '../components/landing/RiskEngineSection';
import ArchitectureFlow from '../components/landing/ArchitectureFlow';
import TechStackSection from '../components/landing/TechStackSection';
import FinalCTA from '../components/landing/FinalCTA';
import LandingFooter from '../components/landing/LandingFooter';
import { IconChevronRight } from '../components/Icons';

export default function Landing({ onLaunchDashboard }) {
  const heroRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const subheadRef = useRef(null);
  const ctaGroupRef = useRef(null);

  // GSAP Entrance Timeline
  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      [headlineLine1Ref.current, headlineLine2Ref.current],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, delay: 0.2 }
    )
    .fromTo(
      subheadRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      ctaGroupRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Top Fixed Nav */}
      <LandingNav onLaunchCommandCenter={onLaunchDashboard} />

      {/* HERO SECTION (Full Viewport Height) */}
      <section 
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '120px 24px 60px',
          overflow: 'hidden'
        }}
      >
        {/* Three.js WebGL Construction Twin */}
        <HeroScene />

        {/* Technical Floating HUD */}
        <HeroHUD />

        {/* Hero Editorial Content */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          maxWidth: '1080px',
          margin: '0 auto',
          pointerEvents: 'auto'
        }}>
          {/* Tagline */}
          <div className="hud-tag" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <span className="pulse-beacon" />
            <span>Autonomous Construction Intelligence Command Center</span>
          </div>

          {/* Editorial Staggered Headline */}
          <h1 className="editorial-title" style={{ marginBottom: '28px' }}>
            <div ref={headlineLine1Ref} style={{ overflow: 'hidden' }}>
              SEE THE RISK.
            </div>
            <div ref={headlineLine2Ref} className="gradient-editorial" style={{ overflow: 'hidden' }}>
              BEFORE THE SITE DOES.
            </div>
          </h1>

          {/* Supporting Subhead */}
          <p 
            ref={subheadRef}
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              color: 'var(--text-secondary)',
              maxWidth: '740px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Predictive intelligence connecting <strong>BIM geometric validation</strong>, <strong>cost forecasting</strong>, <strong>schedule slippage</strong>, <strong>energy telemetry</strong>, and <strong>AI reasoning</strong> into one command center.
          </p>

          {/* Hero CTAs */}
          <div 
            ref={ctaGroupRef}
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '48px'
            }}
          >
            <button
              onClick={onLaunchDashboard}
              className="btn-command"
              style={{ fontSize: '1.05rem', padding: '16px 36px', borderRadius: '12px' }}
            >
              <span>ENTER COMMAND CENTER</span>
              <IconChevronRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection('intelligence')}
              className="btn-ghost-hud"
              style={{ fontSize: '0.9rem', padding: '16px 28px', borderRadius: '12px' }}
            >
              EXPLORE INTELLIGENCE ↓
            </button>
          </div>

          {/* Live Operational Indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            borderRadius: '24px',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ color: '#34d399', fontWeight: 700 }}>● CONSTRUCTIQ SYSTEMS OPERATIONAL</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>API: HEALTHY (0ms)</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>MODELS: 4/4 ACTIVE</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE INTELLIGENCE LAYER */}
      <IntelligencePillars />

      {/* SECTION 3 — AI RISK NARRATOR */}
      <AIRiskNarratorSection />

      {/* SECTION 4 — UNIFIED COMMAND CENTER PREVIEW */}
      <DashboardPreview onLaunchCommandCenter={onLaunchDashboard} />

      {/* SECTION 5 — RISK ENGINE COMPOSITE FORMULA */}
      <RiskEngineSection />

      {/* SECTION 6 — SYSTEM ARCHITECTURE PIPELINE */}
      <ArchitectureFlow />

      {/* SECTION 7 — TECHNOLOGY STACK */}
      <TechStackSection />

      {/* SECTION 8 — FINAL CINEMATIC CTA */}
      <FinalCTA onLaunchCommandCenter={onLaunchDashboard} />

      {/* FOOTER */}
      <LandingFooter onLaunchCommandCenter={onLaunchDashboard} />
    </div>
  );
}
