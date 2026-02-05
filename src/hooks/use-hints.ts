import { useHintsStore } from '@/store/hints.store';
import { HintKey, getHint } from '@/lib/hints';
import { useEffect } from 'react';

/**
 * Hook to trigger hints after a delay
 * Useful for showing hints when a page/component mounts
 */
export function useHint(key: HintKey, shouldShow: boolean = true) {
  const { showHint } = useHintsStore();
  const hint = getHint(key);

  useEffect(() => {
    if (!shouldShow) return;

    const timer = setTimeout(() => {
      showHint(key);
    }, hint.delay);

    return () => clearTimeout(timer);
  }, [key, shouldShow, showHint, hint.delay]);
}

/**
 * Hook to trigger multiple hints in sequence
 */
export function useHintSequence(hints: HintKey[], enabled: boolean = true) {
  const { showHint } = useHintsStore();

  useEffect(() => {
    if (!enabled || hints.length === 0) return;

    let cumulativeDelay = 0;
    const timers: NodeJS.Timeout[] = [];

    hints.forEach((key) => {
      const hint = getHint(key);
      cumulativeDelay += hint.delay + hint.duration;

      const timer = setTimeout(() => {
        showHint(key);
      }, cumulativeDelay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [hints, enabled, showHint]);
}

/**
 * Hook to get all hint store functions
 */
export function useHints() {
  return useHintsStore();
}
