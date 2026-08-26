import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { api, unwrapCollection } from "../services/api";
import "./admin.css";

const emptyForm = {
  gemstoneItemId: "",
  laboratoryId: "",
  certificateNumber: "",
  issueDate: "",
  reportType: "",
  certifiedCaratWeight: "",
  reportUrl: "",
};

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [items, setItems] = useState([]);
  const [labs, setLabs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    api.get("/api/catalog/certificates")
      .then((payload) => setCertificates(unwrapCollection(payload)))
      .catch((err) => setError(err.message));

  useEffect(() => {
    Promise.all([
      load(),
      api.get("/api/catalog/items")
        .then((payload) => setItems(unwrapCollection(payload)))
        .catch(() => setItems([])),
      api.get("/api/catalog/reference/laboratories")
        .then((payload) => setLabs(unwrapCollection(payload)))
        .catch(() => setLabs([])),
    ]).finally(() => setLoading(false));
  }, []);

  const stockNumber = useMemo(() => {
    const map = new Map(items.map((i) => [i.id, i.stockNumber]));
    return (id) => map.get(id) ?? "—";
  }, [items]);

  const labName = useMemo(() => {
    const map = new Map(labs.map((l) => [l.id, l.shortCode || l.name]));
    return (id) => map.get(id) ?? "—";
  }, [labs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter((c) =>
      [c.certificateNumber, stockNumber(c.gemstoneItemId), labName(c.laboratoryId), c.reportType]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [certificates, query, stockNumber, labName]);

  const toggleVerify = async (certificate) => {
    try {
      await api.post(
        `/api/catalog/items/${certificate.gemstoneItemId}/certificates/${certificate.id}/${certificate.isVerified ? "unverify" : "verify"}`
      );
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
      await api.post(`/api/catalog/items/${form.gemstoneItemId}/certificates`, {
        gemstoneItemId: form.gemstoneItemId,
        laboratoryId: form.laboratoryId,
        certificateNumber: form.certificateNumber,
        issueDate: form.issueDate,
        reportType: form.reportType || null,
        certifiedCaratWeight: form.certifiedCaratWeight ? Number(form.certifiedCaratWeight) : null,
        treatmentStatement: null,
        reportUrl: form.reportUrl || null,
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
          <span className="admin-eyebrow">Provenance & Grading</span>
          <h1>Certification Archive</h1>
          <p>Laboratory reports attached to atelier gemstones.</p>
        </div>
        <button className="admin-button primary" type="button" onClick={() => { setForm(emptyForm); setFormError(""); setCreating(true); }}>
          <Plus size={14} /> Add Certificate
        </button>
      </header>

      <div className="admin-controls">
        <label className="admin-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search certificate number, stone or laboratory..." />
        </label>
      </div>

      <div className="admin-surface">
        {loading && <div className="admin-state">Loading certificates...</div>}
        {error && <div className="admin-state error">{error}</div>}
        {!loading && !error && (
          <table>
            <thead>
              <tr><th>Certificate No.</th><th>Gemstone</th><th>Laboratory</th><th>Type</th><th>Issue Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((certificate) => (
                <tr key={certificate.id}>
                  <td><strong>{certificate.certificateNumber}</strong></td>
                  <td>{stockNumber(certificate.gemstoneItemId)}</td>
                  <td>{labName(certificate.laboratoryId)}</td>
                  <td>{certificate.reportType || "—"}</td>
                  <td>{new Date(certificate.issueDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-badge ${certificate.isVerified ? "badge-on" : "badge-off"}`}>
                      {certificate.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      {certificate.reportUrl && (
                        <button type="button" onClick={() => window.open(certificate.reportUrl, "_blank", "noopener")}>View</button>
                      )}
                      <button type="button" onClick={() => toggleVerify(certificate)}>
                        {certificate.isVerified ? "Unverify" : "Verify"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="admin-state">No certificates on record.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {creating && (
        <div className="admin-modal-backdrop" onClick={() => setCreating(false)}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h2>Add Certificate</h2>
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
                Laboratory
                <select value={form.laboratoryId} required onChange={(e) => setForm({ ...form, laboratoryId: e.target.value })}>
                  <option value="">Select laboratory...</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>{lab.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Certificate Number
                <input value={form.certificateNumber} required onChange={(e) => setForm({ ...form, certificateNumber: e.target.value })} />
              </label>
              <label>
                Issue Date
                <input type="date" value={form.issueDate} required onChange={(e) => setForm({ ...form, issueDate: e.target.value })} />
              </label>
              <label>
                Report Type
                <input value={form.reportType} placeholder="e.g. Full Report" onChange={(e) => setForm({ ...form, reportType: e.target.value })} />
              </label>
              <label>
                Certified Weight (ct)
                <input type="number" step="0.01" min="0" value={form.certifiedCaratWeight} onChange={(e) => setForm({ ...form, certifiedCaratWeight: e.target.value })} />
              </label>
              <label className="full">
                Report URL
                <input type="url" value={form.reportUrl} placeholder="https://..." onChange={(e) => setForm({ ...form, reportUrl: e.target.value })} />
              </label>
              {formError && <div className="form-error">{formError}</div>}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-button" type="button" onClick={() => setCreating(false)}>Cancel</button>
              <button className="admin-button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Certificate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
