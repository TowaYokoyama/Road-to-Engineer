"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface TechStack {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  version: string | null;
  tags: string[] | null;
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert";
  experienceMonths: number;
  officialWebsite: string | null;
  documentationUrl: string | null;
  githubUrl: string | null;
  description: string | null;
  usageContext: string | null;
  reasonForChoice: string | null;
  alternatives: string | null;
  knowledgeNotes: KnowledgeNote[];
}

interface KnowledgeNote {
  id: string;
  title: string;
  type: "concept" | "best-practice" | "anti-pattern" | "troubleshooting" | "tip" | "example";
  content: string;
  codeExample: string | null;
  codeLanguage: string | null;
  importance: number;
  createdAt: string;
}

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

const KNOWLEDGE_TYPES = {
  concept: { label: "🧠 コンセプト", color: "primary" },
  "best-practice": { label: "✅ ベストプラクティス", color: "success" },
  "anti-pattern": { label: "❌ アンチパターン", color: "error" },
  troubleshooting: { label: "🔧 トラブルシューティング", color: "warning" },
  tip: { label: "💡 TIPS", color: "purple" },
  example: { label: "📝 実装例", color: "primary" },
} as const;

type TabType = "overview" | "concept" | "best-practice" | "anti-pattern" | "troubleshooting" | "tip" | "example";

