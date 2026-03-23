"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
}

const GLYPHS = [
  // Elder Futhark runes
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ",
  "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ",
  "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ",
  // Younger Futhark runes
  "ᚬ", "ᚭ", "ᚮ", "ᚯ", "ᚰ", "ᚳ", "ᚴ", "ᚵ",
  // Medieval runes
  "ᛆ", "ᛋ", "ᛌ", "ᛍ", "ᛎ", "ᛐ", "ᛑ", "ᛓ",
  "ᛔ", "ᛕ", "ᛘ", "ᛙ", "ᛛ", "ᛝ",
  // Norse symbols
  "⊕", "☽", "✧", "◆", "⟁", "⌘", "⚡", "✦",
  "△", "▽", "◇", "⊗", "⊛", "⍟", "☸", "⚔",
];

const COLORS = ["#00BFA5", "#C49A3C", "#0D7377", "#2E8B57"];

// Cache de texturas - solo se crea una vez por glyph+color
const textureCache = new Map<string, THREE.CanvasTexture>();

function getGlyphTexture(glyph: string, color: string): THREE.CanvasTexture {
  const key = `${glyph}_${color}`;
  const cached = textureCache.get(key);
  if (cached) return cached;

  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 42px serif";
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fillText(glyph, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  textureCache.set(key, texture);
  return texture;
}

interface ParticleData {
  x: number;
  y: number;
  z: number;
  speed: number;
  glyph: string;
  color: string;
  baseScale: number;
}

export default function ParticleField({ count }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const items: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 8,
        speed: 0.1 + Math.random() * 0.4,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "ᚠ",
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#00BFA5",
        baseScale: 0.08 + Math.random() * 0.18,
      });
    }
    return items;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const children = groupRef.current.children;

    for (let i = 0; i < children.length; i++) {
      const data = particles[i];
      if (!data) continue;
      const sprite = children[i] as THREE.Sprite;

      sprite.position.set(
        data.x + Math.sin(time * data.speed + i * 0.1) * 0.5,
        data.y + Math.cos(time * data.speed * 0.7 + i * 0.05) * 0.4,
        data.z + Math.sin(time * data.speed * 0.3 + i * 0.02) * 0.3
      );

      const pulse = 1 + Math.sin(time * 0.8 + i * 0.3) * 0.2;
      const scale = data.baseScale * pulse;
      sprite.scale.set(scale, scale, 1);

      const mat = sprite.material as THREE.SpriteMaterial;
      mat.opacity = THREE.MathUtils.clamp(
        1 - Math.abs(sprite.position.z) / 5,
        0.15,
        0.85
      );
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((data, i) => (
        <sprite
          key={i}
          position={[data.x, data.y, data.z]}
          scale={[data.baseScale, data.baseScale, 1]}
        >
          <spriteMaterial
            map={getGlyphTexture(data.glyph, data.color)}
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
