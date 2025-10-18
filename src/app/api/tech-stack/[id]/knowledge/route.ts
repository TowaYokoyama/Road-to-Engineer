import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";


export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  const ds = await getDataSource();
  const repo = ds.getRepository("TechKnowledge" as any);
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    let queryBuilder = repo
      .createQueryBuilder("knowledge")
      .where("knowledge.techStackId = :id", { id: params.id })
      .orderBy("knowledge.importance", "DESC")
      .addOrderBy("knowledge.createdAt", "DESC");

    if (type) {
      queryBuilder = queryBuilder.andWhere("knowledge.type = :type", { type });
    }

    const knowledgeNotes = await queryBuilder.getMany();
    return NextResponse.json({ knowledgeNotes });
  } catch (error: any) {
    console.error("Error fetching knowledge notes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  const ds = await getDataSource();
  const techStackRepo = ds.getRepository("TechStack" as any);
  const knowledgeRepo = ds.getRepository("TechKnowledge" as any);

    const techStack = await techStackRepo.findOne({ where: { id: params.id } });
    if (!techStack) {
      return NextResponse.json({ error: "Tech stack not found" }, { status: 404 });
    }

    const body = await req.json();
    const knowledge = knowledgeRepo.create({
      ...body,
      techStack,
    });

    await knowledgeRepo.save(knowledge);
    return NextResponse.json(knowledge, { status: 201 });
  } catch (error: any) {
    console.error("Error creating knowledge note:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

