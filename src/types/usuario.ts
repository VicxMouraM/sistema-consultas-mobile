export type TipoUsuario = "paciente" | "admin";

export interface Usuario {
 id: number;
 nome: string;
 email: string;
 senha?: string; // Opcional pois removemos após login
 cpf: string;
 telefone: string;
 perfil: TipoUsuario;
}

// Credenciais fixas para admin (em produção seria em backend)
export const ADMIN_CREDENTIALS = {
 email: "admin@sistema.com",
 senha: "admin123",
};
