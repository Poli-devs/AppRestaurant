import { Empresa, Usuario } from '../context/StoreContext';

/**
 * Datos de prueba para desarrollo
 * Incluye empresas y usuarios predefinidos para facilitar el testing
 */

export const empresasSeed: Empresa[] = [
  {
    id: '1',
    nombre: 'Restaurante El Buen Sabor',
    ruc: '2012345678001',
    direccion: 'Av. Principal 123, Lima',
  },
  {
    id: '2',
    nombre: 'Pizzería Don Giovanni',
    ruc: '2098765432001',
    direccion: 'Jr. Italia 456, Miraflores',
  },
];

export const usuariosSeed: Usuario[] = [
  {
    id: '1',
    nombre: 'Admin Principal',
    email: 'admin@restaurant.com',
    password: '123456',
    empresaId: '1',
    rolId: '1', // Admin
  }
];
