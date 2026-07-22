import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'

// GitHub Pagesは公開されたアーティファクトのルートを /roadside-station/ の
// URLプレフィックスとして自動的に解決するため、prerender出力（basenameが
// 物理パスに含まれる）をビルドのルート直下に展開し直す必要がある。
const clientDir = join(process.cwd(), 'build/client')
const nestedDir = join(clientDir, 'roadside-station')

if (existsSync(nestedDir)) {
  const rootFallback = join(clientDir, 'index.html')
  if (existsSync(rootFallback)) rmSync(rootFallback) // ssr:false のSPA fallback。全ページprerender済みのため不要

  for (const entry of readdirSync(nestedDir)) {
    renameSync(join(nestedDir, entry), join(clientDir, entry))
  }
  rmSync(nestedDir, { recursive: true })
}
