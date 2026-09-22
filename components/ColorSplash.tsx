import { useEffect, useRef } from "react";

export const ColorSplash = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctxRef.current = ctx;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let lastX = 0;
    let lastY = 0;

    const drawSplash = (x: number, y: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.fillStyle = `hsla(${(x + y) % 360}, 90%, 60%, 0.15)`;
      ctx.beginPath();
      ctx.arc(x, y, 80, 0, Math.PI * 2);
      ctx.fill();

      // Smooth fade out
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const onMove = (e: MouseEvent) => {
      drawSplash(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      drawSplash(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
};
