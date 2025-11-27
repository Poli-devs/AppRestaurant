import React from 'react';
import { StoreProvider } from './context/StoreContext';
import EmpresaPage from './features/empresas/EmpresaPage';

export default function App() {
    return (
        <StoreProvider>
        <EmpresaPage />
        </StoreProvider>
    );
}
