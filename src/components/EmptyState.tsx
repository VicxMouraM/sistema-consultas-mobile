/**
 * Componente EmptyState
 * Exibido quando não há dados para mostrar
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type EmptyStateProps = {
  mensagem?: string;
  icone?: string;
};

export default function EmptyState({
  mensagem = "Nenhum item encontrado",
  icone = "📋",
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icone}>{icone}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f5f5f5",
  },
  icone: {
    fontSize: 64,
    marginBottom: 16,
  },
  mensagem: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
