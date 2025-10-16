"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Link from "next/link";
import { Input, Textarea } from "@/components/Input";

const TECH_CATEGORIES = [
  "フロントエンド",
  "バックエンド",
  "データベース",
  "インフラ",
  "DevOps",
  "モバイル",
  "その他",
];

export default function NewTechNotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    techName: "",
    category: "フロントエンド",
    reason: "",
    alternatives: "",
    learnings: "",
    improvements: "",
    githubUrl: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tech-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create tech note");
      const created = await res.json();
      router.push("/portfolio/tech-notes");
    } catch (err: any) {
      setError(err.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* ナビゲーション */}
      <div className="flex items-center gap-2 text-sm text-terminal-muted font-mono">
        <Link href="/" className="hover:text-terminal-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/portfolio" className="hover:text-terminal-accent transition-colors">
          Portfolio
        </Link>
        <span>/</span>
        <Link href="/portfolio/tech-notes" className="hover:text-terminal-accent transition-colors">
          Tech Notes
        </Link>
        <span>/</span>
        <span className="text-terminal-text">新規作成</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">⚙️ 技術メモを作成</h1>
        <Card className="p-4 bg-terminal-warning/5">
          <p className="text-sm text-terminal-muted">
            使用した技術について、選定理由、学んだこと、改善点を記録しましょう。面接やポートフォリオで技術選定の根拠を説明する際に役立ちます。
          </p>
        </Card>
      </div>

      {/* フォーム */}
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <Card className="p-4 border-terminal-error bg-terminal-error/10">
            <div className="flex items-center gap-2 text-terminal-error">
              <span className="text-xl">⚠️</span>
              <span className="font-mono text-sm">{error}</span>
            </div>
          </Card>
        )}

        {/* 基本情報 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-purple rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">📋 基本情報</h2>
          </div>

          <Input
            label="技術名 *"
            placeholder="例: Next.js, TypeORM, PostgreSQL, Docker"
            value={form.techName}
            onChange={(e) => setForm({ ...form, techName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-terminal-text">
                カテゴリ *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono"
              >
                {TECH_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="GitHubリポジトリURL"
              placeholder="https://github.com/username/repo"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>
        </Card>

        {/* 技術選定理由 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-success to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-success">🎯 技術選定理由</h2>
          </div>
          <Textarea
            label="なぜこの技術を選んだのか *"
            placeholder={`技術を選定した理由を詳しく記録してください。

例:
## 選定理由
Next.jsを選んだ理由は以下の通りです：

### パフォーマンス
- SSR/SSGによる高速な初期表示
- 自動コード分割で最適化

### 開発体験
- ファイルベースルーティング
- TypeScript完全サポート
- ホットリロード

### SEO
- サーバーサイドレンダリングでSEO最適化

### 学習目的
- 実践的なフルスタック開発を学ぶため
- 最新のReactパターンを習得
`}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            rows={12}
            required
          />
        </Card>

        {/* 他の選択肢との比較 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-purple to-terminal-pink rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-purple">⚖️ 他の選択肢との比較</h2>
          </div>
          <Textarea
            label="検討した他の技術とその比較"
            placeholder={`他にどんな選択肢があったか、なぜそれを選ばなかったかを記録してください。

例:
## 比較した技術

### Create React App (CRA)
- ❌ SSRが標準でサポートされていない
- ❌ ビルド設定のカスタマイズが煩雑
- ✅ シンプルで学習コストが低い

### Gatsby
- ✅ 静的サイト生成が得意
- ❌ 動的なコンテンツの扱いが複雑
- ❌ ビルド時間が長い

### Remix
- ✅ モダンなフレームワーク
- ❌ エコシステムがまだ小さい
- ❌ 学習リソースが少ない

## 結論
今回のプロジェクトには、SSRとSSGのハイブリッドが必要だったため、Next.jsが最適だと判断しました。
`}
            value={form.alternatives}
            onChange={(e) => setForm({ ...form, alternatives: e.target.value })}
            rows={12}
          />
        </Card>

        {/* 学んだこと */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-success rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">💡 実装を通じて学んだこと</h2>
          </div>
          <Textarea
            label="新たに得た知見やつまずいたポイント *"
            placeholder={`実装を通じて学んだことや、つまずいたポイントと解決方法を記録してください。

例:
## 学んだこと

### App Routerの理解
- Server ComponentsとClient Componentsの使い分け
- use clientディレクティブの適切な配置
- データフェッチングの新しいパターン

### つまずいたポイント
1. **Server Componentsでの状態管理**
   - 問題: useStateが使えない
   - 解決: Client Componentに切り出す

2. **キャッシュ戦略**
   - 問題: データが更新されない
   - 解決: revalidateを適切に設定

### ベストプラクティス
- ページレベルでは極力Server Components
- インタラクションが必要な部分だけClient
- 共通レイアウトは layout.tsx で管理
`}
            value={form.learnings}
            onChange={(e) => setForm({ ...form, learnings: e.target.value })}
            rows={15}
            required
          />
        </Card>

        {/* 改善点 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-warning to-terminal-error rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-warning">🔧 今後の改善点</h2>
          </div>
          <Textarea
            label="今後改善したいポイント"
            placeholder={`今後どのように改善していきたいか記録してください。

例:
## 改善予定

### アーキテクチャ
- [ ] レイヤードアーキテクチャの導入
- [ ] 依存性注入の実装
- [ ] ドメイン駆動設計の適用

### パフォーマンス
- [ ] 画像最適化の強化
- [ ] ISRの活用
- [ ] エッジファンクションの検討

### セキュリティ
- [ ] CSRFトークンの実装
- [ ] APIレート制限
- [ ] 入力値バリデーション強化

### テスト
- [ ] E2Eテストの追加（Playwright）
- [ ] ビジュアルリグレッションテスト
- [ ] パフォーマンステスト

### 運用
- [ ] エラーモニタリング（Sentry）
- [ ] アクセス解析の導入
- [ ] CI/CDパイプラインの改善
`}
            value={form.improvements}
            onChange={(e) => setForm({ ...form, improvements: e.target.value })}
            rows={12}
          />
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              技術メモは後から編集できます
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={loading}
              >
                キャンセル
              </Button>
              <Button type="submit" variant="primary" isLoading={loading}>
                {loading ? "保存中..." : "技術メモを保存"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* ヒント */}
      <Card className="p-6 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="font-bold text-terminal-accent mb-3 flex items-center gap-2">
          <span>💡</span>
          効果的な技術メモの書き方
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text text-sm">記録すべきこと</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>具体的な選定理由（抽象的な表現を避ける）</li>
              <li>定量的なメリット（パフォーマンス向上率など）</li>
              <li>つまずいたポイントと具体的な解決方法</li>
              <li>実装後の振り返りと気づき</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text text-sm">面接での活用</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>「なぜその技術を選んだのか」に明確に答えられる</li>
              <li>比較検討のプロセスを説明できる</li>
              <li>トレードオフを理解している証明になる</li>
              <li>継続的な学習姿勢をアピールできる</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

