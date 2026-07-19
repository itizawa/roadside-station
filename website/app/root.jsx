import { Meta, Links, Outlet, Scripts, ScrollRestoration } from 'react-router'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/style.css'

export function meta() {
  return [
    { title: '道の駅めぐり日記' },
    { name: 'description', content: '関東7県の道の駅を、車と徒歩でのんびり巡る記録' },
  ]
}

export function links() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Yomogi&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap',
    },
  ]
}

export function Layout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/roadside-station/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
