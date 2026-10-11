import React, { useMemo } from "react";

const GlitterBackground = ({ count = 55 }) => {
  const dots = useMemo(() => {
    const out = [];
    for (let i = 0; i < count; i += 1) {
      const seed = (i * 9301 + 49297) % 233280;
      const rand = seed / 233280;
      const rand2 = ((i * 4703 + 7919) % 104729) / 104729;
      out.push({
        id: i,
        left: `${(rand * 100).toFixed(2)}%`,
        top: `${(rand2 * 100).toFixed(2)}%`,
        size: `${(1.5 + rand2 * 3).toFixed(2)}px`,
        dur: `${(2.5 + rand * 4).toFixed(2)}s`,
        delay: `${(rand2 * 5).toFixed(2)}s`,
      });
    }
    return out;
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="glitter-haze pointer-events-none fixed inset-0 z-40"
    >
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="glitter-dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            "--dur": dot.dur,
            "--delay": dot.delay,
          }}
        />
      ))}
    </div>
  );
};

export default GlitterBackground;
