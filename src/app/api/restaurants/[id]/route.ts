import { NextResponse } from "next/server";
import { serverAxios } from "@/lib/api/axios-server";

export async function GET(_request: Request) {
    const url = new URL(_request.url);
    const restaurantId = url.pathname.split("/").pop();

    try {
        const { data } = await serverAxios.get(`/restaurants/${restaurantId}`);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 });
    }
}
