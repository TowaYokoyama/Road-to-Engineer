import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { Answer } from "@/entities/Answer";
import { Question } from "@/entities/Question";


export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dataSource = await getDataSource();
    const questionRepo = dataSource.getRepository(Question);
    const answerRepo = dataSource.getRepository(Answer);

    const question = await questionRepo.findOne({ where: { id: params.id } });
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const body = await request.json();
    const { content, codeSnippet, language, keyPoints, status } = body;

    // 試行回数を取得
    const existingAnswers = await answerRepo.find({
      where: { question: { id: params.id } },
      order: { attemptNumber: "DESC" },
    });
    const attemptNumber = existingAnswers.length > 0 ? existingAnswers[0].attemptNumber + 1 : 1;

    const answer = answerRepo.create({
      question,
      content,
      codeSnippet: codeSnippet || null,
      language: language || null,
      keyPoints: keyPoints || null,
      attemptNumber,
      status: status || "draft",
    });

    await answerRepo.save(answer);
    return NextResponse.json(answer, { status: 201 });
  } catch (error: any) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dataSource = await getDataSource();
    const answerRepo = dataSource.getRepository(Answer);

    const answers = await answerRepo.find({
      where: { question: { id: params.id } },
      order: { createdAt: "DESC" },
      relations: ["reviews"],
    });

    return NextResponse.json({ answers });
  } catch (error: any) {
    console.error("Error fetching answers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

