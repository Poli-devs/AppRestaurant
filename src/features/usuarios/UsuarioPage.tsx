import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors, commonStyles } from '../../styles/commonStyles';
import UsuarioContainer from './UsuarioContainer';
import { UsuarioList } from './components/UsuarioList';
import { useUsuario } from './hooks/useUsuario';

/**
 * Pantalla principal de gestión de usuarios
 * Incluye: buscador, tabla de usuarios y modal para crear nuevos
 */
export default function UsuarioPage() {
  const { usuarios, empresas, roles } = useUsuario();
  const { state } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Solo los usuarios con rol Admin pueden crear usuarios
  const canCreateUser = state.usuarioLogueado?.rolId === '1';

  // Filtrado en tiempo real por nombre, email, empresa o rol
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const empresa = empresas.find((e) => e.id === usuario.empresaId);
    const rol = roles.find((r) => r.id === usuario.rolId);

    return (
      usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      empresa?.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rol?.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
              placeholder="Buscar por nombre, email, empresa o rol..."
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
          {canCreateUser && (
            <TouchableOpacity style={commonStyles.actionButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={commonStyles.actionButtonText}>Nuevo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de usuarios */}
        <UsuarioList usuarios={usuariosFiltrados} empresas={empresas} roles={roles} searchQuery={searchQuery} />
      </View>

      {/* Modal para crear usuario */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={commonStyles.modalOverlay}>
          <TouchableOpacity 
            style={commonStyles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={commonStyles.modalContent}>
            <View style={commonStyles.modalHeader}>
              <Text style={commonStyles.modalTitle}>Nuevo Usuario</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={commonStyles.closeButtonContainer}
              >
                <Ionicons name="close" size={24} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <ScrollView style={commonStyles.modalBody}>
              <UsuarioContainer onSuccess={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Ya no necesitamos estilos locales, todos están en commonStyles
