# roadside-station

関東の道の駅を「徒歩」で巡り、YouTube・ブログ/noteで発信するプロジェクトの台本・リサーチ置き場。

## コンセプト

- 対象：関東在住で車を持っていない人
- 切り口：最寄り駅から道の駅までの徒歩ルートをGoProで撮影して紹介。あわせてグルメ・特産品・地域の取り組みも紹介する
- 頻度：週1回、道の駅を訪問
- 媒体の役割分担
  - YouTube動画：現地の雰囲気・徒歩ルートの体験
  - ブログ/note：アクセス・営業時間・商品リストなど詳細情報

コンセプトの検討経緯・ターゲット分析・拡散チャネルの詳細は [docs/concept.md](docs/concept.md) を参照。
サムネイル・タイトルの参考事例分析は [docs/thumbnail-title-reference.md](docs/thumbnail-title-reference.md) を参照。

## 道の駅の選定基準

- 最寄り駅から徒歩90分以内を目安にする（バス併用ルートがある場合も歓迎）
- 徒歩ルートに見どころ（自然・商店街・史跡など）があると尚良い

## ディレクトリ構成

```
stations/               # 道の駅ごとのフォルダ置き場
└── YYYY-MM-DD_道の駅名/
    ├── research.md        # 道の駅の基本情報・特産品・営業時間・アクセス比較
    ├── route.md            # 最寄り駅からの徒歩ルート・見どころ・撮影ポイント
    ├── script.md            # YouTube台本
    └── publish-notes.md    # 公開後の振り返り・記事化メモ・SNS文言
_template/              # 新しい回を始めるときにコピーするテンプレート
website/                # 記録閲覧用のWebサイト
```

### Webサイトの起動

初めて動かす人向けの詳しい手順は [起動方法.md](起動方法.md) を参照。

ルートディレクトリで以下を実行すれば、`website/` に `cd` せずに操作できる。

```
pnpm install:website  # 初回のみ
pnpm dev              # 開発サーバー起動
pnpm build            # ビルド
pnpm preview          # ビルド結果のプレビュー
```

新しい回を始めるときは `stations/` の下に `YYYY-MM-DD_道の駅名` のフォルダを作り、`_template/` の中身をコピーして使う。

## 進行フロー

1. 訪問する道の駅を選定し、`stations/` にフォルダを作成
2. `research.md` を埋める（アクセス・特産品・営業時間などの下調べ）
   - 1〜2はClaude Codeのスキル `/research-station [道の駅名] [訪問日]` で自動化できる
3. `route.md` を埋める（徒歩ルートの詳細・撮影ポイント）
4. `script.md` で台本を作成
5. 訪問・撮影
6. 動画編集・公開
7. `publish-notes.md` に振り返りとブログ/note用のメモを残す
