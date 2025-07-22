import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

const skills = [
  { name: 'React', position: [-3, 2, 0] as [number, number, number], color: '#00BFFF' },
  { name: 'TypeScript', position: [3, 2, 0] as [number, number, number], color: '#00FFFF' },
  { name: 'Node.js', position: [-3, -2, 0] as [number, number, number], color: '#FF00FF' },
  { name: 'Python', position: [3, -2, 0] as [number, number, number], color: '#00BFFF' },
  { name: 'Three.js', position: [0, 0, 2] as [number, number, number], color: '#00FFFF' },
];

export function SkillOrbs() {
  const groupRef = useRef<any>();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill) => (
        <group key={skill.name} position={skill.position}>
          <mesh
            onPointerOver={() => setHoveredSkill(skill.name)}
            onPointerOut={() => setHoveredSkill(null)}
            scale={hoveredSkill === skill.name ? 1.2 : 1}
          >
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
              color={skill.color}
              transparent
              opacity={0.7}
              emissive={skill.color}
              emissiveIntensity={hoveredSkill === skill.name ? 0.3 : 0.1}
            />
          </mesh>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.3}
            color={skill.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {skill.name}
          </Text>
        </group>
      ))}
    </group>
  );
}