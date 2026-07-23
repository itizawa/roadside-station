import { prefectures, formatJaDate, upcomingStations } from './stationsSource'

export const nextVisitPlans = upcomingStations().map((s) => ({
  slug: s.slug,
  visitStatus: s.visitStatus,
  name: s.title,
  pref: prefectures[s.prefecture].name,
  when: s.visitDate ? `${formatJaDate(s.visitDate)}予定` : '未定（延期中）',
  address: s.address,
  transport: s.transport,
  transportIcon: s.transportIcon,
  note: s.planNote ?? s.highlight ?? '',
}))
