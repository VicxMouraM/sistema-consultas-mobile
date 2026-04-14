/**
 * Funções utilitárias para formatação de dados
 */

import { StatusConsulta } from "../types";

export function formatarData(data: string): string {
  // Recebe data no formato ISO ou DD/MM/YYYY
  // Retorna no formato DD/MM/YYYY
  if (data.includes("-")) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  return data;
}

export function formatarHorario(horario: string): string {
  // Garante formato HH:MM
  return horario.substring(0, 5);
}

export function formatarCPF(cpf: string): string {
  // Remove caracteres não numéricos
  const numeros = cpf.replace(/\D/g, "");
  // Formata: 000.000.000-00
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatarTelefone(telefone: string): string {
  // Remove caracteres não numéricos
  const numeros = telefone.replace(/\D/g, "");
  // Formata: (00) 00000-0000
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  // Formata: (00) 0000-0000
  return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export function obterCorStatus(status: StatusConsulta): string {
  const cores: Record<StatusConsulta, string> = {
    agendada: "#FFA500",
    confirmada: "#4CAF50",
    cancelada: "#F44336",
    realizada: "#2196F3",
  };
  return cores[status];
}

export function obterTextoStatus(status: StatusConsulta): string {
  const textos: Record<StatusConsulta, string> = {
    agendada: "Agendada",
    confirmada: "Confirmada",
    cancelada: "Cancelada",
    realizada: "Realizada",
  };
  return textos[status];
}
