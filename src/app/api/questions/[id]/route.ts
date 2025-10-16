import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { Question } from "@/entities/Question";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const ds = await getDataSource();
  const repo = ds.getRepository(Question);
  const found = await repo.findOne({ where: { id: params.id } });
  if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const ds = await getDataSource();
  const repo = ds.getRepository(Question);
  const body = await req.json();
  await repo.update({ id: params.id }, body);
  const updated = await repo.findOne({ where: { id: params.id } });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ds = await getDataSource();
  const repo = ds.getRepository(Question);
  await repo.delete({ id: params.id });
  return NextResponse.json({ ok: true });
}
