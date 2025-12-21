
import React, { useState, useEffect, useRef } from "react";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";


// ------------------- section 1 --------------------------
// track fullscreen on/off and store element references
// -------------------------------------------------------- 
export default function ViewportFullscreenSvg({ SvgComponent }) {
  const [full, setFull] = useState(false);
  const svgRef = useRef(null);
  const gRef = useRef(null);


// ------------------- section 2 --------------------------
// prevent page scroll and close fullscreen on ESC key
// --------------------------------------------------------
  useEffect(() => {
    document.body.style.overflow = full ? "hidden" : "";
    const esc = e => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [full]);


// ------------------- section 3 --------------------------
// d3-zoom and d3-selection are used here
// handles drag and zoom in fullscreen mode
// --------------------------------------------------------
  useEffect(() => {
    if (!full) return;

    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const z = d3Zoom()
      .scaleExtent([0.5, 8])         // zoom range
      .wheelDelta(e => -e.deltaY * 0.002) // smooth wheel
      .on("zoom", e => g.attr("transform", e.transform));

    svg.call(z).call(z.transform, zoomIdentity);

    return () => svg.on(".zoom", null);
  }, [full]);


// ------------------- section 4 --------------------------
// normal view layout and fullscreen open button
// --------------------------------------------------------
  return (
    <>
      <div style={{ position: "relative" }}>
        <SvgComponent style={{ maxWidth: "100%", height: "auto" }} />

        <button
          onClick={() => setFull(true)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            border: "none",
            borderRadius: "999px",
            padding: "6px 8px",
            background: "rgba(20,20,20,.85)",
            color: "white",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 18
          }}
        >
	  ⛶
        </button>
      </div>


      {/* ------------------- section 5 --------------------------
          fullscreen layout/background and main view container
          ------------------------------------------------------ */}
      {full && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "var(--ifm-background-color)",
            display: "grid",
            placeItems: "center"
          }}
        >
          <svg
            ref={svgRef}
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              width: "95vw",
              height: "90vh",
              cursor: "grab"
            }}
          >
            <g ref={gRef}>
              <SvgComponent width="100%" height="100%" />
            </g>
          </svg>


         {/* ------------------- section 6 --------------------------
              close fullscreen button
              ------------------------------------------------------ */}
          <button
            onClick={() => setFull(false)}
            style={{
              position: "fixed",
              top: 12,
              right: 12,
              border: "none",
              borderRadius: "999px",
              padding: "8px 10px",
              background: "rgba(20,20,20,.9)",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 19
            }}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
}

