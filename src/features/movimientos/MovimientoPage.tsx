import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors, commonStyles } from '../../styles/commonStyles';
import MovimientoContainer from './MovimientoContainer';
import { MovimientoList } from './components/MovimientoList';
import { useMovimiento } from './hooks/useMovimiento';

/**
 * Pantalla principal de gestión de movimientos de inventario
 * Incluye: buscador, tabla de movimientos y modal para registrar entradas
 */
export default function MovimientoPage() {
  const { movimientos, productos } = useMovimiento();
  const { state } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Todos los roles pueden registrar movimientos
  const canCreateMovimiento = true;

  // Filtrado en tiempo real por nombre de producto
  const movimientosFiltrados = movimientos.filter((movimiento) => {
    const producto = productos.find((p) => p.id === movimiento.productoId);
    return producto?.nombre.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={commonStyles.pageContainer}>
      <View style={commonStyles.contentWrapper}>
        {/* Barra de búsqueda y botón */}
        <View style={commonStyles.searchRow}>
          <View style={commonStyles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              style={commonStyles.searchInput}
              placeholder="Buscar por nombre del producto..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
          {canCreateMovimiento && (
            <TouchableOpacity style={commonStyles.actionButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={commonStyles.actionButtonText}>Nuevo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de movimientos */}
        <MovimientoList movimientos={movimientosFiltrados} productos={productos} searchQuery={searchQuery} />
      </View>

      {/* Modal para registrar movimiento */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={commonStyles.modalOverlay}>
          <TouchableOpacity style={commonStyles.modalBackdrop} activeOpacity={1} onPress={() => setModalVisible(false)} />
          <View style={commonStyles.modalContent}>
            <View style={commonStyles.modalHeader}>
              <Text style={commonStyles.modalTitle}>Registrar Entrada de Inventario</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={commonStyles.closeButtonContainer}>
                <Ionicons name="close" size={24} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <ScrollView style={commonStyles.modalBody}>
              <MovimientoContainer onSuccess={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
