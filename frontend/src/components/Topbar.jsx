import { Bell, Heart, Menu, Search } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" type="button" onClick={onMenuClick}>
          <Menu size={19} strokeWidth={1.45} />
        </button>

        <div className="mobile-brand">CEYLON GEM ATELIER</div>

        <button className="topbar-search" type="button">
          <Search size={13} strokeWidth={1.45} />
          <span>Search collection...</span>
          <kbd>⌘ K</kbd>
        </button>
      </div>

      <div className="topbar-actions">
        <button className="topbar-icon topbar-favorite" type="button" aria-label="Favorites">
          <Heart size={15} strokeWidth={1.4} />
        </button>

        <button className="topbar-icon notification" type="button" aria-label="Notifications">
          <Bell size={15} strokeWidth={1.4} />
          <span />
        </button>

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
