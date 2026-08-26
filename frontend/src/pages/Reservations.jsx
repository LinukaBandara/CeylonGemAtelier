import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import "./admin.css";

const STATUS_BADGES = {
  Pending: "badge-gold",
  Confirmed: "badge-blue",
  Completed: "badge-on",
  Cancelled: "badge-off",
  Rejected: "badge-red",
};

const emptyForm = {
  gemstoneItemId: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  preferredDate: "",
  message: "",
};

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notesFor, setNotesFor] = useState(null);
  const [notesDraft, setNotesDraft] = useState("");

  const load = () =>
    api.get("/api/reservations")
      .then((payload) => setReservations(unwrapCollection(payload)))
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
    return reservations.filter((r) => {
      const matchesQuery = !q || [r.customerName, r.customerEmail, r.stockNumber]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
      const matchesStatus = status === "All" || r.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [reservations, query, status]);

  const act = async (reservation, action) => {
    try {
      await api.post(`/api/reservations/${reservation.id}/${action}`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const saveNotes = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/api/reservations/${notesFor.id}/notes`, { internalNotes: notesDraft || null });
      setNotesFor(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const save = async (event) => {
    event.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      await api.post("/api/reservations", {
        gemstoneItemId: form.gemstoneItemId,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone || null,
        preferredDate: form.preferredDate || null,
        message: form.message || null,
      });
      setCreating(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Client Relations</span>
          <h1>Reservations</h1>
          <p>Private viewing requests and gemstone holds.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={() => { setForm(emptyForm); setFormError(""); setCreating(true); }}>
          <Plus size={14} /> New Reservation
        </button>
      </header>

      <div className="admin-controls">
        <label className="admin-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customer, email or stock number..." />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option><option>Rejected</option>
        </select>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading reservations...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead>
              <tr><th>Customer</th><th>Gemstone</th><th>Preferred Date</th><th>Requested</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    <strong>{reservation.customerName}</strong><br />
                    <span style={{ fontSize: "7.5px" }}>{reservation.customerEmail}{reservation.customerPhone ? ` · ${reservation.customerPhone}` : ""}</span>
                  </td>
                  <td>{reservation.stockNumber ?? "—"}</td>
                  <td>{reservation.preferredDate ? new Date(reservation.preferredDate).toLocaleDateString() : "—"}</td>
                  <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-badge ${STATUS_BADGES[reservation.status] ?? "badge-off"}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      {reservation.status === "Pending" && (
                        <>
                          <button type="button" onClick={() => act(reservation, "confirm")}>Confirm</button>
                          <button type="button" onClick={() => act(reservation, "reject")}>Reject</button>
                        </>
                      )}
                      {reservation.status === "Confirmed" && (
                        <button type="button" onClick={() => act(reservation, "complete")}>Complete</button>
                      )}
                      {(reservation.status === "Pending" || reservation.status === "Confirmed") && (
                        <button type="button" onClick={() => act(reservation, "cancel")}>Cancel</button>
                      )}
                      <button type="button" onClick={() => { setNotesFor(reservation); setNotesDraft(reservation.internalNotes ?? ""); }}>Notes</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="admin-state">No reservations found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {creating && (
        <div className="admin-modal-backdrop" onClick={() => setCreating(false)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>New Reservation</h2>
            <div className="admin-form">
              <label className="full">
                Gemstone
                <select value={form.gemstoneItemId} required onChange={(e) => setForm({ ...form, gemstoneItemId: e.target.value })}>
                  <option value="">Select stone...</option>
                  {items.filter((i) => i.status === "Available").map((item) => (
                    <option key={item.id} value={item.id}>{item.stockNumber}</option>
                  ))}
                </select>
              </label>
              <label>
                Customer Name
                <input value={form.customerName} required onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
              </label>
              <label>
                Email
                <input type="email" value={form.customerEmail} required onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} />
              </label>
              <label>
                Phone
                <input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
              </label>
              <label>
                Preferred Date
                <input type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
              </label>
              <label className="full">
                Message
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </label>
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setCreating(false)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Reservation"}
              </button>
            </div>
          </form>
        </div>
      )}

      {notesFor && (
        <div className="admin-modal-backdrop" onClick={() => setNotesFor(null)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={saveNotes}>
            <h2>Internal Notes</h2>
            <div className="admin-form">
              <label className="full">
                Notes for {notesFor.customerName}
                <textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
              </label>
              {notesFor.message && (
                <div className="full" style={{ color: "#8a8177", fontSize: "8.5px" }}>
                  Customer message: {notesFor.message}
                </div>
              )}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setNotesFor(null)}>Cancel</button>
              <button className="admin-button primary" type="submit">Save Notes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
