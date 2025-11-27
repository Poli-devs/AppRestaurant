import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LoginPage } from '../features/auth/LoginPage';
import EmpresaPage from '../features/empresas/EmpresaPage';
import MovimientoPage from '../features/movimientos/MovimientoPage';
import ProductoPage from '../features/productos/ProductoPage';
import UsuarioPage from '../features/usuarios/UsuarioPage';
import { MainLayout } from './MainLayout';

// Dashboard principal que maneja la navegación entre secciones y autenticación
export function Dashboard() {
  const { state } = useStore();
  const [currentSection, setCurrentSection] = useState<'empresas' | 'usuarios' | 'productos' | 'movimientos'>('empresas');

  // Si no hay usuario logueado, mostrar pantalla de login
  if (!state.usuarioLogueado) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'empresas':
        return <EmpresaPage />;
      case 'usuarios':
        return <UsuarioPage />;
      case 'productos':
        return <ProductoPage />;
      case 'movimientos':
        return <MovimientoPage />;
      default:
        return <EmpresaPage />;
    }
  };

  return (
    <MainLayout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderContent()}
    </MainLayout>
  );
}
