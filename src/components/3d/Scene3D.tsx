import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { FloatingCubes } from './FloatingCubes';
import { SkillOrbs } from './SkillOrbs';

interface Scene3DProps {
  showSkills?: boolean;
}

export function Scene3D({ showSkills = false }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
      
      <Stars 
        radius={300} 
        depth={60} 
        count={1000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {showSkills ? <SkillOrbs /> : <FloatingCubes />}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}