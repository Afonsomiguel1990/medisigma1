import { getSupabaseAnon } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const supabase = getSupabaseAnon();

        const { error } = await supabase.from("email_clicks").insert({});

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
