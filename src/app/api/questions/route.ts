import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";


export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const hasDb = !!process.env.DATABASE_URL;
  if (!hasDb) {
    return NextResponse.json({ questions: [], total: 0 });
  }
  const ds = await getDataSource();
  const repo = ds.getRepository("Question" as any);
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.toLowerCase();
  const [items, total] = await repo.findAndCount({ order: { createdAt: "DESC" } });
  const filtered = q
    ? items.filter((i) =>
        i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      )
    : items;
  return NextResponse.json({ questions: filtered, total: filtered.length });
}

export async function POST(req: NextRequest) {
  const hasDb = !!process.env.DATABASE_URL;
  if (!hasDb) {
    return NextResponse.json({ message: "DATABASE_URL is not configured" }, { status: 500 });
  }
  const body = await req.json();
  const ds = await getDataSource();
  const repo = ds.getRepository("Question" as any);
  const entity = repo.create(body);
  const saved = await repo.save(entity);
  return NextResponse.json(saved, { status: 201 });
}
