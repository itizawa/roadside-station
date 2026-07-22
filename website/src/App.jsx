import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import StationList from './pages/StationList.jsx'
import StationDetail from './pages/StationDetail.jsx'
import VisitHistory from './pages/VisitHistory.jsx'
import NextVisits from './pages/NextVisits.jsx'
import SnsLinks from './pages/SnsLinks.jsx'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadside-stations" element={<StationList />} />
          <Route path="/roadside-stations/:slug" element={<StationDetail />} />
          <Route path="/visit-history" element={<VisitHistory />} />
          <Route path="/next-visits" element={<NextVisits />} />
          <Route path="/sns-links" element={<SnsLinks />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
