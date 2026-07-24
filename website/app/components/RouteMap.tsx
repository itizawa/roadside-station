import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Coordinates } from '../data/stationsTypes'

interface RouteMapProps {
  origin: Coordinates
  originLabel: string
  destination: Coordinates
  destinationLabel: string
  waypoints?: Coordinates[]
}

const ANIMATION_DURATION_MS = 2800

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

// 経路上の点列（起点・終点を含む）から、各区間の距離に応じた累積割合を計算する。
// 区間ごとの距離を無視して等間隔に割ると、短い区間で不自然に速く/遅く動いてしまうため。
function buildPathWithCumulativeRatios(path: Coordinates[]): { point: Coordinates; ratio: number }[] {
  const segmentLengths = path.slice(1).map((point, i) => {
    const prev = path[i]
    return Math.hypot(point.lat - prev.lat, point.lng - prev.lng)
  })
  const totalLength = segmentLengths.reduce((sum, len) => sum + len, 0)

  if (totalLength === 0) {
    return path.map((point, i) => ({ point, ratio: i / Math.max(path.length - 1, 1) }))
  }

  let cumulative = 0
  return path.map((point, i) => {
    const ratio = i === 0 ? 0 : (cumulative += segmentLengths[i - 1]) / totalLength
    return { point, ratio }
  })
}

function pointAtRatio(pathWithRatios: { point: Coordinates; ratio: number }[], ratio: number): Coordinates {
  for (let i = 1; i < pathWithRatios.length; i++) {
    const prev = pathWithRatios[i - 1]
    const curr = pathWithRatios[i]
    if (ratio <= curr.ratio) {
      const segmentSpan = curr.ratio - prev.ratio
      const localT = segmentSpan === 0 ? 0 : (ratio - prev.ratio) / segmentSpan
      return {
        lat: prev.point.lat + (curr.point.lat - prev.point.lat) * localT,
        lng: prev.point.lng + (curr.point.lng - prev.point.lng) * localT,
      }
    }
  }
  return pathWithRatios[pathWithRatios.length - 1].point
}

export default function RouteMap({ origin, originLabel, destination, destinationLabel, waypoints }: RouteMapProps) {
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
      const path: Coordinates[] = [origin, ...(waypoints ?? []), destination]
      const pathLatLngs = path.map((p) => L.latLng(p.lat, p.lng))
      const pathWithRatios = buildPathWithCumulativeRatios(path)

      map = L.map(containerRef.current, {
        preferCanvas: true,
        scrollWheelZoom: false,
      })
      map.fitBounds(L.latLngBounds(pathLatLngs), { padding: [40, 40] })

      L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>',
        maxZoom: 18,
      }).addTo(map)

      L.polyline(pathLatLngs, {
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

        const { lat, lng } = pointAtRatio(pathWithRatios, eased)
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
  }, [origin, originLabel, destination, destinationLabel, waypoints, replayToken])

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
