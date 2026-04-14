/**
 * Modelagem TypeScript do Sistema de Consultas Médicas
 * Aplicando conceitos de Type Alias, Union Types e Literal Types
 */

// ===== STATUS E ENUMS =====

export type StatusConsulta = "agendada" | "confirmada" | "cancelada" | "realizada";

export type TipoUsuario = "paciente" | "medico" | "admin";

export type Especialidade =
  | "Cardiologia"
  | "Dermatologia"
  | "Ortopedia"
  | "Pediatria"
  | "Psiquiatria"
  | "Clínica Geral";

// ===== ENTIDADES PRINCIPAIS =====

export type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
};

export type Medico = {
  id: number;
  nome: string;
  crm: string;
  especialidade: Especialidade;
  telefone: string;
  email: string;
};

export type Consulta = {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  medicoId: number;
  medicoNome: string;
  especialidade: Especialidade;
  data: string;
  horario: string;
  status: StatusConsulta;
  observacoes?: string;
};

// ===== TIPOS PARA FORMULÁRIOS =====

export type NovaConsulta = Omit<Consulta, "id" | "status">;

export type AtualizarConsulta = Partial<Consulta> & { id: number };

// ===== TIPOS PARA AUTENTICAÇÃO =====

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  tipo: TipoUsuario;
};

export type LoginCredentials = {
  email: string;
  senha: string;
};

export type AuthResponse = {
  usuario: Usuario;
  token: string;
};

// ===== TIPOS PARA FILTROS E LISTAS =====

export type FiltroConsulta = {
  status?: StatusConsulta;
  especialidade?: Especialidade;
  dataInicio?: string;
  dataFim?: string;
};

export type ListaConsultasResponse = {
  consultas: Consulta[];
  total: number;
};
