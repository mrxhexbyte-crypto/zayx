import { NextRequest, NextResponse } from 'next/server';

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Build conversation for the model
    const systemMessage = `You are a helpful AI shopping assistant for Zayx Store. Your role is to:
1. Help customers find products
2. Answer questions about products, pricing, and shipping
3. Provide personalized recommendations
4. Assist with orders and returns
5. Be friendly, professional, and helpful

When suggesting products, try to understand the customer's needs and budget.
Always maintain a positive and supportive tone. Keep responses concise and helpful.`;

    // Prepare messages for the API
    const messages = [
      { role: 'system', content: systemMessage },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    // Use free Hugging Face Inference API
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('HF API error:', errorData);

      // Fallback response if API fails
      return NextResponse.json(
        {
          success: true,
          reply: "I'm temporarily experiencing issues. Feel free to browse our products or check back soon!",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here to help! What product are you looking for?";

    return NextResponse.json(
      {
        success: true,
        reply,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    // Fallback response
    return NextResponse.json(
      {
        success: true,
        reply: "I'm here to help! Feel free to ask about our products, pricing, or how I can assist you today.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
