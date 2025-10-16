"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  background: "rgba(10, 14, 26, 0.8)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "1rem",
                  fontSize: "0.875rem",
                  fontFamily: "'JetBrains Mono', 'Consolas', monospace",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="px-2 py-1 rounded bg-terminal-border/50 text-terminal-accent font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-terminal-accent mt-8 mb-4 flex items-center gap-2">
              <span className="text-2xl">▶</span>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-terminal-success mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-terminal-purple mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-terminal-text leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-terminal-text">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 ml-4 mb-4 text-terminal-text">
              {children}
            </ol>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-terminal-accent hover:text-terminal-success underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-terminal-accent pl-4 py-2 my-4 bg-terminal-accent/5 italic text-terminal-muted">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

