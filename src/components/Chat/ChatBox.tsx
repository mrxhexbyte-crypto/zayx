// File: src/components/Chat/ChatBox.tsx
'use client';
import React, { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState<{ id: string; text: string; from: 'me' | 'bot' }[]>([]);
  const [value, setValue] = useState('');

  function send() {
    if (!value.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), text: value.trim(), from: 'me' }]);
    setValue('');
    setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now() + 1), text: 'This is a demo reply.', from: 'bot' }]);
    }, 600);
  }

  return (
    <div className="max-w-md mx-auto border rounded-md p-4 bg-white dark:bg-slate-900">
      <div className="h-48 overflow-auto mb-3 space-y-2">
        {messages.length === 0 ? <div className="text-sm text-slate-500">No messages yet.</div> : null}
        {messages.map((m) => (
          <div key={m.id} className={`p-2 rounded ${m.from === 'me' ? 'bg-indigo-50 text-right' : 'bg-slate-100'}`}>
            <div className="text-sm">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
          placeholder="Type a message..."
        />
        <button onClick={send} className="rounded-md bg-indigo-600 px-4 py-2 text-white">Send</button>
      </div>
    </div>
  );
}
