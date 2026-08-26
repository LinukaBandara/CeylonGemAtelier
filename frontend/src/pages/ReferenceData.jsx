import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import "./admin.css";

const COLLECTIONS = [
  {
    key: "gemstone-types",
    label: "Gemstone Types",
    columns: ["Name", "Description"],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "description", label: "Description", textarea: true },
    ],
    row: (entry) => [entry.name, entry.description || "—"],
    body: (form) => ({ name: form.name, description: form.description || null }),
  },
  {
    key: "shapes",
    label: "Shapes",
    columns: ["Name", "Description"],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "description", label: "Description", textarea: true },
    ],
    row: (entry) => [entry.name, entry.description || "—"],
    body: (form) => ({ name: form.name, description: form.description || null }),
  },
  {
    key: "treatments",
    label: "Treatments",
    columns: ["Name", "Description", "Sort Order"],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "description", label: "Description", textarea: true },
    ],
    row: (entry) => [entry.name, entry.description || "—", entry.sortOrder],
    body: (form) => ({
      name: form.name,
      description: form.description || null,
      sortOrder: Number(form.sortOrder) || 0,
    }),
  },
  {
    key: "origins",
    label: "Origins",
    columns: ["Country", "Region", "Mine"],
    fields: [
      { name: "country", label: "Country", required: true },
      { name: "region", label: "Region" },
      { name: "mine", label: "Mine" },
      { name: "description", label: "Description", textarea: true },
    ],
    row: (entry) => [entry.country, entry.region || "—", entry.mine || "—"],
    body: (form) => ({
      country: form.country,
      region: form.region || null,
      mine: form.mine || null,
      description: form.description || null,
    }),
  },
  {
    key: "laboratories",
    label: "Laboratories",
    columns: ["Name", "Short Code", "Website"],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "shortCode", label: "Short Code", required: true },
      { name: "website", label: "Website" },
      { name: "description", label: "Description", textarea: true },
    ],
    row: (entry) => [entry.name, entry.shortCode, entry.website || "—"],
    body: (form) => ({
      name: form.name,
      shortCode: form.shortCode,
      website: form.website || null,
      description: form.description || null,
    }),
  },
];

export default function ReferenceData() {
  const [tab, setTab] = useState(COLLECTIONS[0]);
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = (collection) =>
    api.get(`/api/catalog/reference/admin/${collection.key}`)
      .then((payload) => setEntries(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    setLoading(true);
    setError("");
    setQuery("");
    load(tab).finally(() => setLoading(false));
  }, [tab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) =>
      tab.row(entry).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [entries, query, tab]);

  const openCreate = () => {
    setForm({});
    setFormError("");
    setEditing("new");
  };

  const openEdit = (entry) => {
    const values = {};
    for (const field of tab.fields) values[field.name] = entry[field.name] ?? "";
    setForm(values);
    setFormError("");
    setEditing(entry.id);
  };

  const save = async (event) => {
    event.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const body = tab.body(form);
      if (editing === "new") {
        await api.post(`/api/catalog/reference/admin/${tab.key}`, body);
      } else {
        await api.put(`/api/catalog/reference/admin/${tab.key}/${editing}`, body);
      }
      setEditing(null);
      await load(tab);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (entry) => {
    try {
      await api.post(
        `/api/catalog/reference/admin/${tab.key}/${entry.id}/${entry.isActive ? "deactivate" : "activate"}`
      );
      await load(tab);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Catalogue Foundations</span>
          <h1>Reference Data</h1>
          <p>Types, shapes, treatments, origins and grading laboratories.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={openCreate}>
          <Plus size={14} /> Add {tab.label.replace(/s$/, "")}
        </button>
      </header>

      <div className="admin-tabs">
        {COLLECTIONS.map((collection) => (
          <button
            key={collection.key}
            type="button"
            className={tab.key === collection.key ? "active" : ""}
            onClick={() => setTab(collection)}
          >
            {collection.label}
          </button>
        ))}
      </div>

      <div className="admin-controls">
        <label className="admin-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab.label.toLowerCase()}...`} />
        </label>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading {tab.label.toLowerCase()}...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                {tab.columns.map((column) => <th key={column}>{column}</th>)}
                <th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id}>
                  {tab.row(entry).map((value, index) => (
                    <td key={index}>{index === 0 ? <strong>{value}</strong> : value}</td>
                  ))}
                  <td>
                    <span className={`admin-badge ${entry.isActive ? "badge-on" : "badge-off"}`}>
                      {entry.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => openEdit(entry)}>Edit</button>
                      <button type="button" onClick={() => toggleActive(entry)}>
                        {entry.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={tab.columns.length + 2} className="admin-state">No entries found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="admin-modal-backdrop" onClick={() => setEditing(null)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>{editing === "new" ? `Add ${tab.label.replace(/s$/, "")}` : `Edit ${tab.label.replace(/s$/, "")}`}</h2>
            <div className="admin-form">
              {tab.fields.map((field) => (
                <label key={field.name} className={field.textarea ? "full" : ""}>
                  {field.label}
                  {field.textarea ? (
                    <textarea
                      value={form[field.name] ?? ""}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      value={form[field.name] ?? ""}
                      required={field.required}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                  )}
                </label>
              ))}
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setEditing(null)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
