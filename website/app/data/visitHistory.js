const overallTotal = 189

const prefTotals = {
  茨城県: 16,
  栃木県: 25,
  群馬県: 33,
  埼玉県: 21,
  千葉県: 30,
  東京都: 1,
  神奈川県: 5,
  山梨県: 22,
  長野県: 36,
}

const rawVisits = [
  { overallNo: 1, pref: '埼玉県', prefNo: 1, name: '道の駅 川口・あんぎょう', address: '埼玉県川口市安行領家844-2', date: '2026年7月18日', transport: '電車+徒歩', transportIcon: '🚃', recommend: '名物「樹里安アイス」は安行寒桜・山椒・柚子の3種類。約400年の歴史を持つ植木の里ならではの園芸売店も見どころ。' },
]

export const visitHistory = rawVisits.map((v) => ({
  ...v,
  overallTotal,
  prefTotal: prefTotals[v.pref] ?? '?',
}))
