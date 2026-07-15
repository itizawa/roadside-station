import { Link } from 'react-router-dom'

export default function StationCard({ station, variant = 'default' }) {
  const formattedDate = new Date(station.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (variant === 'feature') {
    return (
      <article className="station-card-feature">
        <Link to={`/roadside-stations/${station.slug}`} className="station-card-title">
          {station.title}
        </Link>
        <p className="location">📍 {station.location}</p>
        <p className="date">{formattedDate}</p>
        <div className="tag-pills">
          {station.accessByTrain && <span className="tag-pill">電車+徒歩</span>}
          {station.accessByCar && <span className="tag-pill">車</span>}
        </div>
      </article>
    )
  }

  return (
    <article className="station-card">
      <h3>
        <Link to={`/roadside-stations/${station.slug}`}>{station.title}</Link>
      </h3>
      <p className="location">📍 {station.location}</p>
      <p className="date">{formattedDate}</p>
      <div className="access-types">
        {station.accessByTrain && (
          <span className="badge badge-train">🚇 電車+徒歩</span>
        )}
        {station.accessByCar && (
          <span className="badge badge-car">🚗 車</span>
        )}
      </div>
      <Link to={`/roadside-stations/${station.slug}`} className="btn btn-small">
        詳しく見る
      </Link>
    </article>
  )
}
