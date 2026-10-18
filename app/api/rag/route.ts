import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Vercel par save kiye gaye OPENAI_API_KEY se initialize hoga
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, context } = body;

    // Real OpenAI ChatGPT API ko call kar rahe hain
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI coding assistant for Learnova AI." },
        { role: "user", content: context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt }
      ],
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ result: reply }, { status: 200 });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: error.message || 'Error generating response' },
      { status: 500 }
    );
  }
}