import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Coordinates } from '../data/stationsTypes'

interface RouteMapProps {
  origin: Coordinates
  originLabel: string
  destination: Coordinates
  destinationLabel: string
}

const ANIMATION_DURATION_MS = 2800

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export default function RouteMap({ origin, originLabel, destination, destinationLabel }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [replayToken, setReplayToken] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false
    let map: import('leaflet').Map | undefined
    let animationFrameId: number | undefined

    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return

      const originLatLng = L.latLng(origin.lat, origin.lng)
      const destinationLatLng = L.latLng(destination.lat, destination.lng)

      map = L.map(containerRef.current, {
        preferCanvas: true,
        scrollWheelZoom: false,
      })
      map.fitBounds(L.latLngBounds(originLatLng, destinationLatLng), { padding: [40, 40] })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      L.polyline([originLatLng, destinationLatLng], {
        color: '#667eea',
        weight: 3,
        dashArray: '6 8',
      }).addTo(map)

      L.marker(originLatLng, {
        icon: L.divIcon({
          className: 'route-map-icon',
          html: '<span class="route-map-icon-emoji">🚉</span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
        .addTo(map)
        .bindTooltip(originLabel, { permanent: false, direction: 'top' })

      L.marker(destinationLatLng, {
        icon: L.divIcon({
          className: 'route-map-icon',
          html: '<span class="route-map-icon-emoji">🅿️</span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
        .addTo(map)
        .bindTooltip(destinationLabel, { permanent: false, direction: 'top' })

      const pin = L.circleMarker(originLatLng, {
        radius: 9,
        color: '#ffffff',
        weight: 2,
        fillColor: '#e74c3c',
        fillOpacity: 1,
      }).addTo(map)

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        pin.setLatLng(destinationLatLng)
        return
      }

      let startTime: number | undefined

      const step = (timestamp: number) => {
        if (startTime === undefined) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
        const eased = easeInOutQuad(progress)

        const lat = originLatLng.lat + (destinationLatLng.lat - originLatLng.lat) * eased
        const lng = originLatLng.lng + (destinationLatLng.lng - originLatLng.lng) * eased
        pin.setLatLng([lat, lng])

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step)
        }
      }

      animationFrameId = requestAnimationFrame(step)
    })

    return () => {
      cancelled = true
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      map?.remove()
    }
  }, [origin, originLabel, destination, destinationLabel, replayToken])

  return (
    <div className="route-map-wrapper">
      <div ref={containerRef} className="route-map" />
      <button
        type="button"
        className="btn btn-small route-map-replay"
        onClick={() => setReplayToken((token) => token + 1)}
      >
        ▶ ルートアニメーションをもう一度見る
      </button>
    </div>
  )
}
