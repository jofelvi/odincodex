"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleField from "@/components/sections/Hero/ParticleField";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export default function HeroCanvas() {
  const { dpr, particleCount } = useDevicePerformance();

  return (
    <Canvas
      dpr={[1, dpr]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00BFA5" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#C49A3C"
        />
        <ParticleField count={particleCount} />
      </Suspense>
    </Canvas>
  );
}
