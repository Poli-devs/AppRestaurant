import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtrado en tiempo real por nombre, RUC o dirección
    const empresasFiltradas = empresas.filter((empresa) =>
        empresa.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        empresa.ruc.includes(searchQuery) ||
        empresa.direccion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
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
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
                    <Text style={styles.addButtonText}>Nueva</Text>
                </TouchableOpacity>
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
                            style={styles.closeButtonContainer}
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

// Estilos locales (solo los específicos de esta página)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    closeButtonContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

});
