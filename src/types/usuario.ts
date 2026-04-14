export type TipoUsuario = "paciente" | "admin";

// Credenciais fixas para admin (em produção seria em backend)
export const ADMIN_CREDENTIALS = {
  email: "admin@consultas.com",
  senha: "admin123", // Em produção, seria hash
};
