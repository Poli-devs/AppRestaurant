import { useStore } from '../../../context/StoreContext';
import { generarId } from '../../../utils/generators';
import { validarLongitudMinima, validarNoVacio, validarRUC } from '../../../utils/validators';

/**
 * Hook personalizado para la lógica de negocio de Empresas
 * Separa la lógica de la UI siguiendo principios de Clean Architecture
 */
export function useEmpresa() {
  const { state, dispatch } = useStore();

  // Verificar si es el Admin del sistema (empresaId: '1' y rolId: '1')
  const isSystemAdmin = state.usuarioLogueado?.rolId === '1' && state.usuarioLogueado?.empresaId === '1';

  // Filtrar empresas según el tipo de usuario
  // Solo el Admin del sistema (empresaId: '1') ve todas las empresas
  // Todos los demás (incluyendo admins de otras empresas) solo ven su empresa
  const empresasFiltradas = isSystemAdmin
    ? state.empresas
    : state.empresas.filter(e => e.id === state.usuarioLogueado?.empresaId);

  // Crea una nueva empresa con validaciones completas
  const crearEmpresa = (nombre: string, ruc: string, direccion: string): { success: boolean; error?: string } => {
    // Validaciones de campos requeridos y formatos
    if (!validarNoVacio(nombre)) {
      return { success: false, error: 'El nombre no puede estar vacío' };
    }

    if (!validarLongitudMinima(nombre, 3)) {
      return { success: false, error: 'El nombre debe tener al menos 3 caracteres' };
    }

    if (!validarRUC(ruc)) {
      return { success: false, error: 'El RUC ecuatoriano no es válido. Debe tener 13 dígitos y cumplir con el algoritmo de validación' };
    }

    if (!validarNoVacio(direccion)) {
      return { success: false, error: 'La dirección no puede estar vacía' };
    }

    if (!validarLongitudMinima(direccion, 5)) {
      return { success: false, error: 'La dirección debe tener al menos 5 caracteres' };
    }

    // Validación de unicidad: el RUC debe ser único en el sistema
    const rucExiste = state.empresas.some((e) => e.ruc === ruc);
    if (rucExiste) {
      return { success: false, error: 'Ya existe una empresa con ese RUC' };
    }

    // Crear empresa con ID autogenerado y dispatch al store global
    const nuevaEmpresa = {
      id: generarId(),
      nombre: nombre.trim(),
      ruc: ruc.trim(),
      direccion: direccion.trim(),
    };

    dispatch({ type: 'ADD_EMPRESA', payload: nuevaEmpresa });
    return { success: true };
  };

  const obtenerEmpresas = () => {
    return empresasFiltradas;
  };

  return {
    crearEmpresa,
    obtenerEmpresas,
    empresas: empresasFiltradas,
  };
}
