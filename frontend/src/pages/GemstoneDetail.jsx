import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Edit3,
  Gem,
  Image as ImageIcon,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { api, unwrapCollection } from "../services/api";
import "./GemstoneDetail.css";

function formatCurrency(value, currency = "USD") {
  if (value == null || value === "") return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(Number(value));
  } catch {
    return `${currency || "USD"} ${Number(value).toLocaleString()}`;
  }
}

function statusClass(status) {
  return (status || "unknown").toLowerCase().replaceAll(" ", "-");
}

function displayStatus(status) {
  return status === "Available" ? "In Stock" : status || "Unknown";
}

function gemTone(item) {
  const value = `${item?.productName || ""} ${item?.color || ""}`.toLowerCase();

  if (value.includes("padparadscha")) return "padparadscha";
  if (value.includes("ruby") || value.includes("red")) return "ruby";
  if (value.includes("spinel")) return "spinel";
  if (value.includes("blue") || value.includes("sapphire")) return "sapphire";

  return "neutral";
}

function GemstoneVisual({ item }) {
  const tone = gemTone(item);

  return (
    <div className={`detail-gemstone-visual gem-${tone}`}>
      <div className="detail-gem-glow" />
      <div className="detail-gem-shape">
        <span className="detail-facet facet-one" />
        <span className="detail-facet facet-two" />
        <span className="detail-facet facet-three" />
        <span className="detail-facet facet-four" />
        <span className="detail-gem-highlight" />
      </div>
      <span className="detail-visual-label">GEMSTONE VISUAL</span>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value || "Not recorded"}</strong>
    </div>
  );
}

export default function GemstoneDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.get("/api/catalog/items")
      .then((payload) => {
        if (!active) return;

        const collection = unwrapCollection(payload);
        const found = collection.find(
          (entry) => String(entry.id) === String(id)
        );

        if (!found) {
          setError("This gemstone could not be found in the collection.");
          return;
        }

        setItem(found);
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Unable to load this gemstone.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const detail = useMemo(() => {
    if (!item) return null;

    return {
      stockNumber: item.stockNumber || "Unassigned",
      status: item.status,
      weight:
        item.caratWeight != null
          ? `${Number(item.caratWeight).toFixed(2)} ct`
          : "Not recorded",
      price: formatCurrency(
        item.sellingPriceAmount,
        item.sellingPriceCurrency
      ),
      currency: item.sellingPriceCurrency || "USD",
      color: item.color,
      clarity: item.clarity,
      shape: item.shapeName,
      origin: item.originId ? "Sri Lanka" : null,
      treatment: item.treatmentName,
      productName: item.productName,
    };
  }, [item]);

  if (loading) {
    return (
      <div className="gemstone-detail-page">
        <div className="detail-loading">
          <div className="detail-loading-line" />
          <span>Opening gemstone record...</span>
        </div>
      </div>
    );
  }

  if (error || !item || !detail) {
    return (
      <div className="gemstone-detail-page">
        <div className="detail-error">
          <span className="detail-eyebrow">Collection Record</span>
          <h1>Gemstone unavailable</h1>
          <p>{error || "This gemstone record does not exist."}</p>
          <Link to="/inventory" className="detail-back-button">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gemstone-detail-page">
      <header className="detail-header">
        <div className="detail-header-left">
          <Link to="/inventory" className="detail-back">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Gemstones
          </Link>

          <ChevronRight
            className="detail-header-chevron"
            size={13}
            strokeWidth={1.3}
          />

          <span>{detail.stockNumber}</span>
        </div>

        <Link to={`/inventory/${id}/edit`} className="detail-edit-button">
          <Edit3 size={13} strokeWidth={1.4} />
          Edit Stone
        </Link>
      </header>

      <section className="detail-identity">
        <div>
          <span className="detail-eyebrow">
            {detail.productName || "Private Collection"}
          </span>

          <h1>{detail.productName || "Gemstone Record"}</h1>

          <div className="detail-subline">
            <span>Stock No. {detail.stockNumber}</span>
            {detail.origin && (
              <>
                <i />
                <span>{detail.origin}</span>
              </>
            )}
          </div>
        </div>

        <span
          className={`detail-status status-${statusClass(detail.status)}`}
        >
          <span />
          {displayStatus(detail.status)}
        </span>
      </section>

      <main className="detail-main">
        <section className="detail-visual-panel">
          <GemstoneVisual item={item} />

          <div className="visual-footer">
            <div>
              <span className="detail-eyebrow">Collection Record</span>
              <strong>{detail.stockNumber}</strong>
            </div>

            <span>PRIVATE</span>
          </div>
        </section>

        <div className="detail-information">
          <section className="detail-panel">
            <div className="detail-panel-heading">
              <div>
                <span className="detail-eyebrow">Stone Profile</span>
                <h2>Specifications</h2>
              </div>

              <Gem size={17} strokeWidth={1.25} />
            </div>

            <div className="detail-grid">
              <DetailRow label="Carat Weight" value={detail.weight} />
              <DetailRow label="Colour" value={detail.color} />
              <DetailRow label="Clarity" value={detail.clarity} />
              <DetailRow label="Shape" value={detail.shape} />
              <DetailRow label="Origin" value={detail.origin} />
              <DetailRow label="Treatment" value={detail.treatment} />
            </div>
          </section>

          <section className="detail-panel valuation-panel">
            <div className="detail-panel-heading">
              <div>
                <span className="detail-eyebrow">Valuation</span>
                <h2>Current Asking Price</h2>
              </div>

              <CircleDollarSign size={17} strokeWidth={1.25} />
            </div>

            <div className="detail-price">
              <strong>{detail.price}</strong>
              <span>{detail.currency}</span>
            </div>

            <div className="valuation-note">
              <span />
              Current catalogue valuation
            </div>
          </section>
        </div>
      </main>

      <section className="detail-lower-grid">
        <article className="detail-mini-panel">
          <div className="mini-icon">
            <BadgeCheck size={16} strokeWidth={1.3} />
          </div>

          <div>
            <span className="detail-eyebrow">Certification</span>
            <h3>Certification Archive</h3>
            <p>No certificate linked to this record yet.</p>
          </div>

          <ChevronRight size={14} strokeWidth={1.3} />
        </article>

        <article className="detail-mini-panel">
          <div className="mini-icon">
            <ImageIcon size={16} strokeWidth={1.3} />
          </div>

          <div>
            <span className="detail-eyebrow">Media</span>
            <h3>Atelier Gallery</h3>
            <p>Manage photography and gemstone media.</p>
          </div>

          <ChevronRight size={14} strokeWidth={1.3} />
        </article>

        <article className="detail-mini-panel">
          <div className="mini-icon">
            <MapPin size={16} strokeWidth={1.3} />
          </div>

          <div>
            <span className="detail-eyebrow">Provenance</span>
            <h3>Origin & Heritage</h3>
            <p>{detail.origin || "Origin information not recorded."}</p>
          </div>

          <ChevronRight size={14} strokeWidth={1.3} />
        </article>
      </section>

      <footer className="detail-footer">
        <div>
          <ShieldCheck size={13} strokeWidth={1.3} />
          <span>Private Atelier Record</span>
        </div>

        <span>Designed &amp; engineered by ARK II</span>
      </footer>
    </div>
  );
}
