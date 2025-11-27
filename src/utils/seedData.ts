import { Empresa, Producto, Usuario } from '../context/StoreContext';

/**
 * Datos de prueba para desarrollo
 * Incluye empresas, usuarios y productos predefinidos para facilitar el testing
 */

export const empresasSeed: Empresa[] = [
  {
    id: '1',
    nombre: 'Restaurante El Buen Sabor',
    ruc: '2012345678001',
    direccion: 'Av. Principal 123, Quito',
  },
  {
    id: '2',
    nombre: 'Pizzería Don Giovanni',
    ruc: '2098765432001',
    direccion: 'Jr. Italia 456, Riobamba',
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
    direccion: 'Av. Principal 123, Riobamba',
  },
  {
    id: '2',
    nombre: 'Juan Mesero',
    email: 'mesero@restaurant.com',
    password: '123456',
    empresaId: '1',
    rolId: '2', // Mesero
    direccion: 'Jr. Los Olivos 456, Chambo',
  },
  {
    id: '3',
    nombre: 'María Cocinera',
    email: 'cocinera@restaurant.com',
    password: '123456',
    empresaId: '1',
    rolId: '3', // Cocinero
    direccion: 'Calle Las Flores 789, Colta',
  },
];

export const productosSeed: Producto[] = [
  {
    id: '1',
    nombre: 'Lomo Saltado',
    empresaId: '1',
    costoBase: 12.50,
    precioVenta: 25.00,
    inventario: 25,
  },
  {
    id: '2',
    nombre: 'Ceviche de Pescado',
    empresaId: '1',
    costoBase: 15.00,
    precioVenta: 30.00,
    inventario: 18,
  }
];
