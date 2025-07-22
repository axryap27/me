import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import * as THREE from 'three';

interface InteractiveCardProps {
  position: [number, number, number];
  title: string;
  index: number;
}

export function InteractiveCard({ position, title, index }: InteractiveCardProps) {
  const meshRef = useRef<Mesh>(null);
  const textRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { camera, mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Subtle floating animation
      const baseFloat = Math.sin(time * 0.5 + index * 1.2) * 0.05;
      meshRef.current.position.y = position[1] + baseFloat;
      
      // Mouse tracking effect when hovered
      if (hovered) {
        const mouseVector = new Vector3(mouse.x, mouse.y, 0.5);
        mouseVector.unproject(camera);
        const direction = mouseVector.sub(camera.position).normalize();
        const distance = -camera.position.z / direction.z;
        const pos = camera.position.clone().add(direction.multiplyScalar(distance));
        
        // Subtle tilt towards mouse
        meshRef.current.lookAt(pos.x * 0.5, pos.y * 0.5, pos.z);
        
        // Enhanced floating when hovered
        meshRef.current.position.z = position[2] + Math.sin(time * 3 + index) * 0.1 + 0.2;
        meshRef.current.rotation.z = Math.sin(time * 2) * 0.05;
      } else {
        // Return to original position smoothly
        meshRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.03;
        meshRef.current.rotation.y = Math.cos(time * 0.3 + index) * 0.03;
        meshRef.current.rotation.z = 0;
        meshRef.current.position.z = position[2];
      }
      
      // Click animation
      if (clicked) {
        const clickTime = (time * 8) % (Math.PI * 2);
        const pulse = Math.sin(clickTime) * 0.1;
        meshRef.current.scale.setScalar(1 + pulse);
      }
    }
  });

  const colors = [
    { primary: '#4F46E5', secondary: '#818CF8' }, // Indigo
    { primary: '#06B6D4', secondary: '#67E8F9' }, // Cyan
    { primary: '#EC4899', secondary: '#F9A8D4' }  // Pink
  ];
  const colorPair = colors[index % 3];

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[2.2, 1.4, 0.12]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? 1.05 : 1}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={colorPair.primary}
          transparent
          opacity={hovered ? 0.95 : 0.85}
          roughness={0.2}
          metalness={0.1}
          emissive={colorPair.primary}
          emissiveIntensity={hovered ? 0.15 : 0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </RoundedBox>
      
      {/* Glass overlay effect */}
      <RoundedBox
        args={[2.1, 1.3, 0.05]}
        position={[position[0], position[1], position[2] + 0.1]}
      >
        <meshPhysicalMaterial
          color={colorPair.secondary}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.5}
        />
      </RoundedBox>
      
      {/* Floating text */}
      <Text
        ref={textRef}
        position={[position[0], position[1], position[2] + 0.15]}
        fontSize={0.15}
        color={hovered ? '#FFFFFF' : '#E2E8F0'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
      >
        {title}
      </Text>
      
      {/* Particle trail effect when hovered */}
      {hovered && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={20}
              array={new Float32Array(Array.from({ length: 60 }, () => 
                (Math.random() - 0.5) * 3 + position[0 + Math.floor(Math.random() * 3)]
              ))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color={colorPair.secondary}
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}