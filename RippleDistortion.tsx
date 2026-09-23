import React, { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';

export type RippleDistortionProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  brushSize?: number;
  strength?: number;
  swirl?: number;
  rings?: number;
  grayscale?: boolean;
  spread?: number;
  fade?: number;
  spacing?: number;
  dispersion?: number;
  glint?: number;
  tint?: string;
  tintAmount?: number;
  highlightColor?: string;
  trigger?: 'hover' | 'click' | 'always';
  clickStrength?: number;
  quality?: 'low' | 'medium' | 'high';
  enabled?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '').trim();
  const normalized = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;

  const int = Number.parseInt(normalized, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
};

export default function RippleDistortion({
  src,
  className,
  style,
  brushSize = 150,
  strength = 0.2,
  swirl = 1,
  rings = 4,
  grayscale = false,
  spread = 5,
  fade = 3,
  spacing = 15,
  dispersion = 0,
  glint = 0,
  tint = '#a855f7',
  tintAmount = 0.1,
  highlightColor = '#ffffff',
  trigger = 'hover',
  clickStrength = 2,
  quality = 'low',
  enabled = true,
}: RippleDistortionProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: false, press: 0 });
  const animationRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const programRef = useRef<Program | null>(null);

  useEffect(() => {
    if (!enabled || !wrapperRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = wrapperRef.current;
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    if (!gl) return;

    const qMap = { low: 0.85, medium: 1, high: 1.2 };
    const dpr = clamp(window.devicePixelRatio * qMap[quality], 1, 2);

    const renderer = new Renderer({
      canvas,
      gl,
      alpha: true,
      antialias: true,
      dpr,
    });

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = src;

    const buildMesh = () => {
      const geometry = new Triangle(gl);
      const texture = new Texture(gl, {
        generateMipmaps: true,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
        magFilter: gl.LINEAR,
      });

      texture.image = image;
      if (image.complete) {
        texture.needsUpdate = true;
      }

      const tintRgb = hexToRgb(tint);
      const highlightRgb = hexToRgb(highlightColor);

      const program = new Program(gl, {
        vertex: `
          attribute vec2 position;
          varying vec2 vUv;

          void main() {
            vUv = position * 0.5 + 0.5;
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `,
        fragment: `
          precision highp float;

          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uTime;
          uniform float uStrength;
          uniform float uBrushSize;
          uniform float uSwirl;
          uniform float uRings;
          uniform float uSpread;
          uniform float uFade;
          uniform float uSpacing;
          uniform float uDispersion;
          uniform float uGlint;
          uniform vec3 uTint;
          uniform float uTintAmount;
          uniform vec3 uHighlight;
          uniform float uGrayscale;

          float rippleField(vec2 uv, vec2 pointer, float time) {
            vec2 delta = uv - pointer;
            float dist = length(delta);
            float softness = 1.0 / max(uBrushSize, 0.0001);
            float ringWave = sin(dist * (18.0 + uRings * 14.0) - time * (3.2 + uSwirl) * 1.2) * exp(-dist * (2.0 + uSpread));
            float envelope = smoothstep(0.0, 1.3, 1.3 - dist * (1.0 + uFade));
            return ringWave * envelope * softness * (0.55 + uStrength);
          }

          void main() {
            vec2 uv = vUv;
            vec2 pointer = vec2(uPointer.x, 1.0 - uPointer.y);
            vec2 centered = uv - pointer;
            centered.x *= uResolution.x / max(uResolution.y, 1.0);

            float t = uTime * 0.8;
            float signal = rippleField(uv, pointer, t);

            float radius = length(centered);
            float influence = smoothstep(0.0, uBrushSize * 1.15, max(0.0001, uBrushSize * 1.15 - radius));
            float wave = signal * influence;

            vec2 dir = normalize(centered + vec2(0.0001));
            vec2 offset = dir * wave * (0.12 + uStrength * 0.45);
            uv += offset;

            vec2 swirlDir = vec2(-centered.y, centered.x);
            uv += normalize(swirlDir + vec2(0.0001)) * wave * (0.08 + uSwirl * 0.12);

            vec4 tex = texture2D(uTexture, uv);

            if (uGrayscale > 0.5) {
              float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
              tex.rgb = vec3(gray);
            }

            vec3 tinted = mix(tex.rgb, tex.rgb * uTint, uTintAmount);
            vec3 highlight = uHighlight * smoothstep(0.9, 0.1, radius) * (0.25 + uGlint * 0.75);

            vec3 color = tinted + highlight;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
          uTexture: { value: texture },
          uResolution: { value: [canvas.width, canvas.height] },
          uPointer: { value: [0.5, 0.5] },
          uTime: { value: 0 },
          uStrength: { value: strength },
          uBrushSize: { value: brushSize / 1000 },
          uSwirl: { value: swirl },
          uRings: { value: rings },
          uSpread: { value: spread / 10 },
          uFade: { value: fade / 10 },
          uSpacing: { value: spacing / 100 },
          uDispersion: { value: dispersion / 100 },
          uGlint: { value: glint },
          uTint: { value: [tintRgb.r, tintRgb.g, tintRgb.b] },
          uTintAmount: { value: tintAmount },
          uHighlight: { value: [highlightRgb.r, highlightRgb.g, highlightRgb.b] },
          uGrayscale: { value: grayscale ? 1 : 0 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;
      programRef.current = program;
      renderer.render({ scene: mesh, camera: { fov: 45 } });
    };

    image.onload = () => {
      buildMesh();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = [canvas.width, canvas.height];
      }
      if (renderer) {
        renderer.setSize(w, h);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const movePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current.targetX = clamp((clientX - rect.left) / rect.width, 0, 1);
      pointerRef.current.targetY = clamp((clientY - rect.top) / rect.height, 0, 1);
      pointerRef.current.active = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (trigger === 'hover' || trigger === 'click') {
        movePointer(event.clientX, event.clientY);
      }
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (trigger === 'hover') {
        movePointer(event.clientX, event.clientY);
        pointerRef.current.active = true;
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.targetX = 0.5;
      pointerRef.current.targetY = 0.5;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (trigger === 'click' || trigger === 'always') {
        movePointer(event.clientX, event.clientY);
        pointerRef.current.press = clickStrength;
      }
    };

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerdown', handlePointerDown);

    const renderFrame = (time: number) => {
      const program = programRef.current;
      if (program) {
        const p = pointerRef.current;
        p.x += (p.targetX - p.x) * 0.08;
        p.y += (p.targetY - p.y) * 0.08;

        program.uniforms.uTime.value = time * 0.001;
        program.uniforms.uPointer.value = [p.x, p.y];
        const activeBoost = trigger === 'always' ? 1 : p.active ? 1 : 0;
        program.uniforms.uStrength.value = strength * (0.6 + activeBoost * 0.8 + p.press * 0.2);
        p.press *= 0.92;

        renderer.render({ scene: meshRef.current, camera: { fov: 45 } });
      }
      animationRef.current = requestAnimationFrame(renderFrame);
    };

    animationRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
      if (meshRef.current) {
        meshRef.current.program?.delete();
        meshRef.current.geometry?.delete();
      }
      if (renderer && gl) {
        renderer.gl?.getExtension('WEBGL_lose_context')?.loseContext?.();
      }
    };
  }, [
    src,
    enabled,
    brushSize,
    strength,
    swirl,
    rings,
    grayscale,
    spread,
    fade,
    spacing,
    dispersion,
    glint,
    tint,
    tintAmount,
    highlightColor,
    trigger,
    clickStrength,
    quality,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 'inherit',
        position: 'relative',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          filter: grayscale ? 'grayscale(1)' : 'none',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
}
