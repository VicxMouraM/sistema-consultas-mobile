/**
 * Storage Service
 * Gerencia persistência local de dados
 * Nota: Requer @react-native-async-storage/async-storage
 */

// Preparado para uso futuro do AsyncStorage
// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service para gerenciar armazenamento local
 */
class StorageService {
  /**
   * Salva um item no storage
   */
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      // await AsyncStorage.setItem(key, jsonValue);
      console.log(`[Storage] Salvando ${key}:`, value);
      // Por enquanto, apenas simula
    } catch (error) {
      console.error("Erro ao salvar no storage:", error);
      throw error;
    }
  }

  /**
   * Obtém um item do storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      // const jsonValue = await AsyncStorage.getItem(key);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(`[Storage] Carregando ${key}`);
      return null; // Por enquanto retorna null
    } catch (error) {
      console.error("Erro ao ler do storage:", error);
      throw error;
    }
  }

  /**
   * Remove um item do storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      // await AsyncStorage.removeItem(key);
      console.log(`[Storage] Removendo ${key}`);
    } catch (error) {
      console.error("Erro ao remover do storage:", error);
      throw error;
    }
  }

  /**
   * Limpa todo o storage
   */
  async clear(): Promise<void> {
    try {
      // await AsyncStorage.clear();
      console.log("[Storage] Limpando tudo");
    } catch (error) {
      console.error("Erro ao limpar storage:", error);
      throw error;
    }
  }

  /**
   * Obtém todas as chaves armazenadas
   */
  async getAllKeys(): Promise<string[]> {
    try {
      // return await AsyncStorage.getAllKeys();
      console.log("[Storage] Listando chaves");
      return [];
    } catch (error) {
      console.error("Erro ao listar chaves:", error);
      throw error;
    }
  }
}

export const storageService = new StorageService();

/**
 * Chaves específicas para o app
 */
export const STORAGE_KEYS = {
  USER: "@app:user",
  TOKEN: "@app:token",
  CONSULTAS: "@app:consultas",
  THEME: "@app:theme",
};
