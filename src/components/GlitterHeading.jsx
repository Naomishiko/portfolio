import React, { useMemo } from "react";
import { BsStars } from "react-icons/bs";

// Pink glitter sparkles + glow wrapped around heading text.
const GlitterHeading = ({ children, className = "", sparks = 12 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: sparks }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((i * 4703 + 7919) % 104729) / 104729;
        return {
          left: `${(r1 * 104 - 2).toFixed(1)}%`,
          top: `${(r2 * 120 - 10).toFixed(1)}%`,
          size: 4 + Math.round(r2 * 9),
          delay: `${(r1 * 3.2).toFixed(2)}s`,
          dur: `${(2 + r2 * 2.4).toFixed(2)}s`,
        };
      }),
    [sparks]
  );

  return (
    <span className="glitter-title-wrap">
      {stars.map((s, i) => (
        <BsStars
          key={i}
          aria-hidden="true"
          className="glitter-spark"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            animationDelay: s.delay,
            "--dur": s.dur,
          }}
        />
      ))}
      <span className={`glitter-title ${className}`}>{children}</span>
    </span>
  );
};

export default GlitterHeading;
