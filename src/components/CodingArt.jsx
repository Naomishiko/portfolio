import React from "react";

const Sparkle = ({ x, y, s, fill, opacity = 0.9 }) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 -8 C1.6 -3 3 -1.6 8 0 C3 1.6 1.6 3 0 8 C-1.6 3 -3 1.6 -8 0 C-3 -1.6 -1.6 -3 0 -8 Z"
    fill={fill}
    opacity={opacity}
  />
);

const CodingArt = ({ className = "" }) => (
  <svg
    viewBox="0 0 420 340"
    role="img"
    aria-label="Girly coding illustration"
    className={className}
  >
    <defs>
      <linearGradient id="cgRose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F6CFDC" />
        <stop offset="55%" stopColor="#E2809C" />
        <stop offset="100%" stopColor="#DE9B7E" />
      </linearGradient>
      <linearGradient id="cgSoft" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A211A" />
        <stop offset="100%" stopColor="#1A1512" />
      </linearGradient>
      <filter id="cgGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <ellipse cx="210" cy="180" rx="185" ry="145" fill="#DE9B7E" opacity="0.1" />

    <rect
      x="46"
      y="52"
      width="328"
      height="232"
      rx="20"
      fill="url(#cgSoft)"
      stroke="url(#cgRose)"
      strokeWidth="2.5"
      filter="url(#cgGlow)"
    />

    <line
      x1="46"
      y1="92"
      x2="374"
      y2="92"
      stroke="#DE9B7E"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    <circle cx="76" cy="72" r="6.5" fill="#E2809C" />
    <circle cx="98" cy="72" r="6.5" fill="#DE9B7E" />
    <circle cx="120" cy="72" r="6.5" fill="#EBB79F" />

    <rect x="74" y="116" width="150" height="11" rx="5.5" fill="#E2809C" opacity="0.9" />
    <rect x="236" y="116" width="70" height="11" rx="5.5" fill="#DE9B7E" opacity="0.7" />
    <rect x="94" y="140" width="90" height="11" rx="5.5" fill="#EBB79F" opacity="0.85" />
    <rect x="196" y="140" width="130" height="11" rx="5.5" fill="#F6CFDC" opacity="0.5" />
    <rect x="94" y="164" width="200" height="11" rx="5.5" fill="#DE9B7E" opacity="0.55" />
    <rect x="74" y="188" width="120" height="11" rx="5.5" fill="#E2809C" opacity="0.8" />
    <rect x="206" y="188" width="60" height="11" rx="5.5" fill="#EBB79F" opacity="0.6" />

    <text
      x="210"
      y="256"
      textAnchor="middle"
      fontFamily="'Fira Code', 'Courier New', monospace"
      fontWeight="700"
      fontSize="48"
      fill="url(#cgRose)"
    >
      {`</>`}
    </text>

    <path
      d="M356 66 c-6 -10 -22 -8 -22 4 c0 9 12 16 22 24 c10 -8 22 -15 22 -24 c0 -12 -16 -14 -22 -4 z"
      fill="#E2809C"
      opacity="0.95"
    />

    <Sparkle x="30" y="70" s="1" fill="#EBB79F" />
    <Sparkle x="392" y="150" s="1.1" fill="#E2809C" />
    <Sparkle x="60" y="300" s="0.9" fill="#DE9B7E" />
    <Sparkle x="360" y="308" s="1.2" fill="#F6CFDC" />
    <Sparkle x="200" y="34" s="0.8" fill="#EBB79F" opacity="0.8" />
    <Sparkle x="150" y="312" s="0.7" fill="#E2809C" opacity="0.8" />
  </svg>
);

export default CodingArt;
