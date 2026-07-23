import { allStations } from './stationsSource'
import type { VisitStatus } from './stationsTypes'

export interface MapStation {
  slug: string
  title: string
  address: string
  visitStatus: VisitStatus
  visitDate: string | null
  lat: number
  lng: number
}

// 緯度経度が判明している道の駅のみ地図に表示する
export const mapStations: MapStation[] = allStations
  .filter((s) => s.coordinates)
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    address: s.address,
    visitStatus: s.visitStatus,
    visitDate: s.visitDate,
    lat: s.coordinates!.lat,
    lng: s.coordinates!.lng,
  }))
