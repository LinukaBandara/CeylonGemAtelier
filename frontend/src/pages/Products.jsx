import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import "./admin.css";

const emptyForm = {
  name: "",
  slug: "",
  gemstoneTypeId: "",
  description: "",
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    api.get("/api/catalog/products")
      .then((payload) => setProducts(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api.get("/api/catalog/reference/varieties").catch(() => null),
      api.get("/api/catalog/reference/admin/gemstone-types")
        .then((payload) => setTypes(unwrapCollection(payload)))
        .catch(() => setTypes([])),
    ]).finally(() => setLoading(false));
  }, []);

  const typeName = useMemo(() => {
    const map = new Map(types.map((t) => [t.id, t.name]));
    return (id) => map.get(id) ?? "—";
  }, [types]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.slug, p.description]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [products, query]);

  const openCreate = () => {
    setForm(emptyForm);
    setFormError("");
    setEditing("new");
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      slug: product.slug,
      gemstoneTypeId: product.gemstoneTypeId,
      description: product.description ?? "",
    });
    setFormError("");
    setEditing(product.id);
  };

  const save = async (event) => {
    event.preventDefault();
    setFormError("");
    setSaving(true);
    const body = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      gemstoneTypeId: form.gemstoneTypeId,
      gemstoneVarietyId: null,
      description: form.description || null,
    };
    try {
      if (editing === "new") {
        await api.post("/api/catalog/products", body);
      } else {
        await api.put(`/api/catalog/products/${editing}`, body);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (product) => {
    try {
      await api.post(
        `/api/catalog/products/${product.id}/${product.isPublished ? "unpublish" : "publish"}`
      );
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Catalogue Management</span>
          <h1>Products</h1>
          <p>Curated gemstone lines shown on the public atelier site.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={openCreate}>
          <Plus size={14} /> New Product
        </button>
      </header>

      <div className="admin-controls">
        <label className="admin-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
        </label>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading products...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th><th>Stones</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td><strong>{product.name}</strong><br /><span style={{ fontSize: "7.5px" }}>{product.slug}</span></td>
                  <td>{typeName(product.gemstoneTypeId)}</td>
                  <td>{product.description || "—"}</td>
                  <td>{product.items?.length ?? 0}</td>
                  <td>
                    <span className={`admin-badge ${product.isPublished ? "badge-on" : "badge-off"}`}>
                      {product.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => openEdit(product)}>Edit</button>
                      <button type="button" onClick={() => togglePublish(product)}>
                        {product.isPublished ? "Unpublish" : "Publish"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="admin-state">No products found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="admin-modal-backdrop" onClick={() => setEditing(null)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>{editing === "new" ? "New Product" : "Edit Product"}</h2>
            <div className="admin-form">
              <label className="full">
                Name
                <input value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                Slug
                <input value={form.slug} placeholder={slugify(form.name)} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </label>
              <label>
                Gemstone Type
                <select value={form.gemstoneTypeId} required onChange={(e) => setForm({ ...form, gemstoneTypeId: e.target.value })}>
                  <option value="">Select type...</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </label>
              <label className="full">
                Description
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </label>
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setEditing(null)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
