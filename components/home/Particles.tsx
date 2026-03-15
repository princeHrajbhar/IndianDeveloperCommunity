export default function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(80)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-sm"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            background: Math.random() > 0.5 ? "#22d3ee" : "#8b5cf6",
            opacity: 0.7,
            animation: `float ${6 + Math.random() * 6}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}