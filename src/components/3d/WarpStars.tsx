import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpStarsProps {
  onWarpComplete: () => void;
}

export function WarpStars({ onWarpComplete }: WarpStarsProps) {
  const nebulaRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Points>(null);
  const nebulaMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const starsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const startTime = useRef<number | null>(null);
  const completed = useRef(false);

  const NEBULA_COUNT = 350;
  const STAR_COUNT = 400;
  const WARP_DURATION = 2.2;
  const DEPTH_RANGE = 200;

  // Nebula cloud particles — large, soft, colorful
  const nebulaData = useMemo(() => {
    const positions = new Float32Array(NEBULA_COUNT * 3);
    const meta = new Float32Array(NEBULA_COUNT * 4); // speed, seed, size, colorIndex

    for (let i = 0; i < NEBULA_COUNT; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 20 + 2;
      positions[i3] = Math.cos(angle) * spread;
      positions[i3 + 1] = Math.sin(angle) * spread;
      positions[i3 + 2] = -(Math.random() * DEPTH_RANGE + 10);

      meta[i4] = Math.random() * 0.4 + 0.8;     // speed multiplier
      meta[i4 + 1] = Math.random();               // seed
      meta[i4 + 2] = Math.random() * 0.5 + 0.5;  // size multiplier
      meta[i4 + 3] = Math.random();               // color blend factor
    }

    return { positions, meta };
  }, []);

  // Sharp star particles — small, bright, fast
  const starsData = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const meta = new Float32Array(STAR_COUNT * 2); // speed, seed

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      const i2 = i * 2;

      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 15 + 0.5;
      positions[i3] = Math.cos(angle) * spread;
      positions[i3 + 1] = Math.sin(angle) * spread;
      positions[i3 + 2] = -(Math.random() * DEPTH_RANGE + 10);

      meta[i2] = Math.random() * 0.5 + 0.75;
      meta[i2 + 1] = Math.random();
    }

    return { positions, meta };
  }, []);

  // Nebula shader — soft glowing colored blobs with redshift
  const nebulaVertexShader = `
    uniform float uIntensity;
    uniform float uTime;
    attribute vec4 aMeta; // speed, seed, sizeMul, colorIdx
    varying float vAlpha;
    varying float vColorIdx;
    varying float vDepth;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float dist = -mvPosition.z;

      // Normalized depth: 0 = at camera, 1 = far away
      vDepth = clamp(dist / ${DEPTH_RANGE.toFixed(1)}, 0.0, 1.0);
      vColorIdx = aMeta.w;

      // Closer = brighter, but fade out very close (avoids pop)
      float closeness = clamp(1.0 - vDepth, 0.0, 1.0);
      float fadeNear = smoothstep(0.0, 0.15, dist);
      vAlpha = closeness * closeness * uIntensity * fadeNear;

      // Large soft particles
      float baseSize = mix(20.0, 60.0, aMeta.z);
      gl_PointSize = baseSize * closeness * uIntensity * (300.0 / max(dist, 1.0)) * 0.15;

      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const nebulaFragmentShader = `
    uniform float uIntensity;
    varying float vAlpha;
    varying float vColorIdx;
    varying float vDepth;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;

      // Soft gaussian glow
      float alpha = exp(-dist * dist * 6.0);

      // Redshift color palette:
      // Far away (blue/purple) → mid (pink/magenta) → close (orange/red)
      vec3 farColor = mix(
        vec3(0.15, 0.1, 0.6),   // deep blue-purple
        vec3(0.2, 0.05, 0.5),   // indigo
        vColorIdx
      );
      vec3 midColor = mix(
        vec3(0.6, 0.1, 0.5),    // magenta-pink
        vec3(0.5, 0.15, 0.6),   // purple-pink
        vColorIdx
      );
      vec3 nearColor = mix(
        vec3(0.8, 0.2, 0.1),    // warm orange-red
        vec3(0.9, 0.4, 0.15),   // amber
        vColorIdx
      );

      // Blend based on depth (redshift effect)
      vec3 color;
      if (vDepth > 0.5) {
        color = mix(midColor, farColor, (vDepth - 0.5) * 2.0);
      } else {
        color = mix(nearColor, midColor, vDepth * 2.0);
      }

      // Boost saturation slightly
      color *= 1.3;

      gl_FragColor = vec4(color, alpha * vAlpha * 0.6);
    }
  `;

  // Star shader — bright streaked points
  const starVertexShader = `
    uniform float uIntensity;
    attribute vec2 aMeta; // speed, seed
    varying float vAlpha;
    varying float vDepth;
    varying float vSeed;

    void main() {
      vSeed = aMeta.y;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float dist = -mvPosition.z;

      vDepth = clamp(dist / ${DEPTH_RANGE.toFixed(1)}, 0.0, 1.0);
      float closeness = clamp(1.0 - vDepth, 0.0, 1.0);
      float fadeNear = smoothstep(0.0, 0.1, dist);
      vAlpha = closeness * uIntensity * fadeNear;

      // Streak effect: size grows with intensity and closeness
      float baseSize = mix(1.5, 5.0, closeness);
      float streakSize = baseSize * (1.0 + uIntensity * 8.0 * closeness);
      gl_PointSize = streakSize;

      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const starFragmentShader = `
    varying float vAlpha;
    varying float vDepth;
    varying float vSeed;

    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);

      // Elongated streak shape
      float streakShape = length(vec2(center.x * 2.5, center.y));
      if (streakShape > 0.5) discard;

      float alpha = 1.0 - smoothstep(0.05, 0.45, streakShape);

      // Subtle redshift on stars too
      vec3 farColor = vec3(0.6, 0.7, 1.0);   // blue-white
      vec3 nearColor = vec3(1.0, 0.85, 0.7);  // warm white
      vec3 color = mix(nearColor, farColor, vDepth);

      gl_FragColor = vec4(color, alpha * vAlpha);
    }
  `;

  const nebulaUniforms = useMemo(() => ({
    uIntensity: { value: 0 },
    uTime: { value: 0 },
  }), []);

  const starsUniforms = useMemo(() => ({
    uIntensity: { value: 0 },
  }), []);

  useFrame((state) => {
    if (completed.current) return;
    if (!nebulaRef.current || !starsRef.current) return;
    if (!nebulaMaterialRef.current || !starsMaterialRef.current) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    const progress = Math.min(1, elapsed / WARP_DURATION);

    // Smooth intensity: ease in, sustain, ease out
    let intensity: number;
    if (progress < 0.12) {
      const t = progress / 0.12;
      intensity = t * t;
    } else if (progress < 0.55) {
      intensity = 1.0;
    } else {
      const t = (progress - 0.55) / 0.45;
      intensity = 1.0 - t * t;
    }

    nebulaMaterialRef.current.uniforms.uIntensity.value = intensity;
    nebulaMaterialRef.current.uniforms.uTime.value = elapsed;
    starsMaterialRef.current.uniforms.uIntensity.value = intensity;

    const dt = Math.min(state.clock.getDelta(), 0.05);
    const baseSpeed = intensity * 90;

    // Move nebula particles
    const nebulaPos = nebulaRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NEBULA_COUNT; i++) {
      const i3 = i * 3;
      const speed = nebulaData.meta[i * 4] * baseSpeed * dt;
      nebulaPos[i3 + 2] += speed;

      if (nebulaPos[i3 + 2] > 5) {
        nebulaPos[i3 + 2] = -(Math.random() * DEPTH_RANGE * 0.7 + DEPTH_RANGE * 0.3);
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 20 + 2;
        nebulaPos[i3] = Math.cos(angle) * spread;
        nebulaPos[i3 + 1] = Math.sin(angle) * spread;
      }
    }
    nebulaRef.current.geometry.attributes.position.needsUpdate = true;

    // Move star particles
    const starPos = starsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      const speed = starsData.meta[i * 2] * baseSpeed * 1.3 * dt;
      starPos[i3 + 2] += speed;

      if (starPos[i3 + 2] > 5) {
        starPos[i3 + 2] = -(Math.random() * DEPTH_RANGE * 0.7 + DEPTH_RANGE * 0.3);
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 15 + 0.5;
        starPos[i3] = Math.cos(angle) * spread;
        starPos[i3 + 1] = Math.sin(angle) * spread;
      }
    }
    starsRef.current.geometry.attributes.position.needsUpdate = true;

    if (elapsed >= WARP_DURATION && !completed.current) {
      completed.current = true;
      onWarpComplete();
    }
  });

  return (
    <group>
      {/* Nebula cloud layer — behind stars */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NEBULA_COUNT}
            array={nebulaData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aMeta"
            count={NEBULA_COUNT}
            array={nebulaData.meta}
            itemSize={4}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nebulaMaterialRef}
          vertexShader={nebulaVertexShader}
          fragmentShader={nebulaFragmentShader}
          uniforms={nebulaUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>

      {/* Star streaks layer — on top */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STAR_COUNT}
            array={starsData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aMeta"
            count={STAR_COUNT}
            array={starsData.meta}
            itemSize={2}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={starsMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={starsUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>
    </group>
  );
}
