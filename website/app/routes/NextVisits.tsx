import { Link } from 'react-router'
import { nextVisitPlans } from '../data/nextVisitPlans'

export default function NextVisits() {
  return (
    <>
      <div className="next-visits-header">
        <h1>今後の予定</h1>
        <p className="description">次に訪れたい道の駅の計画です。</p>
      </div>

      <div className="next-visits-list">
        {nextVisitPlans.map((p) => {
          const content = (
            <>
              <div className="next-visit-badges">
                <span className="next-visit-badge next-visit-badge-pref">{p.pref}</span>
                <span className="next-visit-badge next-visit-badge-when">{p.when}</span>
              </div>

              <div className="next-visit-name">{p.name}</div>

              <div className="next-visit-meta">
                <div>📍 {p.address}</div>
                <div>{p.transportIcon} {p.transport}</div>
              </div>

              <div className="next-visit-note">
                <div className="next-visit-note-label">メモ</div>
                <div className="next-visit-note-text">{p.note}</div>
              </div>
            </>
          )

          // 延期中の道の駅は詳細画面がまだ無いためリンクにしない
          return p.visitStatus === 'planned' ? (
            <Link key={p.name} to={`/roadside-stations/${p.slug}`} className="next-visit-card">
              {content}
            </Link>
          ) : (
            <div key={p.name} className="next-visit-card">
              {content}
            </div>
          )
        })}
      </div>

      <div className="back-to-top-wrap">
        <Link to="/" className="back-to-top">
          <span aria-hidden="true">←</span> トップページに戻る
        </Link>
      </div>
    </>
  )
}
