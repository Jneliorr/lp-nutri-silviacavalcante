import { useEffect, useRef } from "react";
import { vertex, fragment } from "../shaders/atmosphere";
import { theme } from "../config/theme";

export default function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.dataset.state = "fallback";
      return;
    }
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let inView = true;
    let disposed = false;
    let contextLost = false;
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (device.deviceMemory ?? 8) <= 2 ||
      (navigator.hardwareConcurrency ?? 8) <= 2;
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) throw new Error("Shader unavailable");
      shaders.push(shader);
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
        throw new Error(gl!.getShaderInfoLog(shader) || "Shader compilation");
      return shader;
    }
    try {
      const vs = compile(gl.VERTEX_SHADER, vertex);
      const fs = compile(gl.FRAGMENT_SHADER, fragment);
      program = gl.createProgram();
      if (!program) throw new Error("Program unavailable");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Shader linking");
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      canvas.dataset.state = "ready";
    } catch {
      canvas.dataset.state = "fallback";
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
      return;
    }
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const mouse = gl.getUniformLocation(program, "u_pointer");
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        lowPower ? 1 : theme.webgl.maxDpr,
      );
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };
    function draw() {
      if (disposed || contextLost) return;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      gl!.uniform2f(resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(time, elapsed / 1000);
      gl!.uniform2f(mouse, pointer.x, pointer.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    function loop(now: number) {
      if (disposed || contextLost) return;
      const delta = now - last;
      if (delta >= 1000 / (lowPower ? 15 : theme.webgl.fps)) {
        elapsed += Math.min(delta, 80);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(loop);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (!document.hidden && inView && !contextLost) {
        last = performance.now();
        if (motion.matches || lowPower) draw();
        else frame = requestAnimationFrame(loop);
      }
    }
    const move = (event: PointerEvent) => {
      pointer.targetX = event.clientX / window.innerWidth;
      pointer.targetY = 1 - event.clientY / window.innerHeight;
    };
    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      canvas.dataset.state = "fallback";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("webglcontextlost", lost);
    motion.addEventListener("change", sync);
    resize();
    sync();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", move);
      canvas.removeEventListener("webglcontextlost", lost);
      motion.removeEventListener("change", sync);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
  }, []);
  return <canvas ref={ref} className="atmosphere" aria-hidden="true" />;
}
