import { Link } from 'react-router-dom'

export default function StationCard({ station }) {
  const formattedDate = new Date(station.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
