import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">道の駅巡り</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">ホーム</Link></li>
            <li><Link to="/roadside-stations">訪問済み駅</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
