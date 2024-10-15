import { NextRequest } from "next/server";

export async function POST(req : NextRequest){
   return Response.json({ response: 'ok', message: 'i Know' }, { status: 200 });
}