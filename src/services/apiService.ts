/**
 * API Service (Preparado para integração futura)
 * Base para consumo de API REST
 */

// Configuração da API (será utilizada em aulas futuras)
const API_BASE_URL = "https://api-consultas.exemplo.com/api/v1";

// Tipos para requisições
type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  method: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
};

/**
 * Função auxiliar para fazer requisições HTTP
 * Preparada para integração futura com API real
 */
async function request<T>(
  endpoint: string,
  config: RequestConfig
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...config.headers,
  };
  
  const requestConfig: RequestInit = {
    method: config.method,
    headers,
  };
  
  if (config.body) {
    requestConfig.body = JSON.stringify(config.body);
  }
  
  try {
    const response = await fetch(url, requestConfig);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

/**
 * API Client (stub para futuro)
 */
export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "GET" }),
  
  post: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: "POST", body }),
  
  put: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: "PUT", body }),
  
  patch: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: "PATCH", body }),
  
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};

/**
 * Nota: Este módulo está preparado para integração com API real.
 * Nas próximas aulas, substituiremos o mock pelo consumo real da API.
 */
