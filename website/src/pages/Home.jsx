import { stations } from '../data/stations.js'
import { nextVisits } from '../data/nextVisits.js'
import { profile, socialLinks } from '../data/profile.js'
import { visitStats, prefectureMap } from '../data/visitStats.js'
import StationCard from '../components/StationCard.jsx'

export default function Home() {
  const sorted = [...stations].sort((a, b) => new Date(b.date) - new Date(a.date))
  const recentVisits = sorted.slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>道の駅を、<br />てくてく巡る。</h1>
          <p className="tagline">
            関東7県の道の駅を、車と徒歩でのんびり巡っています。行けるところから少しずつ、制覇を目指す記録です。
          </p>
        </div>
        <svg viewBox="0 0 200 120" className="hero-illustration" aria-hidden="true">
          <ellipse cx="105" cy="100" rx="82" ry="7" fill="var(--c-mist)" />
          <rect x="6" y="52" width="18" height="5" rx="2.5" fill="var(--c-pale)" />
          <rect x="2" y="64" width="14" height="5" rx="2.5" fill="var(--c-pale)" />
          <rect x="10" y="40" width="18" height="5" rx="2.5" fill="var(--c-pale)" />
          <rect x="24" y="58" width="160" height="34" rx="16" fill="var(--c-mid)" />
          <rect x="58" y="26" width="82" height="36" rx="18" fill="var(--c-soft)" />
          <rect x="68" y="35" width="26" height="19" rx="6" fill="var(--c-white)" />
          <rect x="102" y="35" width="26" height="19" rx="6" fill="var(--c-white)" />
          <circle cx="178" cy="72" r="6" fill="var(--c-pale)" />
          <circle cx="58" cy="94" r="17" fill="var(--c-navy)" />
          <circle cx="58" cy="94" r="6.5" fill="var(--c-white)" />
          <circle cx="150" cy="94" r="17" fill="var(--c-navy)" />
          <circle cx="150" cy="94" r="6.5" fill="var(--c-white)" />
        </svg>
      </section>

      <section className="overview-grid">
        <div className="visit-stats-card">
          <h2>訪問済み道の駅</h2>
          <div className="visit-stats-total">
            <span className="number">{visitStats.totalVisited}</span>
            <span className="unit">/ 関東{visitStats.totalStations}駅</span>
          </div>
          <ul className="prefecture-list">
            {visitStats.prefectures.map((pref) => (
              <li key={pref.name}>
                <span className="pref-name">{pref.name}</span>
                <span className="pref-count">{pref.visited} / {pref.total}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="visit-map-card">
          <h2>訪問マップ</h2>
          <div className="visit-map">
            {prefectureMap.map((p) => (
              <div
                key={p.key}
                className={`map-blob ${p.visited ? 'is-visited' : ''}`}
                style={{
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  width: `${p.w}%`,
                  height: `${p.h}%`,
                  transform: `rotate(${p.rotate}deg)`,
                }}
              >
                <div className="map-blob-name" style={{ transform: `rotate(${-p.rotate}deg)` }}>
                  {p.name}
                </div>
                {p.visited && (
                  <div className="map-blob-mark" style={{ transform: `rotate(${-p.rotate}deg)` }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="latest-visits">
        <div className="section-label">RECENT VISITS・最近の訪問</div>
        {recentVisits.length > 0 ? (
          <div className="stations-grid">
            {recentVisits.map((station) => (
              <StationCard key={station.slug} station={station} variant="feature" />
            ))}
          </div>
        ) : (
          <p>訪問済みの道の駅はまだありません。</p>
        )}
      </section>

      <section className="next-profile-grid">
        <div className="next-up-card">
          <div className="section-label">NEXT UP・今後の予定</div>
          <ul className="next-up-list">
            {nextVisits.map((visit, i) => (
              <li key={visit.name}>
                <div className="next-up-line">
                  <span className="next-up-dot" />
                  {i < nextVisits.length - 1 && <span className="next-up-line-rest" />}
                </div>
                <div className="next-up-content">
                  <p className="next-up-name">{visit.name}</p>
                  <p className="next-up-meta">{visit.prefecture}　{visit.schedule}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-card">
          <div className="section-label">巡っている人</div>
          <div className="profile-card-inner">
            <div className="profile-avatar" aria-hidden="true" />
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-bio">{profile.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="follow-section">
        <div className="section-label">FOLLOW・SNSでも発信中</div>
        <div className="follow-links">
          {socialLinks.map((link) =>
            link.url ? (
              <a
                key={link.platform}
                className="follow-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="follow-icon" aria-hidden="true" />
                <span>{link.platform}</span>
                <span className="follow-handle">{link.label}</span>
              </a>
            ) : (
              <span key={link.platform} className="follow-link follow-link-static">
                <span className="follow-icon" aria-hidden="true" />
                <span>{link.platform}</span>
                <span className="follow-handle">{link.label}</span>
              </span>
            )
          )}
        </div>
      </section>
    </>
  )
}
