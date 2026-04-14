/**
 * Componente Loading
 * Indicador de carregamento centralizado
 */

import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

type LoadingProps = {
  mensagem?: string;
};

export default function Loading({ mensagem = "Carregando..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#79059C" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  texto: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
