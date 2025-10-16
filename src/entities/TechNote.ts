import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TechNote {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  technology!: string;

  @Column("text")
  reasonForChoice!: string;

  @Column("text", { nullable: true })
  alternatives!: string | null;

  @Column("text", { nullable: true })
  learnings!: string | null;

  @Column("text", { nullable: true })
  improvements!: string | null;

  @Column({ nullable: true })
  githubRepoUrl!: string | null;

  @Column({ nullable: true })
  githubRepoName!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
