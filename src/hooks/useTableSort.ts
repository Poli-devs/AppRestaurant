import { useState } from 'react';

/**
 * Hook personalizado para manejar el ordenamiento de tablas
 * Reutilizable en cualquier lista/tabla que necesite ordenamiento
 */
export function useTableSort<T extends Record<string, any>>(
  data: T[],
  defaultSortField: keyof T,
  defaultSortOrder: 'asc' | 'desc' = 'asc'
) {
  const [sortField, setSortField] = useState<keyof T>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(defaultSortOrder);

  // Función para ordenar los datos
  const sortData = (data: T[]): T[] => {
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      let comparison = 0;

      // Comparación de strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }
      // Comparación de números
      else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      }
      // Otros tipos
      else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Manejar click en encabezado
  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar dirección
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un campo nuevo, ordenar ascendente
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Verificar si un campo está siendo ordenado
  const isSorting = (field: keyof T): boolean => {
    return sortField === field;
  };

  return {
    sortedData: sortData(data),
    sortField,
    sortOrder,
    handleSort,
    isSorting,
  };
}
