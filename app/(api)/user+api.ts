import { neon } from "@neondatabase/serverless";

export function GET(request: Request) {
  return Response.json({ hellothere: "General Kenobi" });
}

export async function POST(request:Request){
    try {

        const sql = neon(`${process.env.NEON_URL!}`)

        const {name, email, clerkId} = await request.json()

        if(!name || !email || !clerkId){
            return Response.json({error: "Missing required fields"}, {status: 400})
        }

        const user = await sql`
            INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})
            `

        return Response.json({data: user}, {status: 201})

    } catch (error) {
        console.error(error);
    }
}

