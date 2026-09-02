import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  Gem,
  Heart,
  Layers,
  Menu,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../services/useSearch";
import { useNotifications } from "../services/useNotifications";
import { useAppContext } from "../contexts/AppContext";
import "../pages/admin.css";

/* ─── tiny hook: close panel on outside click or Escape ─── */
function usePanel(ref) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  // ref is a stable object — intentionally excluded from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return [open, setOpen];
}

/* ─── Search panel ──────────────────────────────────────── */
function SearchPanel({ onClose }) {
  const { prime, search } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Prime search data when panel opens
  useEffect(() => {
    prime();
    inputRef.current?.focus();
  }, [prime]);

  useEffect(() => {
    const q = query.trim();
    setResults(q.length >= 1 ? search(q) : []);
    setActive(-1);
  }, [query, search]);

  const go = useCallback(
    (href) => {
      navigate(href);
      onClose();
    },
    [navigate, onClose]
  );

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, -1));
    } else if (e.key === "Enter" && active >= 0 && results[active]) {
      go(results[active].href);
    }
  }

  const ResultIcon = ({ type }) =>
    type === "product" ? (
      <Layers size={14} strokeWidth={1.4} />
    ) : (
      <Gem size={14} strokeWidth={1.4} />
    );

  return (
    <div className="search-panel">
      <div className="search-input-row">
        <Search size={15} strokeWidth={1.4} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search gemstones, stock numbers, products..."
          aria-label="Search collection"
          aria-autocomplete="list"
        />
        <button
          type="button"
          className="topbar-panel-action"
          onClick={onClose}
          aria-label="Close search"
        >
          <X size={14} />
        </button>
      </div>

      <div className="search-results" role="listbox">
        {query.trim().length === 0 && (
          <p className="search-hint">
            Type to search gemstones, stock numbers, products and more.
            <br />
            <span style={{ fontSize: 11 }}>Press Esc to close</span>
          </p>
        )}

        {query.trim().length > 0 && results.length === 0 && (
          <p className="search-empty">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {results.map((result, i) => (
          <button
            key={result.id}
            type="button"
            role="option"
            aria-selected={i === active}
            className={`search-result-item${i === active ? " highlighted" : ""}`}
            onClick={() => go(result.href)}
          >
            <span className="search-result-icon">
              <ResultIcon type={result.type} />
            </span>
            <span>
              <span className="search-result-label">{result.label}</span>
              <span className="search-result-sub">{result.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Notifications panel ───────────────────────────────── */
function NotificationsPanel({ onClose }) {
  const { notifications, loading, refresh, markRead, markAllRead, readIds } =
    useNotifications();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="topbar-panel">
      <div className="topbar-panel-head">
        <h3>Notifications</h3>
        {notifications.some((n) => n.id !== "all-clear" && !readIds.has(n.id)) && (
          <button
            type="button"
            className="topbar-panel-action"
            onClick={markAllRead}
          >
            Mark all read
          </button>
        )}
      </div>

      {loading && (
        <p className="topbar-panel-empty">Checking for notifications...</p>
      )}

      {!loading && notifications.length === 0 && (
        <p className="topbar-panel-empty">No notifications.</p>
      )}

      {!loading &&
        notifications.map((n) => {
          const isUnread = n.id !== "all-clear" && !readIds.has(n.id);
          const dotClass =
            n.level === "warning"
              ? "notif-dot-warning"
              : n.level === "success"
              ? "notif-dot-success"
              : "notif-dot-info";

          const inner = (
            <>
              <span className={`notif-dot ${dotClass}`} />
              <span className="notif-body">
                <span className="notif-title">{n.title}</span>
                <span className="notif-text">{n.body}</span>
              </span>
              {n.href && (
                <ChevronRight
                  size={13}
                  strokeWidth={1.4}
                  className="notif-link-arrow"
                />
              )}
            </>
          );

          if (n.href) {
            return (
              <Link
                key={n.id}
                to={n.href}
                className={`notif-item${isUnread ? " unread" : ""}`}
                onClick={() => {
                  markRead(n.id);
                  onClose();
                }}
              >
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={n.id}
              type="button"
              className={`notif-item${isUnread ? " unread" : ""}`}
              onClick={() => markRead(n.id)}
            >
              {inner}
            </button>
          );
        })}
    </div>
  );
}

/* ─── Favorites panel ───────────────────────────────────── */
function FavoritesPanel({ onClose }) {
  const { favorites: favStore } = useAppContext();
  const { favorites, remove, clear } = favStore;

  return (
    <div className="topbar-panel">
      <div className="topbar-panel-head">
        <h3>Saved Stones</h3>
        {favorites.length > 0 && (
          <button
            type="button"
            className="topbar-panel-action"
            onClick={clear}
          >
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 && (
        <p className="topbar-panel-empty">
          No stones saved yet.
          <br />
          <span style={{ fontSize: 11 }}>
            Use the heart icon on any gemstone to save it here.
          </span>
        </p>
      )}

      {favorites.map((fav) => (
        <Link
          key={fav.id}
          to={fav.href}
          className="fav-item"
          onClick={onClose}
        >
          <span className="fav-item-gem">
            <Gem size={13} strokeWidth={1.4} />
          </span>
          <span className="fav-item-name">
            <span className="fav-item-stock">{fav.stockNumber}</span>
            <span className="fav-item-product">
              {fav.productName || "Gemstone"} · {fav.status}
            </span>
          </span>
          <button
            type="button"
            className="fav-remove-btn"
            aria-label={`Remove ${fav.stockNumber} from saved`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              remove(fav.id);
            }}
          >
            <Trash2 size={13} strokeWidth={1.4} />
          </button>
        </Link>
      ))}

      {favorites.length > 0 && (
        <div className="fav-panel-footer">
          <Link
            to="/inventory"
            className="topbar-panel-action"
            style={{ textDecoration: "none" }}
            onClick={onClose}
          >
            View full inventory →
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Main Topbar ───────────────────────────────────────── */
export default function Topbar({ onMenuClick }) {
  const searchRef = useRef(null);
  const notifRef  = useRef(null);
  const favRef    = useRef(null);

  const [searchOpen,  setSearchOpen]  = usePanel(searchRef);
  const [notifOpen,   setNotifOpen]   = usePanel(notifRef);
  const [favOpen,     setFavOpen]     = usePanel(favRef);

  // Close other panels when one opens
  const openSearch = () => { setNotifOpen(false); setFavOpen(false);   setSearchOpen(true); };
  const openNotif  = () => { setSearchOpen(false); setFavOpen(false);  setNotifOpen(true);  };
  const openFav    = () => { setSearchOpen(false); setNotifOpen(false); setFavOpen(true);    };

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
        setNotifOpen(false);
        setFavOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // setX dispatchers are stable — intentionally excluded
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Counts for badges
  const { unreadCount } = useNotifications();
  const { favorites: favStore } = useAppContext();
  const favorites = favStore.favorites;

  return (
    <header className="topbar">
      <div className="topbar-left" style={{ position: "relative" }}>
        <button
          className="menu-button"
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <Menu size={19} strokeWidth={1.45} />
        </button>

        <div className="mobile-brand">CEYLON GEM ATELIER</div>

        {/* Search trigger */}
        <div ref={searchRef} style={{ position: "relative" }}>
          <button
            className="topbar-search"
            type="button"
            aria-label="Search collection"
            aria-expanded={searchOpen}
            onClick={openSearch}
          >
            <Search size={13} strokeWidth={1.45} />
            <span>Search collection...</span>
            <kbd>{typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K"}</kbd>
          </button>

          {searchOpen && (
            <SearchPanel onClose={() => setSearchOpen(false)} />
          )}
        </div>
      </div>

      <div className="topbar-actions">

        {/* Favorites */}
        <div ref={favRef} style={{ position: "relative" }}>
          <button
            className={`topbar-icon topbar-favorite${favOpen ? " active" : ""}`}
            type="button"
            aria-label="Saved stones"
            aria-expanded={favOpen}
            onClick={favOpen ? () => setFavOpen(false) : openFav}
          >
            <Heart
              size={15}
              strokeWidth={1.4}
              fill={favorites.length > 0 ? "currentColor" : "none"}
              style={{ color: favorites.length > 0 ? "var(--cga-danger, #8b3a3a)" : undefined }}
            />
            {favorites.length > 0 && (
              <span className="topbar-badge">{Math.min(favorites.length, 99)}</span>
            )}
          </button>

          {favOpen && (
            <FavoritesPanel onClose={() => setFavOpen(false)} />
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            className={`topbar-icon notification${notifOpen ? " active" : ""}`}
            type="button"
            aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
            aria-expanded={notifOpen}
            onClick={notifOpen ? () => setNotifOpen(false) : openNotif}
          >
            <Bell size={15} strokeWidth={1.4} />
            {unreadCount > 0 && <span className="notif-pulse" />}
          </button>

          {notifOpen && (
            <NotificationsPanel onClose={() => setNotifOpen(false)} />
          )}
        </div>

        {/* User profile (hardcoded — no user API) */}
        <div className="user-profile">
          <div className="avatar">L</div>
          <div className="user-details">
            <strong>Admin User</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}
