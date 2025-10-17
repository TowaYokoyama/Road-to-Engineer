"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

interface TechStack {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  version: string | null;
  tags: string[] | null;
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert";
  experienceMonths: number;
  description: string | null;
  knowledgeNotes?: any[];
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  "すべて",
  "フロントエンド",
  "バックエンド",
  "データベース",
  "インフラ",
  "DevOps",
  "モバイル",
  "その他",
];

const PROFICIENCY_LABELS = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
  expert: "エキスパート",
};

const PROFICIENCY_COLORS = {
  beginner: "warning",
  intermediate: "primary",
  advanced: "success",
  expert: "purple",
} as const;

export default function TechStackPage() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTechStacks();
  }, []);

  async function fetchTechStacks() {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "すべて") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("q", searchQuery);
      }

      const res = await fetch(`/api/tech-stack?${params}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setTechStacks(data.techStacks || []);
    } catch (error) {
      console.error("Failed to fetch tech stacks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechStacks();
  }, [selectedCategory, searchQuery]);

  const filteredStacks = techStacks;

  const groupedByCategory = filteredStacks.reduce((acc, stack) => {
    if (!acc[stack.category]) {
      acc[stack.category] = [];
    }
    acc[stack.category].push(stack);
    return acc;
  }, {} as Record<string, TechStack[]>);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
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
        <span className="text-terminal-text">Tech Stack</span>
      </div>

      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold gradient-text">⚙️ 技術スタック</h1>
          <p className="text-terminal-muted">
            習得した技術の深掘り記録と知識の体系化
          </p>
        </div>
        <Link href="/portfolio/tech-stack/new">
          <Button variant="primary" size="lg">
            + 技術を追加
          </Button>
        </Link>
      </div>

      {/* 検索とフィルター */}
      <Card className="p-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="🔍 技術名、タグで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-3 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono"
          />
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-terminal-accent text-terminal-bg"
                    : "bg-terminal-bg border border-terminal-border text-terminal-muted hover:border-terminal-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 統計サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-accent mb-2">
            {techStacks.length}
          </div>
          <div className="text-sm text-terminal-muted">登録技術</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-success mb-2">
            {techStacks.filter((t) => t.proficiencyLevel === "advanced" || t.proficiencyLevel === "expert").length}
          </div>
          <div className="text-sm text-terminal-muted">上級以上</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-purple mb-2">
            {Object.keys(groupedByCategory).length}
          </div>
          <div className="text-sm text-terminal-muted">カテゴリ数</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-terminal-warning mb-2">
            {techStacks.reduce((sum, t) => sum + (t.knowledgeNotes?.length || 0), 0)}
          </div>
          <div className="text-sm text-terminal-muted">知識ノート</div>
        </Card>
      </div>

      {/* 技術スタック一覧 */}
      {loading ? (
        <Card className="p-12 text-center">
          <div className="text-terminal-muted">読み込み中...</div>
        </Card>
      ) : filteredStacks.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h3 className="text-xl font-bold text-terminal-text mb-2">
            技術スタックがありません
          </h3>
          <p className="text-terminal-muted mb-6">
            習得した技術を登録して、知識を体系的に管理しましょう
          </p>
          <Link href="/portfolio/tech-stack/new">
            <Button variant="primary">+ 最初の技術を追加</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByCategory).map(([category, stacks]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-accent flex items-center gap-2">
                <span className="text-3xl">
                  {category === "フロントエンド" ? "🎨" : 
                   category === "バックエンド" ? "⚡" :
                   category === "データベース" ? "🗄️" :
                   category === "インフラ" ? "☁️" :
                   category === "DevOps" ? "🔧" :
                   category === "モバイル" ? "📱" : "🔮"}
                </span>
                {category}
                <Badge variant="ghost">{stacks.length}</Badge>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stacks.map((tech) => (
                  <Link key={tech.id} href={`/portfolio/tech-stack/${tech.id}`}>
                    <Card hover className="p-6 h-full">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-terminal-text mb-1">
                              {tech.name}
                            </h3>
                            {tech.version && (
                              <div className="text-xs text-terminal-muted font-mono">
                                v{tech.version}
                              </div>
                            )}
                          </div>
                          <Badge variant={PROFICIENCY_COLORS[tech.proficiencyLevel]}>
                            {PROFICIENCY_LABELS[tech.proficiencyLevel]}
                          </Badge>
                        </div>
                        
                        {tech.description && (
                          <p className="text-sm text-terminal-muted line-clamp-2">
                            {tech.description.substring(0, 100)}...
                          </p>
                        )}
                        
                        {tech.tags && tech.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {tech.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-terminal-accent/10 text-terminal-accent"
                              >
                                {tag}
                              </span>
                            ))}
                            {tech.tags.length > 3 && (
                              <span className="text-xs px-2 py-1 text-terminal-muted">
                                +{tech.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-terminal-muted pt-2 border-t border-terminal-border">
                          <span>経験: {tech.experienceMonths}ヶ月</span>
                          <span>詳細を見る →</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ヒント */}
      <Card className="p-8 bg-terminal-accent/5 border-terminal-accent/20">
        <h3 className="text-2xl font-bold text-terminal-accent mb-4 flex items-center gap-2">
          <span>💡</span>
          技術スタック管理のコツ
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">登録すべき技術</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>プログラミング言語・フレームワーク</li>
              <li>ライブラリ・パッケージ</li>
              <li>データベース・ストレージ</li>
              <li>インフラ・クラウドサービス</li>
              <li>開発ツール・CI/CD</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-terminal-text">知識ノートの活用</h4>
            <ul className="text-sm text-terminal-muted space-y-1 list-disc list-inside">
              <li>基本概念の理解を記録</li>
              <li>ベストプラクティスをまとめる</li>
              <li>つまずいたポイントを記録</li>
              <li>アンチパターンを覚える</li>
              <li>実装例を保存</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

