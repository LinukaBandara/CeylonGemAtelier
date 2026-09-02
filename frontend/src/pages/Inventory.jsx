import { useEffect, useMemo, useState } from "react";
import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { api, unwrapCollection } from "../services/api";
import StatusBadge from "../components/StatusBadge";
import { useAppContext } from "../contexts/AppContext";
import "./Inventory.css";
import "./admin.css";

export default function Inventory() {
  const { favorites } = useAppContext();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/catalog/items")
      .then((payload) => setItems(unwrapCollection(payload)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !q ||
        [item.stockNumber, item.color, item.clarity]
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
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stock number, colour or clarity..."
            aria-label="Search inventory"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option>All</option>
          <option>Available</option>
          <option>Reserved</option>
          <option>Sold</option>
          <option>Unavailable</option>
        </select>
      </div>

      <div className="inventory-surface">
        {loading && <div className="inventory-state">Loading collection...</div>}
        {error && <div className="inventory-state error">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="admin-empty">
            <strong>No stones match</strong>
            <p>
              {query || status !== "All"
                ? "Adjust search or status filter to see more of the collection."
                : "Inventory will appear here once gemstone items are registered."}
            </p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Carat</th>
                <th>Colour</th>
                <th>Clarity</th>
                <th>Price</th>
                <th>Status</th>
                {/* Favorites column — no header text, screen-reader label below */}
                <th aria-label="Saved" style={{ width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const saved = favorites.isFavorite(item.id);
                return (
                  <tr key={item.id}>
                    <td>
                      <Link className="stock-link" to={`/inventory/${item.id}`}>
                        {item.stockNumber}
                      </Link>
                    </td>
                    <td>{Number(item.caratWeight).toFixed(2)} ct</td>
                    <td>{item.color || "—"}</td>
                    <td>{item.clarity || "—"}</td>
                    <td>
                      {item.sellingPriceAmount
                        ? `${item.sellingPriceCurrency ?? "USD"} ${Number(
                            item.sellingPriceAmount
                          ).toLocaleString()}`
                        : "—"}
                    </td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`fav-heart-btn${saved ? " active" : ""}`}
                        aria-label={saved ? `Remove ${item.stockNumber} from saved` : `Save ${item.stockNumber}`}
                        aria-pressed={saved}
                        onClick={() =>
                          favorites.toggle({
                            id: item.id,
                            stockNumber: item.stockNumber,
                            productName: item.productName ?? "",
                            status: item.status,
                          })
                        }
                      >
                        <Heart
                          size={13}
                          strokeWidth={1.5}
                          fill={saved ? "currentColor" : "none"}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
