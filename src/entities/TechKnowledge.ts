import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TechStack } from "./TechStack";

@Entity()
export class TechKnowledge {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => TechStack, (tech) => tech.knowledgeNotes, { onDelete: "CASCADE" })
  techStack!: TechStack;

  @Column()
  title!: string; // "Server Components vs Client Components"

  @Column({ type: "enum", enum: ["concept", "best-practice", "anti-pattern", "troubleshooting", "tip", "example"] })
  type!: "concept" | "best-practice" | "anti-pattern" | "troubleshooting" | "tip" | "example";

  @Column("text")
  content!: string; // Markdown対応

  @Column("text", { nullable: true })
  codeExample!: string | null;

  @Column({ nullable: true })
  codeLanguage!: string | null;

  @Column("simple-array", { nullable: true })
  relatedTopics!: string[] | null; // 関連トピック

  @Column("simple-json", { nullable: true })
  resources!: { title: string; url: string; type: "article" | "video" | "doc" }[] | null;

  @Column({ type: "int", default: 3 })
  importance!: number; // 1-5 重要度

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

