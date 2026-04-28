/**
 * Consultas Service
 * Gerencia operações relacionadas a consultas com AsyncStorage
 * Filtra consultas baseado no usuário logado
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { StatusConsulta } from "../types/statusConsulta";

class ConsultasService {
 /**
 * Obtém todas as consultas do AsyncStorage
 */
 private async obterTodasConsultas(): Promise<Consulta[]> {
 try {
 const consultasJSON = await AsyncStorage.getItem("@consultas");
 if (!consultasJSON) return [];
 return JSON.parse(consultasJSON);
 } catch (error) {
 console.error("Erro ao obter consultas:", error);
 return [];
 }
 }

 /**
 * Salva consultas no AsyncStorage
 */
 private async salvarConsultas(consultas: Consulta[]): Promise<void> {
 try {
 await AsyncStorage.setItem("@consultas", JSON.stringify(consultas));
 } catch (error) {
 console.error("Erro ao salvar consultas:", error);
 throw error;
 }
 }

 /**
 * Lista consultas filtradas por usuário
 * (pacientes veem só as suas, admin vê todas)
 */
 async listarConsultas(usuarioId?: number, isAdmin: boolean = false): Promise<Consulta[]> {
 const todasConsultas = await this.obterTodasConsultas();

 if (isAdmin) {
 return todasConsultas;
 }

 if (usuarioId) {
 return todasConsultas.filter((c) => c.usuarioId === usuarioId);
 }

 return [];
 }

 /**
 * Obtém uma consulta específica por ID
 */
 async obterConsulta(
 id: number,
 usuarioId?: number,
 isAdmin: boolean = false
 ): Promise<Consulta> {
 const todasConsultas = await this.obterTodasConsultas();
 const consulta = todasConsultas.find((c) => c.id === id);

 if (!consulta) {
 throw new Error("Consulta não encontrada");
 }

 if (!isAdmin && consulta.usuarioId !== usuarioId) {
 throw new Error("Você não tem permissão para visualizar esta consulta");
 }

 return consulta;
 }

 /**
 * Cria uma nova consulta associada ao usuário logado
 */
 async criarConsulta(consultaData: Omit<Consulta, "id">): Promise<Consulta> {
 const todasConsultas = await this.obterTodasConsultas();

 const novaConsulta: Consulta = {
 ...consultaData,
 id: Date.now(), // Usa timestamp como ID único
 };

 todasConsultas.push(novaConsulta);
 await this.salvarConsultas(todasConsultas);

 return novaConsulta;
 }

 /**
 * Confirma uma consulta (muda status de "agendada" para "confirmada")
 */
 async confirmarConsulta(
 id: number,
 usuarioId?: number,
 isAdmin: boolean = false
 ): Promise<Consulta> {
 const todasConsultas = await this.obterTodasConsultas();
 const index = todasConsultas.findIndex((c) => c.id === id);

 if (index === -1) {
 throw new Error("Consulta não encontrada");
 }

 if (!isAdmin && todasConsultas[index].usuarioId !== usuarioId) {
 throw new Error("Você não tem permissão para modificar esta consulta");
 }

 if (todasConsultas[index].status !== "agendada") {
 throw new Error("Apenas consultas agendadas podem ser confirmadas");
 }

 todasConsultas[index] = {
 ...todasConsultas[index],
 status: "confirmada",
 };

 await this.salvarConsultas(todasConsultas);
 return todasConsultas[index];
 }

 /**
 * Cancela uma consulta
 */
 async cancelarConsulta(
 id: number,
 usuarioId?: number,
 isAdmin: boolean = false
 ): Promise<Consulta> {
 const todasConsultas = await this.obterTodasConsultas();
 const index = todasConsultas.findIndex((c) => c.id === id);

 if (index === -1) {
 throw new Error("Consulta não encontrada");
 }

 if (!isAdmin && todasConsultas[index].usuarioId !== usuarioId) {
 throw new Error("Você não tem permissão para modificar esta consulta");
 }

 if (
 todasConsultas[index].status !== "agendada" &&
 todasConsultas[index].status !== "confirmada"
 ) {
 throw new Error(
 "Apenas consultas agendadas ou confirmadas podem ser canceladas"
 );
 }

 todasConsultas[index] = {
 ...todasConsultas[index],
 status: "cancelada",
 };

 await this.salvarConsultas(todasConsultas);
 return todasConsultas[index];
 }

 /**
 * Marca consulta como realizada (apenas admin)
 */
 async realizarConsulta(id: number, isAdmin: boolean = false): Promise<Consulta> {
 if (!isAdmin) {
 throw new Error("Apenas administradores podem marcar consultas como realizadas");
 }

 const todasConsultas = await this.obterTodasConsultas();
 const index = todasConsultas.findIndex((c) => c.id === id);

 if (index === -1) {
 throw new Error("Consulta não encontrada");
 }

 if (todasConsultas[index].status !== "confirmada") {
 throw new Error("Apenas consultas confirmadas podem ser realizadas");
 }

 todasConsultas[index] = {
 ...todasConsultas[index],
 status: "realizada",
 };

 await this.salvarConsultas(todasConsultas);
 return todasConsultas[index];
 }

 /**
 * Deleta uma consulta (apenas admin)
 */
 async deletarConsulta(id: number, isAdmin: boolean = false): Promise<void> {
 if (!isAdmin) {
 throw new Error("Apenas administradores podem deletar consultas");
 }

 const todasConsultas = await this.obterTodasConsultas();
 const consultasFiltradas = todasConsultas.filter((c) => c.id !== id);
 await this.salvarConsultas(consultasFiltradas);
 }
}

