import { NextResponse } from "next/server";
import { serverAxios } from "@/lib/api/axios-server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const count = searchParams.get("count") || "10";
    const pageNum = searchParams.get("page_num") || "1";
    const searchStr = searchParams.get("search_str") || "";

    try {
        const { data } = await serverAxios.get("/restaurants/all", {
            params: {
                count,
                page_num: pageNum,
                search_str: searchStr,
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}
