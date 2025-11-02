import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import ClickSend from "clicksend";
type EmailApiInstance = InstanceType<typeof ClickSend.EmailApi>;
type EmailMessageCollection = Parameters<EmailApiInstance["emailSendPost"]>[0];

type EventType = "contact" | "candidatura";

interface EventPayload {
  type: EventType;
  data: Record<string, unknown>;
}

const CLICK_SEND_ENABLED = (Deno.env.get("CLICK_SEND_ENABLED") ?? "false").toLowerCase() === "true";
const CLICK_SEND_USERNAME = Deno.env.get("CLICK_SEND_USERNAME") ?? "";
const CLICK_SEND_API_KEY = Deno.env.get("CLICK_SEND_API_KEY") ?? "";
const CLICK_SEND_TO = (Deno.env.get("CLICK_SEND_TO") ?? "info@medisigma.pt")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const CLICK_SEND_FROM_EMAIL = Deno.env.get("CLICK_SEND_FROM_EMAIL") ?? "no-reply@medisigma.pt";
const CLICK_SEND_FROM_NAME = Deno.env.get("CLICK_SEND_FROM_NAME") ?? "Medisigma Web";
const CLICK_SEND_SOURCE = Deno.env.get("CLICK_SEND_SOURCE") ?? "supabase-edge";
const SHARED_SECRET = Deno.env.get("NOTIFY_SHARED_SECRET") ?? "";

function jsonResponse(data: Record<string, unknown>, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

function sanitise(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value: unknown): string {
  try {
    if (!value) return "";
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString("pt-PT", { hour12: false });
  } catch {
    return String(value ?? "");
  }
}

function buildHtml(payload: EventPayload): string {
  const entries = Object.entries(payload.data ?? {})
    .filter(([key]) => key !== "id")
    .map(([key, value]) => {
      const label = sanitise(key.replace(/_/g, " "));
      const formattedValue =
        key === "created_at"
          ? sanitise(formatDate(value))
          : sanitise(value);
      return `<tr>
        <td style="padding:8px 12px;background:#f8f9fb;font-weight:600;text-transform:capitalize;">${label}</td>
        <td style="padding:8px 12px;background:#ffffff;">${formattedValue || "&nbsp;"}</td>
      </tr>`;
    })
    .join("\n");

  const title = payload.type === "contact" ? "Novo contacto" : "Nova candidatura";

  return `<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <title>${sanitise(title)}</title>
  </head>
  <body style="font-family:Arial,Helvetica,sans-serif;background:#f1f3f6;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px rgba(22,34,51,0.08);">
      <div style="background:#2e353f;color:#ffffff;padding:20px 24px;">
        <h1 style="margin:0;font-size:20px;">${sanitise(title)} recebido via website</h1>
        <p style="margin:4px 0 0;font-size:14px;opacity:0.85;">${formatDate(payload.data.created_at ?? new Date().toISOString())}</p>
      </div>
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px;color:#232a32;">
        ${entries}
      </table>
      <div style="padding:16px 24px;background:#f8f9fb;font-size:12px;color:#5b6675;">
        <p style="margin:0;">Mensagem gerada automaticamente pelo site Medisigma. Não responder a este email.</p>
      </div>
    </div>
  </body>
</html>`;
}

function buildPlainText(payload: EventPayload): string {
  const header = payload.type === "contact" ? "Novo contacto" : "Nova candidatura";
  const lines = Object.entries(payload.data ?? {})
    .filter(([key]) => key !== "id")
    .map(([key, value]) => `${key}: ${value ?? ""}`)
    .join("\n");
  return `${header}\n\n${lines}`;
}

function subjectFor(type: EventType): string {
  return type === "contact"
    ? "Novo contacto submetido no website"
    : "Nova candidatura espontânea";
}

async function sendEmail(payload: EventPayload) {
  if (!CLICK_SEND_ENABLED) {
    console.info("ClickSend desativado, não será enviado email", payload.type);
    return { delivered: false, reason: "CLICK_SEND_ENABLED=false" };
  }

  if (!CLICK_SEND_USERNAME || !CLICK_SEND_API_KEY) {
    console.error("Credenciais ClickSend em falta");
    throw new Error("Credenciais ClickSend em falta");
  }

  if (!CLICK_SEND_TO.length) {
    console.error("Destinatários ClickSend não configurados");
    throw new Error("Destinatários ClickSend não configurados");
  }

  const htmlBody = buildHtml(payload);
  const textBody = buildPlainText(payload);
  const recipients = CLICK_SEND_TO.map((email) => ({ email }));

  const emailApi = new ClickSend.EmailApi();
  emailApi.apiClient.authentications["BasicAuth"].username = CLICK_SEND_USERNAME;
  emailApi.apiClient.authentications["BasicAuth"].password = CLICK_SEND_API_KEY;

  const requestBody: EmailMessageCollection = {
    messages: [
      {
        source: CLICK_SEND_SOURCE,
        to: recipients,
        subject: subjectFor(payload.type),
        body: htmlBody,
        body_type: "html",
        from_email: CLICK_SEND_FROM_EMAIL,
        from_name: CLICK_SEND_FROM_NAME,
        plain_body: textBody,
      },
    ],
  };

  const response = await emailApi.emailSendPost(requestBody as any);

  return { delivered: true, response };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Not Found", { status: 404 });
  }

  if (!SHARED_SECRET) {
    console.error("NOTIFY_SHARED_SECRET não configurado no Edge Function");
    return jsonResponse({ error: "Secret não configurado" }, { status: 500 });
  }

  const incomingSecret = req.headers.get("x-notify-secret") ?? "";
  if (incomingSecret !== SHARED_SECRET) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: EventPayload;
  try {
    payload = (await req.json()) as EventPayload;
  } catch (error) {
    console.error("Falha a ler payload", error);
    return jsonResponse({ error: "Payload inválido" }, { status: 400 });
  }

  if (!payload || (payload.type !== "contact" && payload.type !== "candidatura")) {
    return jsonResponse({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const result = await sendEmail(payload);
    return jsonResponse({ ok: true, ...result });
  } catch (error) {
    console.error("Falha a enviar email", error);
    return jsonResponse({ ok: false, error: String(error?.message ?? error) }, { status: 502 });
  }
}
