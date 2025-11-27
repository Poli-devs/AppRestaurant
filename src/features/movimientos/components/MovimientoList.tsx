import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { SortableTableHeader } from '../../../components/SortableTableHeader';
import { Movimiento, Producto, useStore } from '../../../context/StoreContext';
import { useTableSort } from '../../../hooks/useTableSort';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface MovimientoListProps {
  movimientos: Movimiento[];
  productos: Producto[];
  searchQuery?: string;
}

export function MovimientoList({ movimientos, productos, searchQuery = '' }: MovimientoListProps) {
  const { state } = useStore();
  
  // Verificar si es el Admin del sistema para mostrar la columna de empresa
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Agregar campos virtuales para ordenamiento
  const movimientosConCamposVirtuales = movimientos.map((movimiento) => {
    const producto = productos.find((p) => p.id === movimiento.productoId);
    const empresa = state.empresas.find((e) => e.id === producto?.empresaId);
    return {
      ...movimiento,
      productoNombre: producto?.nombre || 'N/A',
      empresaNombre: empresa?.nombre || 'N/A',
    };
  });

  const { sortedData, sortOrder, handleSort, isSorting } = useTableSort(movimientosConCamposVirtuales, 'fecha');

  // Estados vacíos
  if (movimientos.length === 0 && searchQuery.length === 0) {
    return (
      <EmptyState
        icon="swap-vertical-outline"
        title="No hay movimientos registrados"
        subtitle='Presiona "Nuevo" para registrar tu primera entrada de inventario'
      />
    );
  }

  if (movimientos.length === 0 && searchQuery.length > 0) {
    return (
      <EmptyState icon="search-outline" title="No se encontraron resultados" subtitle="Intenta con otro término de búsqueda" />
    );
  }

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={commonStyles.tableContainer}>
      {/* Header */}
      <View style={commonStyles.tableHeader}>
        <View style={[styles.headerCell, styles.numberColumn]}>
          <Text style={styles.headerText}>#</Text>
        </View>

        <View style={[styles.headerCell, styles.productoColumn]}>
          <SortableTableHeader
            field="productoNombre"
            label="Producto"
            onSort={handleSort}
            isSorting={isSorting('productoNombre')}
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

        <View style={[styles.headerCell, styles.tipoColumn]}>
          <SortableTableHeader
            field="tipo"
            label="Tipo"
            onSort={handleSort}
            isSorting={isSorting('tipo')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.cantidadColumn]}>
          <SortableTableHeader
            field="cantidad"
            label="Cantidad"
            onSort={handleSort}
            isSorting={isSorting('cantidad')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.fechaColumn]}>
          <SortableTableHeader field="fecha" label="Fecha" onSort={handleSort} isSorting={isSorting('fecha')} sortOrder={sortOrder} />
        </View>
      </View>

      {/* Filas */}
      {sortedData.map((movimiento, index) => {
        const producto = productos.find((p) => p.id === movimiento.productoId);
        const empresa = state.empresas.find((e) => e.id === producto?.empresaId);

        return (
          <View key={movimiento.id} style={commonStyles.tableRow}>
            <View style={[styles.cell, styles.numberColumn]}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.productoColumn]}>
              <Text style={styles.productoText}>{producto?.nombre || 'N/A'}</Text>
            </View>
            {isSystemAdmin && (
              <View style={[styles.cell, styles.empresaColumn]}>
                <Text style={styles.empresaText}>{empresa?.nombre || 'N/A'}</Text>
              </View>
            )}
            <View style={[styles.cell, styles.tipoColumn]}>
              <View style={styles.tipoBadge}>
                <Text style={styles.tipoText}>{movimiento.tipo}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.cantidadColumn]}>
              <Text style={styles.cantidadText}>+{movimiento.cantidad}</Text>
            </View>
            <View style={[styles.cell, styles.fechaColumn]}>
              <Text style={styles.fechaText}>{formatFecha(movimiento.fecha)}</Text>
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
  productoColumn: {
    flex: 2,
  },
  empresaColumn: {
    flex: 1.5,
  },
  tipoColumn: {
    flex: 1,
  },
  cantidadColumn: {
    flex: 1,
  },
  fechaColumn: {
    flex: 1.5,
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
  productoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  empresaText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  tipoBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tipoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  cantidadText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  fechaText: {
    fontSize: 13,
    color: '#666',
  },
});
