import "reflect-metadata";
import { DataSource } from "typeorm";

const isProd = process.env.NODE_ENV === "production";
const hasDb = !!process.env.DATABASE_URL;

// DATABASE_URLがない場合は警告を出す
if (!hasDb) {
  console.warn("⚠️  DATABASE_URL is not set. Database features will not work.");
}

// Avoid creating multiple DataSource instances in dev HMR
const globalForDataSource = globalThis as unknown as { orm?: DataSource | null };

export const AppDataSource: DataSource | null = hasDb
  ? (globalForDataSource.orm !== undefined
    ? globalForDataSource.orm
    : (() => {
        // エンティティを動的にインポート（DATABASE_URLがある場合のみ）
        const { GithubRepo } = require("../entities/GithubRepo");
        const { TechNote } = require("../entities/TechNote");
        const { Question } = require("../entities/Question");
        const { TechStack } = require("../entities/TechStack");
        const { Answer } = require("../entities/Answer");
        const { TechKnowledge } = require("../entities/TechKnowledge");
        const { Review } = require("../entities/Review");
        
        const entities = [GithubRepo, TechNote, Question, TechStack, Answer, TechKnowledge, Review];
        
        const ds = new DataSource({
          type: "postgres",
          url: process.env.DATABASE_URL!,
          ssl: isProd ? { rejectUnauthorized: false } : false,
          synchronize: true, // 本番環境ではfalseにする
          logging: false,
          entities,
        });
        
        globalForDataSource.orm = ds;
        return ds;
      })())
  : null;

export async function getDataSource() {
  if (!AppDataSource) {
    throw new Error("DATABASE_URL is not configured. Please set it in .env.local");
  }
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
