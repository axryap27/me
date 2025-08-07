import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';

function PhoneMesh() {
  return (
    <group>
      {/* iPhone Body */}
      <RoundedBox
        args={[2, 4, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[1.8, 3.6, 0.01]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 0.11]}
      >
        <meshStandardMaterial color="#000000" />
      </RoundedBox>
    </group>
  );
}

interface SimpleIPhoneProps {
  className?: string;
}

function SimpleIPhone({ className }: SimpleIPhoneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [3, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PhoneMesh />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default SimpleIPhone;