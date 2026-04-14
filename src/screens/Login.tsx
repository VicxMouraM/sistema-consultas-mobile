import React from "react";
import {
  View,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles/login.styles";

type LoginProps = {
  onLoginSuccess: (tipo: "paciente" | "admin") => void;
  onNavigateToCadastro: () => void;
};

export default function Login({
  onLoginSuccess,
  onNavigateToCadastro,
}: LoginProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.titulo}>🏭 Sistema de Consultas</Text>
        <Text style={styles.subtitulo}>Componente não utilizado na versão simplificada</Text>
      </View>
    </View>
  );
}
