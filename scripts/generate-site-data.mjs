// data/stations.json（SSOT）から website/app/data/*.js を自動生成するスクリプト。
// 実行: node scripts/generate-site-data.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const dataPath = path.join(rootDir, 'data', 'stations.json')
const outDir = path.join(rootDir, 'website', 'app', 'data')

const { prefectures, stations } = JSON.parse(readFileSync(dataPath, 'utf-8'))

const BANNER =
  '// このファイルは data/stations.json から自動生成されています。直接編集せず、\n' +
  '// data/stations.json を編集してから `node scripts/generate-site-data.mjs` を実行してください。\n\n'

function formatJaDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00+09:00`)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

function write(filename, exportedName, value) {
  const body = `${BANNER}export const ${exportedName} = ${JSON.stringify(value, null, 2)}\n`
  writeFileSync(path.join(outDir, filename), body)
  console.log(`generated ${path.relative(rootDir, path.join(outDir, filename))}`)
}

// prefecture display order for the "訪問済み道の駅" stat list (matches prior hand-authored order)
const STATS_ORDER = ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa', 'yamanashi', 'nagano']

// prefecture order + static illustration layout for prefectureMap (organic blobs placed at
// approximate geographic spots on the hand-illustrated Kanto+甲信 silhouette)
const MAP_LAYOUT = {
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
const MAP_ORDER = Object.keys(MAP_LAYOUT)

const visited = stations.filter((s) => s.visitStatus === 'visited')
const planned = stations.filter((s) => s.visitStatus === 'planned')
const postponed = stations.filter((s) => s.visitStatus === 'postponed')

const visitedCountByPref = {}
for (const key of Object.keys(prefectures)) visitedCountByPref[key] = 0
for (const s of visited) visitedCountByPref[s.prefecture] = (visitedCountByPref[s.prefecture] ?? 0) + 1

// --- visitStats.js ---
const totalStations = Object.values(prefectures).reduce((sum, p) => sum + p.total, 0)
const visitStats = {
  totalVisited: visited.length,
  totalStations,
  prefectures: STATS_ORDER.map((key) => {
    const p = prefectures[key]
    const visitedCount = visitedCountByPref[key]
    const entry = { key, name: p.name, visited: visitedCount, total: p.total }
    if (visitedCount > 0) entry.highlighted = true
    return entry
  }),
}
const prefectureMap = MAP_ORDER.map((key) => {
  const layout = MAP_LAYOUT[key]
  const shortName = prefectures[key].name.replace(/[県都]$/, '')
  return { key, name: shortName, ...layout, visited: visitedCountByPref[key] > 0 }
})

// --- visitHistory.js --- (visited stations, newest first; overallNo/prefNo count down from most recent)
const visitedSorted = [...visited].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
const prefNoCounter = {}
const visitHistory = visitedSorted.map((s, i) => {
  const prefName = prefectures[s.prefecture].name
  prefNoCounter[prefName] = (prefNoCounter[prefName] ?? 0) + 1
  return {
    overallNo: i + 1,
    overallTotal: visitedSorted.length,
    pref: prefName,
    prefNo: prefNoCounter[prefName],
    prefTotal: prefectures[s.prefecture].total,
    name: s.title,
    address: s.address,
    date: formatJaDate(s.visitDate),
    transport: s.transport,
    transportIcon: s.transportIcon,
    recommend: s.highlight ?? '',
  }
})

// --- nextVisits.js / nextVisitPlans.js --- (planned, soonest first; postponed stations listed last)
const plannedSorted = [...planned].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
const upcoming = [...plannedSorted, ...postponed]

const nextVisits = upcoming.map((s) => ({
  name: s.title,
  prefecture: prefectures[s.prefecture].name,
  schedule: s.visitDate ? `${formatJaDate(s.visitDate)}予定` : '未定（延期中）',
}))

const nextVisitPlans = upcoming.map((s) => ({
  name: s.title,
  pref: prefectures[s.prefecture].name,
  when: s.visitDate ? `${formatJaDate(s.visitDate)}予定` : '未定（延期中）',
  address: s.address,
  transport: s.transport,
  transportIcon: s.transportIcon,
  note: s.planNote ?? s.highlight ?? '',
}))

// --- stations.js --- (article detail pages: published articles only, i.e. actually visited stations)
function buildContent(station) {
  const parts = []
  parts.push('## 基本情報')
  parts.push('')
  parts.push(`- **所在地**: ${station.address}`)
  if (station.basicInfo?.openingDate) parts.push(`- **開業日**: ${station.basicInfo.openingDate}`)
  if (station.basicInfo?.concept) parts.push(`- **コンセプト**: ${station.basicInfo.concept}`)
  for (const section of station.contentSections ?? []) {
    parts.push('')
    parts.push(`## ${section.heading}`)
    parts.push('')
    for (const item of section.items) parts.push(`- ${item}`)
  }
  return parts.join('\n')
}

const stationArticles = visited.map((s) => ({
  slug: s.slug,
  title: s.title,
  date: s.visitDate,
  description: s.description,
  location: s.address,
  ...(s.accessByTrain ? { accessByTrain: s.accessByTrain } : {}),
  ...(s.accessByCar ? { accessByCar: s.accessByCar } : {}),
  ...(s.basicInfo ? { basicInfo: s.basicInfo } : {}),
  content: buildContent(s),
}))

writeFileSync(
  path.join(outDir, 'visitStats.js'),
  `${BANNER}export const visitStats = ${JSON.stringify(visitStats, null, 2)}\n\n` +
    `// hand-illustrated Kanto+甲信 silhouette: organic blobs placed at approximate geographic spots\n` +
    `export const prefectureMap = ${JSON.stringify(prefectureMap, null, 2)}\n`
)
console.log('generated website/app/data/visitStats.js')

write('visitHistory.js', 'visitHistory', visitHistory)
write('nextVisits.js', 'nextVisits', nextVisits)
write('nextVisitPlans.js', 'nextVisitPlans', nextVisitPlans)
write('stations.js', 'stations', stationArticles)
