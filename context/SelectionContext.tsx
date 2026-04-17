"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { PerfumeData } from "@/types/sanity";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectionItem {
  _id: string;
  name: string;
  brand?: string;
  price?: number | null;
  imageUrl?: string;
  slug: string;
}

interface SelectionState {
  items: SelectionItem[];
  /** The most-recently added item; cleared after the mini-drawer dismisses */
  lastAdded: SelectionItem | null;
}

type SelectionAction =
  | { type: "ADD"; item: SelectionItem }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "DISMISS_LAST" }
  | { type: "HYDRATE"; items: SelectionItem[] };

interface SelectionContextValue extends SelectionState {
  add: (product: PerfumeData) => void;
  remove: (id: string) => void;
  clear: () => void;
  dismissLast: () => void;
  isSelected: (id: string) => boolean;
  count: number;
  whatsappUrl: string;
}

// ─── Storage Key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "banu_seleccion_v1";
const WA_NUMBER = "5493814665503";

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case "ADD": {
      // Idempotent — never duplicate
      const already = state.items.some((i) => i._id === action.item._id);
      if (already) return { ...state, lastAdded: action.item };
      return {
        items: [...state.items, action.item],
        lastAdded: action.item,
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i._id !== action.id),
        lastAdded: state.lastAdded?._id === action.id ? null : state.lastAdded,
      };
    case "CLEAR":
      return { items: [], lastAdded: null };
    case "DISMISS_LAST":
      return { ...state, lastAdded: null };
    case "HYDRATE":
      return { items: action.items, lastAdded: null };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], lastAdded: null });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: SelectionItem[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // Corrupt data — silently ignore
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable — graceful degradation
    }
  }, [state.items]);

  const add = useCallback((product: PerfumeData) => {
    const item: SelectionItem = {
      _id: product._id,
      name: product.name,
      brand: product.brand?.title,
      price: product.price.isOnSale && product.price.discountPrice ? product.price.discountPrice : product.price.basePrice,
      imageUrl: product.imageUrl,
      slug: product.slug,
    };
    dispatch({ type: "ADD", item });
  }, []);

  const remove = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const dismissLast = useCallback(() => dispatch({ type: "DISMISS_LAST" }), []);
  const isSelected = useCallback(
    (id: string) => state.items.some((i) => i._id === id),
    [state.items]
  );

  const whatsappUrl = useMemo(() => {
    if (state.items.length === 0) return `https://wa.me/${WA_NUMBER}`;
    const lines = state.items.map((item) => {
      const brand = item.brand ? ` (${item.brand})` : "";
      const price = item.price && item.price > 0 ? ` — USD ${item.price}` : "";
      return `· ${item.name}${brand}${price}`;
    });
    const body = [
      "Hola Banū, estoy interesado en los siguientes perfumes:",
      "",
      ...lines,
      "",
      "¿Podrían asesorarme? Gracias.",
    ].join("\n");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
  }, [state.items]);

  const value: SelectionContextValue = {
    ...state,
    add,
    remove,
    clear,
    dismissLast,
    isSelected,
    count: state.items.length,
    whatsappUrl,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within <SelectionProvider>");
  }
  return ctx;
}
