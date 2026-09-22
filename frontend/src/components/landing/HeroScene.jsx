import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn("WebGL not supported on this device. Fallback grid active.");
      return;
    }

    let width = currentMount.clientWidth || window.innerWidth;
    let height = currentMount.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    // Group for the entire digital twin structure
    const twinGroup = new THREE.Group();
    scene.add(twinGroup);

    // 1. Digital BIM Building Multi-Floor Structure
    const floorLevels = 6;
    const floorWidth = 7;
    const floorDepth = 5;
    const floorHeight = 1.2;

    const beamMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45
    });

    const highlightMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.75
    });

    const clashMaterial = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.95
    });

    const nodePositions = [];

    // Construct floors and vertical column frames
    for (let f = 0; f <= floorLevels; f++) {
      const y = f * floorHeight - (floorLevels * floorHeight) / 2;
      
      // Floor perimeter frame
      const floorPoints = [
        new THREE.Vector3(-floorWidth/2, y, -floorDepth/2),
        new THREE.Vector3(floorWidth/2, y, -floorDepth/2),
        new THREE.Vector3(floorWidth/2, y, floorDepth/2),
        new THREE.Vector3(-floorWidth/2, y, floorDepth/2),
        new THREE.Vector3(-floorWidth/2, y, -floorDepth/2)
      ];
      const floorGeo = new THREE.BufferGeometry().setFromPoints(floorPoints);
      const floorLine = new THREE.Line(floorGeo, (f === 2 || f === 4) ? highlightMaterial : beamMaterial);
      twinGroup.add(floorLine);

      // Floor internal cross beams & nodes
      for (let x = -floorWidth/2; x <= floorWidth/2; x += floorWidth/4) {
        for (let z = -floorDepth/2; z <= floorDepth/2; z += floorDepth/3) {
          nodePositions.push(x, y, z);
          
          // Cross truss lines
          if (f < floorLevels) {
            const colPoints = [
              new THREE.Vector3(x, y, z),
              new THREE.Vector3(x, y + floorHeight, z)
            ];
            const colGeo = new THREE.BufferGeometry().setFromPoints(colPoints);
            const colLine = new THREE.Line(colGeo, beamMaterial);
            twinGroup.add(colLine);
          }
        }
      }
    }

    // 2. Structural Nodes (Glowing Points)
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.12,
      transparent: true,
      opacity: 0.85
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    twinGroup.add(nodes);

    // 3. Highlighted Geometric Clash Indicator (Floor 3 MEP Collision)
    const clashY = 2 * floorHeight - (floorLevels * floorHeight) / 2;
    const clashGeo = new THREE.BoxGeometry(0.8, 0.4, 0.8);
    const clashEdges = new THREE.EdgesGeometry(clashGeo);
    const clashBox = new THREE.LineSegments(clashEdges, clashMaterial);
    clashBox.position.set(floorWidth/4, clashY, floorDepth/6);
    twinGroup.add(clashBox);

    // 4. Ground Perspective Grid
    const grid = new THREE.GridHelper(26, 26, 0x6366f1, 0x1e1b4b);
    grid.position.y = -(floorLevels * floorHeight) / 2 - 0.5;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);

    // 5. Ambient Atmospheric Telemetry Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      particleSpeeds[i] = 0.005 + Math.random() * 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.06,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 20);
    cyanLight.position.set(-6, 4, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3, 20);
    violetLight.position.set(6, -2, 6);
    scene.add(violetLight);

    // Mouse movement listener
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!currentMount) return;
      width = currentMount.clientWidth || window.innerWidth;
      height = currentMount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Subtle slow rotation + parallax tilt
      twinGroup.rotation.y = time * 0.08 + mouseRef.current.x * 0.35;
      twinGroup.rotation.x = 0.15 + mouseRef.current.y * 0.2;

      // Pulse clash box
      const pulse = 1 + Math.sin(time * 4) * 0.08;
      clashBox.scale.set(pulse, pulse, pulse);

      // Float telemetry particles upwards
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 7) {
          positions[i * 3 + 1] = -5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Slight dynamic light shift
      cyanLight.position.x = -6 + mouseRef.current.x * 2;
      violetLight.position.x = 6 - mouseRef.current.x * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
}
