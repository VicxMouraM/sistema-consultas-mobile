import React from "react";
import {
  View,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles/minhasConsultas.styles"
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
