import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('roadside-stations', './routes/stations.tsx'),
  route('roadside-stations/:slug', './routes/station-detail.tsx'),
  route('visit-history', './routes/visit-history.tsx'),
  route('next-visits', './routes/NextVisits.tsx'),
  route('sns-links', './routes/SnsLinks.tsx'),
] satisfies RouteConfig
