import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";

const STORAGE_KEY = "@consultas:consulta_atual";

export default function Home() {
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

  const consultaInicial: Consulta = {
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  };

  const [consulta, setConsulta] = useState<Consulta>(consultaInicial);

  useEffect(() => {
    carregarConsulta();
  }, []);

  async function carregarConsulta() {
    try {
      const consultaSalva = await AsyncStorage.getItem(STORAGE_KEY);
      if (consultaSalva) {
        const consultaObjeto = JSON.parse(consultaSalva);
        consultaObjeto.data = new Date(consultaObjeto.data);
        setConsulta(consultaObjeto);
      }
    } catch (erro) {
      console.error("Erro ao carregar consulta:", erro);
    }
  }

  async function salvarConsulta(consultaAtualizada: Consulta) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(consultaAtualizada)
      );
    } catch (erro) {
      console.error("Erro ao salvar consulta:", erro);
    }
  }

  function confirmarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "confirmada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
  }

  function cancelarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "cancelada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>
        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />
      </ScrollView>
    </View>
  );
}