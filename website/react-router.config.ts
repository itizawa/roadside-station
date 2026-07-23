import type { Config } from '@react-router/dev/config'
import { detailStations } from './app/data/stations'

export default {
  ssr: false, // ランタイムサーバー不要。GitHub Pagesの静的配信のみで完結させる
  basename: '/roadside-station/',
  prerender: ({ getStaticPaths }) => [
    ...getStaticPaths(), // "/", "/roadside-stations", "/visit-history" は自動収集される
    ...detailStations.map((s) => `/roadside-stations/${s.slug}`),
  ],
} satisfies Config
