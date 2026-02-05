'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { useVoice } from '@/hooks/use-voice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SendIcon, Mic, X, MessageCircle, Volume2, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSuggestions, getContextualSuggestions } from '@/components/AI/ChatSuggestions';
import { usePathname } from 'next/navigation';

interface ChatBoxProps {
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'bottom-right' | 'center';
}

export function ChatBox({ isOpen: initialOpen = true, onClose, position = 'bottom-right' }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, error, sendMessage, clearMessages, isReady } = useChat();
  const { isListening, isGenerating, transcript, startListening, stopListening, playAudio } = useVoice();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const suggestions = getContextualSuggestions(pathname);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending message
  const handleSend = async (text?: string) => {
    const messageToSend = text || inputValue.trim();
    if (!messageToSend) return;

    await sendMessage(messageToSend);
    setInputValue('');
  };

  // Handle voice input
  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        handleSend(transcript);
      }
    } else {
      startListening();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`fixed ${
          position === 'bottom-right' 
            ? 'bottom-6 right-6' 
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        } w-96 h-[600px] z-50`}
      >
        <Card className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-lg text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-between py-4">
                <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                  <MessageCircle className="w-12 h-12 opacity-20 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Hi! I am here to help
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Ask me anything about our products
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="w-full">
                  <ChatSuggestions
                    suggestions={suggestions}
                    onSuggestionClick={(suggestion) => {
                      handleSend(suggestion.text);
                    }}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={`${msg.role}-${idx}-${msg.timestamp?.getTime()}`}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => playAudio(msg.content)}
                          disabled={isGenerating}
                          className="mt-2 p-1 hover:opacity-70 transition-opacity text-xs"
                          title="Play audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm space-y-2"
            >
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-semibold">⚠️ Error:</span>
                <p className="flex-1">{error}</p>
              </div>
              <button
                onClick={() => {
                  clearMessages();
                }}
                className="text-xs text-red-700 dark:text-red-300 hover:underline mt-1"
              >
                Clear chat and try again
              </button>
            </motion.div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div className="px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 border-t border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 text-sm">
              Listening: {transcript}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-b-lg space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading && isReady) {
                    handleSend();
                  }
                }}
                disabled={isLoading}
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !inputValue.trim() || !isReady}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2"
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Voice Button */}
            <Button
              onClick={handleVoiceClick}
              variant={isListening ? 'destructive' : 'outline'}
              className="w-full gap-2"
              disabled={isLoading || isGenerating}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening ? 'Stop Listening' : 'Speak'}
            </Button>

            {/* Clear Button */}
            {messages.length > 0 && (
              <Button
                onClick={clearMessages}
                variant="ghost"
                className="w-full text-xs"
                disabled={isLoading}
              >
                Clear History
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
