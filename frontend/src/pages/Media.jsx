import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box as BoxIcon,
  Film,
  Image as ImageIcon,
  Plus,
  Search,
  Star,
  Trash2,
  X,
  ExternalLink,
  Filter,
} from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import "./admin.css";

/* ─── constants ─────────────────────────────────────────── */

const MEDIA_TYPES = [
  { value: 1, label: "Image" },
  { value: 2, label: "Video" },
  { value: 3, label: "3D Model" },
];

const EMPTY_FORM = {
  gemstoneItemId: "",
  type: 1,
  url: "",
  altText: "",
  sortOrder: 0,
  isPrimary: false,
};

/* ─── helpers ────────────────────────────────────────────── */

function typeLabel(type) {
  return MEDIA_TYPES.find((t) => t.value === Number(type))?.label ?? "Media";
}

function TypeIcon({ type, size = 18 }) {
  if (Number(type) === 2) return <Film size={size} strokeWidth={1.4} />;
  if (Number(type) === 3) return <BoxIcon size={size} strokeWidth={1.4} />;
  return <ImageIcon size={size} strokeWidth={1.4} />;
}

/* ─── sub-components ─────────────────────────────────────── */

function MediaCard({ entry, onSetPrimary, onDelete, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const isImage = Number(entry.type) === 1;

  return (
    <article className="media-card-v2">
      {/* thumbnail */}
      <div className="media-thumb">
        {isImage && !imgError ? (
          <img
            src={entry.url}
            alt={entry.altText ?? ""}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="media-thumb-placeholder">
            <TypeIcon type={entry.type} size={28} />
            <span>{typeLabel(entry.type)}</span>
          </div>
        )}

        {/* primary star overlay */}
        {entry.isPrimary && (
          <span className="media-primary-badge" title="Primary">
            <Star size={11} strokeWidth={2} />
            Primary
          </span>
        )}

        {/* hover actions */}
        <div className="media-hover-actions">
          <button
            type="button"
            className="media-action-btn"
            title="Open original"
            onClick={() => onOpen(entry.url)}
          >
            <ExternalLink size={13} strokeWidth={1.6} />
          </button>
          {!entry.isPrimary && (
            <button
              type="button"
              className="media-action-btn"
              title="Set as primary"
              onClick={() => onSetPrimary(entry)}
            >
              <Star size={13} strokeWidth={1.6} />
            </button>
          )}
          <button
            type="button"
            className="media-action-btn media-action-danger"
            title="Delete"
            onClick={() => onDelete(entry)}
          >
            <Trash2 size={13} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* body */}
      <div className="media-card-body">
        <div className="media-card-meta">
          <span className={`admin-badge ${entry.isPrimary ? "badge-gold" : "badge-off"}`}>
            {entry.isPrimary ? "Primary" : typeLabel(entry.type)}
          </span>
          {entry.sortOrder != null && (
            <span className="media-sort-order">#{entry.sortOrder}</span>
          )}
        </div>
        <p className="media-card-label" title={entry.altText || entry.url}>
          {entry.altText || <span className="media-url-short">{entry.url}</span>}
        </p>
      </div>
    </article>
  );
}

/* ─── main page ──────────────────────────────────────────── */

