import React, { useState } from 'react';
import { Alert } from 'react-native';
import { UsuarioForm } from './components/UsuarioForm';
import { useUsuario } from './hooks/useUsuario';

interface UsuarioContainerProps {
  onSuccess?: () => void;
}

/**
 * Container que conecta el formulario con la lógica de negocio
 * Patrón Container/Presentational
 */
export default function UsuarioContainer({ onSuccess }: UsuarioContainerProps) {
  const { createUsuario, empresas, roles, loading } = useUsuario();
  const [key, setKey] = useState(0);

  const handleSubmit = async (data: {
    nombre: string;
    email: string;
    password: string;
    direccion: string;
    empresaId: string;
    rolId: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const resultado = await createUsuario(data);

    if (resultado.success) {
      if (typeof window !== 'undefined') {
        window.alert('✅ Usuario creado correctamente');
      } else {
        Alert.alert('Éxito', 'Usuario creado correctamente');
      }
      setKey(prev => prev + 1); // Resetea el formulario cambiando la key
      onSuccess?.();
    }

    return resultado;
  };

  return <UsuarioForm key={key} onSubmit={handleSubmit} empresas={empresas} roles={roles} loading={loading} />;
}
