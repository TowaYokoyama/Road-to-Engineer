import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { TechStack } from "@/entities/TechStack";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const hasDb = !!process.env.DATABASE_URL;
    if (!hasDb) {
      return NextResponse.json({ techStacks: [], total: 0 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(TechStack);
    const url = new URL(req.url);
    
    const category = url.searchParams.get("category");
    const proficiency = url.searchParams.get("proficiency");
    const q = url.searchParams.get("q")?.toLowerCase();

    let queryBuilder = repo.createQueryBuilder("techStack");
    
    if (category) {
      queryBuilder = queryBuilder.andWhere("techStack.category = :category", { category });
    }
    
    if (proficiency) {
      queryBuilder = queryBuilder.andWhere("techStack.proficiencyLevel = :proficiency", { proficiency });
    }
    
    queryBuilder = queryBuilder.orderBy("techStack.updatedAt", "DESC");
    
    const [items, total] = await queryBuilder.getManyAndCount();
    
    const filtered = q
      ? items.filter((i) =>
          i.name.toLowerCase().includes(q) || 
          i.description?.toLowerCase().includes(q) ||
          i.tags?.some(tag => tag.toLowerCase().includes(q))
        )
      : items;
    
    return NextResponse.json({ techStacks: filtered, total: filtered.length });
  } catch (error: any) {
    console.error("Error fetching tech stacks:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const hasDb = !!process.env.DATABASE_URL;
    if (!hasDb) {
      return NextResponse.json({ message: "DATABASE_URL is not configured" }, { status: 500 });
    }

    const body = await req.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(TechStack);
    
    const entity = repo.create(body);
    const saved = await repo.save(entity);
    
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tech stack:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

