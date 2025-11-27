import { useState } from 'react';
import { useStore, Usuario } from '../../../context/StoreContext';

/**
 * Hook personalizado para gestión de usuarios
 * Encapsula la lógica de negocio y validaciones
 */
export function useUsuario() {
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar si es el Admin del sistema (empresaId: '1' y rolId: '1')
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Filtrar usuarios según el tipo de usuario
  // Solo el Admin del sistema (empresaId: '1') ve todos los usuarios
  // Todos los demás (incluyendo admins de otras empresas) solo ven usuarios de su empresa
  const usuariosFiltrados = isSystemAdmin
    ? state.usuarios
    : state.usuarios.filter(u => u.empresaId === state.usuarioLogueado?.empresaId);

  // Filtrar empresas según el tipo de usuario
  // Solo el Admin del sistema ve todas las empresas
  // Todos los demás solo ven su empresa
  const empresasFiltradas = isSystemAdmin
    ? state.empresas
    : state.empresas.filter(e => e.id === state.usuarioLogueado?.empresaId);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Crear nuevo usuario
  const createUsuario = async (usuarioData: Omit<Usuario, 'id'>): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      if (!usuarioData.nombre.trim()) {
        throw new Error('El nombre es requerido');
      }

      if (usuarioData.nombre.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }

      if (!validateEmail(usuarioData.email)) {
        throw new Error('Email inválido');
      }

      // Verificar email duplicado
      const emailExists = state.usuarios.some(
        (u) => u.email.toLowerCase() === usuarioData.email.toLowerCase()
      );
      if (emailExists) {
        throw new Error('El email ya está registrado');
      }

      if (!usuarioData.password || usuarioData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (!usuarioData.direccion.trim()) {
        throw new Error('La dirección es requerida');
      }

      if (usuarioData.direccion.trim().length < 5) {
        throw new Error('La dirección debe tener al menos 5 caracteres');
      }

      // Verificar que la empresa existe
      const empresaExists = state.empresas.some((e) => e.id === usuarioData.empresaId);
      if (!empresaExists) {
        throw new Error('La empresa seleccionada no existe');
      }

      // Verificar que el rol existe
      const rolExists = state.roles.some((r) => r.id === usuarioData.rolId);
      if (!rolExists) {
        throw new Error('El rol seleccionado no existe');
      }

      // Generar ID único
      const newUsuario: Usuario = {
        ...usuarioData,
        id: Date.now().toString(),
      };

      // Agregar al estado global
      dispatch({ type: 'ADD_USUARIO', payload: newUsuario });

      setLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear usuario';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    usuarios: usuariosFiltrados,
    empresas: empresasFiltradas,
    roles: state.roles,
    createUsuario,
    loading,
    error,
  };
}
