'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AIAvatarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAvatar({ isOpen, onClose }: AIAvatarProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(transcript);
          sendVoiceMessage(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('Error listening. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const sendVoiceMessage = async (message: string) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: [],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.reply);
        // Optional: Use text-to-speech to read the response
        speakResponse(data.reply);
      }
    } catch (error) {
      console.error('Voice message error:', error);
    }
  };

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-b from-slate-800 to-slate-900 border border-cyan-400/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <p className="text-xs text-cyan-100">Voice enabled</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Display */}
        <div className="p-6 flex flex-col items-center justify-center min-h-64 bg-gradient-to-b from-slate-800/50 to-slate-900">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4 ${
            isSpeaking ? 'animate-pulse scale-110' : ''
          } transition-all`}>
            <Volume2 className="w-12 h-12 text-white" />
          </div>

          <div className="text-center">
            <p className="text-slate-300 text-sm font-semibold mb-2">
              {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready to chat'}
            </p>
            {transcript && (
              <p className="text-cyan-400 text-sm mb-2">You said: {transcript}</p>
            )}
            {response && (
              <p className="text-slate-200 text-sm italic bg-slate-700/50 p-3 rounded">
                {response}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-slate-700 space-y-3">
          <Button
            onClick={startListening}
            disabled={isListening || isSpeaking}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white gap-2 font-semibold"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Start Voice Chat
              </>
            )}
          </Button>

          <div className="text-center text-xs text-slate-400">
            💡 Tip: Speak naturally to ask questions or find products
          </div>
        </div>
      </Card>
    </div>
  );
}
