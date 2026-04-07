import AsyncStorage from "@react-native-async-storage/async-storage";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";

// Definição das chaves usadas no AsyncStorage
const KEYS = {
  ESPECIALIDADES: "@consultas:especialidades",
  MEDICOS: "@consultas:medicos",
  CONSULTAS: "@consultas:consultas",
};

// ========== ESPECIALIDADES ==========
// Salva array de especialidades no AsyncStorage
export async function salvarEspecialidades(especialidades: Especialidade[]) {
  try {
    await AsyncStorage.setItem(
      KEYS.ESPECIALIDADES,
      JSON.stringify(especialidades)
    );
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
  }
}

// Busca array de especialidades do AsyncStorage
export async function obterEspecialidades(): Promise<Especialidade[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.ESPECIALIDADES);
    return dados ? JSON.parse(dados) : []; // Retorna array vazio se não houver dados
  } catch (erro) {
    console.error("Erro ao obter:", erro);
    return [];
  }
}

// ========== MÉDICOS ==========
// Salva array de médicos no AsyncStorage
export async function salvarMedicos(medicos: Medico[]) {
  try {
    await AsyncStorage.setItem(KEYS.MEDICOS, JSON.stringify(medicos));
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
  }
}

// Busca array de médicos do AsyncStorage
export async function obterMedicos(): Promise<Medico[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.MEDICOS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao obter:", erro);
    return [];
  }
}

// ========== CONSULTAS ==========
// Salva array de consultas no AsyncStorage
export async function salvarConsultas(consultas: Consulta[]) {
  try {
    await AsyncStorage.setItem(KEYS.CONSULTAS, JSON.stringify(consultas));
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
  }
}

// Busca array de consultas do AsyncStorage
export async function obterConsultas(): Promise<Consulta[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.CONSULTAS);
    if (dados) {
      const consultas = JSON.parse(dados);
      // Reconverte strings de data para objetos Date
      return consultas.map((c: any) => ({
        ...c,
        data: new Date(c.data),
      }));
    }
    return [];
  } catch (erro) {
    console.error("Erro ao obter:", erro);
    return [];
  }
}