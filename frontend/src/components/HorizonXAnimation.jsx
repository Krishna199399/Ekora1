import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizonXAnimation({ isActive }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isActive || !wrapperRef.current) return;

    let ctx;

    const raf = requestAnimationFrame(() => {
      const root = wrapperRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        // ── 1. Initial Reveal Timeline (ScrollTrigger) ───────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Set initial state
        gsap.set(".hx-word", { xPercent: 0, opacity: 0 });
        gsap.set(".hx-x", { xPercent: 0, rotate: 0, opacity: 0 });
        gsap.set(".hx-line", { scaleX: 0, opacity: 0 });

        tl.fromTo(".hx-label", 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
        .fromTo([".hx-word", ".hx-x"],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".hx-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 0.6, opacity: 0.8, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(".hx-coords",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        .add(() => {
          const narrative = root.querySelector(".hx-narrative-container");
          if (narrative) {
            narrative.classList.add("visible");
          }
        }, "-=0.4");

        // ── 2. Desktop Mouse Interactions ──────────────────────────────
        const hasHover = window.matchMedia("(hover: hover)").matches;

        if (hasHover) {
          const handleMouseMove = (e) => {
            const rect = root.getBoundingClientRect();
            // Calculate normalized X position relative to wrapper width
            const normX = (e.clientX - rect.left) / rect.width;
            // distance from center (0 at center, 1 at edges)
            const distFromCenter = Math.abs(normX - 0.5) * 2;

            // split word and x outward as mouse moves to edges
            const wordX = distFromCenter * -40; // max -40%
            const xX = distFromCenter * 40;     // max 40%
            const xRot = distFromCenter * 180;  // max 180 deg
            const lineScale = 0.6 + distFromCenter * 0.6; // 0.6 -> 1.2
            const lineOpacity = 0.8 + distFromCenter * 0.2; // 0.8 -> 1.0
            const gridX = (normX - 0.5) * -20; // 3D depth shifting

            gsap.to(".hx-word", { xPercent: wordX, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-x", { xPercent: xX, rotate: xRot, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-line", { scaleX: lineScale, opacity: lineOpacity, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-grid", { x: gridX, duration: 0.6, ease: "power2.out", overwrite: "auto" });
          };

          const handleMouseLeave = () => {
            // Animate back to defaults when mouse leaves the section
            gsap.to(".hx-word", { xPercent: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-x", { xPercent: 0, rotate: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-line", { scaleX: 0.6, opacity: 0.8, duration: 0.8, ease: "power2.out", overwrite: "auto" });
            gsap.to(".hx-grid", { x: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          };

          root.addEventListener("mousemove", handleMouseMove);
          root.addEventListener("mouseleave", handleMouseLeave);

          // Clean up listeners on context revert
          return () => {
            root.removeEventListener("mousemove", handleMouseMove);
            root.removeEventListener("mouseleave", handleMouseLeave);
          };
        }

        // Refresh triggers once all DOM layouts are ready
        ScrollTrigger.refresh();
      }, root);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, [isActive]);

  return (
    <div ref={wrapperRef} className="hx-wrapper">
      {/* Futuristic digital grid background */}
      <div className="hx-grid" />

      <div className="hx-panel-inner">
        <p className="hx-label">Axis Shift Detected</p>

        <div className="hx-split">
          <span className="hx-word">CONSULTING</span>
          <span className="hx-x">X</span>
        </div>

        <div className="hx-line" />
        <p className="hx-coords">X-AXIS&nbsp;/&nbsp;MOUSE_TRACKING</p>

        {/* Narrative statement and CTA button */}
        <div className="hx-narrative-container">
          <p className="hx-panel-text">
            We engineer the futures of beauty empires — from molecular lab bench to fully robotic factory floor.
          </p>
          <p className="hx-panel-text" style={{ fontSize: 'clamp(15px, 2vw, 22px)', marginTop: '-10px', opacity: 0.75, fontStyle: 'italic' }}>
            14 Services. One Partner. Zero Compromise.
          </p>
          <a href="#contact" className="hx-cta-btn">
            Start Your Project &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
