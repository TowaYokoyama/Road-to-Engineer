import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

async function getQuestions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/questions`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load questions");
  return res.json();
}

function getDifficultyColor(difficulty: string): 'success' | 'warning' | 'error' {
  switch (difficulty) {
    case 'easy': return 'success';
    case 'medium': return 'warning';
    case 'hard': return 'error';
    default: return 'warning';
  }
}

export default async function QuestionsPage() {
  const data = await getQuestions();
  const items = data.questions as Array<any>;
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">📝 問題一覧</h1>
          <p className="text-terminal-muted">
            登録されている技術面接の問題 · {items.length}件
          </p>
        </div>
        <Link href="/questions/new">
          <Button variant="primary" className="whitespace-nowrap">
            + 新規問題作成
          </Button>
        </Link>
      </div>

      {/* フィルター（将来的に実装） */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <select className="px-3 py-2 rounded-lg bg-terminal-bg border border-terminal-border text-terminal-text text-sm font-mono focus:border-terminal-accent focus:outline-none">
            <option>すべてのカテゴリ</option>
            <option>アルゴリズム</option>
            <option>データベース</option>
            <option>システム設計</option>
            <option>ネットワーク</option>
          </select>
          <select className="px-3 py-2 rounded-lg bg-terminal-bg border border-terminal-border text-terminal-text text-sm font-mono focus:border-terminal-accent focus:outline-none">
            <option>すべての難易度</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            type="text"
            placeholder="キーワードで検索..."
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-terminal-bg border border-terminal-border text-terminal-text text-sm font-mono placeholder-terminal-muted focus:border-terminal-accent focus:outline-none"
          />
        </div>
      </Card>

      {/* 問題リスト */}
      <div className="grid gap-4">
        {items.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-terminal-text mb-2">まだ問題がありません</h3>
            <p className="text-terminal-muted mb-6">
              最初の問題を作成して、面接対策を始めましょう！
            </p>
            <Link href="/questions/new">
              <Button variant="primary">
                + 最初の問題を作成
              </Button>
            </Link>
          </Card>
        )}
        {items.map((q, index) => (
          <Link 
            key={q.id} 
            href={`/questions/${q.id}`}
            className="block animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Card hover className="p-6">
              <div className="space-y-4">
                {/* タイトルとメタ情報 */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-terminal-text mb-2 truncate">
                      {q.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getDifficultyColor(q.difficulty)} size="sm">
                        {q.difficulty.toUpperCase()}
                      </Badge>
                      <Badge variant="purple" size="sm">
                        {q.category}
                      </Badge>
                      {q.tags && q.tags.map((tag: string) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-terminal-muted font-mono">
                    <span>→</span>
                  </div>
                </div>

                {/* 説明プレビュー */}
                {q.description && (
                  <p className="text-sm text-terminal-muted line-clamp-2">
                    {q.description.substring(0, 150)}
                    {q.description.length > 150 ? '...' : ''}
                  </p>
                )}

                {/* フッター情報 */}
                <div className="flex items-center justify-between text-xs text-terminal-muted font-mono pt-2 border-t border-terminal-border/50">
                  <div className="flex items-center gap-4">
                    {q.source && (
                      <span className="flex items-center gap-1">
                        🔗 出題元
                      </span>
                    )}
                    <span>
                      作成: {new Date(q.createdAt).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-accent">詳細を見る →</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* ページネーション（将来的に実装） */}
      {items.length > 0 && (
        <div className="flex justify-center pt-8">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-terminal-border text-terminal-text hover:bg-terminal-border/50 transition-all duration-200 disabled:opacity-50" disabled>
              ← 前へ
            </button>
            <div className="px-4 py-2 rounded-lg bg-terminal-accent/20 border border-terminal-accent/30 text-terminal-accent font-mono">
              1
            </div>
            <button className="px-4 py-2 rounded-lg border border-terminal-border text-terminal-text hover:bg-terminal-border/50 transition-all duration-200 disabled:opacity-50" disabled>
              次へ →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
