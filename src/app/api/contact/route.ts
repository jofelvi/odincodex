import { NextResponse } from "next/server";
import {
  PROJECT_TYPES,
  parseContactPayload,
  validateContact,
  type ContactResponse,
} from "@/lib/contact";
import { SITE_CONFIG } from "@/lib/constants";

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 } as const;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function reply(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return reply({ ok: false, error: "bad_request" }, 400);
  }

  const payload = parseContactPayload(raw);
  if (!payload) return reply({ ok: false, error: "bad_request" }, 400);

  // Honeypot filled: pretend success so bots learn nothing.
  if (payload.website.trim() !== "") return reply({ ok: true }, 200);

  const fields = validateContact(payload);
  if (Object.keys(fields).length > 0) {
    return reply({ ok: false, error: "validation", fields }, 422);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return reply({ ok: false, error: "rate_limited" }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return reply({ ok: false, error: "not_configured" }, 503);

  const to = process.env.CONTACT_TO_EMAIL || SITE_CONFIG.email;
  const from = process.env.CONTACT_FROM_EMAIL || "OdinCodex <onboarding@resend.dev>";
  const projectType =
    payload.projectType && (PROJECT_TYPES as readonly string[]).includes(payload.projectType)
      ? payload.projectType
      : "—";

  const lines = [
    ["Nombre", payload.name.trim()],
    ["Email", payload.email.trim()],
    ["Empresa", payload.company.trim() || "—"],
    ["Tipo de proyecto", projectType],
  ] as const;

  const html = `
    <h2>Nuevo contacto desde odincodex.com</h2>
    <table>${lines
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p style="white-space:pre-wrap">${escapeHtml(payload.message.trim())}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email.trim(),
        subject: `Contacto web: ${payload.name.trim()}`,
        html,
        text: `${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${payload.message.trim()}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend respondió", res.status, await res.text());
      return reply({ ok: false, error: "send_failed" }, 502);
    }
  } catch (error) {
    console.error("[contact] Error enviando el correo", error);
    return reply({ ok: false, error: "send_failed" }, 502);
  }

  return reply({ ok: true }, 200);
}
