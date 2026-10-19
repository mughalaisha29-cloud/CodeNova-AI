
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY is missing from the deployment environment.');

      return NextResponse.json(
        { error: 'Server configuration error: OpenAI API key is missing.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt, context } = body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid prompt.' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are Learnova AI, a helpful coding assistant. ' +
          'Answer the user’s actual question instead of repeating it. ' +
          'Solve programming tasks, debug code, explain errors, and ' +
          'provide complete, correct code when requested. ' +
          'Follow the requested programming language and format. ' +
          'Do not return generic status messages in place of an answer.',
      },
    ];

    const userMessage =
      typeof context === 'string' && context.trim()
        ? `Context:\n${context}\n\nQuestion:\n${prompt}`
        : prompt;

    messages.push({
      role: 'user',
      content: userMessage,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply || !reply.trim()) {
      return NextResponse.json(
        { error: 'The AI returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { result: reply },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('OpenAI API request failed:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: 'The AI service request failed. Check the server logs.' },
        { status: error.status || 502 }
      );
    }

    return NextResponse.json(
      { error: 'Unable to process the request. Check the server logs.' },
      { status: 500 }
    );
  }
}
