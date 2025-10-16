"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

import Badge from "@/components/Badge";
import { Input, Select, Textarea } from "@/components/Input";

const CATEGORIES = [
  "アルゴリズム",
  "データベース",
  "システム設計",
  "ネットワーク",
  "フロントエンド",
  "バックエンド",
  "その他",
];

export default function NewQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "アルゴリズム",
    difficulty: "medium",
    tags: "",
    source: "",
  });
  const [previewTags, setPreviewTags] = useState<string[]>([]);

  const handleTagsChange = (value: string) => {
    setForm({ ...form, tags: value });
    setPreviewTags(
      value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create question");
      const created = await res.json();
      router.push(`/questions/${created.id}`);
    } catch (err: any) {
      setError(err.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* ヘッダー */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">✨ 新規問題作成</h1>
        <p className="text-terminal-muted">
          技術面接の問題を登録して、あなたの学習を記録しましょう
        </p>
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

        <Card className="p-6 space-y-6">
          {/* タイトル */}
          <Input
            label="問題タイトル *"
            placeholder="例: 二分探索木の実装"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          {/* 説明 */}
          <div className="space-y-2">
            <Textarea
              label="問題文 (Markdown対応) *"
              placeholder={`問題の詳細を記述してください。Markdownが使えます。

例:
## 問題
与えられた配列から、二分探索を使って目標値を見つける関数を実装してください。

## 制約
- 配列はソート済み
- 計算量: O(log n)

## 入出力例
\`\`\`
input: [1, 2, 3, 4, 5], target: 3
output: 2
\`\`\`
`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={12}
              required
            />
            <p className="text-xs text-terminal-muted font-mono">
              💡 Tip: Markdownで整形すると見やすくなります（見出し、コードブロック、リストなど）
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-terminal-accent flex items-center gap-2">
            <span>⚙️</span>
            メタ情報
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* カテゴリ */}
            <Select
              label="カテゴリ *"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
            />

            {/* 難易度 */}
            <Select
              label="難易度 *"
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              options={[
                { value: "easy", label: "Easy - 簡単" },
                { value: "medium", label: "Medium - 中級" },
                { value: "hard", label: "Hard - 難しい" },
              ]}
            />
          </div>

          {/* タグ */}
          <div className="space-y-2">
            <Input
              label="タグ (カンマ区切り)"
              placeholder="例: 二分探索, 木構造, 再帰"
              value={form.tags}
              onChange={(e) => handleTagsChange(e.target.value)}
            />
            {previewTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {previewTags.map((tag, index) => (
                  <Badge key={index} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 出題元 */}
          <Input
            label="出題元 (URL または企業名)"
            placeholder="例: https://leetcode.com/problems/... または Google面接"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              すべての必須項目（*）を入力してください
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
                {loading ? "作成中..." : "問題を作成"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* ヘルプセクション */}
      <Card className="p-6 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="font-bold text-terminal-accent mb-3 flex items-center gap-2">
          <span>💡</span>
          Markdownの使い方
        </h3>
        <div className="text-sm text-terminal-muted space-y-2 font-mono">
          <p># 見出し1, ## 見出し2, ### 見出し3</p>
          <p>**太字**, *イタリック*, `コード`</p>
          <p>```言語名 でコードブロック（例: ```javascript）</p>
          <p>- リスト項目</p>
          <p>[リンクテキスト](URL)</p>
        </div>
      </Card>
    </div>
  );
}
