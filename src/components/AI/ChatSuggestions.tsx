'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export interface ChatSuggestion {
  id: string;
  text: string;
  emoji?: string;
}

interface ChatSuggestionsProps {
  suggestions: ChatSuggestion[];
  onSuggestionClick: (suggestion: ChatSuggestion) => void;
  isLoading?: boolean;
}

/**
 * Helpful suggestions that appear in the chat when idle
 * Shows contextual prompts to help users get started
 */
export function ChatSuggestions({
  suggestions,
  onSuggestionClick,
  isLoading = false,
}: ChatSuggestionsProps) {
  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
        <Lightbulb className="w-3 h-3" />
        <span>Try asking...</span>
      </div>
      
      <div className="px-4 space-y-2">
        {suggestions.map((suggestion) => (
          <motion.button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <span className="mr-2">{suggestion.emoji || '→'}</span>
            {suggestion.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Get contextual suggestions based on current page
 */
export function getContextualSuggestions(
  pathname: string
): ChatSuggestion[] {
  if (pathname.includes('/shop')) {
    return [
      {
        id: 'filter-price',
        text: 'Show me budget-friendly options',
        emoji: '💰',
      },
      {
        id: 'trending',
        text: 'What is trending right now?',
        emoji: '🔥',
      },
      {
        id: 'compare',
        text: 'Help me compare products',
        emoji: '⚖️',
      },
    ];
  }

  if (pathname.includes('/cart')) {
    return [
      {
        id: 'alternatives',
        text: 'Show me cheaper alternatives',
        emoji: '💵',
      },
      {
        id: 'recommendations',
        text: 'What else might I like?',
        emoji: '⭐',
      },
      {
        id: 'discounts',
        text: 'Any discounts available?',
        emoji: '🎉',
      },
    ];
  }

  // Default suggestions for homepage or other pages
  return [
    {
      id: 'browse',
      text: 'Help me find something',
      emoji: '🔍',
    },
    {
      id: 'trending',
      text: 'Show me what is trending',
      emoji: '🔥',
    },
    {
      id: 'question',
      text: 'I have a question',
      emoji: '❓',
    },
  ];
}
