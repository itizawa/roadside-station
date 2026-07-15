const overallTotal = 121

const prefTotals = {
  群馬県: 34,
  栃木県: 24,
  茨城県: 18,
  埼玉県: 22,
  千葉県: 15,
  東京都: 1,
  神奈川県: 4,
}

const rawVisits = [
  { overallNo: 1, pref: '埼玉県', prefNo: 1, name: '道の駅 べに花の郷おけがわ', address: '埼玉県桶川市川田谷4324-1', date: '2026年7月4日', transport: '車', transportIcon: '🚗', recommend: 'べにばな畑を眺めながら食べる紅花ソフトクリームが名物。地元野菜の直売もの品揃えが豊富。' },
  { overallNo: 2, pref: '埼玉県', prefNo: 2, name: '道の駅 果樹公園あしがくぼ', address: '埼玉県秩父郡横瀬町', date: '2026年6月14日', transport: '車', transportIcon: '🚗', recommend: '季節の果物狩りとセットで楽しめる。武甲山を望む景色が気持ちいい。' },
  { overallNo: 3, pref: '埼玉県', prefNo: 3, name: '道の駅 庄和', address: '埼玉県春日部市西親野井358-2', date: '2026年5月2日', transport: '電車+徒歩', transportIcon: '🚃', recommend: '最寄駅から徒歩圏内で行ける貴重な道の駅。地元食材を使ったお惣菜が美味しい。' },
  { overallNo: 4, pref: '埼玉県', prefNo: 4, name: '道の駅 はにゅう', address: '埼玉県羽生市上新郷7066', date: '2026年4月19日', transport: '車', transportIcon: '🚗', recommend: '全国郷土料理百選の「いがまんじゅう」が名物。利根川沿いの景色も良い。' },
  { overallNo: 5, pref: '埼玉県', prefNo: 5, name: '道の駅 童謡のふるさとおおとね', address: '埼玉県北埼玉郡大利根町', date: '2026年3月8日', transport: '車', transportIcon: '🚗', recommend: '童謡「みかんの花咲く丘」ゆかりの地。地元産の枝豆スイーツが人気。' },
  { overallNo: 6, pref: '群馬県', prefNo: 1, name: '道の駅 ららん藤岡', address: '群馬県藤岡市中1131-8', date: '2026年2月14日', transport: '車', transportIcon: '🚗', recommend: '観覧車のあるミニ遊園地が併設。地元食材のビーフシチューが美味しい。' },
  { overallNo: 7, pref: '栃木県', prefNo: 1, name: '道の駅 みぶ', address: '栃木県下都賀郡壬生町国谷1273-1', date: '2026年1月18日', transport: '車', transportIcon: '🚗', recommend: 'とちおとめソフトクリームが絶品。壬生町おもちゃ博物館も隣接。' },
  { overallNo: 8, pref: '茨城県', prefNo: 1, name: '道の駅 常陸大宮～かわプラザ～', address: '茨城県常陸大宮市岩崎717-1', date: '2025年12月6日', transport: '車', transportIcon: '🚗', recommend: '久慈川沿いの清流を眺めながら、瑞穂牛メンチカツを堪能。' },
]

export const visitHistory = rawVisits.map((v) => ({
  ...v,
  overallTotal,
  prefTotal: prefTotals[v.pref] ?? '?',
}))
