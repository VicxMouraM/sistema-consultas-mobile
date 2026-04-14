import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// Componente não utilizado na versão simplificada

type AgendamentoProps = {
  onAgendamentoSuccess: () => void;
};

export default function Agendamento({
  onAgendamentoSuccess,
}: AgendamentoProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.titulo}>📅 Agendar Consulta</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.etapa}>
          <Text style={styles.etapaTitulo}>Componente não utilizado</Text>
          <View style={styles.card}>
            <Text style={styles.cardDesc}>
              Este componente não está ativo na versão simplificada.
              Use a tela Admin para criar consultas de teste.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2196F3",
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  etapa: {
    padding: 20,
  },
  etapaTitulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
  },
});
