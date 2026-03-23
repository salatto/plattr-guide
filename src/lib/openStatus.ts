// import type { OpeningHours } from "@/types/restaurants";

// // "HH:MM:SS" -> минуты от начала суток
// const toMin = (hms: string) => {
//   const [h, m] = hms.split(":").map(Number);
//   return h * 60 + m;
// };

// const fmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

// export function getOpenStatusNow(
//   hours: OpeningHours[],
//   now: Date = new Date()
// ): { isOpen: boolean; statusText: string } {
//   const dow = now.getDay() as OpeningHours["day_of_week"]; // 0=Sun..6=Sat
//   const row = hours.find(h => h.day_of_week === dow);
//   if (!row) return { isOpen: false, statusText: "Closed today" };

//   const openMin  = toMin(row.open_time);   // 09:00 -> 540
//   let   closeMin = toMin(row.close_time);  // 18:00 -> 1080
//   let   nowMin   = now.getHours() * 60 + now.getMinutes();

//   // ночная смена, если close <= open (например, 22:00–02:00)
//   const overnight = closeMin <= openMin;
//   if (overnight) {
//     closeMin += 24 * 60;          // закрытие на следующий день
//     if (nowMin < openMin) nowMin += 24 * 60; // если уже после полуночи — сдвинем "сейчас"
//   }

//   // --- временный лог для отладки ---
//   // console.log({ dow, openMin, closeMin, nowMin, overnight, row });

//   if (nowMin >= openMin && nowMin < closeMin) {
//     const closeDate = new Date(now);
//     closeDate.setHours(Math.floor(closeMin / 60) % 24, closeMin % 60, 0, 0);
//     return { isOpen: true, statusText: `Open until ${fmt.format(closeDate)}` };
//   }
//   if (nowMin < openMin) {
//     const openDate = new Date(now);
//     openDate.setHours(Math.floor(openMin / 60) % 24, openMin % 60, 0, 0);
//     return { isOpen: false, statusText: `Closed until ${fmt.format(openDate)}` };
//   }
//   return { isOpen: false, statusText: "Closed for today" };
// }


// import type { OpeningHours } from "@/types/restaurants";

// // "HH:MM:SS" -> минуты от начала суток
// const toMin = (hms: string) => {
//     const [h, m] = hms.split(":").map(Number);
//     return h * 60 + m;
// };

// const fmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

// export function getOpenStatusNow(
//     hours: OpeningHours[],
//     timeZone: string
// ): { isOpen: boolean; statusText: string } {
//     // Получаем текущее время в указанном часовом поясе
//     const now = new Date();
//     const options: Intl.DateTimeFormatOptions = {
//         timeZone: timeZone,
//         weekday: 'long',
//         year: 'numeric',
//         month: 'numeric',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false
//     };

//     const formatter = new Intl.DateTimeFormat('en-US', options);
//     const parts = formatter.formatToParts(now);

//     const year = parseInt(parts.find(p => p.type === 'year')?.value || '0');
//     const month = parseInt(parts.find(p => p.type === 'month')?.value || '0') - 1; // Месяцы в JS начинаются с 0
//     const day = parseInt(parts.find(p => p.type === 'day')?.value || '0');
//     const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
//     const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');

//     const restaurantTime = new Date(year, month, day, hour, minute);

//     const dow = restaurantTime.getDay() as OpeningHours["day_of_week"]; // 0=Sun..6=Sat
//     const row = hours.find(h => h.day_of_week === dow);
//     if (!row) return { isOpen: false, statusText: "Closed today" };

//     const openMin = toMin(row.open_time);
//     let closeMin = toMin(row.close_time);
//     let nowMin = restaurantTime.getHours() * 60 + restaurantTime.getMinutes();

//     // Ночная смена, если close <= open (например, 22:00–02:00)
//     const overnight = closeMin <= openMin;
//     if (overnight) {
//         closeMin += 24 * 60; // Закрытие на следующий день
//         if (nowMin < openMin) nowMin += 24 * 60; // Если уже после полуночи — сдвинем "сейчас"
//     }

//     if (nowMin >= openMin && nowMin < closeMin) {
//         const closeDate = new Date(restaurantTime);
//         closeDate.setHours(Math.floor(closeMin / 60) % 24, closeMin % 60, 0, 0);
//         return { isOpen: true, statusText: `Open until ${fmt.format(closeDate)}` };
//     }
//     if (nowMin < openMin) {
//         const openDate = new Date(restaurantTime);
//         openDate.setHours(Math.floor(openMin / 60) % 24, openMin % 60, 0, 0);
//         return { isOpen: false, statusText: `Closed until ${fmt.format(openDate)}` };
//     }
//     return { isOpen: false, statusText: "Closed for today" };
// }

import type { OpeningHours } from "@/types/restaurants";

// "HH:MM:SS" -> минуты от начала суток
const toMin = (hms: string) => {
    const [h, m] = hms.split(":").map(Number);
    return h * 60 + m;
};

