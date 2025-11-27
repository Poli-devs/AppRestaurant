import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../context/StoreContext';
import { colors } from '../styles/commonStyles';

// Layout principal con sidebar, header y contenido
interface MainLayoutProps {
  children: React.ReactNode;
  currentSection: 'empresas' | 'usuarios' | 'productos' | 'movimientos';
  onSectionChange: (section: 'empresas' | 'usuarios' | 'productos' | 'movimientos') => void;
}

export function MainLayout({ children, currentSection, onSectionChange }: MainLayoutProps) {
  const { state, dispatch } = useStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowUserMenu(false);
  };

  const menuItems = [
    { id: 'empresas', label: 'Empresas', icon: 'business' },
    { id: 'usuarios', label: 'Usuarios', icon: 'people' },
    { id: 'productos', label: 'Productos', icon: 'cube' },
    { id: 'movimientos', label: 'Movimientos', icon: 'swap-vertical' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Superior */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={48} color={colors.white} />
          <Text style={styles.logo}>POS Restaurant</Text>
        </View>
        
        {state.usuarioLogueado && (
          <View style={styles.userSection}>
            <TouchableOpacity 
              style={styles.userButton}
              onPress={() => setShowUserMenu(!showUserMenu)}
            >
              <Text style={styles.userName}>{state.usuarioLogueado.nombre}</Text>
              <Ionicons name="person-circle" size={24} color={colors.white} />
              <Ionicons name={showUserMenu ? "chevron-up" : "chevron-down"} size={16} color={colors.white} />
            </TouchableOpacity>
            
            {showUserMenu && (
              <>
                {/* Overlay para cerrar el menú */}
                <TouchableOpacity 
                  style={styles.menuOverlay}
                  activeOpacity={1}
                  onPress={() => setShowUserMenu(false)}
                />
                <View style={styles.userMenu}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => setShowUserMenu(false)}
                  >
                    <Ionicons name="person-outline" size={18} color={colors.text} />
                    <Text style={styles.menuItemText}>Mi Perfil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.menuItem, styles.menuItemDanger]}
                    onPress={handleLogout}
                  >
                    <Ionicons name="log-out-outline" size={18} color={colors.danger} />
                    <Text style={styles.menuItemTextDanger}>Cerrar Sesión</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      <View style={styles.body}>
        {/* Sidebar Izquierdo */}
        <View style={[styles.sidebar, sidebarCollapsed && styles.sidebarCollapsed]}>
          {/* Botón para colapsar/expandir */}
          <TouchableOpacity 
            style={styles.collapseButton}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Ionicons 
              name={sidebarCollapsed ? "chevron-forward" : "chevron-back"} 
              size={20} 
              color={colors.textMuted} 
            />
          </TouchableOpacity>

          {!sidebarCollapsed && <Text style={styles.sidebarTitle}>Menú</Text>}
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.sidebarItem,
                currentSection === item.id && styles.sidebarItemActive,
                sidebarCollapsed && styles.sidebarItemCollapsed,
              ]}
              onPress={() => onSectionChange(item.id as any)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={22} 
                color={currentSection === item.id ? colors.primary : colors.text} 
              />
              {!sidebarCollapsed && (
                <Text
                  style={[
                    styles.sidebarLabel,
                    currentSection === item.id && styles.sidebarLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenido Principal */}
        <ScrollView style={styles.content}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  menuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 998,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  userSection: {
    position: 'relative',
    zIndex: 1001,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  userName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  userMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 999,
    zIndex: 9999,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemDanger: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  menuItemTextDanger: {
    fontSize: 14,
    color: colors.danger,
    fontWeight: '500',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingVertical: 20,
  },
  sidebarCollapsed: {
    width: 70,
  },
  collapseButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  sidebarItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  sidebarItemActive: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  sidebarLabel: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  sidebarLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
