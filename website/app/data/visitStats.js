// このファイルは data/stations.json から自動生成されています。直接編集せず、
// data/stations.json を編集してから `node scripts/generate-site-data.mjs` を実行してください。

export const visitStats = {
  "totalVisited": 1,
  "totalStations": 189,
  "prefectures": [
    {
      "key": "ibaraki",
      "name": "茨城県",
      "visited": 0,
      "total": 16
    },
    {
      "key": "tochigi",
      "name": "栃木県",
      "visited": 0,
      "total": 25
    },
    {
      "key": "gunma",
      "name": "群馬県",
      "visited": 0,
      "total": 33
    },
    {
      "key": "saitama",
      "name": "埼玉県",
      "visited": 1,
      "total": 21,
      "highlighted": true
    },
    {
      "key": "chiba",
      "name": "千葉県",
      "visited": 0,
      "total": 30
    },
    {
      "key": "tokyo",
      "name": "東京都",
      "visited": 0,
      "total": 1
    },
    {
      "key": "kanagawa",
      "name": "神奈川県",
      "visited": 0,
      "total": 5
    },
    {
      "key": "yamanashi",
      "name": "山梨県",
      "visited": 0,
      "total": 22
    },
    {
      "key": "nagano",
      "name": "長野県",
      "visited": 0,
      "total": 36
    }
  ]
}

// hand-illustrated Kanto+甲信 silhouette: organic blobs placed at approximate geographic spots
export const prefectureMap = [
  {
    "key": "nagano",
    "name": "長野",
    "top": 2,
    "left": 0,
    "w": 24,
    "h": 34,
    "rotate": -3,
    "visited": false
  },
  {
    "key": "gunma",
    "name": "群馬",
    "top": 4,
    "left": 24,
    "w": 25,
    "h": 30,
    "rotate": -3,
    "visited": false
  },
  {
    "key": "tochigi",
    "name": "栃木",
    "top": 2,
    "left": 51,
    "w": 22,
    "h": 30,
    "rotate": 2,
    "visited": false
  },
  {
    "key": "ibaraki",
    "name": "茨城",
    "top": 5,
    "left": 73,
    "w": 23,
    "h": 46,
    "rotate": -2,
    "visited": false
  },
  {
    "key": "yamanashi",
    "name": "山梨",
    "top": 40,
    "left": 2,
    "w": 22,
    "h": 26,
    "rotate": 4,
    "visited": false
  },
  {
    "key": "saitama",
    "name": "埼玉",
    "top": 36,
    "left": 28,
    "w": 28,
    "h": 22,
    "rotate": 2,
    "visited": true
  },
  {
    "key": "tokyo",
    "name": "東京",
    "top": 60,
    "left": 47,
    "w": 13,
    "h": 15,
    "rotate": -4,
    "visited": false
  },
  {
    "key": "kanagawa",
    "name": "神奈川",
    "top": 60,
    "left": 25,
    "w": 23,
    "h": 28,
    "rotate": 3,
    "visited": false
  },
  {
    "key": "chiba",
    "name": "千葉",
    "top": 46,
    "left": 61,
    "w": 33,
    "h": 44,
    "rotate": -2,
    "visited": false
  }
]
