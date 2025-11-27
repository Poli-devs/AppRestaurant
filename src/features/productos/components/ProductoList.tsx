import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { SortableTableHeader } from '../../../components/SortableTableHeader';
import { Producto, useStore } from '../../../context/StoreContext';
import { useTableSort } from '../../../hooks/useTableSort';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface ProductoListProps {
  productos: Producto[];
  searchQuery?: string;
}

export function ProductoList({ productos, searchQuery = '' }: ProductoListProps) {
  const { state } = useStore();
  
  // Verificar si es el Admin del sistema para mostrar la columna de empresa
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Agregar campo virtual para ordenamiento por empresa
  const productosConCamposVirtuales = productos.map((producto) => ({
    ...producto,
    empresaNombre: state.empresas.find((e) => e.id === producto.empresaId)?.nombre || 'N/A',
  }));

  const { sortedData, sortOrder, handleSort, isSorting } = useTableSort(productosConCamposVirtuales, 'nombre');

  // Estados vacíos
  if (productos.length === 0 && searchQuery.length === 0) {
    return (
      <EmptyState
        icon="cube-outline"
        title="No hay productos registrados"
        subtitle='Presiona "Nuevo" para crear tu primer producto'
      />
    );
  }

  if (productos.length === 0 && searchQuery.length > 0) {
    return (
      <EmptyState icon="search-outline" title="No se encontraron resultados" subtitle="Intenta con otro término de búsqueda" />
    );
  }

  return (
    <View style={commonStyles.tableContainer}>
      {/* Header */}
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

        {isSystemAdmin && (
          <View style={[styles.headerCell, styles.empresaColumn]}>
            <SortableTableHeader
              field="empresaNombre"
              label="Empresa"
              onSort={handleSort}
              isSorting={isSorting('empresaNombre')}
              sortOrder={sortOrder}
            />
          </View>
        )}

        <View style={[styles.headerCell, styles.costColumn]}>
          <SortableTableHeader
            field="costoBase"
            label="Costo Base"
            onSort={handleSort}
            isSorting={isSorting('costoBase')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.priceColumn]}>
          <SortableTableHeader
            field="precioVenta"
            label="Precio Venta"
            onSort={handleSort}
            isSorting={isSorting('precioVenta')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.inventoryColumn]}>
          <SortableTableHeader
            field="inventario"
            label="Cantidad"
            onSort={handleSort}
            isSorting={isSorting('inventario')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.statusColumn]}>
          <Text style={styles.headerText}>Estado</Text>
        </View>
      </View>

      {/* Filas */}
      {sortedData.map((producto, index) => {
        const empresa = state.empresas.find(e => e.id === producto.empresaId);
        
        return (
          <View key={producto.id} style={commonStyles.tableRow}>
            <View style={[styles.cell, styles.numberColumn]}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.nameColumn]}>
              <Text style={styles.nameText}>{producto.nombre}</Text>
            </View>
            {isSystemAdmin && (
              <View style={[styles.cell, styles.empresaColumn]}>
                <Text style={styles.empresaText}>{empresa?.nombre || 'N/A'}</Text>
              </View>
            )}
            <View style={[styles.cell, styles.costColumn]}>
              <Text style={styles.costText}>${producto.costoBase.toFixed(2)}</Text>
            </View>
            <View style={[styles.cell, styles.priceColumn]}>
              <Text style={styles.priceText}>${producto.precioVenta.toFixed(2)}</Text>
            </View>
            <View style={[styles.cell, styles.inventoryColumn]}>
              <View style={[styles.inventoryBadge, producto.inventario === 0 && styles.inventoryBadgeEmpty]}>
                <Text style={[styles.inventoryText, producto.inventario === 0 && styles.inventoryTextEmpty]}>
                  {producto.inventario} unidades
                </Text>
              </View>
            </View>
            <View style={[styles.cell, styles.statusColumn]}>
              <View style={[styles.statusBadge, producto.inventario > 0 ? styles.statusActive : styles.statusInactive]}>
                <Text style={styles.statusText}>{producto.inventario > 0 ? 'Disponible' : 'Sin Stock'}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

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
    flex: 2,
  },
  empresaColumn: {
    flex: 1.5,
  },
  costColumn: {
    flex: 1,
  },
  priceColumn: {
    flex: 1,
  },
  inventoryColumn: {
    flex: 1.5,
  },
  statusColumn: {
    flex: 1,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
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
  empresaText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  costText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  inventoryBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  inventoryBadgeEmpty: {
    backgroundColor: '#fff3e0',
  },
  inventoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  inventoryTextEmpty: {
    color: '#e65100',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#e8f5e9',
  },
  statusInactive: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
});
