import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WarpStars } from './WarpStars';

const starVertexShader = `
  uniform float uSize;
  attribute float aSeed;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  uniform float uBrightness;
  uniform float uOpacity;
  varying float vSeed;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    float twinkle = 0.8 + 0.2 * sin(vSeed * 100.0);

    gl_FragColor = vec4(
      vec3(1.0) * uBrightness * twinkle,
      alpha * uOpacity * uBrightness
    );
  }
`;

export function AstronomyBackground() {
  const starsRef = useRef<THREE.Points>(null);
  const starMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const [warpComplete, setWarpComplete] = useState(false);
  const warpFadeIn = useRef(0);

  const starsData = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 60 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      seeds[i] = Math.random();
    }

    return { positions, seeds, count };
  }, []);

  const starUniforms = useMemo(() => ({
    uSize: { value: 0.8 },
    uBrightness: { value: 0.3 },
    uOpacity: { value: 0.0 },
  }), []);

  useFrame((state) => {
    if (!starsRef.current || !starMaterialRef.current) return;

    // Warp fade-in for stars
    if (warpComplete && warpFadeIn.current < 1) {
      warpFadeIn.current = Math.min(1, warpFadeIn.current + state.clock.getDelta() * 2);
    }

    const baseOpacity = 0.3;
    starMaterialRef.current.uniforms.uOpacity.value = baseOpacity * warpFadeIn.current;

    // Scroll progress
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;

    // Parallax rotation
    const scrollRotation = scrollY * 0.0008;
    starsRef.current.rotation.y = scrollRotation;
    starsRef.current.rotation.x = scrollRotation * 0.5;

    // Scroll-based star evolution
    const brightness = 0.3 + scrollProgress * 0.7;
    starMaterialRef.current.uniforms.uBrightness.value = brightness;
    starMaterialRef.current.uniforms.uSize.value = 0.8 + scrollProgress * 0.6;
  });

  return (
    <group>
      {/* Warp speed streaks */}
      {!warpComplete && (
        <WarpStars onWarpComplete={() => setWarpComplete(true)} />
      )}

      {/* Main star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starsData.count}
            array={starsData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            count={starsData.count}
            array={starsData.seeds}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={starMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={starUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
