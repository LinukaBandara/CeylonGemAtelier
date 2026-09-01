import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import { useToast } from "../components/Toast";
import StatusBadge from "../components/StatusBadge";
import "./admin.css";

const PAYMENT_BADGES = {
  Pending: "badge-gold",
  Paid: "badge-on",
  Refunded: "badge-red",
};

const emptyForm = {
  gemstoneItemId: "",
  buyerName: "",
  buyerEmail: "",
  priceAmount: "",
  priceCurrency: "USD",
  saleDate: "",
  notes: "",
};

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export default function Sales() {
  const toast = useToast();
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    api.get("/api/sales")
      .then((payload) => setSales(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api.get("/api/catalog/items")
        .then((payload) => setItems(unwrapCollection(payload)))
        .catch(() => setItems([])),
    ]).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sales;
    return sales.filter((s) =>
      [s.saleNumber, s.buyerName, s.buyerEmail, s.stockNumber]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [sales, query]);

  const setPayment = async (sale, action) => {
    try {
      await api.post(`/api/sales/${sale.id}/${action}`);
      toast.success("Sale updated");
      await load();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const save = async (event) => {
    event.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      await api.post("/api/sales", {
        gemstoneItemId: form.gemstoneItemId,
        buyerName: form.buyerName,
        buyerEmail: form.buyerEmail || null,
        priceAmount: Number(form.priceAmount),
        priceCurrency: form.priceCurrency || null,
        saleDate: form.saleDate || null,
        notes: form.notes || null,
      });
      setCreating(false);
      setForm(emptyForm);
      toast.success("Sale recorded");
      await load();
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Commerce Ledger</span>
          <h1>Sales</h1>
          <p>Completed gemstone sales and payment tracking.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={() => { setForm(emptyForm); setFormError(""); setCreating(true); }}>
          <Plus size={14} /> Record Sale
        </button>
      </header>

      <div className="admin-controls">
        <label className="admin-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sale number, buyer or stock number..." />
        </label>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading sales...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead>
              <tr><th>Sale No.</th><th>Gemstone</th><th>Buyer</th><th>Price</th><th>Sale Date</th><th>Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((sale) => (
                <tr key={sale.id}>
                  <td><strong>{sale.saleNumber}</strong></td>
                  <td>{sale.stockNumber ?? "—"}</td>
                  <td>
                    {sale.buyerName}
                    {sale.buyerEmail && <><br /><span style={{ fontSize: "7.5px" }}>{sale.buyerEmail}</span></>}
                  </td>
                  <td>{formatMoney(sale.priceAmount, sale.priceCurrency)}</td>
                  <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-badge ${PAYMENT_BADGES[sale.paymentStatus] ?? "badge-off"}`}>
                      {sale.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      {sale.paymentStatus !== "Paid" && (
                        <button type="button" onClick={() => setPayment(sale, "mark-paid")}>Mark Paid</button>
                      )}
                      {sale.paymentStatus === "Paid" && (
                        <button type="button" onClick={() => setPayment(sale, "mark-refunded")}>Refund</button>
                      )}
                      {sale.paymentStatus === "Refunded" && (
                        <button type="button" onClick={() => setPayment(sale, "mark-pending")}>Reopen</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="admin-state">No sales recorded.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {creating && (
        <div className="admin-modal-backdrop" onClick={() => setCreating(false)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>Record Sale</h2>
            <div className="admin-form">
              <label className="full">
                Gemstone
                <select value={form.gemstoneItemId} required onChange={(e) => setForm({ ...form, gemstoneItemId: e.target.value })}>
                  <option value="">Select stone...</option>
                  {items.filter((i) => i.status === "Available" || i.status === "Reserved").map((item) => (
                    <option key={item.id} value={item.id}>{item.stockNumber} ({item.status})</option>
                  ))}
                </select>
              </label>
              <label>
                Buyer Name
                <input value={form.buyerName} required onChange={(e) => setForm({ ...form, buyerName: e.target.value })} />
              </label>
              <label>
                Buyer Email
                <input type="email" value={form.buyerEmail} onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })} />
              </label>
              <label>
                Sale Price
                <input type="number" step="0.01" min="0" value={form.priceAmount} required onChange={(e) => setForm({ ...form, priceAmount: e.target.value })} />
              </label>
              <label>
                Currency
                <input value={form.priceCurrency} maxLength={3} onChange={(e) => setForm({ ...form, priceCurrency: e.target.value.toUpperCase() })} />
              </label>
              <label>
                Sale Date
                <input type="date" value={form.saleDate} onChange={(e) => setForm({ ...form, saleDate: e.target.value })} />
              </label>
              <label className="full">
                Notes
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setCreating(false)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Sale"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
