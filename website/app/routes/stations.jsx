import { stations } from '../data/stations'
import StationCard from '../components/StationCard.jsx'

export function meta() {
  return [
    { title: '訪問済み道の駅一覧 | 道の駅めぐり日記' },
    {
      name: 'description',
      content: '関東甲信の道の駅を「徒歩」で巡り、YouTube・ブログ/noteで発信するプロジェクトの訪問済み道の駅一覧です。',
    },
  ]
}

export function loader() {
  return [...stations].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function StationList({ loaderData: sorted }) {
  return (
    <>
      <div className="page-header">
        <h1>道の駅巡り</h1>
        <p className="description">
          関東甲信の道の駅を「徒歩」で巡り、YouTube・ブログ/noteで発信するプロジェクトです。
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
