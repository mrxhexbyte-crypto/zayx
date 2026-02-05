import { create } from 'zustand';
import { HintKey, Hint, getHint } from '@/lib/hints';

export interface HintState {
  currentHint: (Hint & { key: HintKey; id: string }) | null;
  shownHints: Set<HintKey>;
  showHint: (key: HintKey) => void;
  hideHint: () => void;
  clearHints: () => void;
}

export const useHintsStore = create<HintState>((set) => ({
  currentHint: null,
  shownHints: new Set(),
  
  showHint: (key: HintKey) => {
    const hint = getHint(key);
    const id = `${key}-${Date.now()}`;
    
    set((state) => ({
      currentHint: {
        ...hint,
        key,
        id,
      },
      shownHints: new Set([...state.shownHints, key]),
    }));

    // Auto-hide after duration
    const timer = setTimeout(() => {
      set((state) => {
        if (state.currentHint?.key === key) {
          return { currentHint: null };
        }
        return {};
      });
    }, hint.duration);

    return () => clearTimeout(timer);
  },

  hideHint: () => {
    set({ currentHint: null });
  },

  clearHints: () => {
    set({ currentHint: null, shownHints: new Set() });
  },
}));
