import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface SortableTableHeaderProps<T> {
  field: keyof T;
  label: string;
  onSort: (field: keyof T) => void;
  isSorting: boolean;
  sortOrder: 'asc' | 'desc';
  style?: ViewStyle;
}

/**
 * Componente reutilizable para encabezados de tabla con ordenamiento
 * Muestra flechas de ordenamiento y maneja clicks
 */
export function SortableTableHeader<T>({
  field,
  label,
  onSort,
  isSorting,
  sortOrder,
  style,
}: SortableTableHeaderProps<T>) {
  const renderSortIcon = () => {
    if (!isSorting) {
      return <Text style={styles.sortIcon}>⇅</Text>;
    }
    return <Text style={styles.sortIconActive}>{sortOrder === 'asc' ? '↑' : '↓'}</Text>;
  };

  return (
    <TouchableOpacity style={[styles.header, style]} onPress={() => onSort(field)}>
      <Text style={styles.headerText}>{label}</Text>
      {renderSortIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
  },
  sortIcon: {
    fontSize: 14,
    color: colors.textMuted,
  },
  sortIconActive: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
