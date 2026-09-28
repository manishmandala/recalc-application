// Fixed, site-wide background: a fan of faint lines streaming in from the
// right edge (and a smaller set from the bottom left), plus two soft glows.
// Kept low-contrast on purpose so it adds depth without competing with text.
const W = 1440;
const H = 900;

function stream(count, fn) {
  return Array.from({ length: count }, (_, i) => fn(i, count));
}

// Curves enter from the right, bow through the middle, and trail off to the left.
const RIGHT = stream(16, (i, n) => {
  const t = i / (n - 1);
  const y0 = 80 + t * 520;
  return `M${W + 40},${y0} C${W - 320},${y0 - 140 + t * 60} ${W - 640},${y0 + 220 - t * 80} ${W - 1180},${y0 + 60 + t * 140}`;
});

const LEFT = stream(9, (i, n) => {
  const t = i / (n - 1);
  const y0 = H - 40 - t * 260;
  return `M-40,${y0} C${260},${y0 + 60 - t * 40} ${480},${y0 - 180 + t * 30} ${760},${y0 - 90 - t * 60}`;
});

export function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="absolute -bottom-48 -left-40 h-[460px] w-[460px] rounded-full bg-[#3b5a8c]/20 blur-[120px]" />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="backdrop-drift absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="streamRight" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
            <stop offset="55%" stopColor="var(--brand)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="streamLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7f9cc4" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7f9cc4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="1">
          {RIGHT.map((d, i) => (
            <path key={`r${i}`} d={d} stroke="url(#streamRight)" />
          ))}
          {LEFT.map((d, i) => (
            <path key={`l${i}`} d={d} stroke="url(#streamLeft)" />
          ))}
        </g>
      </svg>
    </div>
  );
}
