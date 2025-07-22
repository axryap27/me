import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AstronomyBackground() {
  const starsRef = useRef<THREE.Points>(null);

  // Generate minimal star field
  const starsData = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute stars in a large sphere, but keep them distant
      const radius = Math.random() * 60 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return { positions, count };
  }, []);

  useFrame(() => {
    if (!starsRef.current) return;
    
    // Get scroll position
    const scrollY = window.scrollY;
    const scrollProgress = scrollY * 0.0008; // Very subtle
    
    // Gentle parallax movement based on scroll
    starsRef.current.rotation.y = scrollProgress;
    starsRef.current.rotation.x = scrollProgress * 0.5;
  });

  return (
    <group>
      {/* Minimal stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starsData.count}
            array={starsData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          sizeAttenuation
          transparent
          opacity={0.3}
          color="#ffffff"
          depthWrite={false}
        />
      </points>
    </group>
  );
}