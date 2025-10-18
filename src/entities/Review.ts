import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Answer } from "./Answer";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => require("./Answer").Answer, (answer: any) => answer.reviews, { onDelete: "CASCADE" })
  answer!: Answer;

  @Column({ type: "int", nullable: true })
  selfEvaluation!: number | null; // 1-5

  @Column("text", { nullable: true })
  improvements!: string | null;

  @Column("text", { nullable: true })
  learnings!: string | null;

  @Column("text", { nullable: true })
  idealAnswer!: string | null;

  @Column({ type: "date", nullable: true })
  nextReviewDate!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
