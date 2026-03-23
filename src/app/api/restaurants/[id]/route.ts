import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(_request: Request) {
    const url = new URL(_request.url);
    const restaurantId = url.pathname.split("/").pop();

    try {
        const { data, error } = await supabase
            .from("guide_restaurants")
            .select(`
                *,
                guide_opening_hours (
                    id,
                    day_of_week,
                    open_time,
                    close_time
                ),
                guide_social_urls (
                    id,
                    url
                ),
                guide_gallery_images (
                    id,
                    image_url,
                    display_order
                ),
                guide_tags (
                    id,
                    tag
                )
            `)
            .eq("id", restaurantId)
            .eq("is_visible", true)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }

        // Fetch menu categories with items
        const { data: menuCats } = await supabase
            .from("guide_menu_categories")
            .select(`
                id,
                name,
                display_order,
                guide_menu_items (
                    id,
                    name,
                    description,
                    price,
                    image_url,
                    weight,
                    tags,
                    display_order
                )
            `)
            .eq("restaurant_id", data.id)
            .eq("is_active", true)
            .order("display_order", { ascending: true });

        // Fetch loyalty programs
        const { data: loyaltyPrograms } = await supabase
            .from("guide_loyalty_programs")
            .select("*")
            .eq("restaurant_id", data.id)
            .eq("is_active", true);

        // Fetch similar restaurants from the same city
        const { data: similar } = await supabase
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
            .eq("city", data.city)
            .neq("id", data.id)
            .limit(4);

        // Shape menu categories with sorted items
        const menu_categories = (menuCats || [])
            .sort((a, b) => a.display_order - b.display_order)
            .map((cat) => ({
                id: cat.id,
                name: cat.name,
                items: ((cat.guide_menu_items as Array<{
                    id: string;
                    name: string;
                    description: string | null;
                    price: number;
                    image_url: string | null;
                    weight: string | null;
                    tags: string[];
                    display_order: number;
                }>) || [])
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((item) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        image_url: item.image_url,
                        weight: item.weight,
                        tags: item.tags || [],
                    })),
            }));

        const restaurant = {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            venue_type: data.venue_type,
            owner_uuid: "",
            image_url: data.image_url,
            language_type: data.language_type,
            currency_type: data.currency_type,
            phone_number: data.phone_number,
            is_translate_allowed: false,
            street: data.street,
            street_number: data.street_number,
            zip_code: data.zip_code,
            city: data.city,
            country: data.country,
            created_at: data.created_at,
            updated_at: data.updated_at,
            opening_hours: data.guide_opening_hours || [],
            social_urls: data.guide_social_urls || [],
            gallery_urls: (data.guide_gallery_images || [])
                .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order)
                .map((img: { image_url: string }) => img.image_url),
            tags: (data.guide_tags || []).map((t: { tag: string }) => t.tag),
            categories: [],
            menu_categories,
            loyalty_programs: loyaltyPrograms || [],
            similar: (similar || []).map((s) => ({
                id: s.id,
                title: s.title,
                image_url: s.image_url,
                city: s.city,
                country: s.country,
                opening_hours: s.guide_opening_hours || [],
            })),
        };

        return NextResponse.json(restaurant, { status: 200 });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 });
    }
}
