import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an intelligent e-commerce assistant for Zayx Store. Your role is to:
1. Help customers find products they're looking for
2. Answer questions about products, shipping, and returns
3. Provide personalized recommendations based on customer interests
4. Be friendly, helpful, and professional
5. Keep responses concise (under 200 words)
6. If asked about products, suggest checking our catalog
7. Always be honest if you don't know something

Remember: You're representing a modern, AI-powered e-commerce platform.`;

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    // If API key is missing, provide a demo response
    if (!OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY not configured. Using demo response.');

      // Generate a simple demo response based on user message
      const demoReply = generateDemoResponse(message);

      return NextResponse.json({
        reply: demoReply,
        isDemoMode: true,
        conversationHistory: [
          ...conversationHistory,
          { role: 'user', content: message },
          { role: 'assistant', content: demoReply }
        ]
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    // Build message array with conversation history
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: message }
    ];

    // Create chat completion
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content ?? '';

    if (!reply) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      ]
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Invalid API key configuration. Please check your OpenAI API key.' },
          { status: 401 }
        );
      }
      if (error.message.includes('rate_limit') || error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}

// Demo response generator for when API key is not configured
function generateDemoResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return '💰 Our products range from $99 to $499. You can filter by price in the shop. Would you like recommendations in a specific price range?';
  }

  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
    return '📦 We offer free shipping on orders over $100. Standard delivery takes 5-7 business days. Express delivery is available for an additional fee.';
  }

  if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
    return '↩️ We offer a 30-day money-back guarantee. If you\'re not satisfied, you can return any product for a full refund. No questions asked!';
  }

  if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
    return '🛍️ We have over 200 premium products in our catalog. Check out our featured section to see bestsellers and new arrivals. What type of product are you looking for?';
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return '🤝 I\'m here to help! You can ask me about products, pricing, shipping, returns, or anything else. How can I assist you today?';
  }

  return '👋 Thanks for reaching out! I\'m your AI shopping assistant. I can help you find products, answer questions about pricing and shipping, or provide recommendations. What would you like to know?';
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Chat API is running',
    models: ['gpt-4o-mini']
  });
}
