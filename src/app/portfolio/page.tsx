import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

export default function PortfolioPage() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold gradient-text">💼 ポートフォリオ</h1>
        <p className="text-xl text-terminal-muted max-w-3xl">
          技術スタックの選定理由、学習の記録、GitHubプロジェクトを一元管理
        </p>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/portfolio/tech-notes/new" className="block animate-slide-up">
          <Card hover className="p-8 h-full bg-gradient-to-br from-terminal-accent/10 to-terminal-purple/10 border-terminal-accent/30">
            <div className="space-y-4">
              <div className="text-5xl">⚙️</div>
              <h2 className="text-2xl font-bold text-terminal-accent">技術メモを作成</h2>
              <p className="text-terminal-muted">
                使用した技術の選定理由、学んだこと、改善点を記録しましょう
              </p>
              <Button variant="primary" className="mt-4">
                + 新規作成
              </Button>
            </div>
          </Card>
        </Link>

        <Link href="/portfolio/github" className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card hover className="p-8 h-full bg-gradient-to-br from-terminal-success/10 to-terminal-accent/10 border-terminal-success/30">
            <div className="space-y-4">
              <div className="text-5xl">🐙</div>
              <h2 className="text-2xl font-bold text-terminal-success">GitHub連携</h2>
              <p className="text-terminal-muted">
                リポジトリ情報を取得して、プロジェクト実績を可視化しましょう
              </p>
              <Button variant="secondary" className="mt-4">
                連携する
              </Button>
            </div>
          </Card>
        </Link>
      </div>

      {/* セクション一覧 */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-terminal-accent">📚 セクション</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 技術スタック */}
          <Link href="/portfolio/tech-notes" className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card hover className="p-6 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">⚙️</div>
                  <Badge variant="warning">0件</Badge>
                </div>
                <h3 className="text-xl font-bold text-terminal-text">技術スタック</h3>
                <p className="text-sm text-terminal-muted">
                  使用技術の選定理由と学習記録
                </p>
                <div className="pt-2">
                  <span className="text-xs text-terminal-accent">詳細を見る →</span>
                </div>
              </div>
            </Card>
          </Link>

          {/* GitHubプロジェクト */}
          <Link href="/portfolio/projects" className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card hover className="p-6 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">🚀</div>
                  <Badge variant="success">0件</Badge>
                </div>
                <h3 className="text-xl font-bold text-terminal-text">プロジェクト</h3>
                <p className="text-sm text-terminal-muted">
                  GitHubリポジトリとプロジェクト実績
                </p>
                <div className="pt-2">
                  <span className="text-xs text-terminal-accent">詳細を見る →</span>
                </div>
              </div>
            </Card>
          </Link>

          {/* 言語統計 */}
          <Link href="/portfolio/stats" className="block animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Card hover className="p-6 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">📊</div>
                  <Badge variant="purple">統計</Badge>
                </div>
                <h3 className="text-xl font-bold text-terminal-text">技術統計</h3>
                <p className="text-sm text-terminal-muted">
                  使用言語の統計と活動記録
                </p>
                <div className="pt-2">
                  <span className="text-xs text-terminal-accent">詳細を見る →</span>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* 技術スタックサンプル */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-terminal-accent">🔧 最近の技術メモ</h2>
          <Link href="/portfolio/tech-notes">
            <Button variant="ghost" size="sm">
              すべて見る →
            </Button>
          </Link>
        </div>

        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-terminal-text mb-2">まだ技術メモがありません</h3>
          <p className="text-terminal-muted mb-6">
            使用した技術の選定理由や学んだことを記録して、ポートフォリオを充実させましょう
          </p>
          <Link href="/portfolio/tech-notes/new">
            <Button variant="primary">
              + 最初の技術メモを作成
            </Button>
          </Link>
        </Card>
      </div>

      {/* GitHubセクション */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-terminal-success">🐙 GitHub プロジェクト</h2>
          <Link href="/portfolio/github">
            <Button variant="ghost" size="sm">
              連携設定 →
            </Button>
          </Link>
        </div>

        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🐙</div>
          <h3 className="text-xl font-bold text-terminal-text mb-2">GitHubと連携していません</h3>
          <p className="text-terminal-muted mb-6">
            GitHubアカウントと連携すると、リポジトリ情報や言語統計を自動で取得・表示できます
          </p>
          <Link href="/portfolio/github">
            <Button variant="primary">
              GitHubと連携する
            </Button>
          </Link>
        </Card>
      </div>

      {/* ヒント */}
      <Card className="p-8 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="text-2xl font-bold text-terminal-accent mb-4 flex items-center gap-2">
          <span>💡</span>
          ポートフォリオを充実させるヒント
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">技術メモの書き方</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>なぜその技術を選んだのか</li>
              <li>他の選択肢との比較</li>
              <li>実装を通じて学んだこと</li>
              <li>つまずいたポイントと解決方法</li>
              <li>今後の改善案</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">GitHub連携のメリット</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>リポジトリ情報の自動取得</li>
              <li>使用言語の統計表示</li>
              <li>プロジェクト実績の可視化</li>
              <li>コントリビューション記録</li>
              <li>技術メモとの紐付け</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-accent mb-2">0</div>
          <div className="text-sm text-terminal-muted">技術メモ</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-success mb-2">0</div>
          <div className="text-sm text-terminal-muted">連携リポジトリ</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-purple mb-2">0</div>
          <div className="text-sm text-terminal-muted">使用技術</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-warning mb-2">0</div>
          <div className="text-sm text-terminal-muted">総スター数</div>
        </Card>
      </div>
    </div>
  );
}
