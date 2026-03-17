/**
 * App.tsx - Aplicativo de Consultas Médicas
 * Versão 3: Componentização
 * 
 * Evolução:
 * Aula 1 (26/02) → MVP Simples
 * Aula 2 (04/03) → Integração TypeScript
 * Aula 3 (06/03) → Componentização VOCÊ ESTÁ AQUI
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

// Importando a modelagem TypeScript
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

// Importando o componente reutilizável
import { ConsultaCard } from "./src/components";

export default function App() {
  // Dados base (simulando o que tínhamos no backend)
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
    telefone: "(11) 98765-4321",
  };

  // Estado da consulta
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10), // 10/03/2026
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  /**
   * Funções para manipular a consulta
   * 
   * Essas funções serão passadas como props para o componente.
   * O componente não altera o estado diretamente - ele apenas
   * "comunica" ao pai (App) que uma ação foi solicitada.
   */
  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        {/* 
          Componente ConsultaCard
          
          Veja como ficou mais simples!
          Antes: ~100 linhas de JSX no App.tsx
          Agora: 1 componente reutilizável
          
          Props:
          - consulta: objeto com todos os dados
          - onConfirmar: função a ser chamada ao confirmar
          - onCancelar: função a ser chamada ao cancelar
        */}
        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />

      </ScrollView>
    </View>
  );
}

/**
 * Estilos do App
 * 
 * Note que removemos TODOS os estilos do card!
 * Eles agora estão encapsulados no componente ConsultaCard.
 * 
 * App.tsx agora só tem estilos de layout geral:
 * - Container principal
 * - Cabeçalho
 * - Rodapé
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79059C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 4,
  },
});