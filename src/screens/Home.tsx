import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import { obterConsultas, salvarConsultas } from "../services/storage";

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    carregarConsultas();
  }, []);

  async function carregarConsultas() {
    const consultasSalvas = await obterConsultas();
    setConsultas(consultasSalvas);
  }

  async function confirmarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaId ? { ...c, status: "confirmada" as const } : c
    );
    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

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

        {consultas.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#666", marginBottom: 20 }}>
              Nenhuma consulta agendada ainda
            </Text>
            <Button
              title="Ir para Admin"
              onPress={() => navigation.navigate("Admin")}
            />
          </View>
        ) : (
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
