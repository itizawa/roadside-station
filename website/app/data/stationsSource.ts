// 道の駅めぐりプロジェクトのSSOT（唯一の正）である data/stations.json を読み込み、
// 各データファイル（visitStats.ts / visitHistory.ts / nextVisits.ts / nextVisitPlans.ts /
// stations.ts）が共通で使う生データと派生ロジックをここにまとめる。
import rawStationsData from '../../../data/stations.json'
import type { PrefectureInfo, Station, StationsData } from './stationsTypes'

const stationsData = rawStationsData as unknown as StationsData

export const prefectures: Record<string, PrefectureInfo> = stationsData.prefectures
export const allStations: Station[] = stationsData.stations

export const visitedStations = allStations.filter((s) => s.visitStatus === 'visited')
export const plannedStations = allStations.filter((s) => s.visitStatus === 'planned')
export const postponedStations = allStations.filter((s) => s.visitStatus === 'postponed')

export function formatJaDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00+09:00`)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// 訪問済み道の駅の並び順（新しい訪問が先頭）と、都道府県ごとの通し番号
export function sortedVisitsWithCounters() {
  const sorted = [...visitedStations].sort(
    (a, b) => new Date(b.visitDate as string).getTime() - new Date(a.visitDate as string).getTime()
  )
  const prefNoCounter: Record<string, number> = {}
  return sorted.map((station, i) => {
    const prefName = prefectures[station.prefecture].name
    prefNoCounter[prefName] = (prefNoCounter[prefName] ?? 0) + 1
    return { station, overallNo: i + 1, overallTotal: sorted.length, prefNo: prefNoCounter[prefName] }
  })
}

// 今後の訪問予定（訪問予定日が近い順）＋末尾に延期中の道の駅
export function upcomingStations(): Station[] {
  const plannedSorted = [...plannedStations].sort(
    (a, b) => new Date(a.visitDate as string).getTime() - new Date(b.visitDate as string).getTime()
  )
  return [...plannedSorted, ...postponedStations]
}
