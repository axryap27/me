import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function FloatingCubes() {
  const cubesRef = useRef<Mesh[]>([]);

  const cubes = useMemo(() => {
    const cubeArray = [];
    for (let i = 0; i < 15; i++) {
      cubeArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    return cubeArray;
  }, []);

  useFrame((state) => {
    cubesRef.current.forEach((cube, index) => {
      if (cube) {
        const cubeData = cubes[index];
        cube.rotation.x += cubeData.speed;
        cube.rotation.y += cubeData.speed * 0.7;
        cube.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002;
      }
    });
  });

  return (
    <group>
      {cubes.map((cube, index) => (
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
            color={index % 3 === 0 ? "#00BFFF" : index % 3 === 1 ? "#00FFFF" : "#FF00FF"}
            wireframe={index % 2 === 0}
            transparent
            opacity={0.8}
            emissive={index % 3 === 0 ? "#001122" : index % 3 === 1 ? "#001111" : "#220011"}
          />
        </mesh>
      ))}
    </group>
  );
}