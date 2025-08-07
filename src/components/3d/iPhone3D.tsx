import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function iPhone({ atlasImage }: { atlasImage: string }) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Load the atlas image texture
  const atlasTexture = useTexture(atlasImage);
  
  // Auto-rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* iPhone Body */}
      <RoundedBox
        args={[2.2, 4.8, 0.3]}
        radius={0.2}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial 
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[1.9, 4.2, 0.01]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, 0.16]}
      >
        <meshBasicMaterial 
          map={atlasTexture}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Screen Bezel */}
      <RoundedBox
        args={[1.95, 4.25, 0.02]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, 0.15]}
      >
        <meshPhysicalMaterial 
          color="#000000"
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Home indicator */}
      <RoundedBox
        args={[0.6, 0.08, 0.01]}
        radius={0.04}
        smoothness={4}
        position={[0, -1.8, 0.17]}
      >
        <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
      </RoundedBox>

      {/* Camera notch */}
      <RoundedBox
        args={[0.8, 0.15, 0.01]}
        radius={0.075}
        smoothness={4}
        position={[0, 1.9, 0.17]}
      >
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* Atlas text label */}
      <Text
        position={[0, -2.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        Atlas
      </Text>
    </group>
  );
}

interface iPhone3DProps {
  atlasImage: string;
  className?: string;
}

function iPhone3D({ atlasImage, className }: iPhone3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <iPhone atlasImage={atlasImage} />
      </Canvas>
    </div>
  );
}

export default iPhone3D;