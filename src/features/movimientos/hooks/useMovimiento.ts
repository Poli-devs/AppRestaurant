import { useState } from 'react';
import { Movimiento, useStore } from '../../../context/StoreContext';

/**
 * Hook personalizado para gestión de movimientos de inventario
 * Encapsula la lógica de negocio y validaciones
 */
export function useMovimiento() {
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar si es el Admin del sistema (empresaId: '1' y rolId: '1')
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Filtrar movimientos según el tipo de usuario
  // Solo el Admin del sistema ve todos los movimientos
  // Todos los demás solo ven movimientos de productos de su empresa
  const movimientos = isSystemAdmin
    ? state.movimientos
    : state.movimientos.filter((m) => {
        const producto = state.productos.find((p) => p.id === m.productoId);
        return producto?.empresaId === state.usuarioLogueado?.empresaId;
      });

  // Filtrar productos según la empresa del usuario
  const productos = isSystemAdmin
    ? state.productos
    : state.productos.filter((p) => p.empresaId === state.usuarioLogueado?.empresaId);

  // Crear nuevo movimiento de entrada
  const createMovimiento = async (movimientoData: Omit<Movimiento, 'id' | 'fecha'>): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      if (!movimientoData.productoId) {
        throw new Error('Debe seleccionar un producto');
      }

      if (movimientoData.cantidad <= 0) {
        throw new Error('La cantidad debe ser mayor a 0');
      }

      // Verificar que el usuario esté logueado
      if (!state.usuarioLogueado) {
        throw new Error('Debe iniciar sesión para registrar movimientos');
      }

      // Verificar que el producto existe
      const producto = state.productos.find((p) => p.id === movimientoData.productoId);
      if (!producto) {
        throw new Error('El producto no existe');
      }

      // Verificar que el producto pertenece a la empresa del usuario (excepto admin del sistema)
      if (!isSystemAdmin && producto.empresaId !== state.usuarioLogueado.empresaId) {
        throw new Error('No tienes permiso para modificar este producto');
      }

      // Generar ID único y fecha actual
      const newMovimiento: Movimiento = {
        ...movimientoData,
        id: Date.now().toString(),
        fecha: new Date().toISOString(),
      };

      // Agregar movimiento al estado global
      dispatch({ type: 'ADD_MOVIMIENTO', payload: newMovimiento });

      // Actualizar inventario del producto
      dispatch({
        type: 'UPDATE_PRODUCTO_INVENTARIO',
        payload: {
          productoId: movimientoData.productoId,
          cantidad: movimientoData.cantidad,
        },
      });

      setLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear movimiento');
      setLoading(false);
      return false;
    }
  };

  return {
    movimientos,
    productos,
    createMovimiento,
    loading,
    error,
    usuarioLogueado: state.usuarioLogueado,
  };
}
