import { prefectures, visitedStations } from './stationsSource'

// 「訪問済み道の駅」統計カードでの都道府県表示順
const STATS_ORDER = ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa', 'yamanashi', 'nagano']

interface MapLayout {
  top: number
  left: number
  w: number
  h: number
  rotate: number
}

// 手描きの関東+甲信シルエット上の配置（地理的な目安の位置）
const MAP_LAYOUT: Record<string, MapLayout> = {
  nagano: { top: 2, left: 0, w: 24, h: 34, rotate: -3 },
  gunma: { top: 4, left: 24, w: 25, h: 30, rotate: -3 },
  tochigi: { top: 2, left: 51, w: 22, h: 30, rotate: 2 },
  ibaraki: { top: 5, left: 73, w: 23, h: 46, rotate: -2 },
  yamanashi: { top: 40, left: 2, w: 22, h: 26, rotate: 4 },
  saitama: { top: 36, left: 28, w: 28, h: 22, rotate: 2 },
  tokyo: { top: 60, left: 47, w: 13, h: 15, rotate: -4 },
  kanagawa: { top: 60, left: 25, w: 23, h: 28, rotate: 3 },
  chiba: { top: 46, left: 61, w: 33, h: 44, rotate: -2 },
}

const visitedCountByPref: Record<string, number> = {}
for (const key of Object.keys(prefectures)) visitedCountByPref[key] = 0
for (const s of visitedStations) visitedCountByPref[s.prefecture] += 1

export const visitStats = {
  totalVisited: visitedStations.length,
  totalStations: Object.values(prefectures).reduce((sum, p) => sum + p.total, 0),
  prefectures: STATS_ORDER.map((key) => {
    const p = prefectures[key]
    const visited = visitedCountByPref[key]
    return { key, name: p.name, visited, total: p.total, ...(visited > 0 ? { highlighted: true } : {}) }
  }),
}

// hand-illustrated Kanto+甲信 silhouette: organic blobs placed at approximate geographic spots
export const prefectureMap = Object.keys(MAP_LAYOUT).map((key) => ({
  key,
  name: prefectures[key].name.replace(/[県都]$/, ''),
  ...MAP_LAYOUT[key],
  visited: visitedCountByPref[key] > 0,
}))
