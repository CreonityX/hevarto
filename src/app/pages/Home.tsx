import { Link } from "react-router";
import { Footer } from "../components/Footer";
import { useEffect, useRef, useState } from "react";

function StealthMuffinn() {
  const blurCanvasRef = useRef<HTMLCanvasElement>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderCanvas = (canvas: HTMLCanvasElement, isTextured: boolean) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const secret = [77, 117, 102, 102, 105, 110, 110].map(c => String.fromCharCode(c)).join('');
      const dpr = window.devicePixelRatio || 1;

      ctx.font = "400 42px system-ui, -apple-system, sans-serif";
      const metrics = ctx.measureText(secret);
      const textWidth = Math.ceil(metrics.width);

      const paddingX = 15;
      const canvasWidth = textWidth + paddingX * 2;
      const canvasHeight = 70;

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Must set font again after setting canvas size!
      ctx.font = "400 42px system-ui, -apple-system, sans-serif";
      ctx.textBaseline = "middle";

      if (isTextured) {
        ctx.strokeStyle = "#8e8e8e";
        ctx.lineWidth = 1.5;
        ctx.strokeText(secret, paddingX, canvasHeight / 2);
      } else {
        ctx.fillStyle = "#8e8e8e";
        ctx.fillText(secret, paddingX, canvasHeight / 2);
      }

      return `${canvasWidth}/${canvasHeight}`;
    };

    if (blurCanvasRef.current) {
      const ar = renderCanvas(blurCanvasRef.current, false);
      blurCanvasRef.current.style.aspectRatio = ar;
    }
    if (textureCanvasRef.current) {
      const ar = renderCanvas(textureCanvasRef.current, true);
      textureCanvasRef.current.style.aspectRatio = ar;
    }
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center group cursor-default" style={{ margin: "0 -0.25em" }}>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="muffinn-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <canvas
        ref={blurCanvasRef}
        className="inline-block align-baseline transition-opacity duration-500 blur-[9px] group-hover:opacity-0 select-none"
        style={{
          height: "1.25em",
          width: "auto",
          transform: "translateY(0.3em)"
        }}
        aria-hidden="true"
      />

      <canvas
        ref={textureCanvasRef}
        className="absolute top-0 left-0 inline-block align-baseline transition-opacity duration-500 opacity-0 group-hover:opacity-100 select-none"
        style={{
          height: "1.25em",
          width: "auto",
          transform: "translateY(0.3em)",
          filter: "url(#muffinn-distort)"
        }}
        aria-hidden="true"
      />
    </span>
  );
}

export function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-end pt-[43px] px-[48px] md:px-[86px]">
        <Link
          to="/news"
          className="text-[#ed1f27] text-[24px] md:text-[30px] font-normal font-sans hover:opacity-80 transition-opacity"
        >
          News
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col pt-[15vh] md:pt-[200px] px-[48px] md:px-[86px] pb-[100px]">
        <div className="max-w-[800px]">
          <h1 className="text-[32px] md:text-[50px] leading-tight text-[#8e8e8e] font-normal font-sans whitespace-pre-wrap">
            Building <a href="https://creonity.com" target="_blank" rel="noopener noreferrer" className="text-[#ff2e9a] dark:text-[#DFFE00] font-medium font-['Champ',sans-serif] hover:opacity-80 transition-colors">Creonity</a> for the creators of tommorow and <StealthMuffinn /> for the connections of today
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}
