import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
        .from("whatsapp_clicks")
        .select("*", { count: "exact", head: true });

    if (error) {
        console.error("Error fetching stats:", error);
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <h2 className="text-gray-500 font-medium mb-2">Cliques no WhatsApp</h2>
                    <p className="text-4xl font-bold text-green-600">
                        {count !== null ? count : "-"}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Total de cliques</p>
                </div>
            </div>
        </main>
    );
}
