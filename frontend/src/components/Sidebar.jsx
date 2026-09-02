import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bookmark,
  Database,
  Gem,
  Images,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";
import { logout } from "../services/auth";

const navigation = [
  {
    label: "Atelier",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Gemstones", to: "/inventory", icon: Gem },
      { label: "Products", to: "/products", icon: Package },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Certificates", to: "/certificates", icon: BadgeCheck },
      { label: "Media", to: "/media", icon: Images },
      { label: "Reservations", to: "/reservations", icon: Bookmark },
      { label: "Sales", to: "/sales", icon: ShoppingBag },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Reference Data", to: "/reference-data", icon: Database },
      { label: "Settings", to: "/settings", icon: Settings },
    ],
  },
];

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="cga-brand-mark" aria-hidden="true">
      <path d="M24 4 39 16 34 37 24 44 14 37 9 16Z" />
      <path d="m9 16 15 7 15-7M24 4v19M14 37l10-14 10 14" />
      <path d="M15 11 24 23l9-12" />
    </svg>
  );
}

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    onClose?.();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <button
        className={`sidebar-overlay ${open ? "show" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <BrandMark />

          <div className="sidebar-wordmark">
            <strong>CEYLON</strong>
            <strong>GEM ATELIER</strong>
            <span>LUXURY &middot; TRUST &middot; HERITAGE</span>
          </div>

          <button className="mobile-close" type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((group) => (
            <section className="nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>

              {group.items.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={14} strokeWidth={1.45} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </section>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={14} strokeWidth={1.45} />
            <span>Log Out</span>
          </button>

          <div className="sidebar-signature">
            <span>PRIVATE ATELIER SYSTEM</span>
            <small>Crafted by ARK II</small>
          </div>
        </div>
      </aside>
    </>
  );
}
