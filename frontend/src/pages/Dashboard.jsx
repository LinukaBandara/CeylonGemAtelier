import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Box,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Download,
  Gem,
  ImageOff,
  Layers,
  PackageCheck,
  Plus,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api, unwrapCollection } from "../services/api";
import "./Dashboard.css";

function formatCurrency(value, currency = "USD") {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function displayStatus(status) {
  return status === "Available" ? "In Stock" : status;
}

function statusClass(status) {
  return (status || "unknown").toLowerCase().replaceAll(" ", "-");
}

function gemTone(productName = "", color = "") {
  const value = `${productName} ${color}`.toLowerCase();
  if (value.includes("padparadscha")) return "padparadscha";
  if (value.includes("ruby") || value.includes("red")) return "ruby";
  if (value.includes("spinel")) return "spinel";
  if (value.includes("blue") || value.includes("sapphire")) return "sapphire";
  return "neutral";
}

function GemThumbnail({ productName, color }) {
  const tone = gemTone(productName, color);

  return (
    <div className={`gem-thumb gem-${tone}`} aria-hidden="true">
      <span className="gem-facet facet-a" />
      <span className="gem-facet facet-b" />
      <span className="gem-facet facet-c" />
      <span className="gem-shine" />
    </div>
  );
}

function MetricCard({ label, value, subtitle, icon: Icon, accent = false }) {
  return (
    <article className={`cga-metric-card ${accent ? "accent" : ""}`}>
      <div className="metric-top">
        <span>{label}</span>
        <Icon size={15} strokeWidth={1.45} />
      </div>
      <strong>{value}</strong>
      <small>{subtitle}</small>
    </article>
  );
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([
      api.get("/api/catalog/products").then((payload) => {
        if (active) setProducts(unwrapCollection(payload));
      }),
      api.get("/api/dashboard/summary").then((payload) => {
        if (active) setSummary(payload);
      }),
    ])
      .catch((err) => {
        if (active) setError(err.message || "Unable to load dashboard.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const items = useMemo(
    () =>
      products.flatMap((product) =>
        (product.items ?? []).map((item) => ({
          ...item,
          productName: product.name,
          productSlug: product.slug,
          productDescription: product.description,
        }))
      ),
    [products]
  );

  const metrics = useMemo(() => {
    if (summary) {
      return {
        total: summary.totalItems,
        available: summary.availableItems,
        reserved: summary.reservedItems,
        sold: summary.soldItems,
        unavailable: summary.unavailableItems,
        inventoryValue: summary.totalValueAmount,
        currency: summary.totalValueCurrency,
      };
    }

    const available = items.filter((x) => x.status === "Available").length;
    const reserved = items.filter((x) => x.status === "Reserved").length;
    const sold = items.filter((x) => x.status === "Sold").length;
    const unavailable = items.filter((x) => x.status === "Unavailable").length;
    const inventoryValue = items.reduce(
      (sum, item) =>
        sum + (item.status !== "Sold" ? Number(item.sellingPriceAmount || 0) : 0),
      0
    );

    return {
      total: items.length,
      available,
      reserved,
      sold,
      unavailable,
      inventoryValue,
      currency: "USD",
    };
  }, [items, summary]);

  const recentItems = useMemo(() => [...items].reverse().slice(0, 6), [items]);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(new Date())
        .toUpperCase(),
    []
  );

  return (
    <div className="cga-dashboard">
      <header className="dashboard-titlebar">
        <div>
          <div className="dashboard-eyebrow">Private Collection Management</div>
          <div className="dashboard-heading-row">
            <h1>Dashboard Overview</h1>
            <span className="dashboard-date">{today} · RATNAPURA</span>
          </div>
          <p>Monitor inventory, gemstone availability and collection performance.</p>
        </div>

        <div className="dashboard-actions">
          <button className="cga-button cga-button-secondary" type="button">
            <Download size={14} strokeWidth={1.5} />
            Export Report
          </button>
          <Link className="cga-button cga-button-primary" to="/inventory?new=1">
            <Plus size={15} strokeWidth={1.8} />
            Add Gemstone
          </Link>
        </div>
      </header>

      {loading && (
        <section className="dashboard-loading">
          <div className="dashboard-progress"><span /></div>
          <p>Opening the atelier collection...</p>
        </section>
      )}

      {!loading && error && (
        <section className="dashboard-error">
          <AlertCircle size={18} strokeWidth={1.4} />
          <div>
            <strong>Unable to load collection</strong>
            <span>{error}</span>
          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          <section className="dashboard-metrics">
            <MetricCard label="Total Gemstones" value={metrics.total} subtitle="Registered inventory" icon={Gem} />
            <MetricCard label="In Stock" value={metrics.available} subtitle="Available for sale" icon={PackageCheck} />
            <MetricCard label="Reserved" value={metrics.reserved} subtitle="Currently held" icon={Bookmark} />
            <MetricCard label="Sold" value={metrics.sold} subtitle="Completed sales" icon={Box} />
            <MetricCard label="Total Value" value={formatCurrency(metrics.inventoryValue, metrics.currency)} subtitle="Current inventory value" icon={CircleDollarSign} accent />
          </section>

          {summary && (
            <section className="dashboard-metrics">
              <MetricCard label="Published Products" value={`${summary.publishedProducts}/${summary.totalProducts}`} subtitle="Live on the public site" icon={Layers} />
              <MetricCard label="Pending Reservations" value={summary.pendingReservations} subtitle="Awaiting response" icon={CalendarClock} />
              <MetricCard label="Unverified Certificates" value={summary.unverifiedCertificates} subtitle={`Of ${summary.totalCertificates} on record`} icon={BadgeCheck} />
              <MetricCard label="Missing Media" value={summary.itemsMissingMedia} subtitle="Stones without imagery" icon={ImageOff} />
              <MetricCard label="Sales Recorded" value={summary.totalSales} subtitle="Completed transactions" icon={Receipt} />
            </section>
          )}

          <section className="dashboard-quick-actions">
            <Link className="quick-action" to="/inventory?new=1">Add Gemstone</Link>
            <Link className="quick-action" to="/products">Products</Link>
            <Link className="quick-action" to="/certificates">Certificates</Link>
            <Link className="quick-action" to="/media">Media</Link>
            <Link className="quick-action" to="/reservations">Reservations</Link>
            <Link className="quick-action" to="/sales">Sales</Link>
          </section>

          {summary && summary.recentActivity?.length > 0 && (
            <section className="dashboard-main-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Atelier Timeline</span>
                  <h2>Recent Activity</h2>
                </div>
              </div>
              <ul className="dashboard-activity">
                {summary.recentActivity.map((activity, index) => (
                  <li key={index}>
                    <span className="activity-type">{activity.type}</span>
                    <span className="activity-description">{activity.description}</span>
                    <span className="activity-date">
                      {new Date(activity.occurredAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="dashboard-main-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Collection Activity</span>
                <h2>Recent Gemstones</h2>
              </div>
              <Link to="/inventory" className="view-all-link">
                View All <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="inventory-table-wrap">
              <table className="dashboard-inventory-table">
                <thead>
                  <tr>
                    <th>Gemstone</th><th>Shape</th><th>Weight</th><th>Colour</th>
                    <th>Origin</th><th>Price</th><th>Status</th><th />
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="gemstone-table-name">
                          <GemThumbnail productName={item.productName} color={item.color} />
                          <div>
                            <strong>{item.productName}</strong>
                            <span>{item.stockNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td>{item.shapeName ?? "Recorded"}</td>
                      <td>{Number(item.caratWeight).toFixed(2)} ct</td>
                      <td>{item.color || "—"}</td>
                      <td>{item.originId ? "Sri Lanka" : "—"}</td>
                      <td className="price-cell">{formatCurrency(item.sellingPriceAmount, item.sellingPriceCurrency)}</td>
                      <td><span className={`dashboard-status status-${statusClass(item.status)}`}>{displayStatus(item.status)}</span></td>
                      <td>
                        <Link to={`/inventory/${item.id}`} className="row-action" aria-label={`Open ${item.stockNumber}`}>
                          <ChevronRight size={15} strokeWidth={1.5} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {recentItems.length === 0 && (
                    <tr><td colSpan="8" className="dashboard-empty">No gemstones are currently registered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="dashboard-panel-footer">
              <div><span className="footer-dot" />Inventory synchronized</div>
              <span>{metrics.unavailable > 0 ? `${metrics.unavailable} unavailable` : "All records accounted for"}</span>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