// Consultas iniciais para teste (associadas aos usuários de teste)
const CONSULTAS_INICIAIS: Consulta[] = [
 {
 id: 1,
 pacienteId: 2,
 pacienteNome: "João Silva",
 medicoId: 1,
 medicoNome: "Dr. Carlos Mendes",
 especialidade: "Cardiologia",
 usuarioId: 2, // João Silva
 data: "2026-04-25",
 horario: "14:00",
 status: "agendada",
 observacoes: "Consulta de rotina",
 valor: 250,
 },
 {
 id: 2,
 pacienteId: 2,
 pacienteNome: "João Silva",
 medicoId: 2,
 medicoNome: "Dra. Ana Paula",
 especialidade: "Ortopedia",
 usuarioId: 2, // João Silva
 data: "2026-04-28",
 horario: "10:30",
 status: "confirmada",
 observacoes: "Dor no joelho",
 valor: 300,
 },
 {
 id: 3,
 pacienteId: 3,
 pacienteNome: "Maria Santos",
 medicoId: 3,
 medicoNome: "Dr. Roberto Lima",
 especialidade: "Dermatologia",
 usuarioId: 3, // Maria Santos
 data: "2026-04-30",
 horario: "09:00",
 status: "agendada",
 observacoes: "Manchas na pele",
 valor: 200,
 },
 {
 id: 4,
 pacienteId: 3,
 pacienteNome: "Maria Santos",
 medicoId: 4,
 medicoNome: "Dra. Juliana Costa",
 especialidade: "Clínica Geral",
 usuarioId: 3, // Maria Santos
 data: "2026-05-05",
 horario: "15:00",
 status: "confirmada",
 observacoes: "Consulta preventiva",
 valor: 280,
 },
 {
 id: 5,
 pacienteId: 2,
 pacienteNome: "João Silva",
 medicoId: 5,
 medicoNome: "Dr. Fernando Alves",
 especialidade: "Psiquiatria",
 usuarioId: 2, // João Silva
 data: "2026-04-20",
 horario: "11:00",
 status: "realizada",
 observacoes: "Dores de cabeça recorrentes",
 valor: 350,
 },
];

/**
 * Inicializa consultas no AsyncStorage se não existirem
 */
export async function inicializarConsultas(): Promise<void> {
 try {
 const consultasExistentes = await AsyncStorage.getItem("@consultas");

 if (!consultasExistentes) {
 await AsyncStorage.setItem("@consultas", JSON.stringify(CONSULTAS_INICIAIS));
 console.log("✅ Consultas iniciais criadas");
 }
 } catch (error) {
 console.error("❌ Erro ao inicializar consultas:", error);
 }
}

export default new ConsultasService();
