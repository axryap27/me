import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Mesh } from 'three';

interface InteractiveCardProps {
  position: [number, number, number];
  title: string;
  index: number;
}

export function InteractiveCard({ position, title, index }: InteractiveCardProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime + index) * 0.1;
      
      if (hovered) {
        meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        meshRef.current.position.z = position[2];
      }
    }
  });

  const colors = ['#00BFFF', '#00FFFF', '#FF00FF'];
  const color = colors[index % 3];

  return (
    <RoundedBox
      ref={meshRef}
      args={[2, 1.2, 0.1]}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={hovered ? 0.2 : 0.05}
      />
    </RoundedBox>
  );
}