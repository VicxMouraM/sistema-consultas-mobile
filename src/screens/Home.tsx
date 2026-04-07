import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
// Importa funções do service layer
import { obterConsultas, salvarConsultas } from "../services/storage";

// Recebe navigation como prop (injetado pelo React Navigation)
export default function Home({ navigation }: any) {
  // Estado agora é um ARRAY de consultas
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  // Carrega dados ao montar o componente
  useEffect(() => {
    carregarConsultas();
  }, []);

  // Função que busca consultas do AsyncStorage
  async function carregarConsultas() {
    const consultasSalvas = await obterConsultas();
    setConsultas(consultasSalvas);
  }

  // Atualiza status da consulta para "confirmada"
  async function confirmarConsulta(consultaId: number) {
    // map cria novo array com a consulta modificada
    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaId ? { ...c, status: "confirmada" as const } : c
    );
    setConsultas(consultasAtualizadas); // Atualiza estado local
    await salvarConsultas(consultasAtualizadas); // Persiste no AsyncStorage
  }

  // Atualiza status da consulta para "cancelada"
  async function cancelarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaId ? { ...c, status: "cancelada" as const } : c
    );
    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Minhas Consultas</Text>
          <Text style={styles.subtitulo}>
            {consultas.length} consulta(s) agendada(s)
          </Text>
        </View>

        {/* Renderização condicional: vazio ou lista */}
        {consultas.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#666", marginBottom: 20, textAlign: "center"}}>
              Nenhuma consulta agendada ainda
            </Text>
            {/* Botão para navegar para Admin */}
            <Button
              title="Ir para Admin"
              color="black"
              onPress={() => navigation.navigate("Admin")}
            />
          </View>
        ) : (
          // map renderiza um componente para cada consulta
          consultas.map((consulta) => (
            <ConsultaCard
              key={consulta.id}
              consulta={consulta}
              onConfirmar={() => confirmarConsulta(consulta.id)}
              onCancelar={() => cancelarConsulta(consulta.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}