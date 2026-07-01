import { stations } from '../data/stations.js'
import StationCard from '../components/StationCard.jsx'

export default function Home() {
  const sorted = [...stations].sort((a, b) => new Date(b.date) - new Date(a.date))
  const latest = sorted.slice(0, 6)

  return (
    <>
      <section className="hero">
        <h1>道の駅巡り</h1>
        <p className="tagline">関東の道の駅を徒歩で巡るプロジェクト</p>
      </section>

      <section className="stations-overview">
        <h2>訪問済み道の駅</h2>
        <div className="stats">
          <div className="stat">
            <span className="number">{stations.length}</span>
            <span className="label">駅</span>
          </div>
        </div>
      </section>

      <section className="latest-visits">
        <h2>最新の訪問</h2>
        {latest.length > 0 ? (
          <div className="stations-grid">
            {latest.map((station) => (
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
