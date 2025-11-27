import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

/**
 * Componente reutilizable para mostrar estados vacíos
 * Usado cuando no hay datos o no hay resultados de búsqueda
 */
export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={commonStyles.emptyContainer}>
      <Ionicons name={icon} size={64} color={colors.textMuted} style={{ marginBottom: 16 }} />
      <Text style={commonStyles.emptyText}>{title}</Text>
      <Text style={commonStyles.emptySubtext}>{subtitle}</Text>
    </View>
  );
}
