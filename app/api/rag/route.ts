import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    // Check API key when a request arrives
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is missing in environment variables.' },
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
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
        {
          role: 'user',
          content:
            typeof context === 'string' && context.trim()
              ? `Context:\n${context}\n\nQuestion:\n${prompt}`
              : prompt,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
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

    const message =
      error instanceof Error
        ? error.message
        : 'Error generating response';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

