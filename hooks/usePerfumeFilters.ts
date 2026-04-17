import { useState, useMemo, useCallback } from 'react';
import { PerfumeData } from '@/types/sanity';

export interface UsePerfumeFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  filteredPerfumes: PerfumeData[];
}

export function usePerfumeFilters(initialPerfumes: PerfumeData[]): UsePerfumeFiltersReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Función auxiliar para alternar strings en los arrays
  const toggleItem = (currentItems: string[], item: string) => {
    return currentItems.includes(item)
      ? currentItems.filter((i) => i !== item)
      : [...currentItems, item];
  };

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => toggleItem(prev, tag));
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) => toggleItem(prev, brand));
  }, []);

  const filteredPerfumes = useMemo(() => {
    return initialPerfumes.filter((perfume) => {
      // 1. Filtro de Texto (Nombre o Inspiración)
      if (searchQuery.trim() !== '') {
        const queryLower = searchQuery.toLowerCase().trim();
        const nameMatches = perfume.name.toLowerCase().includes(queryLower);
        const inspiredByMatches = perfume.inspiredBy
          ? perfume.inspiredBy.toLowerCase().includes(queryLower)
          : false;

        if (!nameMatches && !inspiredByMatches) return false;
      }

      // 2. Filtro de Marcas
      if (selectedBrands.length > 0) {
        // Asume coincidencia exacta con el título de la marca
        const brandTitle = perfume.brand?.title || '';
        if (!selectedBrands.includes(brandTitle)) return false;
      }

      // 3. Filtro de Tags (Lógica AND estricta: debe contener TODOS los seleccionados)
      if (selectedTags.length > 0) {
        const perfumeTags = perfume.tags || [];
        const hasAllTags = selectedTags.every((selectedTag) =>
          perfumeTags.includes(selectedTag)
        );
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [initialPerfumes, searchQuery, selectedBrands, selectedTags]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    selectedBrands,
    toggleBrand,
    filteredPerfumes,
  };
}
