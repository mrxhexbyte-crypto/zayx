import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

/**
 * Root Store Architecture
 * 
 * This implements a composition pattern where each domain has its own slice.
 * Benefits:
 * - Modular state management
 * - Each slice can be tested independently
 * - Easy to scale and maintain
 * - Type-safe throughout the app
 */

// ==================== UI STATE ====================
export interface UIState {
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  notification: {
    visible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null;
  modal: {
    open: boolean;
    type: string;
    data?: any;
  } | null;

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  showNotification: (type: string, message: string) => void;
  hideNotification: () => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

export const createUIStore = () =>
  create<UIState>()(
    persist(
      (set) => ({
        theme: 'auto',
        sidebarOpen: true,
        notification: null,
        modal: null,

        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
        showNotification: (type, message) =>
          set({
            notification: { visible: true, type: type as any, message },
          }),
        hideNotification: () => set({ notification: null }),
        
        openModal: (type, data) => set({ modal: { open: true, type, data } }),
        closeModal: () => set({ modal: null }),
      }),
      {
        name: 'ui-store',
        version: 1,
      }
    )
  );

// ==================== USER STATE ====================
export interface UserState {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin' | 'seller';
    preferences: {
      emailNotifications: boolean;
      pushNotifications: boolean;
      newsletter: boolean;
    };
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: UserState['user']) => void;
  updatePreferences: (prefs: Partial<NonNullable<UserState['user']>['preferences']>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const createUserStore = () =>
  create<UserState>()(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),

        updatePreferences: (prefs) =>
          set((state) => {
            if (state.user) {
              state.user.preferences = { ...state.user.preferences, ...prefs };
            }
          }),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),

        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'user-store',
        version: 1,
      }
    )
  );

// ==================== APP STATE ====================
export interface AppState {
  initialized: boolean;
  error: string | null;
  
  // Actions
  setInitialized: (initialized: boolean) => void;
  setError: (error: string | null) => void;
}

export const createAppStore = () =>
  create<AppState>()((set) => ({
    initialized: false,
    error: null,

    setInitialized: (initialized) => set({ initialized }),
    setError: (error) => set({ error }),
  }));

// ==================== ROOT STORE COMPOSITION ====================
export interface RootStore extends UIState, UserState, AppState {}

/**
 * Create combined root store
 * This allows accessing all slices from a single hook
 */
export const useRootStore = create<RootStore>()(
  immer(
    persist(
      (set, get) => {
        const uiStore = createUIStore();
        const userStore = createUserStore();
        const appStore = createAppStore();

        return {
          // UI State
          theme: 'auto',
          sidebarOpen: true,
          notification: null,
          modal: null,
          setTheme: (theme) => set((state) => { state.theme = theme; }),
          toggleSidebar: () => set((state) => { state.sidebarOpen = !state.sidebarOpen; }),
          setSidebarOpen: (open) => set((state) => { state.sidebarOpen = open; }),
          showNotification: (type, message) => set((state) => {
            state.notification = { visible: true, type: type as any, message };
          }),
          hideNotification: () => set((state) => { state.notification = null; }),
          openModal: (type, data) => set((state) => { state.modal = { open: true, type, data }; }),
          closeModal: () => set((state) => { state.modal = null; }),

          // User State
          user: null,
          isAuthenticated: false,
          isLoading: false,
          setUser: (user) => set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),
          updatePreferences: (prefs) => set((state) => {
            if (state.user) {
              state.user.preferences = { ...state.user.preferences, ...prefs };
            }
          }),
          logout: () => set((state) => {
            state.user = null;
            state.isAuthenticated = false;
          }),
          setLoading: (loading) => set((state) => { state.isLoading = loading; }),

          // App State
          initialized: false,
          error: null,
          setInitialized: (initialized) => set((state) => { state.initialized = initialized; }),
          setError: (error) => set((state) => { state.error = error; }),
        };
      },
      {
        name: 'root-store',
        version: 1,
      }
    )
  )
);

// Separate hooks for each domain (better performance - only re-render when that slice changes)
export const useUI = () => useRootStore((state) => ({
  theme: state.theme,
  sidebarOpen: state.sidebarOpen,
  notification: state.notification,
  modal: state.modal,
  setTheme: state.setTheme,
  toggleSidebar: state.toggleSidebar,
  setSidebarOpen: state.setSidebarOpen,
  showNotification: state.showNotification,
  hideNotification: state.hideNotification,
  openModal: state.openModal,
  closeModal: state.closeModal,
}));

export const useUser = () => useRootStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
  setUser: state.setUser,
  updatePreferences: state.updatePreferences,
  logout: state.logout,
  setLoading: state.setLoading,
}));

export const useApp = () => useRootStore((state) => ({
  initialized: state.initialized,
  error: state.error,
  setInitialized: state.setInitialized,
  setError: state.setError,
}));
