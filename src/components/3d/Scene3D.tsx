import { Canvas } from '@react-three/fiber';
import { AstronomyBackground } from './AstronomyBackground';

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45 }}
      style={{ height: '100%', width: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Very subtle space fog */}
      <fog attach="fog" args={['#000000', 50, 120]} />
      
      {/* Minimal lighting */}
      <ambientLight intensity={0.05} />
      
      <AstronomyBackground />
    </Canvas>
  );
}