export default function TechStackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [techStack, setTechStack] = useState<TechStack | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    if (params.id) {
      fetchTechStack();
    }
  }, [params.id]);

  async function fetchTechStack() {
    try {
      const res = await fetch(`/api/tech-stack/${params.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch tech stack");
      const data = await res.json();
      setTechStack(data);
    } catch (error) {
      console.error("Failed to fetch tech stack:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-12 text-center">
          <div className="text-terminal-muted">読み込み中...</div>
        </Card>
      </div>
    );
  }

  if (!techStack) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-bold text-terminal-text mb-2">
            技術が見つかりません
          </h3>
          <Link href="/portfolio/tech-stack">
            <Button variant="primary">技術スタック一覧へ</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const knowledgeByType = techStack.knowledgeNotes.filter(
    (note) => activeTab === "overview" || note.type === activeTab
  );

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
        <span className="text-terminal-text">{techStack.name}</span>
      </div>

      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4 flex-1">
          <h1 className="text-5xl font-bold gradient-text">{techStack.name}</h1>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">{techStack.category}</Badge>
            {techStack.subcategory && (
              <Badge variant="ghost">{techStack.subcategory}</Badge>
            )}
            {techStack.version && (
              <Badge variant="ghost">v{techStack.version}</Badge>
            )}
            <Badge variant={PROFICIENCY_COLORS[techStack.proficiencyLevel]}>
              {PROFICIENCY_LABELS[techStack.proficiencyLevel]}
            </Badge>
            <Badge variant="warning">
              経験: {techStack.experienceMonths}ヶ月
            </Badge>
          </div>

          {techStack.tags && techStack.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 rounded-full bg-terminal-accent/10 text-terminal-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link href={`/portfolio/tech-stack/${techStack.id}/knowledge/new`}>
            <Button variant="primary">+ 知識ノート追加</Button>
          </Link>
        </div>
      </div>

      {/* リンク */}
      {(techStack.officialWebsite || techStack.documentationUrl || techStack.githubUrl) && (
        <Card className="p-6">
          <div className="flex flex-wrap gap-4">
            {techStack.officialWebsite && (
              <a
                href={techStack.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-terminal-accent hover:text-terminal-success transition-colors"
              >
                <span>🌐</span>
                <span className="text-sm font-mono">公式サイト</span>
              </a>
            )}
            {techStack.documentationUrl && (
              <a
                href={techStack.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-terminal-accent hover:text-terminal-success transition-colors"
              >
                <span>📖</span>
                <span className="text-sm font-mono">ドキュメント</span>
              </a>
            )}
            {techStack.githubUrl && (
              <a
                href={techStack.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-terminal-accent hover:text-terminal-success transition-colors"
              >
                <span>🐙</span>
                <span className="text-sm font-mono">GitHub</span>
              </a>
            )}
          </div>
        </Card>
      )}

      {/* タブナビゲーション */}
      <div className="border-b border-terminal-border">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-mono text-sm transition-all border-b-2 ${
              activeTab === "overview"
                ? "border-terminal-accent text-terminal-accent"
                : "border-transparent text-terminal-muted hover:text-terminal-text"
            }`}
          >
            📖 概要
          </button>
          <button
            onClick={() => setActiveTab("concept")}
            className={`px-6 py-3 font-mono text-sm transition-all border-b-2 ${
              activeTab === "concept"
                ? "border-terminal-accent text-terminal-accent"
                : "border-transparent text-terminal-muted hover:text-terminal-text"
            }`}
          >
            🧠 コンセプト ({techStack.knowledgeNotes.filter(n => n.type === "concept").length})
          </button>
          <button
            onClick={() => setActiveTab("best-practice")}
            className={`px-6 py-3 font-mono text-sm transition-all border-b-2 ${
              activeTab === "best-practice"
                ? "border-terminal-accent text-terminal-accent"
                : "border-transparent text-terminal-muted hover:text-terminal-text"
            }`}
          >
            ✅ ベストプラクティス ({techStack.knowledgeNotes.filter(n => n.type === "best-practice").length})
          </button>
          <button
            onClick={() => setActiveTab("anti-pattern")}
            className={`px-6 py-3 font-mono text-sm transition-all border-b-2 ${
              activeTab === "anti-pattern"
                ? "border-terminal-accent text-terminal-accent"
                : "border-transparent text-terminal-muted hover:text-terminal-text"
            }`}
          >
            ❌ アンチパターン ({techStack.knowledgeNotes.filter(n => n.type === "anti-pattern").length})
          </button>
          <button
            onClick={() => setActiveTab("troubleshooting")}
            className={`px-6 py-3 font-mono text-sm transition-all border-b-2 ${
              activeTab === "troubleshooting"
                ? "border-terminal-accent text-terminal-accent"
                : "border-transparent text-terminal-muted hover:text-terminal-text"
            }`}
          >
            🔧 トラブルシューティング ({techStack.knowledgeNotes.filter(n => n.type === "troubleshooting").length})
          </button>
        </div>
      </div>

      {/* タブコンテンツ */}
      {activeTab === "overview" ? (
        <div className="space-y-6">
          {techStack.description && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-terminal-accent mb-4">📝 技術説明</h2>
              <MarkdownRenderer content={techStack.description} />
            </Card>
          )}

          {techStack.usageContext && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-terminal-success mb-4">💼 使用コンテキスト</h2>
              <MarkdownRenderer content={techStack.usageContext} />
            </Card>
          )}

          {techStack.reasonForChoice && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-terminal-purple mb-4">🎯 選定理由</h2>
              <MarkdownRenderer content={techStack.reasonForChoice} />
            </Card>
          )}

          {techStack.alternatives && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-terminal-warning mb-4">⚖️ 他の選択肢との比較</h2>
              <MarkdownRenderer content={techStack.alternatives} />
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-terminal-accent mb-4">📚 知識ノート統計</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(KNOWLEDGE_TYPES).map(([type, info]) => {
                const count = techStack.knowledgeNotes.filter((n) => n.type === type).length;
                return (
                  <div
                    key={type}
                    className="p-4 rounded-lg bg-terminal-bg border border-terminal-border"
                  >
                    <div className="text-2xl font-bold text-terminal-accent mb-1">
                      {count}
                    </div>
                    <div className="text-sm text-terminal-muted">{info.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {knowledgeByType.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">{KNOWLEDGE_TYPES[activeTab].label.split(" ")[0]}</div>
              <h3 className="text-xl font-bold text-terminal-text mb-2">
                {KNOWLEDGE_TYPES[activeTab].label} がありません
              </h3>
              <p className="text-terminal-muted mb-6">
                この技術に関する知識ノートを追加しましょう
              </p>
              <Link href={`/portfolio/tech-stack/${techStack.id}/knowledge/new?type=${activeTab}`}>
                <Button variant="primary">+ 知識ノートを追加</Button>
              </Link>
            </Card>
          ) : (
            <>
              {knowledgeByType.map((note) => (
                <Card key={note.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-terminal-text mb-2">
                        {note.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant={KNOWLEDGE_TYPES[note.type].color as any}>
                          {KNOWLEDGE_TYPES[note.type].label}
                        </Badge>
                        <Badge variant="ghost">
                          重要度: {"⭐".repeat(note.importance)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <MarkdownRenderer content={note.content} />
                  </div>

                  {note.codeExample && (
                    <div className="mt-4">
                      <MarkdownRenderer
                        content={`\`\`\`${note.codeLanguage || "typescript"}\n${note.codeExample}\n\`\`\``}
                      />
                    </div>
                  )}
                  
                  <div className="text-xs text-terminal-muted pt-2 border-t border-terminal-border">
                    作成日: {new Date(note.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </Card>
              ))}
              
              <div className="text-center">
                <Link href={`/portfolio/tech-stack/${techStack.id}/knowledge/new?type=${activeTab}`}>
                  <Button variant="ghost">+ さらに追加</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

