import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { SortableTableHeader } from '../../../components/SortableTableHeader';
import { Empresa } from '../../../context/StoreContext';
import { useTableSort } from '../../../hooks/useTableSort';
import { commonStyles } from '../../../styles/commonStyles';

interface EmpresaListProps {
  empresas: Empresa[];
  searchQuery?: string;
}

export function EmpresaList({ empresas, searchQuery = '' }: EmpresaListProps) {
  const { sortedData, sortOrder, handleSort, isSorting } = useTableSort(empresas, 'nombre');

  // Estados vacíos
  if (empresas.length === 0 && searchQuery.length === 0) {
    return (
      <EmptyState
        icon="briefcase-outline"
        title="No hay empresas registradas"
        subtitle='Presiona "Nueva" para crear tu primera empresa'
      />
    );
  }

  if (empresas.length === 0 && searchQuery.length > 0) {
    return (
      <EmptyState
        icon="search-outline"
        title="No se encontraron resultados"
        subtitle="Intenta con otro término de búsqueda"
      />
    );
  }

  return (
    <View style={commonStyles.tableContainer}>
      {/* Header de la tabla con ordenamiento */}
      <View style={commonStyles.tableHeader}>
        <View style={[styles.headerCell, styles.numberColumn]}>
          <Text style={styles.headerText}>#</Text>
        </View>

        <View style={[styles.headerCell, styles.nameColumn]}>
          <SortableTableHeader
            field="nombre"
            label="Nombre"
            onSort={handleSort}
            isSorting={isSorting('nombre')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.rucColumn]}>
          <SortableTableHeader
            field="ruc"
            label="RUC"
            onSort={handleSort}
            isSorting={isSorting('ruc')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.addressColumn]}>
          <SortableTableHeader
            field="direccion"
            label="Dirección"
            onSort={handleSort}
            isSorting={isSorting('direccion')}
            sortOrder={sortOrder}
          />
        </View>
      </View>

      {/* Filas de la tabla */}
      {sortedData.map((item, index) => (
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
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
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
