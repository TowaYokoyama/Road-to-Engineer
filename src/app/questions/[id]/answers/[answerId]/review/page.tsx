"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import Link from "next/link";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;
  const answerId = params.answerId as string;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<any>(null);
  const [form, setForm] = useState({
    selfEvaluation: 3,
    improvements: "",
    learnings: "",
    idealAnswer: "",
    nextReviewDate: "",
  });

  useEffect(() => {
    async function fetchAnswer() {
      try {
        const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const res = await fetch(`${base}/api/answers/${answerId}`);
        if (!res.ok) throw new Error("Failed to load answer");
        const data = await res.json();
        setAnswer(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchAnswer();
  }, [answerId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/answers/${answerId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create review");
      router.push(`/questions/${questionId}`);
    } catch (err: any) {
      setError(err.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  if (!answer) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <p className="text-terminal-muted">回答を読み込んでいます...</p>
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
          問題
        </Link>
        <span>/</span>
        <span className="text-terminal-text">レビュー</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">🔍 セルフレビュー</h1>
        <Card className="p-4 bg-terminal-purple/5">
          <p className="text-sm text-terminal-muted">
            自分の回答を振り返り、改善点や学んだことを記録しましょう。継続的な成長に繋がります。
          </p>
        </Card>
      </div>

      {/* 回答のプレビュー */}
      <Card className="p-6 bg-terminal-border/30">
        <h3 className="text-lg font-bold text-terminal-accent mb-4">📝 あなたの回答</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="text-terminal-muted mb-2">試行回数: {answer.attemptNumber}回目</div>
            <div className="text-terminal-text line-clamp-3">{answer.content}</div>
          </div>
          {answer.codeSnippet && (
            <div>
              <div className="text-terminal-muted mb-2">コード ({answer.language})</div>
              <pre className="p-4 bg-terminal-bg rounded-lg text-xs overflow-x-auto">
                <code>{answer.codeSnippet.substring(0, 200)}...</code>
              </pre>
            </div>
          )}
        </div>
      </Card>

      {/* レビューフォーム */}
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <Card className="p-4 border-terminal-error bg-terminal-error/10">
            <div className="flex items-center gap-2 text-terminal-error">
              <span className="text-xl">⚠️</span>
              <span className="font-mono text-sm">{error}</span>
            </div>
          </Card>
        )}

        {/* 自己評価 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-warning to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-warning">⭐ 自己評価</h2>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-terminal-text">
              この回答の出来はどうでしたか？ (1-5)
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={form.selfEvaluation === rating}
                    onChange={() => setForm({ ...form, selfEvaluation: rating })}
                    className="w-4 h-4"
                  />
                  <span className="text-2xl">{"⭐".repeat(rating)}</span>
                  <span className="text-terminal-muted text-sm">{rating}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* 改善点 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-error to-terminal-warning rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-error">🔧 改善点</h2>
          </div>
          <Textarea
            label="どこが良くなかったか、何を見落としていたか"
            placeholder={`改善点を記録してください。

例:
- エッジケースの処理が不十分だった
- 時間計算量の分析が浅かった
- コードの可読性が低かった
- より効率的なアルゴリズムがあった
`}
            value={form.improvements}
            onChange={(e) => setForm({ ...form, improvements: e.target.value })}
            rows={8}
          />
        </Card>

        {/* 学び */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-success to-terminal-accent rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-success">💡 学んだこと</h2>
          </div>
          <Textarea
            label="新しく学んだこと、再確認できたこと"
            placeholder={`学びを記録してください。

例:
- 二分探索の境界条件の扱い方
- 再帰とループの使い分け
- メモリ効率を考慮したデータ構造の選択
- この問題パターンの一般的な解法
`}
            value={form.learnings}
            onChange={(e) => setForm({ ...form, learnings: e.target.value })}
            rows={8}
          />
        </Card>

        {/* 理想的な回答 */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-terminal-purple to-terminal-pink rounded-full"></div>
            <h2 className="text-2xl font-bold text-terminal-purple">🎯 理想的な回答</h2>
          </div>
          <Textarea
            label="より良いアプローチや最適解 (Markdown対応)"
            placeholder={`理想的な回答例や別解を記録してください。

例:
## 最適解のアプローチ
動的計画法を使うことで、O(n^2)からO(n)に改善できる。

## コード例
\`\`\`javascript
function optimized(arr) {
  // 最適化されたコード
}
\`\`\`
`}
            value={form.idealAnswer}
            onChange={(e) => setForm({ ...form, idealAnswer: e.target.value })}
            rows={10}
          />
        </Card>

        {/* 復習日設定 */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-terminal-accent">📅 次回復習日 (オプション)</h3>
          <Input
            type="date"
            label="いつ復習しますか？"
            value={form.nextReviewDate}
            onChange={(e) => setForm({ ...form, nextReviewDate: e.target.value })}
          />
        </Card>

        {/* 送信ボタン */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-terminal-muted">
              レビューは後から編集できます
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
                {loading ? "保存中..." : "レビューを保存"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* ヘルプ */}
      <Card className="p-6 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="font-bold text-terminal-accent mb-3 flex items-center gap-2">
          <span>💡</span>
          レビューのコツ
        </h3>
        <ul className="text-sm text-terminal-muted space-y-2 list-disc list-inside">
          <li>正直に評価することで、自分の弱点が明確になります</li>
          <li>改善点だけでなく、良かった点も記録しましょう</li>
          <li>理想的な回答を調べて記録しておくと、次に活かせます</li>
          <li>定期的に復習することで、知識が定着します</li>
        </ul>
      </Card>
    </div>
  );
}

