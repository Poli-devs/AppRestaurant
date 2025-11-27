import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors, commonStyles } from '../../styles/commonStyles';
import ProductoContainer from './ProductoContainer';
import { ProductoList } from './components/ProductoList';
import { useProducto } from './hooks/useProducto';

/**
 * Pantalla principal de gestión de productos
 * Incluye: buscador, tabla de productos y modal para crear nuevos
 */
export default function ProductoPage() {
  const { productos } = useProducto();
  const { state } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Todos los roles pueden crear productos (Admin, Mesero, Cocinero)
  const canCreateProducto = true;

  // Filtrado en tiempo real por nombre
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {canCreateProducto && (
            <TouchableOpacity style={commonStyles.actionButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={commonStyles.actionButtonText}>Nuevo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de productos */}
        <ProductoList productos={productosFiltrados} searchQuery={searchQuery} />
      </View>

      {/* Modal para crear producto */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={commonStyles.modalOverlay}>
          <TouchableOpacity style={commonStyles.modalBackdrop} activeOpacity={1} onPress={() => setModalVisible(false)} />
          <View style={commonStyles.modalContent}>
            <View style={commonStyles.modalHeader}>
              <Text style={commonStyles.modalTitle}>Nuevo Producto</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={commonStyles.closeButtonContainer}>
                <Ionicons name="close" size={24} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <ScrollView style={commonStyles.modalBody}>
              <ProductoContainer onSuccess={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
