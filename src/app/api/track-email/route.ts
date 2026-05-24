import { getSupabaseAnon } from "@/lib/supabase";
import { rateLimitRequest } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const rateLimitError = rateLimitRequest(req, {
        key: "track-email",
        limit: 120,
        windowMs: 10 * 60 * 1000,
    });
    if (rateLimitError) return rateLimitError;

    try {
        const supabase = getSupabaseAnon();
        const body = await req.json().catch(() => ({}));

        const pagina = (body.pagina ?? "").toString() || null;
        const url = (body.url ?? "").toString() || null;

        const { error } = await supabase
            .from("email_clicks")
            .insert({ pagina, url });

        if (error) {
            console.error("Error tracking Email click:", error);
            return NextResponse.json(
                { error: "Failed to track click" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Internal server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
