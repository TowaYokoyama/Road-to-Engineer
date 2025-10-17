import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { TechStack } from "@/entities/TechStack";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(TechStack);
    
    const found = await repo.findOne({
      where: { id: params.id },
      relations: ["knowledgeNotes"],
    });
    
    if (!found) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json(found);
  } catch (error: any) {
    console.error("Error fetching tech stack:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(TechStack);
    const body = await req.json();
    
    await repo.update({ id: params.id }, body);
    const updated = await repo.findOne({ where: { id: params.id } });
    
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating tech stack:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(TechStack);
    await repo.delete({ id: params.id });
    
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error deleting tech stack:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

