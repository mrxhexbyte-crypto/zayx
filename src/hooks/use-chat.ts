'use client';

import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  isReady: boolean;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(true);
  const messagesRef = useRef<ChatMessage[]>([]);

  // Update ref whenever messages change
  const updateMessages = useCallback((newMessages: ChatMessage[]) => {
    messagesRef.current = newMessages;
    setMessages(newMessages);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    // Validate input
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Add user message immediately
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date(),
      };

      const updatedMessages = [...messagesRef.current, userMessage];
      updateMessages(updatedMessages);

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: messagesRef.current,
        }),
      });

      if (!response.ok) {
        // Try to parse error response as JSON, with fallback to text
        let errorMessage = 'Failed to send message';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          }
        } catch (parseErr) {
          // If parsing fails, use status code message
          errorMessage = `Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      const data = await response.json();

      // Validate response data
      if (!data.reply) {
        throw new Error('No response from AI. Please try again.');
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      updateMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      let errorMessage = 'An error occurred';

      if (err instanceof TypeError) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error('Chat error:', err);

      // Remove the user message if API call failed
      updateMessages(messagesRef.current);
    } finally {
      setIsLoading(false);
    }
  }, [updateMessages]);

  const clearMessages = useCallback(() => {
    updateMessages([]);
    setError(null);
  }, [updateMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    isReady,
  };
}
