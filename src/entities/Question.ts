import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Answer } from "./Answer";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  category!: string;

  @Column({ type: "enum", enum: ["easy", "medium", "hard"] })
  difficulty!: "easy" | "medium" | "hard";

  @Column("simple-array", { nullable: true })
  tags!: string[] | null;

  @Column({ nullable: true })
  source!: string | null;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true, onDelete: "CASCADE" })
  answers!: Answer[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
