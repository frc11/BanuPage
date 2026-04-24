import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectionItem {
  id: string;       // _id de Sanity
  name: string;
  brand: string;
  price: number;
  slug: string;
  imageUrl: string; // URL ya resuelta con urlFor()
}

export interface Toast {
  id: string;
  message: string;
  variant: 'success' | 'info' | 'error';
}

interface SelectionStore {
  items: SelectionItem[];
  isOpen: boolean;
  toasts: Toast[];

  // Actions
  addItem: (item: SelectionItem) => void;
  removeItem: (id: string) => void;
  clearSelection: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToast: (message: string, variant?: Toast['variant']) => void;
  removeToast: (id: string) => void;

  // Computed (implementados como getters para acceso sin selector)
  totalItems: () => number;
  generateWhatsAppUrl: () => string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_NUMBER = '5493814665503';

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toasts: [],

      addToast: (message, variant = 'info') => {
        const id = Math.random().toString(36).slice(2);
        set((state) => ({ toasts: [...state.toasts, { id, message, variant }] }));
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 3000);
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      addItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) return;
        set((state) => ({ items: [...state.items, item] }));
        get().addToast('Agregado a tu selección', 'success');
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
        get().addToast('Eliminado de tu selección', 'info');
      },

      clearSelection: () => set({ items: [] }),

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      totalItems: () => get().items.length,

      generateWhatsAppUrl: () => {
        const { items } = get();
        if (items.length === 0) return `https://wa.me/${WA_NUMBER}`;

        const list = items
          .map((item) => {
            const price = item.price > 0 ? ` — ARS ${item.price.toLocaleString("es-AR")}` : '';
            const brand = item.brand ? ` (${item.brand})` : '';
            return `· ${item.name}${brand}${price}`;
          })
          .join('\n');

        const message = [
          'Hola Banū, estoy interesado en los siguientes perfumes:',
          '',
          list,
          '',
          '¿Podrían asesorarme? Gracias.',
        ].join('\n');

        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
      },
    }),
    {
      name: 'banu-selection',
      // Solo persistir items — isOpen siempre arranca en false tras un reload
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ─── Helper Hooks (selectors granulares) ─────────────────────────────────────

/** Devuelve el total de items — suscripción optimizada, re-render solo cuando cambia el count */
export const useSelectionCount = () =>
  useSelectionStore((state) => state.items.length);

/** Devuelve true si el producto con `id` ya está en la selección */
export const useIsInSelection = (id: string) =>
  useSelectionStore((state) => state.items.some((i) => i.id === id));
