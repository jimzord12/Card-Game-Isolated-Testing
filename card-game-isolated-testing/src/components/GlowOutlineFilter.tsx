// GlowOutlineFilter.tsx
import React from "react";

const GlowOutlineFilter: React.FC = () => {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <filter id="glowOutline" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0
                           0 0 0 0 0
                           0 0 0 0 0
                           0 0 0 1 0"
          result="hardAlpha"
        />
        <feMorphology
          in="hardAlpha"
          operator="dilate"
          radius="4"
          result="dilatedAlpha"
        />{" "}
        {/* Adjusted radius */}
        <feGaussianBlur
          in="dilatedAlpha"
          stdDeviation="6"
          result="blurredAlpha"
        />{" "}
        {/* Adjusted stdDeviation */}
        {/* This part floods the alpha with yellow color */}
        <feFlood floodColor="yellow" result="yellowColor" />
        <feComposite
          in="yellowColor"
          in2="blurredAlpha"
          operator="in"
          result="yellowGlow"
        />
        <feMerge>
          <feMergeNode in="yellowGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
};

export default GlowOutlineFilter;
