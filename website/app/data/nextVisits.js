import { prefectures, formatJaDate, upcomingStations } from './stationsSource.js'

export const nextVisits = upcomingStations().map((s) => ({
  name: s.title,
  prefecture: prefectures[s.prefecture].name,
  schedule: s.visitDate ? `${formatJaDate(s.visitDate)}予定` : '未定（延期中）',
}))
