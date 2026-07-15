export const visitStats = {
  totalVisited: 1,
  totalStations: 121,
  prefectures: [
    { key: 'gunma', name: '群馬県', visited: 0, total: 34 },
    { key: 'tochigi', name: '栃木県', visited: 0, total: 24 },
    { key: 'ibaraki', name: '茨城県', visited: 0, total: 18 },
    { key: 'saitama', name: '埼玉県', visited: 1, total: 22, highlighted: true },
    { key: 'chiba', name: '千葉県', visited: 0, total: 15 },
    { key: 'tokyo', name: '東京都', visited: 0, total: 1 },
    { key: 'kanagawa', name: '神奈川県', visited: 0, total: 4 },
  ],
}

// hand-illustrated Kanto silhouette: organic blobs placed at approximate geographic spots
export const prefectureMap = [
  { key: 'gunma', name: '群馬', top: 4, left: 3, w: 32, h: 30, rotate: -3, visited: false },
  { key: 'tochigi', name: '栃木', top: 2, left: 37, w: 28, h: 30, rotate: 2, visited: false },
  { key: 'ibaraki', name: '茨城', top: 5, left: 66, w: 30, h: 46, rotate: -2, visited: false },
  { key: 'saitama', name: '埼玉', top: 36, left: 8, w: 36, h: 22, rotate: 2, visited: true },
  { key: 'tokyo', name: '東京', top: 60, left: 32, w: 17, h: 15, rotate: -4, visited: false },
  { key: 'kanagawa', name: '神奈川', top: 60, left: 4, w: 30, h: 28, rotate: 3, visited: false },
  { key: 'chiba', name: '千葉', top: 46, left: 50, w: 42, h: 44, rotate: -2, visited: false },
]
