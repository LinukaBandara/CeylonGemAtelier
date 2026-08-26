import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./admin.css";

export default function Settings() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/api/settings")
      .then((settings) => setForm(settings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (name) => (event) => {
    setSaved(false);
    setForm({ ...form, [name]: event.target.value });
  };

  const save = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      const updated = await api.put("/api/settings", {
        atelierName: form.atelierName,
        contactEmail: form.contactEmail || null,
        contactPhone: form.contactPhone || null,
        whatsAppNumber: form.whatsAppNumber || null,
        address: form.address || null,
        instagramUrl: form.instagramUrl || null,
        facebookUrl: form.facebookUrl || null,
        defaultCurrency: form.defaultCurrency,
        stockNumberPrefix: form.stockNumberPrefix,
        showPricesPublicly: form.showPricesPublicly,
        heroTitle: form.heroTitle || null,
        heroSubtitle: form.heroSubtitle || null,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
      });
      setForm(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">Atelier Configuration</span>
          <h1>Settings</h1>
          <p>Profile, catalogue behaviour and public website presentation.</p>
        </div>
      </header>

      {loading && <div className="admin-state">Loading settings...</div>}
      {error && !form && <div className="admin-state error">{error}</div>}

      {form && (
        <form onSubmit={save}>
          <section className="settings-card">
            <h2>Atelier Profile</h2>
            <div className="admin-form">
              <label>
                Atelier Name
                <input value={form.atelierName} required onChange={set("atelierName")} />
              </label>
              <label>
                Contact Email
                <input type="email" value={form.contactEmail ?? ""} onChange={set("contactEmail")} />
              </label>
              <label>
                Contact Phone
                <input value={form.contactPhone ?? ""} onChange={set("contactPhone")} />
              </label>
              <label>
                WhatsApp Number
                <input value={form.whatsAppNumber ?? ""} onChange={set("whatsAppNumber")} />
              </label>
              <label className="full">
                Address
                <textarea value={form.address ?? ""} onChange={set("address")} />
              </label>
              <label>
                Instagram URL
                <input type="url" value={form.instagramUrl ?? ""} onChange={set("instagramUrl")} />
              </label>
              <label>
                Facebook URL
                <input type="url" value={form.facebookUrl ?? ""} onChange={set("facebookUrl")} />
              </label>
            </div>
          </section>

          <section className="settings-card">
            <h2>Catalogue</h2>
            <div className="admin-form">
              <label>
                Default Currency
                <input value={form.defaultCurrency} maxLength={3} required onChange={(e) => { setSaved(false); setForm({ ...form, defaultCurrency: e.target.value.toUpperCase() }); }} />
              </label>
              <label>
                Stock Number Prefix
                <input value={form.stockNumberPrefix} required onChange={set("stockNumberPrefix")} />
              </label>
              <label className="checkbox-row full">
                <input
                  type="checkbox"
                  checked={form.showPricesPublicly}
                  onChange={(e) => { setSaved(false); setForm({ ...form, showPricesPublicly: e.target.checked }); }}
                />
                Show prices on the public website
              </label>
            </div>
          </section>

          <section className="settings-card">
            <h2>Public Website</h2>
            <div className="admin-form">
              <label className="full">
                Homepage Hero Title
                <input value={form.heroTitle ?? ""} onChange={set("heroTitle")} />
              </label>
              <label className="full">
                Homepage Hero Subtitle
                <input value={form.heroSubtitle ?? ""} onChange={set("heroSubtitle")} />
              </label>
              <label className="full">
                SEO Title
                <input value={form.seoTitle ?? ""} onChange={set("seoTitle")} />
              </label>
              <label className="full">
                SEO Description
                <textarea value={form.seoDescription ?? ""} onChange={set("seoDescription")} />
              </label>
            </div>
          </section>

          <div className="admin-modal-actions" style={{ justifyContent: "flex-start", alignItems: "center", gap: 14 }}>
            <button className="admin-button primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
            {saved && <span className="settings-save-note">Settings saved.</span>}
            {error && form && <span className="admin-state error" style={{ padding: 0 }}>{error}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
