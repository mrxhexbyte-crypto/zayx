'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isListening?: boolean;
}

export function VoiceInput({ onTranscript, isListening = false }: VoiceInputProps) {
  const [recording, setRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Check browser support for Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || 
                            (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // TODO: Send to OpenAI Whisper API for transcription
        console.log('Recording stopped', audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {recording ? (
        <Button
          onClick={stopRecording}
          size="sm"
          variant="destructive"
          className="gap-2"
        >
          <MicOff className="w-4 h-4" />
          Stop Recording
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <Mic className="w-4 h-4" />
          Voice Input
        </Button>
      )}

      {recording && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-6 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-red-500">Recording...</span>
        </div>
      )}
    </div>
  );
}
