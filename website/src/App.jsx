import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import StationList from './pages/StationList.jsx'
import StationDetail from './pages/StationDetail.jsx'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadside-stations" element={<StationList />} />
          <Route path="/roadside-stations/:slug" element={<StationDetail />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
