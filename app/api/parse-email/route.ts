import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { simpleParser } = require("mailparser");

/** Strip HTML tags and decode common entities to get readable plain text. */
function htmlToPlainText(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("url");
    if (!urlParam || !urlParam.startsWith("/") || urlParam.includes("..")) {
      return NextResponse.json({ error: "Invalid or missing url parameter" }, { status: 400 });
    }
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.resolve(publicDir, urlParam.slice(1));
    if (!filePath.startsWith(publicDir)) {
      return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 });
    }
    const buffer = await readFile(filePath);
    const parsed = await simpleParser(buffer);
    const from = parsed.from?.text ?? "";
    const to = parsed.to?.text ?? "";
    const subject = parsed.subject ?? "";
    const body =
      (parsed.text && parsed.text.trim()) || (parsed.html ? htmlToPlainText(parsed.html) : "");
    const text = [from && `From: ${from}`, to && `To: ${to}`, subject && `Subject: ${subject}`, body]
      .filter(Boolean)
      .join("\n\n");
    return NextResponse.json({ from, to, subject, text: text.trim() });
  } catch (error) {
    console.error("Parse email route error:", error);
    return NextResponse.json(
      { error: "Failed to parse email" },
      { status: 500 }
    );
  }
}
