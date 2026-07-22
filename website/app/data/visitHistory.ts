import { prefectures, formatJaDate, sortedVisitsWithCounters } from './stationsSource'

export const visitHistory = sortedVisitsWithCounters().map(({ station: s, overallNo, overallTotal, prefNo }) => ({
  overallNo,
  overallTotal,
  pref: prefectures[s.prefecture].name,
  prefNo,
  prefTotal: prefectures[s.prefecture].total,
  name: s.title,
  address: s.address,
  date: formatJaDate(s.visitDate),
  transport: s.transport,
  transportIcon: s.transportIcon,
  recommend: s.highlight ?? '',
}))
