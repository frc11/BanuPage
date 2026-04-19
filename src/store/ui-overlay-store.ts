import { create } from 'zustand';

interface UiOverlayStore {
  isNavDrawerOpen: boolean;
  isSearchOpen: boolean;
  setNavDrawerOpen: (isOpen: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  reset: () => void;
}

export const useUiOverlayStore = create<UiOverlayStore>((set) => ({
  isNavDrawerOpen: false,
  isSearchOpen: false,
  setNavDrawerOpen: (isOpen) => set({ isNavDrawerOpen: isOpen }),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  reset: () => set({ isNavDrawerOpen: false, isSearchOpen: false }),
}));
