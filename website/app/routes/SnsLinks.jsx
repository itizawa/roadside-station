import { Link } from 'react-router-dom'
import { snsLinks } from '../data/snsLinks.js'

export default function SnsLinks() {
  return (
    <>
      <div className="sns-links-header">
        <h1>SNSリンク</h1>
        <p className="description">道の駅めぐりの様子はSNSでも発信しています。ぜひフォローしてください。</p>
      </div>

      <div className="sns-links-list">
        {snsLinks.map((s) =>
          s.href ? (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="sns-link-card">
              <div className="sns-link-avatar">{s.initial}</div>
              <div className="sns-link-name">{s.label}</div>
              <div className="sns-link-handle">{s.handle}</div>
              <div className="sns-link-desc">{s.desc}</div>
              <div className="sns-link-cta">フォローする</div>
            </a>
          ) : (
            <div key={s.label} className="sns-link-card sns-link-card-disabled">
              <div className="sns-link-avatar">{s.initial}</div>
              <div className="sns-link-name">{s.label}</div>
              <div className="sns-link-handle">{s.handle}</div>
              <div className="sns-link-desc">{s.desc}</div>
              <div className="sns-link-cta sns-link-cta-disabled">準備中</div>
            </div>
          )
        )}
      </div>

      <div className="back-to-top-wrap">
        <Link to="/" className="back-to-top">
          <span aria-hidden="true">←</span> トップページに戻る
        </Link>
      </div>
    </>
  )
}
