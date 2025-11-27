import React, { useState } from 'react';
import { Alert } from 'react-native';
import { EmpresaForm } from './components/EmpresaForm';
import { useEmpresa } from './hooks/useEmpresa';

/**
 * Container Component - Patrón Container/Presentational
 * Maneja la lógica y conecta el formulario (presentational) con el store
 */
interface EmpresaContainerProps {
    onSuccess?: () => void;
    }

    export default function EmpresaContainer({ onSuccess }: EmpresaContainerProps) {
    const { crearEmpresa } = useEmpresa();
    const [key, setKey] = useState(0);

    const handleCrearEmpresa = async (nombre: string, ruc: string, direccion: string): Promise<{ success: boolean; error?: string }> => {
        const resultado = crearEmpresa(nombre, ruc, direccion);
        
        if (resultado.success) {
        if (typeof window !== 'undefined') {
            window.alert('✅ Empresa creada correctamente');
        } else {
            Alert.alert('Éxito', 'Empresa creada correctamente');
        }
        setKey(prev => prev + 1); // Resetea el formulario cambiando la key (React remonta el componente)
        onSuccess?.();
        }
        
        return resultado;
    };

    return <EmpresaForm key={key} onSubmit={handleCrearEmpresa} />;
}
