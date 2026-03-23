import { NextResponse } from "next/server";
import { generateSQL, generateExplanation, normalizeResults } from "@/src/lib/openai";
import { runQuery } from "@/src/lib/databricks";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question required" }, { status: 400 });
    }

    // 1. Generate SQL from natural language
    const sql = await generateSQL(question);

    // 2. Security double-check
    if (!sql.trim().toUpperCase().startsWith("SELECT")) {
      return NextResponse.json({ error: "Only SELECT queries are allowed." }, { status: 403 });
    }

    // 3. Run against Databricks (retry up to 3x for warehouse warm-up)
    let rawResults: any[] | undefined;
    let lastError: any;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        rawResults = await runQuery(sql) as any[];
        break;
      } catch (err) {
        lastError = err;
        if (attempt < 2) await new Promise(r => setTimeout(r, 2500));
      }
    }
    if (rawResults === undefined) throw lastError;

    // 4. Normalize into consistent card format
    const results = normalizeResults(rawResults!);

    // 5. Generate plain-English explanation
    const answer = await generateExplanation(question, results);

    return NextResponse.json({ sql, results, answer });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Query failed or database connection error" },
      { status: 500 }
    );
  }
}