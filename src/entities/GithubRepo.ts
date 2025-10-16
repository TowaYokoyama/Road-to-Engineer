import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class GithubRepo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  repoName!: string;

  @Column("text", { nullable: true })
  description!: string | null;

  @Column({ default: 0 })
  stars!: number;

  @Column({ default: 0 })
  forks!: number;

  @Column({ nullable: true })
  primaryLanguage!: string | null;

  @Column("simple-json", { nullable: true })
  languages!: Record<string, number> | null;

  @Column()
  githubUrl!: string;

  @Column({ nullable: true })
  homepage!: string | null;

  @UpdateDateColumn()
  lastSyncedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
