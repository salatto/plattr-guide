import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get("count") || "12", 10);
    const pageNum = parseInt(searchParams.get("page_num") || "1", 10);
    const searchStr = searchParams.get("search_str") || "";

    try {
        let query = supabase
            .from("guide_restaurants")
            .select(`
                id,
                title,
                image_url,
                city,
                country,
                guide_opening_hours (
                    id,
                    day_of_week,
                    open_time,
                    close_time
                )
            `)
            .eq("is_visible", true)
            .order("id", { ascending: false });

        if (searchStr) {
            query = query.ilike("title", `%${searchStr}%`);
        }

        const from = (pageNum - 1) * count;
        const to = from + count - 1;
        query = query.range(from, to);

        const { data, error } = await query;

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
        }

        const restaurants = (data || []).map((r) => ({
            id: r.id,
            title: r.title,
            image_url: r.image_url,
            city: r.city,
            country: r.country,
            opening_hours: r.guide_opening_hours || [],
        }));

        return NextResponse.json(restaurants, { status: 200 });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}
