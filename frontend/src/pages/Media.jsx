import { useEffect, useMemo, useState } from "react";
import { Film, Image as ImageIcon, Box as BoxIcon, Plus } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import { useToast } from "../components/Toast";
import "./admin.css";

const MEDIA_TYPES = [
  { value: 1, label: "Image" },
  { value: 2, label: "Video" },
  { value: 3, label: "3D Model" },
];

const emptyForm = {
  gemstoneItemId: "",
  type: 1,
  url: "",
  altText: "",
  sortOrder: 0,
  isPrimary: false,
};

function typeLabel(type) {
  return MEDIA_TYPES.find((t) => t.value === type)?.label ?? "Media";
}

function TypeIcon({ type }) {
  if (type === 2) return <Film size={14} />;
  if (type === 3) return <BoxIcon size={14} />;
  return <ImageIcon size={14} />;
}

export default function Media() {
  const toast = useToast();
  const [media, setMedia] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    api.get("/api/catalog/media")
      .then((payload) => setMedia(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api.get("/api/catalog/items")
        .then((payload) => setItems(unwrapCollection(payload)))
        .catch(() => setItems([])),
    ]).finally(() => setLoading(false));
  }, []);

  const stockNumber = useMemo(() => {
    const map = new Map(items.map((i) => [i.id, i.stockNumber]));
    return (id) => map.get(id) ?? "Unknown stone";
  }, [items]);

  const grouped = useMemo(() => {
    const groups = new Map();
    for (const entry of media) {
      const list = groups.get(entry.gemstoneItemId) ?? [];
      list.push(entry);
      groups.set(entry.gemstoneItemId, list);
    }
    return [...groups.entries()];
  }, [media]);

  const setPrimary = async (entry) => {
    try {
      await api.post(`/api/catalog/items/${entry.gemstoneItemId}/media/${entry.id}/primary`);
      toast.success("Primary media updated");
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
      await api.post(`/api/catalog/items/${form.gemstoneItemId}/media`, {
        gemstoneItemId: form.gemstoneItemId,
        type: Number(form.type),
        url: form.url,
        altText: form.altText || null,
        sortOrder: Number(form.sortOrder) || 0,
        isPrimary: form.isPrimary,
      });
      setCreating(false);
      setForm(emptyForm);
      toast.success("Media asset added");
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
          <span className="admin-eyebrow">Visual Archive</span>
          <h1>Atelier Media</h1>
          <p>Photography, film and 3D captures for every gemstone.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={() => { setForm(emptyForm); setFormError(""); setCreating(true); }}>
          <Plus size={14} /> Add Media
        </button>
      </header>

      <div style={{ paddingTop: 18 }}>
        {loading && <div className="admin-state">Loading media library...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && grouped.length === 0 && (
          <div className="admin-surface"><div className="admin-empty"><strong>No media yet</strong><p>Upload photography, film or 3D captures for registered gemstones.</p></div></div>
        )}
        {!loading && !error && grouped.map(([itemId, entries]) => (
          <section className="admin-group" key={itemId}>
            <div className="admin-group-head">
              <strong>{stockNumber(itemId)}</strong>
              <span>{entries.length} asset{entries.length === 1 ? "" : "s"}</span>
            </div>
            <div className="media-grid">
              {entries
                .slice()
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((entry) => (
                  <article className="media-card" key={entry.id}>
                    <div className="media-preview">
                      {entry.type === 1 ? (
                        <img src={entry.url} alt={entry.altText ?? ""} loading="lazy" />
                      ) : (
                        <TypeIcon type={entry.type} />
                      )}
                    </div>
                    <div>
                      <span className={`admin-badge ${entry.isPrimary ? "badge-gold" : "badge-off"}`}>
                        {entry.isPrimary ? "Primary" : typeLabel(entry.type)}
                      </span>
                    </div>
                    <span className="media-url">{entry.altText || entry.url}</span>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => window.open(entry.url, "_blank", "noopener")}>Open</button>
                      <button type="button" disabled={entry.isPrimary} onClick={() => setPrimary(entry)}>Set Primary</button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      {creating && (
        <div className="admin-modal-backdrop" onClick={() => setCreating(false)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>Add Media</h2>
            <div className="admin-form">
              <label>
                Gemstone
                <select value={form.gemstoneItemId} required onChange={(e) => setForm({ ...form, gemstoneItemId: e.target.value })}>
                  <option value="">Select stone...</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>{item.stockNumber}</option>
                  ))}
                </select>
              </label>
              <label>
                Type
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {MEDIA_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </label>
              <label className="full">
                URL
                <input type="url" value={form.url} required placeholder="https://..." onChange={(e) => setForm({ ...form, url: e.target.value })} />
              </label>
              <label>
                Alt Text
                <input value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} />
              </label>
              <label>
                Sort Order
                <input type="number" min="0" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
              </label>
              <label className="checkbox-row full">
                <input type="checkbox" checked={form.isPrimary} onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })} />
                Set as primary image
              </label>
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setCreating(false)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Media"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
