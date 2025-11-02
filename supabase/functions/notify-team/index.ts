import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type EventType = "contact" | "candidatura";

interface EventPayload {
  type: EventType;
  data: Record<string, unknown>;
}

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

  // TODO: Implementar notificação sem ClickSend (ex: webhook, email via outro serviço, etc.)
  console.info("Notificação recebida:", payload);

  return jsonResponse({ 
    ok: true, 
    delivered: false, 
    reason: "Email temporariamente desativado - implementação ClickSend removida" 
  });
}