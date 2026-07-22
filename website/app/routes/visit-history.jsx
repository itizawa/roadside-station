import { Link } from 'react-router'
import { visitHistory } from '../data/visitHistory.js'

export function meta() {
  return [
    { title: '訪問履歴 | 道の駅めぐり日記' },
    { name: 'description', content: 'これまでに巡った道の駅の記録です。少しずつ更新中。' },
  ]
}

export function loader() {
  return visitHistory
}

export default function VisitHistory({ loaderData: visitHistory }) {
  return (
    <>
      <div className="visit-history-header">
        <h1>訪問履歴</h1>
        <p className="description">これまでに巡った道の駅の記録です。少しずつ更新中。</p>
      </div>

      <div className="visit-history-list">
        {visitHistory.map((v) => (
          <div key={v.overallNo} className="visit-history-card">
            <div className="visit-badges">
              <span className="visit-badge visit-badge-overall">全体 {v.overallNo} / {v.overallTotal}</span>
              <span className="visit-badge visit-badge-pref">{v.pref} {v.prefNo} / {v.prefTotal}</span>
            </div>

            <div className="visit-history-name">{v.name}</div>

            <div className="visit-history-meta">
              <div>📍 {v.address}</div>
              <div>🗓 {v.date}</div>
              <div>{v.transportIcon} {v.transport}</div>
            </div>

            <div className="visit-history-recommend">
              <div className="visit-history-recommend-label">おすすめ</div>
              <div className="visit-history-recommend-text">{v.recommend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="back-to-top-wrap">
        <Link to="/" className="back-to-top">
          <span aria-hidden="true">←</span> トップページに戻る
        </Link>
      </div>
    </>
  )
}
