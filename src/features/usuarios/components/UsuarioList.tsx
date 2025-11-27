import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { SortableTableHeader } from '../../../components/SortableTableHeader';
import { Empresa, Rol, Usuario } from '../../../context/StoreContext';
import { useTableSort } from '../../../hooks/useTableSort';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface UsuarioListProps {
  usuarios: Usuario[];
  empresas: Empresa[];
  roles: Rol[];
  searchQuery?: string;
}

export function UsuarioList({ usuarios, empresas, roles, searchQuery = '' }: UsuarioListProps) {
  // Agregar campos virtuales para ordenamiento
  const usuariosConCamposVirtuales = usuarios.map((usuario) => ({
    ...usuario,
    empresaNombre: empresas.find((e) => e.id === usuario.empresaId)?.nombre || 'N/A',
    rolNombre: roles.find((r) => r.id === usuario.rolId)?.nombre || 'N/A',
  }));

  const { sortedData, sortOrder, handleSort, isSorting } = useTableSort(usuariosConCamposVirtuales, 'nombre');

  // Helper para obtener nombre de empresa
  const getEmpresaNombre = (empresaId: string): string => {
    const empresa = empresas.find((e) => e.id === empresaId);
    return empresa?.nombre || 'N/A';
  };

  // Helper para obtener nombre de rol
  const getRolNombre = (rolId: string): string => {
    const rol = roles.find((r) => r.id === rolId);
    return rol?.nombre || 'N/A';
  };

  // Estados vacíos
  if (usuarios.length === 0 && searchQuery.length === 0) {
    return (
      <EmptyState
        icon="people-outline"
        title="No hay usuarios registrados"
        subtitle='Presiona "Nuevo" para crear tu primer usuario'
      />
    );
  }

  if (usuarios.length === 0 && searchQuery.length > 0) {
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

        <View style={[styles.headerCell, styles.emailColumn]}>
          <SortableTableHeader
            field="email"
            label="Email"
            onSort={handleSort}
            isSorting={isSorting('email')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.empresaColumn]}>
          <SortableTableHeader
            field="empresaNombre"
            label="Empresa"
            onSort={handleSort}
            isSorting={isSorting('empresaNombre')}
            sortOrder={sortOrder}
          />
        </View>

        <View style={[styles.headerCell, styles.rolColumn]}>
          <SortableTableHeader
            field="rolNombre"
            label="Rol"
            onSort={handleSort}
            isSorting={isSorting('rolNombre')}
            sortOrder={sortOrder}
          />
        </View>
      </View>

      {/* Filas */}
      {sortedData.map((usuario, index) => (
        <View key={usuario.id} style={commonStyles.tableRow}>
          <View style={[styles.cell, styles.numberColumn]}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
          </View>
          <View style={[styles.cell, styles.nameColumn]}>
            <Text style={styles.nameText}>{usuario.nombre}</Text>
          </View>
          <View style={[styles.cell, styles.emailColumn]}>
            <Text style={styles.emailText}>{usuario.email}</Text>
          </View>
          <View style={[styles.cell, styles.empresaColumn]}>
            <Text style={styles.empresaText}>{getEmpresaNombre(usuario.empresaId)}</Text>
          </View>
          <View style={[styles.cell, styles.rolColumn]}>
            <View style={styles.rolBadge}>
              <Text style={styles.rolText}>{getRolNombre(usuario.rolId)}</Text>
            </View>
          </View>
        </View>
      ))}
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
    flex: 1.2,
  },
  emailColumn: {
    flex: 1.5,
  },
  empresaColumn: {
    flex: 1.2,
  },
  rolColumn: {
    width: 120,
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
  emailText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  empresaText: {
    fontSize: 14,
    color: '#666',
  },
  rolBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rolText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
