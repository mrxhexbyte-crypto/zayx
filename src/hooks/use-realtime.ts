'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeOptions {
  table: string;
  filter?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
}

export function useRealtime(options: UseRealtimeOptions) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Only subscribe if Supabase is configured
    if (!supabase) {
      setIsConnected(false);
      return;
    }

    const channelName = `${options.table}:${options.filter || '*'}`;

    const newChannel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: options.table,
          ...(options.filter && { filter: options.filter }),
        },
        payload => {
          options.onInsert?.(payload);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: options.table,
          ...(options.filter && { filter: options.filter }),
        },
        payload => {
          options.onUpdate?.(payload);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: options.table,
          ...(options.filter && { filter: options.filter }),
        },
        payload => {
          options.onDelete?.(payload);
        }
      )
      .subscribe(status => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    setChannel(newChannel);

    return () => {
      if (newChannel && supabase) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [options]);

  return { channel, isConnected };
}
