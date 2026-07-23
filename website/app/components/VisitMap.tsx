import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import 'leaflet/dist/leaflet.css'
import type { MapStation } from '../data/mapStations'
import { formatJaDate } from '../data/stationsSource'

interface VisitMapProps {
  stations: MapStation[]
}

const STATUS_LABEL: Record<MapStation['visitStatus'], string> = {
  visited: '訪問済み',
  planned: '訪問予定',
}

export default function VisitMap({ stations }: VisitMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current || stations.length === 0) return

    let cancelled = false
    let map: import('leaflet').Map | undefined
    let resizeObserver: ResizeObserver | undefined

    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
      })

      const bounds = L.latLngBounds(stations.map((s) => [s.lat, s.lng]))
      if (stations.length === 1) {
        map.setView(bounds.getCenter(), 13)
      } else {
        map.fitBounds(bounds, { padding: [32, 32] })
      }

      L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>',
        maxZoom: 18,
      }).addTo(map)

      resizeObserver = new ResizeObserver(() => map?.invalidateSize())
      resizeObserver.observe(containerRef.current)

      for (const station of stations) {
        const icon = L.divIcon({
          className: 'visit-map-icon',
          html: `<span class="visit-map-icon-dot visit-map-icon-dot--${station.visitStatus}"></span>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        })

        const popupContent = document.createElement('div')
        popupContent.className = 'visit-map-popup'

        const title = document.createElement('p')
        title.className = 'visit-map-popup-title'
        title.textContent = station.title
        popupContent.appendChild(title)

        const address = document.createElement('p')
        address.className = 'visit-map-popup-address'
        address.textContent = station.address
        popupContent.appendChild(address)

        const status = document.createElement('p')
        status.className = `visit-map-popup-status visit-map-popup-status--${station.visitStatus}`
        status.textContent = station.visitDate
          ? `${STATUS_LABEL[station.visitStatus]}・${formatJaDate(station.visitDate)}`
          : STATUS_LABEL[station.visitStatus]
        popupContent.appendChild(status)

        const detailButton = document.createElement('button')
        detailButton.type = 'button'
        detailButton.className = 'btn btn-small visit-map-popup-link'
        detailButton.textContent = '詳しく見る'
        detailButton.addEventListener('click', () => navigate(`/roadside-stations/${station.slug}`))
        popupContent.appendChild(detailButton)

        L.marker([station.lat, station.lng], { icon }).addTo(map).bindPopup(popupContent)
      }
    })

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      map?.remove()
    }
  }, [stations, navigate])

  if (stations.length === 0) return null

  return (
    <div className="visit-map-wrapper">
      <div ref={containerRef} className="visit-map" />
      <ul className="visit-map-legend">
        <li className="visit-map-legend-item">
          <span className="visit-map-icon-dot visit-map-icon-dot--visited" />
          訪問済み
        </li>
        <li className="visit-map-legend-item">
          <span className="visit-map-icon-dot visit-map-icon-dot--planned" />
          訪問予定
        </li>
      </ul>
    </div>
  )
}
