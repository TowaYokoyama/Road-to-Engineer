"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";

const KNOWLEDGE_TYPES = [
  { 
    value: "concept", 
    label: "🧠 コンセプト", 
    description: "基本概念や仕組みの理解を記録",
    placeholder: `## コンセプト名

基本的な概念や仕組みについて説明してください。

### なぜ重要か
- 理由1
- 理由2

### 具体例
...
`
  },
  { 
    value: "best-practice", 
    label: "✅ ベストプラクティス", 
    description: "推奨される使い方やパターン",
    placeholder: `## ベストプラクティス

推奨される使い方や実装パターンを記録してください。

### なぜこのパターンが良いのか
...

### 適用場面
...

### 注意点
...
`
  },
  { 
    value: "anti-pattern", 
    label: "❌ アンチパターン", 
    description: "避けるべきパターンや落とし穴",
    placeholder: `## アンチパターン

避けるべきパターンや実装方法を記録してください。

### なぜ避けるべきか
...

### 代わりに何をすべきか
...
`
  },
  { 
    value: "troubleshooting", 
    label: "🔧 トラブルシューティング", 
    description: "よくある問題と解決方法",
    placeholder: `## 問題の説明

遭遇した問題を説明してください。

### エラーメッセージ
\`\`\`
エラー内容
\`\`\`

### 原因
...

### 解決方法
1. 手順1
2. 手順2

### 予防策
...
`
  },
  { 
    value: "tip", 
    label: "💡 TIPS", 
    description: "便利な小技やハック",
    placeholder: `## TIPS

便利な小技やあまり知られていないテクニックを記録してください。

### 使い方
...

### いつ使うか
...
`
  },
  { 
    value: "example", 
    label: "📝 実装例", 
    description: "実際のコード例やサンプル",
    placeholder: `## 実装例

実際に実装したコード例を記録してください。

### 目的
...

### ポイント
...
`
  },
];

export default function NewKnowledgePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [techStackName, setTechStackName] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const preselectedType = searchParams.get("type") || "concept";
  
  const [form, setForm] = useState({
    title: "",
    type: preselectedType,
    content: "",
    codeExample: "",
    codeLanguage: "typescript",
    importance: 3,
  });

  useEffect(() => {
    fetchTechStack();
  }, [params.id]);

  async function fetchTechStack() {
    try {
      const res = await fetch(`/api/tech-stack/${params.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch tech stack");
      const data = await res.json();
      setTechStackName(data.name);
    } catch (error) {
      console.error("Failed to fetch tech stack:", error);
    }
  }

  const selectedType = KNOWLEDGE_TYPES.find((t) => t.value === form.type) || KNOWLEDGE_TYPES[0];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/tech-stack/${params.id}/knowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          type: form.type,
          content: form.content,
          codeExample: form.codeExample || null,
          codeLanguage: form.codeLanguage || null,
          importance: form.importance,
        }),
      });

      if (!res.ok) throw new Error("Failed to create knowledge note");
      
      router.push(`/portfolio/tech-stack/${params.id}`);
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
        <Link href="/portfolio/tech-stack" className="hover:text-terminal-accent transition-colors">
          Tech Stack
        </Link>
        <span>/</span>
        <Link href={`/portfolio/tech-stack/${params.id}`} className="hover:text-terminal-accent transition-colors">
          {techStackName || "..."}
        </Link>
        <span>/</span>
        <span className="text-terminal-text">知識ノート追加</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">📝 知識ノートを追加</h1>
        <Card className="p-4 bg-terminal-accent/5">
          <p className="text-sm text-terminal-muted">
            {techStackName} に関する知識や学びを記録しましょう。コンセプト、ベストプラクティス、トラブルシューティングなど、様々な種類の知識を体系的に管理できます。
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

        {/* 知識の種類 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-purple rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">🏷️ 知識の種類</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {KNOWLEDGE_TYPES.map((type) => (
              <label
                key={type.value}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  form.type === type.value
                    ? "border-terminal-accent bg-terminal-accent/10"
                    : "border-terminal-border hover:border-terminal-accent/50"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={form.type === type.value}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="sr-only"
                />
                <div className="space-y-1">
                  <div className="font-bold text-terminal-text">{type.label}</div>
                  <div className="text-xs text-terminal-muted">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* 基本情報 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-success to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-success">📋 基本情報</h2>
          </div>

          <Input
            label="タイトル *"
            placeholder="例: Server Components vs Client Components"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-terminal-text">
              重要度 *
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={form.importance}
                onChange={(e) => setForm({ ...form, importance: parseInt(e.target.value) })}
                className="flex-1"
              />
              <div className="text-2xl">
                {"⭐".repeat(form.importance)}
              </div>
            </div>
            <div className="text-xs text-terminal-muted">
              1: 低 ～ 5: 非常に重要
            </div>
          </div>
        </Card>

        {/* 内容 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-purple to-terminal-pink rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-purple">📝 内容</h2>
          </div>

          <Textarea
            label="説明 *"
            placeholder={selectedType.placeholder}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={15}
            required
          />
        </Card>

        {/* コード例（オプション） */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-success rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">💻 コード例（オプション）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-terminal-text">
                言語
              </label>
              <select
                value={form.codeLanguage}
                onChange={(e) => setForm({ ...form, codeLanguage: e.target.value })}
                className="w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
                <option value="bash">Bash</option>
                <option value="yaml">YAML</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div>

          <Textarea
            label="コード"
            placeholder="実装例やコードスニペットを入力してください"
            value={form.codeExample}
            onChange={(e) => setForm({ ...form, codeExample: e.target.value })}
            rows={10}
            className="font-mono text-sm"
          />
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              Markdown記法が使えます
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
                {loading ? "保存中..." : "知識ノートを保存"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* ヒント */}
      <Card className="p-8 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="text-2xl font-bold text-terminal-accent mb-4 flex items-center gap-2">
          <span>💡</span>
          効果的な知識ノートの書き方
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">記録すべきこと</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>なぜそれが重要なのか</li>
              <li>具体的な例や実装パターン</li>
              <li>つまずいたポイントと解決方法</li>
              <li>公式ドキュメントへのリンク</li>
              <li>関連する概念やトピック</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">活用方法</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>面接前の復習資料として</li>
              <li>実装時のリファレンスとして</li>
              <li>チームメンバーへの共有</li>
              <li>ブログ記事の下書きとして</li>
              <li>定期的な振り返りの材料</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

