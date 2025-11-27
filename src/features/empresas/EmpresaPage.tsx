import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors, commonStyles } from '../../styles/commonStyles';
import EmpresaContainer from './EmpresaContainer';
import { EmpresaList } from './components/EmpresaList';
import { useEmpresa } from './hooks/useEmpresa';

/**
 * Pantalla principal de gestión de empresas
 * Incluye: buscador, tabla de empresas y modal para crear nuevas
 */
export default function EmpresaPage() {
    const { empresas } = useEmpresa();
    const { state } = useStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Solo el Admin del Sistema (empresaId: '1' y rolId: '1') puede crear empresas
    const canCreateEmpresa = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

    // Filtrado en tiempo real por nombre, RUC o dirección
    const empresasFiltradas = empresas.filter((empresa) =>
        empresa.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        empresa.ruc.includes(searchQuery) ||
        empresa.direccion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={commonStyles.pageContainer}>
        {/* Contenedor con ancho máximo para pantallas grandes */}
        <View style={commonStyles.contentWrapper}>
            {/* Barra de búsqueda y botón */}
            <View style={commonStyles.searchRow}>
                <View style={commonStyles.searchContainer}>
                    <Ionicons name="search" size={20} color={colors.textMuted} style={{ marginRight: 8 }} />
                    <TextInput
                    style={commonStyles.searchInput}
                    placeholder="Buscar por nombre, RUC o dirección..."
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
                {canCreateEmpresa && (
                    <TouchableOpacity
                        style={commonStyles.actionButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="add-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
                        <Text style={commonStyles.actionButtonText}>Nueva</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Lista de empresas */}
            <EmpresaList empresas={empresasFiltradas} searchQuery={searchQuery} />
        </View>

        {/* Modal para crear empresa */}
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
                        <Text style={commonStyles.modalTitle}>Nueva Empresa</Text>
                        <TouchableOpacity 
                            onPress={() => setModalVisible(false)}
                            style={commonStyles.closeButtonContainer}
                        >
                            <Ionicons name="close" size={24} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={commonStyles.modalBody}>
                        <EmpresaContainer onSuccess={() => setModalVisible(false)} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
        </View>
    );
    }

// Ya no necesitamos estilos locales, todos están en commonStyles
