import "./globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "TechInterview.dev - エンジニア面接対策ポートフォリオ",
  description: "技術面接の問題を管理し、回答を記録し、ポートフォリオを構築する",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="relative">
        {/* 背景グラデーション効果 */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-terminal-accent/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terminal-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        {/* ヘッダー */}
        <header className="sticky top-0 z-50 border-b border-terminal-border bg-terminal-bg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* ロゴ */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terminal-accent to-terminal-purple flex items-center justify-center font-bold text-white group-hover:shadow-lg group-hover:shadow-terminal-accent/50 transition-all duration-300">
                    &gt;_
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-terminal-accent to-terminal-purple blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
                <span className="text-lg font-bold gradient-text hidden sm:inline">
                  TechInterview.dev
                </span>
              </Link>

              {/* ナビゲーション */}
              <nav className="flex items-center gap-1">
                <Link
                  href="/questions"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-terminal-text hover:text-terminal-accent hover:bg-terminal-border/50 transition-all duration-200"
                >
                  <span className="hidden sm:inline">📝 </span>問題
                </Link>
                <Link
                  href="/portfolio"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-terminal-text hover:text-terminal-accent hover:bg-terminal-border/50 transition-all duration-200"
                >
                  <span className="hidden sm:inline">💼 </span>ポートフォリオ
                </Link>
                <div className="ml-2 px-3 py-1.5 rounded-lg border border-terminal-accent/30 bg-terminal-accent/10 text-xs font-mono text-terminal-accent">
                  v1.0.0
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* フッター */}
        <footer className="border-t border-terminal-border mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-bold text-terminal-accent mb-3">TechInterview.dev</h3>
                <p className="text-xs text-terminal-muted leading-relaxed">
                  技術面接の準備を効率化し、学習の記録を残し、ポートフォリオとして活用できるプラットフォーム
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-terminal-accent mb-3">機能</h3>
                <ul className="space-y-2 text-xs text-terminal-muted">
                  <li>• 問題管理 (CRUD)</li>
                  <li>• 回答記録 & 履歴管理</li>
                  <li>• セルフレビュー機能</li>
                  <li>• 技術スタック記録</li>
                  <li>• GitHub連携</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-terminal-accent mb-3">技術スタック</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-terminal-border text-terminal-text font-mono">Next.js 14</span>
                  <span className="px-2 py-1 text-xs rounded bg-terminal-border text-terminal-text font-mono">TypeScript</span>
                  <span className="px-2 py-1 text-xs rounded bg-terminal-border text-terminal-text font-mono">TypeORM</span>
                  <span className="px-2 py-1 text-xs rounded bg-terminal-border text-terminal-text font-mono">Tailwind</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-terminal-border text-center">
              <p className="text-xs text-terminal-muted font-mono">
                © {new Date().getFullYear()} TechInterview.dev - Built by Engineers, for Engineers 🚀
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
