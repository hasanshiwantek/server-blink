
// only for country select
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     try {
//         const ip =
//             req.headers.get("x-forwarded-for")?.split(",")[0] ||
//             req.headers.get("x-real-ip") ||
//             "";

//         // ip2c.org - completely free, no rate limit
//         const res = await fetch(`https://ip2c.org/${ip || "s"}`);
//         const text = await res.text();
//         const parts = text.split(";");
//         // Response format: 1;PK;PAK;Pakistan
//         const countryCode = parts[1];

//         if (countryCode && countryCode.length === 2) {
//             return NextResponse.json({ country_code: countryCode, ip });
//         }

//         return NextResponse.json({ country_code: "US", ip });
//     } catch {
//         return NextResponse.json({ country_code: "US" });
//     }
// }


import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "";

        const res = await fetch(
            `http://ip-api.com/json/${ip}?fields=countryCode,regionName,city,zip`
        );
        const data = await res.json();

        if (data.countryCode) {
            return NextResponse.json({
                country_code: data.countryCode,  // "PK"
                state: data.regionName,           // "Sindh"
                city: data.city,                  // "Karachi"
                zip: data.zip,                    // "75500"
                ip,
            });
        }

        return NextResponse.json({ country_code: "US", state: "", city: "", zip: "" });
    } catch {
        return NextResponse.json({ country_code: "US", state: "", city: "", zip: "" });
    }
}

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     try {
//         const res = await fetch("https://cloudflare.com/cdn-cgi/trace");
//         const text = await res.text();

//         const lines = text.split("\n");
//         const get = (key: string) =>
//             lines.find((l) => l.startsWith(`${key}=`))?.split("=")[1]?.trim();

//         const countryCode = get("loc");  // "PK", "US", "IN"
//         const region = get("uag");       // not reliable for state

//         // ✅ Better — use ip-api.com for state/region (free, no key needed)
//         const ipRes = await fetch("http://ip-api.com/json/?fields=status,country,countryCode,regionName,region,city,zip");
//         const ipData = await ipRes.json();

//         if (ipData.status === "success") {
//             return NextResponse.json({
//                 country_code: ipData.countryCode,  // "PK"
//                 state_code: ipData.region,          // "SD", "PB" etc
//                 state_name: ipData.regionName,      // "Sindh", "Punjab"
//                 city: ipData.city,                  // "Karachi"
//                 zip: ipData.zip,                    // "75500"
//             });
//         }

//         // fallback to cloudflare
//         return NextResponse.json({
//             country_code: countryCode || "US",
//             state_code: "",
//             state_name: "",
//             city: "",
//             zip: "",
//         });
//     } catch {
//         return NextResponse.json({
//             country_code: "US",
//             state_code: "",
//             state_name: "",
//             city: "",
//             zip: "",
//         });
//     }
// }