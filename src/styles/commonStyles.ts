import { StyleSheet } from 'react-native';

/**
 * Estilos compartidos para mantener consistencia visual
 * Reutilizables en múltiples módulos (Empresas, Usuarios, Productos)
 */

export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#f8f9fa',
  white: '#fff',
  text: '#333',
  textLight: '#666',
  textMuted: '#999',
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
};

export const commonStyles = StyleSheet.create({
  // Contenedor con ancho máximo centrado
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  // Card/Tarjeta estándar
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Header de página
  pageHeader: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },

  pageSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 4,
  },

  // Barra de búsqueda
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginVertical: 16,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },

  // Tabla
  tableContainer: {
    marginVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },

  modalBody: {
    maxHeight: '100%',
  },

  // Formulario dentro del modal
  formContainer: {
    padding: 24,
  },

  // Botones de acción (agregar, crear, etc.)
  actionButton: {
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

  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Botón de cerrar modal
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

  // Container de página
  pageContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Estados vacíos
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
    color: colors.textLight,
    fontWeight: '600',
    marginBottom: 8,
  },

  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
