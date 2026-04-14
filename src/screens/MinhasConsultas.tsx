import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// Componente não utilizado na versão simplificada

type MinhasConsultasProps = {
  onNavigateToAgendamento: () => void;
  onLogout: () => void;
};

export default function MinhasConsultas({
  onNavigateToAgendamento,
  onLogout,
}: MinhasConsultasProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.titulo}>Minhas Consultas</Text>
        <Text style={styles.subtitulo}>Componente não utilizado na versão simplificada</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
  },
});
