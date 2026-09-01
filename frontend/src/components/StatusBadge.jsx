const STATUS_MAP = {
  available: { label: "Available", className: "status-available" },
  "in stock": { label: "In Stock", className: "status-available" },
  reserved: { label: "Reserved", className: "status-reserved" },
  sold: { label: "Sold", className: "status-sold" },
  unavailable: { label: "Unavailable", className: "status-unavailable" },
  archived: { label: "Archived", className: "status-unavailable" },
  published: { label: "Published", className: "badge-on" },
  draft: { label: "Draft", className: "badge-off" },
  verified: { label: "Verified", className: "badge-on" },
  unverified: { label: "Unverified", className: "badge-off" },
  pending: { label: "Pending", className: "status-reserved" },
  paid: { label: "Paid", className: "status-available" },
  cancelled: { label: "Cancelled", className: "status-unavailable" },
};

export default function StatusBadge({ status, label, className = "" }) {
  const key = String(status || "unknown").toLowerCase().replaceAll("_", " ");
  const mapped = STATUS_MAP[key];
  const text = label ?? mapped?.label ?? status ?? "—";
  const tone = mapped?.className ?? "badge-off";

  return (
    <span className={`admin-badge status-badge ${tone} ${className}`.trim()}>
      <span className="status-dot" aria-hidden="true" />
      {text}
    </span>
  );
}
