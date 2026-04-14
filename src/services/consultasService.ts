/**
 * Consultas Service
 * Gerencia operações relacionadas a consultas
 * Atualmente usa dados mockados, preparado para integração com API
 */

import { Consulta, StatusConsulta, NovaConsulta } from "../types";
import { consultasMock, gerarNovoId, simularDelay } from "./mockData";

// Simula um banco de dados em memória
let consultasDB: Consulta[] = [...consultasMock];

class ConsultasService {
  /**
   * Lista todas as consultas
   */
  async listarConsultas(): Promise<Consulta[]> {
    await simularDelay(800);
    return [...consultasDB];
  }

  /**
   * Obtém uma consulta específica por ID
   */
  async obterConsulta(id: number): Promise<Consulta> {
    await simularDelay(500);
    const consulta = consultasDB.find((c) => c.id === id);
    
    if (!consulta) {
      throw new Error("Consulta não encontrada");
    }
    
    return consulta;
  }

  /**
   * Filtra consultas por status
   */
  async listarConsultasPorStatus(status: StatusConsulta): Promise<Consulta[]> {
    await simularDelay(600);
    return consultasDB.filter((c) => c.status === status);
  }

  /**
   * Filtra consultas por data
   */
  async listarConsultasPorData(data: string): Promise<Consulta[]> {
    await simularDelay(600);
    return consultasDB.filter((c) => c.data === data);
  }

  /**
   * Cria uma nova consulta
   */
  async criarConsulta(novaConsulta: NovaConsulta): Promise<Consulta> {
    await simularDelay(700);
    
    const consulta: Consulta = {
      ...novaConsulta,
      id: gerarNovoId(),
      status: "agendada",
    };
    
    consultasDB.push(consulta);
    return consulta;
  }

  /**
   * Atualiza o status de uma consulta para "confirmada"
   */
  async confirmarConsulta(id: number): Promise<Consulta> {
    await simularDelay(500);
    
    const index = consultasDB.findIndex((c) => c.id === id);
    
    if (index === -1) {
      throw new Error("Consulta não encontrada");
    }
    
    if (consultasDB[index].status !== "agendada") {
      throw new Error("Apenas consultas agendadas podem ser confirmadas");
    }
    
    consultasDB[index] = {
      ...consultasDB[index],
      status: "confirmada",
    };
    
    return consultasDB[index];
  }

  /**
   * Atualiza o status de uma consulta para "cancelada"
   */
  async cancelarConsulta(id: number): Promise<Consulta> {
    await simularDelay(500);
    
    const index = consultasDB.findIndex((c) => c.id === id);
    
    if (index === -1) {
      throw new Error("Consulta não encontrada");
    }
    
    if (
      consultasDB[index].status !== "agendada" &&
      consultasDB[index].status !== "confirmada"
    ) {
      throw new Error(
        "Apenas consultas agendadas ou confirmadas podem ser canceladas"
      );
    }
    
    consultasDB[index] = {
      ...consultasDB[index],
      status: "cancelada",
    };
    
    return consultasDB[index];
  }

  /**
   * Atualiza o status de uma consulta para "realizada"
   */
  async realizarConsulta(id: number): Promise<Consulta> {
    await simularDelay(500);
    
    const index = consultasDB.findIndex((c) => c.id === id);
    
    if (index === -1) {
      throw new Error("Consulta não encontrada");
    }
    
    if (consultasDB[index].status !== "confirmada") {
      throw new Error("Apenas consultas confirmadas podem ser realizadas");
    }
    
    consultasDB[index] = {
      ...consultasDB[index],
      status: "realizada",
    };
    
    return consultasDB[index];
  }

  /**
   * Deleta uma consulta (apenas para desenvolvimento)
   */
  async deletarConsulta(id: number): Promise<void> {
    await simularDelay(500);
    consultasDB = consultasDB.filter((c) => c.id !== id);
  }

  /**
   * Reseta os dados para o estado inicial (apenas para desenvolvimento)
   */
  resetarDados(): void {
    consultasDB = [...consultasMock];
  }
}

// Exporta instância única (Singleton)
export const consultasService = new ConsultasService();
