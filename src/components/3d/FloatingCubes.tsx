import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

export function FloatingCubes() {
  const cubesRef = useRef<Mesh[]>([]);
  const { mouse, viewport } = useThree();

  const cubes = useMemo(() => {
    const cubeArray = [];
    for (let i = 0; i < 25; i++) {
      cubeArray.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        orbitRadius: Math.random() * 3 + 1,
        orbitSpeed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return cubeArray;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouseX = mouse.x * viewport.width;
    const mouseY = mouse.y * viewport.height;
    const scrollY = window.scrollY * 0.001;

    cubesRef.current.forEach((cube, index) => {
      if (cube) {
        const cubeData = cubes[index];
        
        // Orbital motion around original position
        const orbitX = Math.sin(time * cubeData.orbitSpeed + cubeData.phase) * cubeData.orbitRadius;
        const orbitY = Math.cos(time * cubeData.orbitSpeed + cubeData.phase) * cubeData.orbitRadius;
        const orbitZ = Math.sin(time * cubeData.orbitSpeed * 0.5 + cubeData.phase) * cubeData.orbitRadius * 0.5;
        
        // Mouse influence
        const mouseInfluence = 0.15;
        const mouseOffsetX = mouseX * mouseInfluence * (index % 2 === 0 ? 1 : -1);
        const mouseOffsetY = mouseY * mouseInfluence * (index % 2 === 0 ? 1 : -1);
        
        // Scroll influence
        const scrollInfluence = scrollY * (index % 3 + 1) * 2;
        
        cube.position.x = cubeData.position[0] + orbitX + mouseOffsetX;
        cube.position.y = cubeData.position[1] + orbitY + mouseOffsetY + scrollInfluence;
        cube.position.z = cubeData.position[2] + orbitZ;
        
        // Smooth rotation with variation
        cube.rotation.x += cubeData.speed * (1 + mouseX * 0.1);
        cube.rotation.y += cubeData.speed * 0.8 * (1 + mouseY * 0.1);
        cube.rotation.z += cubeData.speed * 0.6;
        
        // Enhanced pulsing scale effect
        const pulse = Math.sin(time * 2 + index * 0.5) * 0.15 + 1;
        const mousePulse = (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1 + 1;
        cube.scale.setScalar(cubeData.scale * pulse * mousePulse);
      }
    });
  });

  const colors = [
    { color: "#4F46E5", emissive: "#1E1B4B" }, // Indigo
    { color: "#06B6D4", emissive: "#0C4A6E" }, // Cyan  
    { color: "#10B981", emissive: "#064E3B" }, // Emerald
    { color: "#F59E0B", emissive: "#78350F" }, // Amber
    { color: "#EF4444", emissive: "#7F1D1D" }, // Red
  ];

  return (
    <group>
      {cubes.map((cube, index) => {
        const colorData = colors[index % colors.length];
        const isWireframe = index % 3 === 0;
        
        return (
          <mesh
            key={index}
            ref={(el) => {
              if (el) cubesRef.current[index] = el;
            }}
            position={cube.position}
            rotation={cube.rotation}
            scale={cube.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colorData.color}
              emissive={colorData.emissive}
              emissiveIntensity={0.2}
              wireframe={isWireframe}
              transparent
              opacity={isWireframe ? 0.6 : 0.8}
              metalness={0.1}
              roughness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}