import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import { stations } from '../data/stations'
import RouteMap from '../components/RouteMap'
import type { Route } from './+types/station-detail'

export function loader({ params }: Route.LoaderArgs) {
  const station = stations.find((s) => s.slug === params.slug)
  if (!station) {
    throw new Response('Not Found', { status: 404 })
  }
  return station
}

export function meta({ loaderData: station }: Route.MetaArgs) {
  if (!station) {
    return [{ title: '道の駅が見つかりません | 道の駅めぐり日記' }]
  }
  return [
    { title: `${station.title} | 道の駅めぐり日記` },
    { name: 'description', content: station.description },
  ]
}

export function ErrorBoundary() {
  return (
    <div className="page-header">
      <h1>道の駅が見つかりません</h1>
      <Link to="/roadside-stations">一覧へ戻る</Link>
    </div>
  )
}

export default function StationDetail({ loaderData: station }: Route.ComponentProps) {
  const formattedDate = new Date(station.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="station-detail">
      <div className="station-header">
        <h1>{station.title}</h1>
        <p className="tagline">{station.description}</p>
        <div className="meta">
          <span>📍 {station.location}</span>
          <span>📅 {formattedDate}</span>
        </div>
        <div className="access-types" style={{ marginTop: '1rem' }}>
          {station.accessByTrain && (
            <span className="badge badge-train">🚇 電車+徒歩</span>
          )}
          {station.accessByCar && (
            <span className="badge badge-car">🚗 車</span>
          )}
        </div>
      </div>

      {station.accessByTrain && (
        <section className="access-section">
          <h2>アクセス（電車+徒歩）</h2>
          <div className="access-route">
            <h3>🚇 最寄り駅からのルート</h3>
            <div className="access-info">
              <div className="access-method">
                <strong>最寄り駅</strong>
                <p>{station.accessByTrain.nearestStation}</p>
              </div>
              <div className="access-method">
                <strong>距離・所要時間</strong>
                <p>{station.accessByTrain.distance}（{station.accessByTrain.walkingTime}）</p>
              </div>
            </div>
            {station.accessByTrain.alternatives && station.accessByTrain.alternatives.length > 0 && (
              <div className="access-method">
                <strong>バス利用の場合</strong>
                <ul>
                  {station.accessByTrain.alternatives.map((alt, i) => (
                    <li key={i}>{alt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {station.accessByTrain.nearestStationCoordinates && station.coordinates && (
            <RouteMap
              origin={station.accessByTrain.nearestStationCoordinates}
              originLabel={station.accessByTrain.nearestStation}
              destination={station.coordinates}
              destinationLabel={station.title}
            />
          )}
        </section>
      )}

      {station.basicInfo && (
        <section className="basic-info">
          <h2>基本情報</h2>
          <dl>
            {station.basicInfo.openingDate && (
              <>
                <dt>開業日</dt>
                <dd>{station.basicInfo.openingDate}</dd>
              </>
            )}
            {station.basicInfo.operatingHours && (
              <>
                <dt>営業時間</dt>
                <dd>{station.basicInfo.operatingHours}</dd>
              </>
            )}
            {station.basicInfo.closedDays && (
              <>
                <dt>定休日</dt>
                <dd>{station.basicInfo.closedDays}</dd>
              </>
            )}
            {station.basicInfo.concept && (
              <>
                <dt>コンセプト</dt>
                <dd>{station.basicInfo.concept}</dd>
              </>
            )}
            {station.basicInfo.website && (
              <>
                <dt>公式サイト</dt>
                <dd>
                  <a href={station.basicInfo.website} target="_blank" rel="noopener noreferrer">
                    {station.basicInfo.website}
                  </a>
                </dd>
              </>
            )}
          </dl>
        </section>
      )}

      {station.content && (
        <div className="station-content">
          <ReactMarkdown>{station.content}</ReactMarkdown>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/roadside-stations" className="btn btn-small">← 一覧へ戻る</Link>
      </div>
    </article>
  )
}
