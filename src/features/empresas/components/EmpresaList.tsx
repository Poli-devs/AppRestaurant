import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Empresa } from '../../../context/StoreContext';
import { colors, commonStyles } from '../../../styles/commonStyles';

// Tabla con ordenamiento clickeable por columnas
type SortField = 'nombre' | 'ruc' | 'direccion';
type SortOrder = 'asc' | 'desc';

interface EmpresaListProps {
  empresas: Empresa[];
  searchQuery?: string;
}

export function EmpresaList({ empresas, searchQuery = '' }: EmpresaListProps) {
  const [sortField, setSortField] = useState<SortField>('nombre');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Ordena empresas según campo y dirección seleccionados
  const sortEmpresas = (empresas: Empresa[]): Empresa[] => {
    return [...empresas].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'nombre') {
        comparison = a.nombre.localeCompare(b.nombre);
      } else if (sortField === 'ruc') {
        comparison = a.ruc.localeCompare(b.ruc);
      } else if (sortField === 'direccion') {
        comparison = a.direccion.localeCompare(b.direccion);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Manejar click en encabezado
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar dirección
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un campo nuevo, ordenar ascendente
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Renderizar icono de ordenamiento
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <Text style={styles.sortIcon}>⇅</Text>;
    }
    return <Text style={styles.sortIconActive}>{sortOrder === 'asc' ? '↑' : '↓'}</Text>;
  };

  const empresasOrdenadas = sortEmpresas(empresas);
  if (empresas.length === 0 && searchQuery.length === 0) {
    return (
      <View style={commonStyles.emptyContainer}>
        <Ionicons name="briefcase-outline" size={64} color={colors.textMuted} style={{ marginBottom: 16 }} />
        <Text style={commonStyles.emptyText}>No hay empresas registradas</Text>
        <Text style={commonStyles.emptySubtext}>Presiona "Nueva" para crear tu primera empresa</Text>
      </View>
    );
  }

  if (empresas.length === 0 && searchQuery.length > 0) {
    return (
      <View style={commonStyles.emptyContainer}>
        <Ionicons name="search-outline" size={64} color={colors.textMuted} style={{ marginBottom: 16 }} />
        <Text style={commonStyles.emptyText}>No se encontraron resultados</Text>
        <Text style={commonStyles.emptySubtext}>Intenta con otro término de búsqueda</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.tableContainer}>
      {/* Header de la tabla con ordenamiento */}
      <View style={commonStyles.tableHeader}>
        <View style={[styles.headerCell, styles.numberColumn]}>
          <Text style={styles.headerText}>#</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.headerCell, styles.nameColumn, styles.sortableHeader]}
          onPress={() => handleSort('nombre')}
        >
          <Text style={styles.headerText}>Nombre</Text>
          {renderSortIcon('nombre')}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.headerCell, styles.rucColumn, styles.sortableHeader]}
          onPress={() => handleSort('ruc')}
        >
          <Text style={styles.headerText}>RUC</Text>
          {renderSortIcon('ruc')}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.headerCell, styles.addressColumn, styles.sortableHeader]}
          onPress={() => handleSort('direccion')}
        >
          <Text style={styles.headerText}>Dirección</Text>
          {renderSortIcon('direccion')}
        </TouchableOpacity>
      </View>

      {/* Filas de la tabla */}
      {empresasOrdenadas.map((item, index) => (
        <View key={item.id} style={commonStyles.tableRow}>
          <View style={[styles.cell, styles.numberColumn]}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
          </View>
          <View style={[styles.cell, styles.nameColumn]}>
            <Text style={styles.nameText}>{item.nombre}</Text>
          </View>
          <View style={[styles.cell, styles.rucColumn]}>
            <Text style={styles.rucText}>{item.ruc}</Text>
          </View>
          <View style={[styles.cell, styles.addressColumn]}>
            <Text style={styles.addressText}>{item.direccion}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// Estilos locales (solo los específicos de esta tabla)
const styles = StyleSheet.create({
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortableHeader: {
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
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberColumn: {
    width: 50,
  },
  nameColumn: {
    flex: 1,
  },
  rucColumn: {
    width: 180,
  },
  addressColumn: {
    flex: 1,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  rucText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
