import { useState } from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
  { label: 'トップページ', to: '/' },
  { label: '訪問済み駅', to: '/roadside-stations' },
  { label: '訪問履歴', to: '/visit-history' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <svg viewBox="0 0 32 32" className="logo-icon" aria-hidden="true">
              <rect x="1" y="26" width="30" height="3" rx="1.5" fill="var(--c-white)" opacity="0.55" />
              <polygon points="16,5 27,14 5,14" fill="var(--c-white)" />
              <rect x="8" y="14" width="16" height="11" rx="2" fill="var(--c-white)" />
              <rect x="13.5" y="18" width="5" height="7" fill="var(--c-deep)" />
              <rect x="15" y="1" width="1.6" height="5" fill="var(--c-white)" />
              <polygon points="16.6,1.5 21,3.3 16.6,5.1" fill="var(--c-white)" />
            </svg>
            道の駅めぐり日記
          </Link>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-drawer-header">
              <div className="menu-drawer-title">メニュー</div>
              <button
                type="button"
                className="menu-drawer-close"
                aria-label="メニューを閉じる"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="menu-drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
