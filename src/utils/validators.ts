/**
 * Validadores - Funciones puras para validación de datos
 * Separadas de la UI para facilitar testing y reutilización
 */

// Valida formato de email con expresión regular
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida RUC ecuatoriano usando algoritmo oficial (módulo 10/11)
 * Verifica: longitud, provincia, tipo de RUC y dígito verificador
 */
export function validarRUC(ruc: string): boolean {
  // Debe tener exactamente 13 dígitos
  if (!/^\d{13}$/.test(ruc)) {
    return false;
  }

  // Los dos primeros dígitos deben corresponder a una provincia válida (01-24)
  const provincia = parseInt(ruc.substring(0, 2));
  if (provincia < 1 || provincia > 24) {
    return false;
  }

  // El tercer dígito determina el tipo de RUC
  const tercerDigito = parseInt(ruc.charAt(2));

  // Tipo de RUC: 0-5 = Persona Natural, 6 = Sociedad Pública, 9 = Sociedad Privada
  if (tercerDigito < 0 || (tercerDigito > 5 && tercerDigito !== 6 && tercerDigito !== 9)) {
    return false;
  }

  // Validación según el tipo de RUC
  if (tercerDigito < 6) {
    // Persona Natural o Pasaporte
    return validarCedulaOPersonaNatural(ruc);
  } else if (tercerDigito === 6) {
    // Sociedad Pública
    return validarSociedadPublica(ruc);
  } else if (tercerDigito === 9) {
    // Sociedad Privada
    return validarSociedadPrivada(ruc);
  }

  return false;
}

// Algoritmo módulo 10 para validar cédulas y personas naturales
function validarCedulaOPersonaNatural(ruc: string): boolean {
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digitoVerificador = parseInt(ruc.charAt(9));
  
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = parseInt(ruc.charAt(i)) * coeficientes[i];
    if (valor >= 10) {
      valor -= 9;
    }
    suma += valor;
  }

  const residuo = suma % 10;
  const resultado = residuo === 0 ? 0 : 10 - residuo;

  // Los últimos 3 dígitos deben ser 001 para persona natural
  const establecimiento = ruc.substring(10, 13);
  
  return resultado === digitoVerificador && establecimiento === '001';
}

// Algoritmo módulo 11 para validar sociedades públicas (tercer dígito = 6)
function validarSociedadPublica(ruc: string): boolean {
  const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
  const digitoVerificador = parseInt(ruc.charAt(8));
  
  let suma = 0;
  for (let i = 0; i < 8; i++) {
    suma += parseInt(ruc.charAt(i)) * coeficientes[i];
  }

  const residuo = suma % 11;
  const resultado = residuo === 0 ? 0 : 11 - residuo;

  // Los últimos 4 dígitos deben ser 0001 para sociedad pública
  const establecimiento = ruc.substring(9, 13);
  
  return resultado === digitoVerificador && establecimiento === '0001';
}

// Algoritmo módulo 11 para validar sociedades privadas (tercer dígito = 9)
function validarSociedadPrivada(ruc: string): boolean {
  const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
  const digitoVerificador = parseInt(ruc.charAt(9));
  
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    suma += parseInt(ruc.charAt(i)) * coeficientes[i];
  }

  const residuo = suma % 11;
  const resultado = residuo === 0 ? 0 : 11 - residuo;

  // Los últimos 3 dígitos deben ser 001 para sociedad privada
  const establecimiento = ruc.substring(10, 13);
  
  return resultado === digitoVerificador && establecimiento === '001';
}

// Validar que un string no esté vacío
export function validarNoVacio(valor: string): boolean {
  return valor.trim().length > 0;
}

// Validar longitud mínima
export function validarLongitudMinima(valor: string, minimo: number): boolean {
  return valor.trim().length >= minimo;
}

// Validar número positivo
export function validarNumeroPositivo(valor: number): boolean {
  return valor > 0;
}
