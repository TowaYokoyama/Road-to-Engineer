import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TechKnowledge } from "./TechKnowledge";

@Entity()
export class TechStack {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 基本情報
  @Column()
  name!: string; // Next.js, Redis, PostgreSQL

  @Column()
  category!: string; // フロントエンド、バックエンド、データベース、インフラ

  @Column({ nullable: true })
  subcategory!: string | null; // フレームワーク、ライブラリ、ツール

  @Column({ nullable: true })
  version!: string | null; // 14.2.0

  @Column("simple-array", { nullable: true })
  tags!: string[] | null; // ["React", "SSR", "フルスタック"]

  // 習熟度
  @Column({ type: "enum", enum: ["beginner", "intermediate", "advanced", "expert"], default: "beginner" })
  proficiencyLevel!: "beginner" | "intermediate" | "advanced" | "expert";

  @Column({ type: "int", default: 0 })
  experienceMonths!: number; // 実務経験月数

  // 公式情報
  @Column({ nullable: true })
  officialWebsite!: string | null;

  @Column({ nullable: true })
  documentationUrl!: string | null;

  @Column({ nullable: true })
  githubUrl!: string | null;

  @Column("text", { nullable: true })
  description!: string | null; // 技術の概要（Markdown）

  // プロジェクトでの使用情報
  @Column("text", { nullable: true })
  usageContext!: string | null; // どのプロジェクトで使ったか

  @Column("text", { nullable: true })
  reasonForChoice!: string | null; // 選定理由

  @Column("text", { nullable: true })
  alternatives!: string | null; // 他の選択肢との比較

  // 学習記録との関連
  @OneToMany(() => TechKnowledge, (knowledge) => knowledge.techStack, { cascade: true })
  knowledgeNotes!: TechKnowledge[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

