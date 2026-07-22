import { index, route } from '@react-router/dev/routes'

export default [
  index('./routes/home.jsx'),
  route('roadside-stations', './routes/stations.jsx'),
  route('roadside-stations/:slug', './routes/station-detail.jsx'),
  route('visit-history', './routes/visit-history.jsx'),
  route('next-visits', './routes/NextVisits.jsx'),
  route('sns-links', './routes/SnsLinks.jsx'),
]
