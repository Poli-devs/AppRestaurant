import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LoginPage } from '../features/auth/LoginPage';
import EmpresaPage from '../features/empresas/EmpresaPage';
import { MainLayout } from './MainLayout';

// Dashboard principal que maneja la navegación entre secciones y autenticación
export function Dashboard() {
  const { state } = useStore();
  const [currentSection, setCurrentSection] = useState<'empresas' | 'usuarios' | 'productos'>('empresas');

  // Si no hay usuario logueado, mostrar pantalla de login
  if (!state.usuarioLogueado) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'empresas':
        return <EmpresaPage />;
      case 'usuarios':
        return <EmpresaPage />; // Temporal, luego será UsuarioPage
      case 'productos':
        return <EmpresaPage />; // Temporal, luego será ProductoPage
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
