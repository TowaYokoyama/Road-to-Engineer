import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Question";
import { Review } from "./Review";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: "CASCADE" })
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

  @OneToMany(() => Review, (review) => review.answer, { cascade: true, onDelete: "CASCADE" })
  reviews!: Review[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
