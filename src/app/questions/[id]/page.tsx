import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import MarkdownRenderer from "@/components/MarkdownRenderer";

async function getQuestion(id: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/questions/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
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

export default async function QuestionDetail({ params }: { params: { id: string } }) {
  const data = await getQuestion(params.id);
  
  if (!data) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-terminal-text mb-2">問題が見つかりません</h1>
          <p className="text-terminal-muted mb-6">
            指定されたIDの問題は存在しないか、削除されています
          </p>
          <Link href="/questions">
            <Button variant="primary">問題一覧に戻る</Button>
          </Link>
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
        <span className="text-terminal-text">{data.title}</span>
      </div>

      {/* ヘッダー */}
      <Card className="p-8">
        <div className="space-y-6">
          {/* タイトルとアクション */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <h1 className="text-4xl font-bold text-terminal-text leading-tight">
                {data.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={getDifficultyColor(data.difficulty)} size="md">
                  {data.difficulty.toUpperCase()}
                </Badge>
                <Badge variant="purple" size="md">
                  {data.category}
                </Badge>
                {data.tags && data.tags.map((tag: string) => (
                  <Badge key={tag} variant="default" size="md">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/questions/${params.id}/edit`}>
                <Button variant="ghost" size="sm">
                  ✏️ 編集
                </Button>
              </Link>
              <Link href={`/questions/${params.id}/answer`}>
                <Button variant="primary" size="sm">
                  💡 回答を記録
                </Button>
              </Link>
            </div>
          </div>

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-terminal-muted font-mono pt-4 border-t border-terminal-border">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>作成: {new Date(data.createdAt).toLocaleDateString('ja-JP')}</span>
            </div>
            {data.updatedAt && data.updatedAt !== data.createdAt && (
              <div className="flex items-center gap-2">
                <span>🔄</span>
                <span>更新: {new Date(data.updatedAt).toLocaleDateString('ja-JP')}</span>
              </div>
            )}
            {data.source && (
              <div className="flex items-center gap-2">
                <span>🔗</span>
                <a
                  href={data.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-accent hover:underline"
                >
                  出題元を見る
                </a>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 問題文 */}
      <Card className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-terminal-accent to-terminal-purple rounded-full"></div>
          <h2 className="text-2xl font-bold text-terminal-accent">問題文</h2>
        </div>
        <MarkdownRenderer content={data.description} />
      </Card>

      {/* 回答セクション */}
      <Card className="p-8 bg-gradient-to-br from-terminal-accent/5 to-terminal-purple/5 border-terminal-accent/30">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-terminal-accent flex items-center gap-2">
            <span>💡</span>
            あなたの回答
          </h3>
          <p className="text-terminal-muted">
            この問題に対する回答を記録して、後で振り返りができるようにしましょう
          </p>
          <div className="flex gap-3">
            <Link href={`/questions/${params.id}/answer`}>
              <Button variant="primary">
                回答を記録する
              </Button>
            </Link>
            <Link href={`/questions/${params.id}/answers`}>
              <Button variant="ghost">
                過去の回答を見る (0)
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* アクションボタン */}
      <div className="flex items-center justify-between pb-8">
        <Link href="/questions">
          <Button variant="ghost">
            ← 問題一覧に戻る
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm">
            🗑️ 削除
          </Button>
        </div>
      </div>
    </div>
  );
}
