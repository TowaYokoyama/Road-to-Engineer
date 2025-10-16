import "reflect-metadata";
import { DataSource } from "typeorm";
import { Question } from "@/entities/Question";
import { Answer } from "@/entities/Answer";
import { Review } from "@/entities/Review";
import { TechNote } from "@/entities/TechNote";
import { GithubRepo } from "@/entities/GithubRepo";

const isProd = process.env.NODE_ENV === "production";

const entities = [Question, Answer, Review, TechNote, GithubRepo];

// Avoid creating multiple DataSource instances in dev HMR
const globalForDataSource = globalThis as unknown as { orm?: DataSource };

export const AppDataSource =
  globalForDataSource.orm ??
  new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: isProd ? { rejectUnauthorized: false } : false,
    synchronize: true, // 本番環境ではfalseにする
    logging: false,
    entities,
  });

if (!globalForDataSource.orm) {
  globalForDataSource.orm = AppDataSource;
}

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
