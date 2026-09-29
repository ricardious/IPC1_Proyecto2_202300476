const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0d9488",
  "#0891b2",
  "#4f46e5",
];

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Color estable para el mismo nombre
function getColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % COLORS.length;
  }
  return COLORS[hash];
}

function Avatar({ name = "", size = 40, className = "" }) {
  const label = getInitials(name);
  const color = getColor(name || "?");

  return (
    <div
      className={`flex flex-shrink-0 select-none items-center justify-center rounded-full font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: Math.round(size * 0.4),
      }}
      title={name}
      aria-label={name}
    >
      {label}
    </div>
  );
}

export default Avatar;
