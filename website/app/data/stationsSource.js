// 道の駅めぐりプロジェクトのSSOT（唯一の正）である data/stations.json を読み込み、
// 各データファイル（visitStats.js / visitHistory.js / nextVisits.js / nextVisitPlans.js /
// stations.js）が共通で使う生データと派生ロジックをここにまとめる。
import stationsData from '../../../data/stations.json'

export const prefectures = stationsData.prefectures
export const allStations = stationsData.stations

export const visitedStations = allStations.filter((s) => s.visitStatus === 'visited')
export const plannedStations = allStations.filter((s) => s.visitStatus === 'planned')
export const postponedStations = allStations.filter((s) => s.visitStatus === 'postponed')

export function formatJaDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00+09:00`)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// 訪問済み道の駅の並び順（新しい訪問が先頭）と、都道府県ごとの通し番号
export function sortedVisitsWithCounters() {
  const sorted = [...visitedStations].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
  const prefNoCounter = {}
  return sorted.map((s, i) => {
    const prefName = prefectures[s.prefecture].name
    prefNoCounter[prefName] = (prefNoCounter[prefName] ?? 0) + 1
    return { station: s, overallNo: i + 1, overallTotal: sorted.length, prefNo: prefNoCounter[prefName] }
  })
}

// 今後の訪問予定（訪問予定日が近い順）＋末尾に延期中の道の駅
export function upcomingStations() {
  const plannedSorted = [...plannedStations].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
  return [...plannedSorted, ...postponedStations]
}
