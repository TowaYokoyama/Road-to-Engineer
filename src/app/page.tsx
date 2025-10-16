import Link from "next/link";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* ヒーローセクション */}
      <div className="relative text-center space-y-6 py-12">
        <div className="inline-block px-4 py-2 rounded-full border border-terminal-accent/30 bg-terminal-accent/10 text-terminal-accent text-sm font-mono mb-4 animate-slide-up">
          ⚡ v1.0.0 - エンジニアのための面接対策プラットフォーム
        </div>
        <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-slide-up" style={{ animationDelay: '0.1s' }}>
          TechInterview.dev
        </h1>
        <p className="text-xl text-terminal-muted max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          技術面接の問題を記録し、回答を管理し、学習の軌跡をポートフォリオとして構築する
        </p>
        <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/questions/new">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-terminal-accent to-terminal-purple text-white font-medium hover:shadow-lg hover:shadow-terminal-accent/30 transition-all duration-300">
              問題を作成 →
            </button>
          </Link>
          <Link href="/questions">
            <button className="px-6 py-3 rounded-lg border border-terminal-border text-terminal-text hover:border-terminal-accent/50 hover:bg-terminal-border/50 transition-all duration-300">
              問題一覧を見る
            </button>
          </Link>
        </div>
      </div>

      {/* 機能カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/questions" className="block animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">📝</div>
              <h3 className="text-xl font-bold text-terminal-accent">問題管理</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                技術面接の問題を作成・管理。カテゴリ、難易度、タグで整理し、いつでもアクセス可能。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">CRUD</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">Markdown</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">タグ付け</span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/questions" className="block animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">💡</div>
              <h3 className="text-xl font-bold text-terminal-success">回答記録</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                問題への回答をコードと共に記録。シンタックスハイライト、履歴管理、複数回答にも対応。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">コード保存</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">履歴管理</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">複数言語対応</span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/questions" className="block animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-xl font-bold text-terminal-purple">セルフレビュー</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                自分の回答を振り返り、改善点を記録。学びを可視化し、継続的な成長をサポート。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">自己評価</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">改善点メモ</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">復習管理</span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/portfolio" className="block animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">⚙️</div>
              <h3 className="text-xl font-bold text-terminal-warning">技術スタック</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                使用技術の選定理由、学んだこと、改善点を記録し、ポートフォリオとして公開。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">技術選定理由</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">学習記録</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">改善案</span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/portfolio" className="block animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">🐙</div>
              <h3 className="text-xl font-bold text-terminal-pink">GitHub連携</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                GitHubリポジトリと連携し、プロジェクト実績や使用言語の統計を自動取得・表示。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">リポジトリ連携</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">言語統計</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">活動記録</span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/questions" className="block animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <Card hover className="p-6 h-full">
            <div className="space-y-4">
              <div className="text-4xl">🔎</div>
              <h3 className="text-xl font-bold text-terminal-text">検索 & フィルタ</h3>
              <p className="text-sm text-terminal-muted leading-relaxed">
                カテゴリ、難易度、タグで問題を効率的に検索。学習状況に応じたフィルタリング。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">キーワード検索</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">絞り込み</span>
                <span className="text-xs px-2 py-1 rounded bg-terminal-border/50 text-terminal-text">ソート</span>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* ステータスセクション */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '1s' }}>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-accent mb-2">0</div>
          <div className="text-sm text-terminal-muted">登録問題数</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-success mb-2">0</div>
          <div className="text-sm text-terminal-muted">回答数</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-purple mb-2">0</div>
          <div className="text-sm text-terminal-muted">レビュー数</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-warning mb-2">0</div>
          <div className="text-sm text-terminal-muted">技術メモ数</div>
        </Card>
      </div>

      {/* クイックスタート */}
      <Card className="p-8 animate-slide-up" style={{ animationDelay: '1.1s' }}>
        <h2 className="text-2xl font-bold text-terminal-accent mb-6">🚀 クイックスタート</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-terminal-accent/20 flex items-center justify-center text-terminal-accent font-bold">
              1
            </div>
            <h3 className="font-bold text-terminal-text">問題を登録</h3>
            <p className="text-sm text-terminal-muted">
              面接で聞かれた問題や練習したい問題を登録しましょう
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-terminal-success/20 flex items-center justify-center text-terminal-success font-bold">
              2
            </div>
            <h3 className="font-bold text-terminal-text">回答を記録</h3>
            <p className="text-sm text-terminal-muted">
              解答コードとアプローチを記録し、後で見返せるようにします
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-terminal-purple/20 flex items-center justify-center text-terminal-purple font-bold">
              3
            </div>
            <h3 className="font-bold text-terminal-text">振り返る</h3>
            <p className="text-sm text-terminal-muted">
              セルフレビューで改善点を見つけ、継続的に成長していきます
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
