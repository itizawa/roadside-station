import { prefectures, visitedStations } from './stationsSource'

// 「訪問済み道の駅」統計カードでの都道府県表示順
const STATS_ORDER = ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa', 'yamanashi', 'nagano']

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
