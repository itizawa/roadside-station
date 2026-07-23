import { allStations } from './stationsSource'

export interface MapStation {
  slug: string
  title: string
  address: string
  visitStatus: 'visited' | 'planned'
  visitDate: string | null
  lat: number
  lng: number
}

// 緯度経度が判明していて、延期中ではない道の駅のみ地図に表示する
export const mapStations: MapStation[] = allStations
  .filter((s) => s.coordinates && s.visitStatus !== 'postponed')
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    address: s.address,
    visitStatus: s.visitStatus as 'visited' | 'planned',
    visitDate: s.visitDate,
    lat: s.coordinates!.lat,
    lng: s.coordinates!.lng,
  }))
