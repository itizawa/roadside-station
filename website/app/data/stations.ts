import { visitedStations, plannedStations } from './stationsSource'
import type { Station } from './stationsTypes'

function buildContent(station: Station): string {
  const parts = ['## 基本情報', '', `- **所在地**: ${station.address}`]
  if (station.basicInfo?.openingDate) parts.push(`- **開業日**: ${station.basicInfo.openingDate}`)
  if (station.basicInfo?.concept) parts.push(`- **コンセプト**: ${station.basicInfo.concept}`)
  if (station.highlight) parts.push(`- **見どころ**: ${station.highlight}`)
  if (station.visitStatus === 'planned' && station.planNote) parts.push(`- **訪問予定メモ**: ${station.planNote}`)
  for (const section of station.contentSections ?? []) {
    parts.push('', `## ${section.heading}`, '')
    for (const item of section.items) parts.push(`- ${item}`)
  }
  return parts.join('\n')
}

function toDetailStation(s: Station) {
  return {
    slug: s.slug,
    title: s.title,
    date: s.visitDate as string,
    visitStatus: s.visitStatus,
    description: s.description,
    location: s.address,
    ...(s.coordinates ? { coordinates: s.coordinates } : {}),
    ...(s.accessByTrain ? { accessByTrain: s.accessByTrain } : {}),
    ...(s.accessByCar ? { accessByCar: s.accessByCar } : {}),
    ...(s.basicInfo ? { basicInfo: s.basicInfo } : {}),
    content: buildContent(s),
  }
}

// 記事として掲載するのは実際に訪問済みの道の駅のみ
export const stations = visitedStations.map(toDetailStation)

export type FeaturedStation = (typeof stations)[number]

// 詳細画面は訪問済みに加えて訪問予定の道の駅も開けるようにする
export const detailStations = [...visitedStations, ...plannedStations].map(toDetailStation)
