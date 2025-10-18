import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Question } from "./Question";
import type { Review } from "./Review";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => require("./Question").Question, (question: any) => question.answers, { onDelete: "CASCADE" })
  question!: Question;

  @Column("text")
  content!: string;

  @Column("text", { nullable: true })
  codeSnippet!: string | null;

  @Column({ nullable: true })
  language!: string | null;

  @Column("text", { nullable: true })
  keyPoints!: string | null;

  @Column({ default: 1 })
  attemptNumber!: number;

  @Column({ type: "enum", enum: ["draft", "completed"], default: "draft" })
  status!: "draft" | "completed";

  @OneToMany(() => require("./Review").Review, (review: any) => review.answer, { cascade: true, onDelete: "CASCADE" })
  reviews!: Review[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
