import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particlesData = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create particles in a sphere
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient
      const colorPhase = Math.random();
      if (colorPhase < 0.2) {
        colors[i3] = 0.31; colors[i3 + 1] = 0.27; colors[i3 + 2] = 0.89; // Indigo
      } else if (colorPhase < 0.4) {
        colors[i3] = 0.02; colors[i3 + 1] = 0.71; colors[i3 + 2] = 0.83; // Cyan
      } else if (colorPhase < 0.6) {
        colors[i3] = 0.06; colors[i3 + 1] = 0.72; colors[i3 + 2] = 0.51; // Emerald
      } else if (colorPhase < 0.8) {
        colors[i3] = 0.96; colors[i3 + 1] = 0.62; colors[i3 + 2] = 0.04; // Amber
      } else {
        colors[i3] = 0.93; colors[i3 + 1] = 0.27; colors[i3 + 2] = 0.27; // Red
      }
    }
    
    return { positions, colors, count };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particlesData.count; i++) {
      const i3 = i * 3;
      
      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.001;
      
      // Mouse interaction
      const mouseInfluence = 0.02;
      positions[i3] += mouse.x * mouseInfluence * Math.sin(i * 0.1);
      positions[i3 + 1] += mouse.y * mouseInfluence * Math.cos(i * 0.1);
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesData.count}
          array={particlesData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesData.count}
          array={particlesData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}