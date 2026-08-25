import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import "./Inventory.css";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/catalog/items")
      .then((payload) => setItems(unwrapCollection(payload)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !q || [item.stockNumber, item.color, item.clarity]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
      const matchesStatus = status === "All" || item.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [items, query, status]);

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div>
          <span>Private Collection</span>
          <h1>Gemstone Inventory</h1>
          <p>Every registered stone in the atelier.</p>
        </div>
      </header>

      <div className="inventory-controls">
        <label className="inventory-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stock number, colour or clarity..." />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option><option>Available</option><option>Reserved</option><option>Sold</option><option>Unavailable</option>
        </select>
      </div>

      <div className="inventory-surface">
        {loading && <div className="inventory-state">Loading collection...</div>}
        {error && <div className="inventory-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead><tr><th>Stock</th><th>Carat</th><th>Colour</th><th>Clarity</th><th>Price</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.stockNumber}</strong></td>
                  <td>{Number(item.caratWeight).toFixed(2)} ct</td>
                  <td>{item.color || "—"}</td>
                  <td>{item.clarity || "—"}</td>
                  <td>{item.sellingPriceAmount ? `${item.sellingPriceCurrency ?? "USD"} ${Number(item.sellingPriceAmount).toLocaleString()}` : "—"}</td>
                  <td><span className={`inventory-status status-${(item.status || "").toLowerCase()}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
