"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";

const CATEGORIES = [
  "フロントエンド",
  "バックエンド",
  "データベース",
  "インフラ",
  "DevOps",
  "モバイル",
  "その他",
];

const SUBCATEGORIES = {
  フロントエンド: ["フレームワーク", "ライブラリ", "ビルドツール", "スタイリング"],
  バックエンド: ["フレームワーク", "ライブラリ", "ランタイム", "API"],
  データベース: ["SQL", "NoSQL", "キャッシュ", "検索エンジン"],
  インフラ: ["クラウド", "コンテナ", "サーバー", "ネットワーク"],
  DevOps: ["CI/CD", "監視", "ログ", "デプロイ"],
  モバイル: ["フレームワーク", "ネイティブ", "クロスプラットフォーム"],
  その他: ["ツール", "プロトコル", "セキュリティ"],
};

const PROFICIENCY_LEVELS = [
  { value: "beginner", label: "初級", description: "基本的な使い方を理解している" },
  { value: "intermediate", label: "中級", description: "一般的なタスクを独力で実装できる" },
  { value: "advanced", label: "上級", description: "複雑な問題を解決でき、他者を指導できる" },
  { value: "expert", label: "エキスパート", description: "深い理解があり、アーキテクチャ設計ができる" },
];

export default function NewTechStackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "フロントエンド",
    subcategory: "フレームワーク",
    version: "",
    tags: "",
    proficiencyLevel: "intermediate",
    experienceMonths: 0,
    officialWebsite: "",
    documentationUrl: "",
    githubUrl: "",
    description: "",
    usageContext: "",
    reasonForChoice: "",
    alternatives: "",
  });

  const subcategoryOptions = SUBCATEGORIES[form.category as keyof typeof SUBCATEGORIES] || [];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const res = await fetch("/api/tech-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: tagsArray.length > 0 ? tagsArray : null,
          experienceMonths: parseInt(form.experienceMonths.toString()) || 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to create tech stack");
      
      const created = await res.json();
      router.push(`/portfolio/tech-stack/${created.id}`);
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
        <span className="text-terminal-text">新規追加</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">⚙️ 技術を追加</h1>
        <Card className="p-4 bg-terminal-accent/5">
          <p className="text-sm text-terminal-muted">
            習得した技術を登録して、深掘り記録を始めましょう。各技術に対して、知識ノートを追加することで体系的に学習を管理できます。
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
            placeholder="例: Next.js, PostgreSQL, Docker, Redis"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-terminal-text">
                カテゴリ *
              </label>
              <select
                value={form.category}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  const newSubcategories = SUBCATEGORIES[newCategory as keyof typeof SUBCATEGORIES];
                  setForm({ 
                    ...form, 
                    category: newCategory,
                    subcategory: newSubcategories[0] || ""
                  });
                }}
                className="w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-terminal-text">
                サブカテゴリ
              </label>
              <select
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono"
              >
                {subcategoryOptions.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="バージョン"
              placeholder="例: 14.2.0"
              value={form.version}
              onChange={(e) => setForm({ ...form, version: e.target.value })}
            />
          </div>

          <Input
            label="タグ（カンマ区切り）"
            placeholder="例: React, SSR, TypeScript, フルスタック"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </Card>

        {/* 習熟度 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-success to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-success">📊 習熟度</h2>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-terminal-text">
              習熟レベル *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROFICIENCY_LEVELS.map((level) => (
                <label
                  key={level.value}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    form.proficiencyLevel === level.value
                      ? "border-terminal-accent bg-terminal-accent/10"
                      : "border-terminal-border hover:border-terminal-accent/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="proficiencyLevel"
                    value={level.value}
                    checked={form.proficiencyLevel === level.value}
                    onChange={(e) =>
                      setForm({ ...form, proficiencyLevel: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="space-y-1">
                    <div className="font-bold text-terminal-text">{level.label}</div>
                    <div className="text-xs text-terminal-muted">{level.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="実務経験（月数）"
            type="number"
            placeholder="例: 12"
            value={form.experienceMonths}
            onChange={(e) =>
              setForm({ ...form, experienceMonths: parseInt(e.target.value) || 0 })
            }
          />
        </Card>

        {/* 公式情報 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-purple to-terminal-pink rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-purple">🔗 リンク</h2>
          </div>

          <Input
            label="公式サイト"
            placeholder="https://nextjs.org"
            value={form.officialWebsite}
            onChange={(e) => setForm({ ...form, officialWebsite: e.target.value })}
          />

          <Input
            label="ドキュメントURL"
            placeholder="https://nextjs.org/docs"
            value={form.documentationUrl}
            onChange={(e) => setForm({ ...form, documentationUrl: e.target.value })}
          />

          <Input
            label="GitHub URL"
            placeholder="https://github.com/vercel/next.js"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          />
        </Card>

        {/* 説明 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-success rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">📝 説明・理由</h2>
          </div>

          <Textarea
            label="技術の概要"
            placeholder="この技術について簡単に説明してください（Markdown対応）"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />

          <Textarea
            label="使用コンテキスト"
            placeholder="どのプロジェクトで使用したか、どんな場面で使ったか"
            value={form.usageContext}
            onChange={(e) => setForm({ ...form, usageContext: e.target.value })}
            rows={4}
          />

          <Textarea
            label="選定理由"
            placeholder="なぜこの技術を選んだのか"
            value={form.reasonForChoice}
            onChange={(e) => setForm({ ...form, reasonForChoice: e.target.value })}
            rows={6}
          />

          <Textarea
            label="他の選択肢との比較"
            placeholder="他にどんな選択肢があったか、なぜそれを選ばなかったか"
            value={form.alternatives}
            onChange={(e) => setForm({ ...form, alternatives: e.target.value })}
            rows={6}
          />
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              登録後、知識ノートを追加できます
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
                {loading ? "保存中..." : "技術を登録"}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}

