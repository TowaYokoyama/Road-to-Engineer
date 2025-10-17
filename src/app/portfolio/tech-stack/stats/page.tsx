"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

interface TechStack {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert";
  experienceMonths: number;
  knowledgeNotes?: any[];
}

const PROFICIENCY_LABELS = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
  expert: "エキスパート",
};

export default function TechStackStatsPage() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechStacks();
  }, []);

  async function fetchTechStacks() {
    try {
      const res = await fetch("/api/tech-stack", {
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

  const categoryCount = techStacks.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const proficiencyCount = techStacks.reduce((acc, tech) => {
    acc[tech.proficiencyLevel] = (acc[tech.proficiencyLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalKnowledge = techStacks.reduce(
    (sum, tech) => sum + (tech.knowledgeNotes?.length || 0),
    0
  );

  const topTechs = [...techStacks]
    .sort((a, b) => (b.knowledgeNotes?.length || 0) - (a.knowledgeNotes?.length || 0))
    .slice(0, 5);

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
        <Link href="/portfolio/tech-stack" className="hover:text-terminal-accent transition-colors">
          Tech Stack
        </Link>
        <span>/</span>
        <span className="text-terminal-text">統計</span>
      </div>

      {/* ヘッダー */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold gradient-text">📊 技術統計</h1>
        <p className="text-terminal-muted">
          習得した技術の統計と分析
        </p>
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <div className="text-terminal-muted">読み込み中...</div>
        </Card>
      ) : techStacks.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-terminal-text mb-2">
            まだデータがありません
          </h3>
          <p className="text-terminal-muted mb-6">
            技術スタックを登録すると、統計が表示されます
          </p>
          <Link href="/portfolio/tech-stack/new">
            <button className="px-6 py-3 bg-terminal-accent text-terminal-bg rounded-lg font-bold hover:bg-terminal-accent/80 transition-colors">
              + 技術を登録
            </button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* サマリー */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-terminal-accent mb-2">
                {techStacks.length}
              </div>
              <div className="text-sm text-terminal-muted">登録技術</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-terminal-success mb-2">
                {totalKnowledge}
              </div>
              <div className="text-sm text-terminal-muted">知識ノート</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-terminal-purple mb-2">
                {Object.keys(categoryCount).length}
              </div>
              <div className="text-sm text-terminal-muted">カテゴリ</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-terminal-warning mb-2">
                {Math.round(
                  techStacks.reduce((sum, t) => sum + t.experienceMonths, 0) /
                    techStacks.length
                )}
              </div>
              <div className="text-sm text-terminal-muted">平均経験月数</div>
            </Card>
          </div>

          {/* カテゴリ別分布 */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-terminal-accent mb-6">
              📂 カテゴリ別分布
            </h2>
            <div className="space-y-4">
              {Object.entries(categoryCount)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-terminal-text font-mono">{category}</span>
                      <span className="text-terminal-accent font-bold">{count}件</span>
                    </div>
                    <div className="w-full h-2 bg-terminal-bg rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-terminal-accent to-terminal-purple"
                        style={{
                          width: `${(count / techStacks.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* 習熟度分布 */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-terminal-success mb-6">
              🎯 習熟度分布
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["beginner", "intermediate", "advanced", "expert"] as const).map(
                (level) => (
                  <div
                    key={level}
                    className="p-4 rounded-lg bg-terminal-bg border border-terminal-border text-center"
                  >
                    <div className="text-3xl font-bold text-terminal-accent mb-2">
                      {proficiencyCount[level] || 0}
                    </div>
                    <div className="text-sm text-terminal-muted">
                      {PROFICIENCY_LABELS[level]}
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* 最も学習が進んでいる技術 */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-terminal-purple mb-6">
              🏆 知識ノート数ランキング TOP 5
            </h2>
            <div className="space-y-3">
              {topTechs.map((tech, index) => (
                <Link
                  key={tech.id}
                  href={`/portfolio/tech-stack/${tech.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg bg-terminal-bg border border-terminal-border hover:border-terminal-accent transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-terminal-muted w-8">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-terminal-text">
                          {tech.name}
                        </div>
                        <div className="text-xs text-terminal-muted">
                          {tech.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="accent">
                        {PROFICIENCY_LABELS[tech.proficiencyLevel]}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-terminal-accent">
                          {tech.knowledgeNotes?.length || 0}
                        </div>
                        <div className="text-xs text-terminal-muted">
                          知識ノート
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* 経験期間ランキング */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-terminal-warning mb-6">
              ⏱️ 実務経験ランキング TOP 5
            </h2>
            <div className="space-y-3">
              {[...techStacks]
                .sort((a, b) => b.experienceMonths - a.experienceMonths)
                .slice(0, 5)
                .map((tech, index) => (
                  <Link
                    key={tech.id}
                    href={`/portfolio/tech-stack/${tech.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg bg-terminal-bg border border-terminal-border hover:border-terminal-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-terminal-muted w-8">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-terminal-text">
                            {tech.name}
                          </div>
                          <div className="text-xs text-terminal-muted">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-terminal-warning">
                          {tech.experienceMonths}
                        </div>
                        <div className="text-xs text-terminal-muted">ヶ月</div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

