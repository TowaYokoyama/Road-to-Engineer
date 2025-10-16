# 🚀 TechInterview.dev

**エンジニアのための面接対策ポートフォリオ**

技術面接の問題を管理し、回答を記録し、学習の軌跡をポートフォリオとして構築できるモダンなWebアプリケーション。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特徴

### 🎨 モダンなエンジニア風UI
- **ダークテーマ**: ターミナル風のダークテーマで目に優しい
- **グラデーション効果**: サイバーパンク風のグロー・グラデーション
- **スムーズなアニメーション**: フェードイン・スライドアニメーション
- **レスポンシブデザイン**: モバイルからデスクトップまで完全対応
- **JetBrains Monoフォント**: 美しいモノスペースフォント

### 📝 問題管理機能
- 問題のCRUD操作
- Markdown対応の問題文
- カテゴリ・難易度・タグによる整理
- 出題元の記録
- 検索・フィルタリング機能

### 💡 回答記録機能
- Markdown対応の回答説明
- シンタックスハイライト付きコードスニペット
- 複数プログラミング言語対応
- 工夫したポイントの記録
- 複数回答の履歴管理
- 下書き・完了ステータス

### 🔍 セルフレビュー機能
- 5段階評価システム
- 改善点の記録
- 学びポイントの抽出
- 理想的な回答例のメモ
- 復習日の設定

### 💼 ポートフォリオ機能
- 技術選定理由の記録
- 他の選択肢との比較
- 実装を通じた学び
- 改善点の管理
- GitHubリポジトリとの紐付け（準備中）

## 🛠 技術スタック

### フロントエンド
- **Next.js 14** - App Routerを使用した最新のフルスタックフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストのCSS
- **React Markdown** - Markdownレンダリング
- **React Syntax Highlighter** - シンタックスハイライト

### バックエンド
- **Next.js API Routes** - サーバーレスAPI
- **TypeORM** - 型安全なORM
- **PostgreSQL** - リレーショナルデータベース

### UI/UX
- カスタムカラーパレット（Terminal Theme）
- グラデーション・グロー効果
- スムーズなアニメーション
- カスタムスクロールバー
- モダンなカードレイアウト

## 🚀 クイックスタート

### 前提条件
- Node.js 18以上
- PostgreSQL（ローカル or Supabase）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/interview-prep-portfolio.git
cd interview-prep-portfolio

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.localを編集してデータベース接続情報を設定

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開く

### 環境変数

```env
# データベース接続
DATABASE_URL="postgresql://user:password@localhost:5432/interview_prep"

# アプリケーションURL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# GitHub連携（オプション）
GITHUB_TOKEN="your_github_token"
GITHUB_USERNAME="your_github_username"
```

## 📁 プロジェクト構造

```
interview-prep-portfolio/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # APIルート
│   │   │   └── questions/        # 問題API
│   │   ├── questions/            # 問題ページ
│   │   │   ├── [id]/            # 問題詳細
│   │   │   │   ├── answer/      # 回答作成
│   │   │   │   └── answers/     # 回答一覧
│   │   │   └── new/             # 問題作成
│   │   ├── portfolio/           # ポートフォリオ
│   │   │   └── tech-notes/      # 技術メモ
│   │   ├── layout.tsx           # ルートレイアウト
│   │   ├── page.tsx             # ホームページ
│   │   └── globals.css          # グローバルスタイル
│   ├── components/              # 共通コンポーネント
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── entities/                # TypeORMエンティティ
│   │   ├── Question.ts
│   │   ├── Answer.ts
│   │   ├── Review.ts
│   │   ├── TechNote.ts
│   │   └── GithubRepo.ts
│   └── lib/
│       └── db.ts                # データベース接続
├── tailwind.config.js           # Tailwind設定
└── package.json
```

## 🎨 UIデザイン

### カラーパレット
- **Background**: `#0a0e1a` - ダークブルー
- **Accent**: `#00d4ff` - シアン（メインアクセント）
- **Success**: `#00ff9f` - エメラルドグリーン
- **Warning**: `#ffb800` - オレンジ
- **Error**: `#ff4757` - レッド
- **Purple**: `#a855f7` - パープル
- **Pink**: `#ec4899` - ピンク

### アニメーション
- フェードイン
- スライドアップ
- グロー効果
- グラデーションシフト

## 📝 使い方

### 1. 問題を作成
1. ホームページの「問題を作成」ボタンをクリック
2. 問題タイトル、説明（Markdown）、カテゴリ、難易度、タグを入力
3. 保存して問題一覧に追加

### 2. 回答を記録
1. 問題詳細ページで「回答を記録」をクリック
2. アプローチと考え方を説明
3. コードスニペットを追加（シンタックスハイライト付き）
4. 工夫したポイントを記録
5. 下書きまたは完了として保存

### 3. セルフレビュー
1. 回答を記録した後、レビューを作成
2. 自己評価（1-5段階）
3. 改善点と学んだことを記録
4. 理想的な回答例をメモ
5. 復習日を設定（オプション）

### 4. ポートフォリオを構築
1. 使用した技術の選定理由を記録
2. 他の選択肢との比較を書く
3. 実装を通じて学んだことをまとめる
4. 改善点を洗い出す

## 🔧 開発

### スクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# 型チェック
npm run type-check
```

### データベース

TypeORMが自動的にテーブルを作成します（`synchronize: true`）。

エンティティ:
- **Question** - 問題
- **Answer** - 回答
- **Review** - レビュー
- **TechNote** - 技術メモ
- **GithubRepo** - GitHubリポジトリ

## 🌟 今後の予定

- [ ] GitHub API連携の完全実装
- [ ] 言語統計の可視化
- [ ] 検索・フィルタリング機能の強化
- [ ] エクスポート機能（PDF、Markdown）
- [ ] ダークモード/ライトモードの切り替え
- [ ] 認証機能の追加
- [ ] チーム機能
- [ ] コメント・共有機能

## 📄 ライセンス

MIT License

## 👤 作成者

Built by Engineers, for Engineers 🚀

---

**Happy Coding! 💻✨**
# Road-to-Engineer