export default function Media() {
  const toast = useToast();

  /* data */
  const [media, setMedia] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* filters */
  const [stoneFilter, setStoneFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  /* add modal */
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  /* delete confirm */
  const [deleting, setDeleting] = useState(null); // entry being deleted
  const [deleteConfirming, setDeleteConfirming] = useState(false);

  /* lightbox */
  const [lightbox, setLightbox] = useState(null); // url string

  /* ── load ── */
  const load = () =>
    api
      .get("/api/catalog/media")
      .then((payload) => setMedia(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api
        .get("/api/catalog/items")
        .then((p) => setItems(unwrapCollection(p)))
        .catch(() => setItems([])),
    ]).finally(() => setLoading(false));
  }, []);

  /* ── lookup maps ── */
  const itemMap = useMemo(
    () => new Map(items.map((i) => [i.id, i])),
    [items]
  );
  const stockNumber = useCallback(
    (id) => itemMap.get(id)?.stockNumber ?? "Unknown stone",
    [itemMap]
  );

  /* ── grouped + filtered ── */
  const grouped = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = media.filter((m) => {
      if (stoneFilter && m.gemstoneItemId !== stoneFilter) return false;
      if (typeFilter && Number(m.type) !== Number(typeFilter)) return false;
      if (q) {
        const stock = stockNumber(m.gemstoneItemId).toLowerCase();
        const alt = (m.altText ?? "").toLowerCase();
        const url = m.url.toLowerCase();
        if (!stock.includes(q) && !alt.includes(q) && !url.includes(q)) return false;
      }
      return true;
    });

    const map = new Map();
    for (const entry of filtered) {
      const list = map.get(entry.gemstoneItemId) ?? [];
      list.push(entry);
      map.set(entry.gemstoneItemId, list);
    }
    return [...map.entries()].sort((a, b) =>
      stockNumber(a[0]).localeCompare(stockNumber(b[0]))
    );
  // stockNumber is a useCallback that depends on itemMap — safe to include
  }, [media, stoneFilter, typeFilter, searchQuery, stockNumber]);

  const totalAssets = media.length;
  const filteredCount = grouped.reduce((s, [, entries]) => s + entries.length, 0);

  /* ── actions ── */
  const setPrimary = async (entry) => {
    const prevMedia = media;
    // Optimistic update
    setMedia((prev) =>
      prev.map((m) =>
        m.gemstoneItemId === entry.gemstoneItemId
          ? { ...m, isPrimary: m.id === entry.id }
          : m
      )
    );
    try {
      await api.post(
        `/api/catalog/items/${entry.gemstoneItemId}/media/${entry.id}/primary`
      );
      toast.success("Primary media updated");
      load().catch(() => {});
    } catch (err) {
      setMedia(prevMedia);
      toast.error(err.message);
    }
  };

  const confirmDelete = (entry) => {
    setDeleting(entry);
    setDeleteConfirming(true);
  };

  const executeDelete = async () => {
    if (!deleting) return;
    const entry = deleting;
    setDeleteConfirming(false);
    setDeleting(null);
    // Optimistic remove
    setMedia((prev) => prev.filter((m) => m.id !== entry.id));
    try {
      await api.delete(
        `/api/catalog/items/${entry.gemstoneItemId}/media/${entry.id}`
      );
      toast.success("Media asset removed");
      load().catch(() => {});
    } catch (err) {
      toast.error(err.message);
      load().catch(() => {}); // reload to restore
    }
  };

  const save = async (event) => {
    event.preventDefault();
    setFormError("");
    setSaving(true);
    const body = {
      gemstoneItemId: form.gemstoneItemId,
      type: Number(form.type),
      url: form.url,
      altText: form.altText || null,
      sortOrder: Number(form.sortOrder) || 0,
      isPrimary: form.isPrimary,
    };
    try {
      const created = await api.post(
        `/api/catalog/items/${form.gemstoneItemId}/media`,
        body
      );
      // Optimistic add
      if (created && created.id) {
        setMedia((prev) => [...prev, created]);
      }
      setCreating(false);
      setForm(EMPTY_FORM);
      toast.success("Media asset added");
      load().catch(() => {});
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setCreating(true);
  };

  /* ── render ── */
  return (
    <div className="admin-page">
      {/* header */}
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Visual Archive</span>
          <h1>Atelier Media</h1>
          <p>
            Photography, film and 3D captures for every gemstone.
            {totalAssets > 0 && (
              <> &mdash; <strong>{totalAssets}</strong> asset{totalAssets !== 1 ? "s" : ""} across{" "}
              <strong>{new Set(media.map((m) => m.gemstoneItemId)).size}</strong> stone{new Set(media.map((m) => m.gemstoneItemId)).size !== 1 ? "s" : ""}.</>
            )}
          </p>
        </div>
        <button className="admin-button primary" type="button" onClick={openAddModal}>
          <Plus size={14} /> Add Media
        </button>
      </header>

      {/* filter bar */}
      <div className="admin-controls" style={{ gap: 8 }}>
        <label className="admin-search" style={{ flex: 1, minWidth: 180 }}>
          <Search size={13} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by stone, alt text or URL..."
            aria-label="Search media"
          />
          {searchQuery && (
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display:"flex", alignItems:"center" }}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </label>

        <label className="media-filter-label" style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--color-muted)" }}>
          <Filter size={12} />
          <select
            value={stoneFilter}
            onChange={(e) => setStoneFilter(e.target.value)}
            className="media-filter-select"
          >
            <option value="">All stones</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.stockNumber}
              </option>
            ))}
          </select>
        </label>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="media-filter-select"
        >
          <option value="">All types</option>
          {MEDIA_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {(stoneFilter || typeFilter || searchQuery) && (
          <button
            className="admin-button"
            type="button"
            style={{ fontSize: 11, padding: "0 10px", minHeight: 34 }}
            onClick={() => { setStoneFilter(""); setTypeFilter(""); setSearchQuery(""); }}
          >
            <X size={12} /> Clear filters
          </button>
        )}

        {(stoneFilter || typeFilter || searchQuery) && (
          <span style={{ fontSize: 12, color: "var(--color-muted)", whiteSpace: "nowrap" }}>
            {filteredCount} result{filteredCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* content */}
      <div style={{ marginTop: 8 }}>
        {loading && <div className="admin-state">Loading media library...</div>}
        {error && <div className="admin-state error">{error}</div>}

        {!loading && !error && grouped.length === 0 && (
          <div className="admin-surface">
            <div className="admin-empty">
              <ImageIcon size={32} strokeWidth={1} style={{ opacity: 0.3, marginBottom: 12 }} />
              <strong>
                {searchQuery || stoneFilter || typeFilter
                  ? "No media matches this filter"
                  : "No media yet"}
              </strong>
              <p>
                {searchQuery || stoneFilter || typeFilter
                  ? "Try adjusting your filters or search term."
                  : "Add photography, film or 3D captures for registered gemstones."}
              </p>
              {!searchQuery && !stoneFilter && !typeFilter && (
                <button className="admin-button primary" type="button" onClick={openAddModal}>
                  <Plus size={14} /> Add first asset
                </button>
              )}
            </div>
          </div>
        )}

        {!loading && !error && grouped.map(([itemId, entries]) => (
          <section className="media-group" key={itemId}>
            <div className="media-group-head">
              <div className="media-group-title">
                <TypeIcon type={1} size={14} />
                <strong>{stockNumber(itemId)}</strong>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span className="media-group-count">
                  {entries.length} asset{entries.length !== 1 ? "s" : ""}
                </span>
                <button
                  className="admin-button"
                  type="button"
                  style={{ fontSize: 11, padding: "0 10px", minHeight: 28 }}
                  onClick={() => {
                    setForm({ ...EMPTY_FORM, gemstoneItemId: itemId });
                    setFormError("");
                    setCreating(true);
                  }}
                >
                  <Plus size={11} /> Add
                </button>
              </div>
            </div>

            <div className="media-grid-v2">
              {entries
                .slice()
                .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                .map((entry) => (
                  <MediaCard
                    key={entry.id}
                    entry={entry}
                    onSetPrimary={setPrimary}
                    onDelete={confirmDelete}
                    onOpen={(url) => setLightbox(url)}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Add media modal */}
      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="Add Media Asset"
        actions={
          <>
            <button className="admin-button" type="button" onClick={() => setCreating(false)}>
              Cancel
            </button>
            <button
              className="admin-button primary"
              type="submit"
              form="media-add-form"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add Asset"}
            </button>
          </>
        }
      >
        <form id="media-add-form" className="admin-form" onSubmit={save}>
          <label>
            Gemstone
            <select
              value={form.gemstoneItemId}
              required
              onChange={(e) => setForm({ ...form, gemstoneItemId: e.target.value })}
            >
              <option value="">Select stone...</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.stockNumber}
                </option>
              ))}
            </select>
          </label>
          <label>
            Media type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {MEDIA_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
          <label className="full">
            URL
            <input
              type="url"
              value={form.url}
              required
              placeholder="https://..."
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </label>
          <label>
            Alt text / caption
            <input
              value={form.altText}
              placeholder="Describe the image..."
              onChange={(e) => setForm({ ...form, altText: e.target.value })}
            />
          </label>
          <label>
            Sort order
            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            />
          </label>
          <label className="full" style={{ flexDirection:"row", alignItems:"center", gap:10, cursor:"pointer" }}>
            <input
              type="checkbox"
              checked={form.isPrimary}
              style={{ width:15, height:15, accentColor:"var(--color-sapphire)" }}
              onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })}
            />
            <span style={{ textTransform:"none", letterSpacing:0, fontSize:13, fontWeight:400, color:"var(--color-graphite)" }}>
              Set as primary image for this stone
            </span>
          </label>
          {formError && <div className="form-error full">{formError}</div>}
        </form>
      </Modal>

      {/* Delete confirm modal */}
      <Modal
        open={deleteConfirming}
        onClose={() => { setDeleteConfirming(false); setDeleting(null); }}
        title="Remove media asset?"
        actions={
          <>
            <button className="admin-button" type="button" onClick={() => { setDeleteConfirming(false); setDeleting(null); }}>
              Cancel
            </button>
            <button className="admin-button" type="button" style={{ borderColor:"var(--cga-danger)", color:"var(--cga-danger)" }} onClick={executeDelete}>
              <Trash2 size={13} /> Remove
            </button>
          </>
        }
      >
        <p style={{ fontSize:13, lineHeight:1.6, color:"var(--color-muted)", margin:0 }}>
          This will permanently remove{" "}
          <strong style={{ color:"var(--color-graphite)" }}>
            {deleting?.altText || deleting?.url || "this asset"}
          </strong>{" "}
          from the media library. This action cannot be undone.
        </p>
      </Modal>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="media-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
          onClick={() => setLightbox(null)}
        >
          <button
            className="media-lightbox-close"
            type="button"
            aria-label="Close preview"
            onClick={() => setLightbox(null)}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="media-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
