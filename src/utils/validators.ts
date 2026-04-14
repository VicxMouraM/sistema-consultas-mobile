/**
 * Funções utilitárias para validação de dados
 */

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, "");
  return numeros.length === 11;
}

export function validarTelefone(telefone: string): boolean {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length === 10 || numeros.length === 11;
}

export function validarData(data: string): boolean {
  // Valida formato DD/MM/YYYY
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(data)) {
    return false;
  }

  const [dia, mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);

  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() === mes - 1 &&
    dataObj.getDate() === dia
  );
}

export function validarHorario(horario: string): boolean {
  // Valida formato HH:MM
  const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(horario);
}
