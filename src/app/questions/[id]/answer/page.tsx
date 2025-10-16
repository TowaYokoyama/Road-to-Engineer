"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

import Badge from "@/components/Badge";
import Link from "next/link";
import { Select, Textarea } from "@/components/Input";

const PROGRAMMING_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "go",
  "rust",
  "ruby",
  "php",
  "sql",
  "other",
];

export default function AnswerPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(null);
  const [form, setForm] = useState({
    content: "",
    codeSnippet: "",
    language: "javascript",
    keyPoints: "",
    status: "draft" as "draft" | "completed",
  });

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const res = await fetch(`${base}/api/questions/${questionId}`);
        if (!res.ok) throw new Error("Failed to load question");
        const data = await res.json();
        setQuestion(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchQuestion();
  }, [questionId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create answer");
      const created = await res.json();
      router.push(`/questions/${questionId}`);
    } catch (err: any) {
      setError(err.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <p className="text-terminal-muted">問題を読み込んでいます...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* ナビゲーション */}
      <div className="flex items-center gap-2 text-sm text-terminal-muted font-mono">
        <Link href="/" className="hover:text-terminal-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/questions" className="hover:text-terminal-accent transition-colors">
          Questions
        </Link>
        <span>/</span>
        <Link href={`/questions/${questionId}`} className="hover:text-terminal-accent transition-colors">
          {question.title}
        </Link>
        <span>/</span>
        <span className="text-terminal-text">回答</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">💡 回答を記録</h1>
        <Card className="p-4 bg-terminal-accent/5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="purple">問題</Badge>
              <span className="text-terminal-text font-bold">{question.title}</span>
            </div>
            <p className="text-sm text-terminal-muted">
              この問題に対するあなたの回答を記録しましょう。コードと説明の両方を残すことで、後で見返すときに役立ちます。
            </p>
          </div>
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

        {/* アプローチと考え方 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-success to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-success">📝 アプローチと考え方</h2>
          </div>
          <Textarea
            label="回答の説明 (Markdown対応) *"
            placeholder={`どのようにこの問題を解いたか説明してください。

例:
## アプローチ
この問題は二分探索を使って解きました。

## 時間計算量
- 時間: O(log n)
- 空間: O(1)

## 考察
最初は線形探索を考えましたが、配列がソート済みなので二分探索が最適だと判断しました。
`}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={10}
            required
          />
        </Card>

        {/* コードスニペット */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-purple rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-accent">⌨️ コード実装</h2>
          </div>

          <Select
            label="プログラミング言語 *"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            options={PROGRAMMING_LANGUAGES.map((lang) => ({
              value: lang,
              label: lang.toUpperCase(),
            }))}
          />

          <Textarea
            label="コードスニペット *"
            placeholder={`実装したコードを貼り付けてください。

例:
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}
`}
            value={form.codeSnippet}
            onChange={(e) => setForm({ ...form, codeSnippet: e.target.value })}
            rows={15}
            required
            className="font-mono text-sm"
          />
        </Card>

        {/* 工夫したポイント */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-purple to-terminal-pink rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-purple">💎 工夫したポイント</h2>
          </div>
          <Textarea
            label="重要なポイント (Markdown対応)"
            placeholder={`工夫したポイントや気をつけたことを記録してください。

例:
- エッジケース（空配列、要素が1つ）の処理
- オーバーフローを避けるため mid = left + (right - left) / 2 を使用
- 境界条件を慎重にチェック
`}
            value={form.keyPoints}
            onChange={(e) => setForm({ ...form, keyPoints: e.target.value })}
            rows={8}
          />
        </Card>

        {/* ステータス */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-terminal-accent">ステータス</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={form.status === "draft"}
                onChange={(e) => setForm({ ...form, status: "draft" })}
                className="w-4 h-4"
              />
              <span className="text-terminal-text">下書き - 後で編集する</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="completed"
                checked={form.status === "completed"}
                onChange={(e) => setForm({ ...form, status: "completed" })}
                className="w-4 h-4"
              />
              <span className="text-terminal-text">完了 - 回答を確定する</span>
            </label>
          </div>
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              回答は後から編集・削除できます
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
                {loading ? "保存中..." : "回答を保存"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* ヘルプ */}
      <Card className="p-6 bg-terminal-success/5 border-terminal-success/20">
        <h3 className="font-bold text-terminal-success mb-3 flex items-center gap-2">
          <span>💡</span>
          Tips
        </h3>
        <ul className="text-sm text-terminal-muted space-y-2 list-disc list-inside">
          <li>アプローチと考え方を詳しく書くと、後で見返したときに理解しやすくなります</li>
          <li>時間計算量と空間計算量を記録しておくと、面接での説明に役立ちます</li>
          <li>エッジケースや気をつけたポイントを記録しておきましょう</li>
          <li>下書きとして保存して、後で完成させることもできます</li>
        </ul>
      </Card>
    </div>
  );
}

