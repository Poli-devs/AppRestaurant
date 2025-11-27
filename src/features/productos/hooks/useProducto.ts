import { useState } from 'react';
import { Producto, useStore } from '../../../context/StoreContext';

/**
 * Hook personalizado para gestión de productos
 * Encapsula la lógica de negocio y validaciones
 */
export function useProducto() {
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar si es el Admin del sistema (empresaId: '1' y rolId: '1')
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Filtrar productos según el tipo de usuario
  // Solo el Admin del sistema (empresaId: '1') ve todos los productos
  // Todos los demás (incluyendo admins de otras empresas) solo ven productos de su empresa
  const productos = isSystemAdmin
    ? state.productos
    : state.productos.filter((p) => p.empresaId === state.usuarioLogueado?.empresaId);

  // Crear nuevo producto
  const createProducto = async (productoData: Omit<Producto, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      if (!productoData.nombre.trim()) {
        throw new Error('El nombre es requerido');
      }

      if (productoData.nombre.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }

      if (productoData.costoBase <= 0) {
        throw new Error('El costo base debe ser mayor a 0');
      }

      if (productoData.precioVenta <= 0) {
        throw new Error('El precio de venta debe ser mayor a 0');
      }

      if (productoData.precioVenta <= productoData.costoBase) {
        throw new Error('El precio de venta debe ser mayor al costo base');
      }

      if (productoData.inventario < 0) {
        throw new Error('La cantidad no puede ser negativa');
      }

      // Verificar que el usuario esté logueado
      if (!state.usuarioLogueado) {
        throw new Error('Debe iniciar sesión para crear productos');
      }

      // Verificar que la empresa existe
      const empresaExists = state.empresas.some((e) => e.id === productoData.empresaId);
      if (!empresaExists) {
        throw new Error('La empresa no existe');
      }

      // Generar ID único
      const newProducto: Producto = {
        ...productoData,
        id: Date.now().toString(),
      };

      // Agregar al estado global
      dispatch({ type: 'ADD_PRODUCTO', payload: newProducto });

      setLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto');
      setLoading(false);
      return false;
    }
  };

  return {
    productos,
    createProducto,
    loading,
    error,
    usuarioLogueado: state.usuarioLogueado,
  };
}
