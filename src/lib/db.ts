import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const hasDb = !!process.env.DATABASE_URL;

// DATABASE_URLがない場合は警告を出す
if (!hasDb) {
  console.warn("⚠️  DATABASE_URL is not set. Database features will not work.");
}

// Avoid creating multiple DataSource instances in dev HMR
const globalForDataSource = globalThis as unknown as { orm?: DataSource | null };

// To avoid circular imports we register entities by file pattern (strings)
// instead of importing entity classes here. This allows TypeORM to load
// entity definitions lazily and prevents import cycles between entities and db.
const entitiesPath = [path.join(__dirname, "../entities/*.{ts,js}")];

export const AppDataSource: DataSource | null = hasDb
  ? (globalForDataSource.orm !== undefined
    ? globalForDataSource.orm
    : (() => {
        const ds = new DataSource({
          type: "postgres",
          url: process.env.DATABASE_URL!,
          // Supabase requires SSL; when running in production, allow self-signed certs
          ssl: isProd ? { rejectUnauthorized: false } : false,
          synchronize: true, // 本番環境ではfalseにする
          logging: false,
          entities: entitiesPath,
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
