import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import { useToast } from "../components/Toast";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
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
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
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
    api
      .get("/api/catalog/products")
      .then((payload) => setProducts(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api.get("/api/catalog/reference/varieties").catch(() => null),
      api
        .get("/api/catalog/reference/admin/gemstone-types")
        .then((payload) => setTypes(unwrapCollection(payload)))
        .catch(() => setTypes([])),
    ]).finally(() => setLoading(false));
  }, []);

  // Auto-open create modal when navigated here with ?create=1
  useEffect(() => {
    if (searchParams.get("create") === "1" && !loading) {
      setForm(emptyForm);
      setFormError("");
      setEditing("new");
      // Remove the param so back/refresh doesn't re-open
      setSearchParams({}, { replace: true });
    }
  // setSearchParams is stable from react-router — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, loading]);

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
        const created = await api.post("/api/catalog/products", body);
        // Optimistic: add immediately so the row appears without waiting for GET
        if (created && created.id) {
          setProducts((prev) => [
            ...prev,
            { items: [], isPublished: false, ...created },
          ]);
        }
        toast.success("Product created");
        setEditing(null);
        // Background reload to get canonical server state
        load().catch(() => {});
      } else {
        await api.put(`/api/catalog/products/${editing}`, body);
        // Optimistic: patch the row in-place
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editing ? { ...p, ...body } : p
          )
        );
        toast.success("Product updated");
        setEditing(null);
        load().catch(() => {});
      }
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (product) => {
    const action = product.isPublished ? "unpublish" : "publish";
    // Optimistic toggle
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, isPublished: !product.isPublished } : p
      )
    );
    try {
      await api.post(`/api/catalog/products/${product.id}/${action}`);
      toast.success(product.isPublished ? "Product unpublished" : "Product published");
      load().catch(() => {});
    } catch (err) {
      // Revert optimistic change on failure
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isPublished: product.isPublished } : p
        )
      );
      toast.error(err.message);
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
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </label>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading products...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="admin-empty">
            <strong>No products found</strong>
            <p>
              {query
                ? "Try a different search term, or clear the filter."
                : "Create your first product to begin the public catalogue."}
            </p>
            {!query && (
              <button className="admin-button primary" type="button" onClick={openCreate}>
                <Plus size={14} /> New Product
              </button>
            )}
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Stones</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <span className="admin-slug">{product.slug}</span>
                  </td>
                  <td>{typeName(product.gemstoneTypeId)}</td>
                  <td>{product.description || "—"}</td>
                  <td>{product.items?.length ?? 0}</td>
                  <td>
                    <StatusBadge
                      status={product.isPublished ? "published" : "draft"}
                    />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" onClick={() => openEdit(product)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => togglePublish(product)}>
                        {product.isPublished ? "Unpublish" : "Publish"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "New Product" : "Edit Product"}
        actions={
          <>
            <button className="admin-button" type="button" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button
              className="admin-button primary"
              type="submit"
              form="product-form"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Product"}
            </button>
          </>
        }
      >
        <form id="product-form" className="admin-form" onSubmit={save}>
          <label className="full">
            Name
            <input
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Slug
            <input
              value={form.slug}
              placeholder={slugify(form.name)}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </label>
          <label>
            Gemstone Type
            <select
              value={form.gemstoneTypeId}
              required
              onChange={(e) => setForm({ ...form, gemstoneTypeId: e.target.value })}
            >
              <option value="">Select type...</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="full">
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          {formError && <div className="form-error">{formError}</div>}
        </form>
      </Modal>
    </div>
  );
}
