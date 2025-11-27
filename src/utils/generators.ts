// Genera IDs únicos combinando timestamp + string aleatorio
export function generarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
