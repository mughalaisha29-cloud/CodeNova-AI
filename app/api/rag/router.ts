import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemMessage = context 
      ? `You are Learnova AI, an expert virtual programming assistant. The user has provided or referenced the following context/file: "${context}". Use this context along with your programming knowledge to give an accurate, clear, and helpful response.`
      : `You are Learnova AI, an expert virtual programming assistant designed to help students and developers learn programming and debug code.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error('RAG API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}