// формат только час + AM/PM
const fmtTime = (date: Date, timeZone: string) =>
    new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        hour12: true,
    }).format(date);

export function getOpenStatusNow(
    hours: OpeningHours[],
    timeZone: string
): { isOpen: boolean; statusText: string } {
    // Текущее время в TZ ресторана
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(now);

    const year = parseInt(parts.find((p) => p.type === "year")?.value || "0");
    const month = parseInt(parts.find((p) => p.type === "month")?.value || "0") - 1;
    const day = parseInt(parts.find((p) => p.type === "day")?.value || "0");
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0");

    const restaurantTime = new Date(year, month, day, hour, minute);

    const dow = restaurantTime.getDay() as OpeningHours["day_of_week"]; // 0=Sun..6=Sat
    const row = hours.find((h) => h.day_of_week === dow);
    if (!row) return { isOpen: false, statusText: "Closed today" };

    const openMin = toMin(row.open_time);
    let closeMin = toMin(row.close_time);
    let nowMin = restaurantTime.getHours() * 60 + restaurantTime.getMinutes();

    // Ночная смена (например, 22:00–02:00)
    const overnight = closeMin <= openMin;
    if (overnight) {
        closeMin += 24 * 60;
        if (nowMin < openMin) nowMin += 24 * 60;
    }

    if (nowMin >= openMin && nowMin < closeMin) {
        const closeDate = new Date(restaurantTime);
        closeDate.setHours(Math.floor(closeMin / 60) % 24, closeMin % 60, 0, 0);
        return { isOpen: true, statusText: `Open till ${fmtTime(closeDate, timeZone)}` };
    }

    if (nowMin < openMin) {
        const openDate = new Date(restaurantTime);
        openDate.setHours(Math.floor(openMin / 60) % 24, openMin % 60, 0, 0);
        return { isOpen: false, statusText: `Closed till ${fmtTime(openDate, timeZone)}` };
    }

    return { isOpen: false, statusText: "Closed for today" };
}


// const toMin = (hms: string) => {
//     const [h, m] = hms.split(":").map(Number);
//     return h * 60 + m;
// };

// // Formats time to 24-hour format
// const fmtTime = (date: Date, timeZone: string) =>
//     new Intl.DateTimeFormat("en-US", {
//         timeZone,
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false, // Changed to false for 24-hour format
//     }).format(date);

// /**
//  * Determines if a restaurant is currently open based on a given time zone.
//  * @param {object[]} hours - The opening hours array for the restaurant.
//  * @param {string} timeZone - The IANA time zone string (e.g., 'America/New_York').
//  * @returns {{ isOpen: boolean; statusText: string }} The open status and a descriptive string.
//  */
// export function getOpenStatusNow(hours: OpeningHours[], timeZone: string) {
//     // Get the current time in the specified time zone
//     const now = new Date();
//     const formatter = new Intl.DateTimeFormat("en-US", {
//         timeZone,
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: false,
//     });

//     const formattedParts = formatter.formatToParts(now);
//     const year = parseInt(formattedParts.find(p => p.type === 'year')?.value || '0');
//     const month = parseInt(formattedParts.find(p => p.type === 'month')?.value || '0') - 1;
//     const day = parseInt(formattedParts.find(p => p.type === 'day')?.value || '0');
//     const hour = parseInt(formattedParts.find(p => p.type === 'hour')?.value || '0');
//     const minute = parseInt(formattedParts.find(p => p.type === 'minute')?.value || '0');

//     const restaurantTime = new Date(year, month, day, hour, minute);

//     const dow = restaurantTime.getDay(); // 0=Sun..6=Sat
//     const row = hours.find((h) => h.day_of_week === dow);
//     if (!row) return { isOpen: false, statusText: "Closed today" };

//     const openMin = toMin(row.open_time);
//     let closeMin = toMin(row.close_time);
//     let nowMin = restaurantTime.getHours() * 60 + restaurantTime.getMinutes();

//     // Handle overnight shifts (e.g., 10 PM to 2 AM)
//     const overnight = closeMin <= openMin;
//     if (overnight) {
//         closeMin += 24 * 60;
//         if (nowMin < openMin) nowMin += 24 * 60;
//     }

//     if (nowMin >= openMin && nowMin < closeMin) {
//         const closeDate = new Date(restaurantTime);
//         closeDate.setHours(Math.floor(closeMin / 60) % 24, closeMin % 60, 0, 0);
//         return { isOpen: true, statusText: `Open till ${fmtTime(closeDate, timeZone)}` };
//     }

//     // Check if the restaurant opens later today
//     if (nowMin < openMin) {
//         const openDate = new Date(restaurantTime);
//         openDate.setHours(Math.floor(openMin / 60) % 24, openMin % 60, 0, 0);
//         return { isOpen: false, statusText: `Closed till ${fmtTime(openDate, timeZone)}` };
//     }

//     // Default to closed for today if all other conditions fail
//     return { isOpen: false, statusText: "Closed for today" };
// }