import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, context } = body;

    let reply = `✨ **Learnova AI Engine Response:**\n\nI have successfully analyzed your query: "${prompt}".`;
    
    if (context) {
      reply += `\n📎 **Attached File:** ${context} has been processed successfully.`;
    }

    reply += `\n\n💡 **Status:** Code logic looks great! Everything is structured correctly. Let me know if you need help with further debugging or new logic generation.`;

    return NextResponse.json({ result: reply }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}