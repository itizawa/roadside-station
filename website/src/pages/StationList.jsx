import { stations } from '../data/stations.js'
import StationCard from '../components/StationCard.jsx'

export default function StationList() {
  const sorted = [...stations].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <div className="page-header">
        <h1>道の駅巡り</h1>
        <p className="description">
          関東の道の駅を「徒歩」で巡り、YouTube・ブログ/noteで発信するプロジェクトです。
        </p>
      </div>

      <section className="stations-list">
        {sorted.length > 0 ? (
          <div className="stations-grid">
            {sorted.map((station) => (
              <StationCard key={station.slug} station={station} />
            ))}
          </div>
        ) : (
          <p>訪問済みの道の駅はまだありません。</p>
        )}
      </section>
    </>
  )
}
