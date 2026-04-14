/**
 * HomeScreen - Tela Principal
 * Exibe resumo e menu de navegação
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Bem-vindo ao sistema!</Text>
        </View>

        {/* Cards de Navegação */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.card, styles.cardPrimario]}
            onPress={() => navigation.navigate("ConsultasList")}
          >
            <Text style={styles.cardIcone}>📅</Text>
            <Text style={styles.cardTitulo}>Minhas Consultas</Text>
            <Text style={styles.cardDescricao}>
              Visualize e gerencie suas consultas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardSecundario]}
            onPress={() => navigation.navigate("NovaConsulta")}
          >
            <Text style={styles.cardIcone}>➕</Text>
            <Text style={styles.cardTitulo}>Agendar Consulta</Text>
            <Text style={styles.cardDescricao}>
              Agende uma nova consulta médica
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardTerciario]}
            onPress={() => {}}
          >
            <Text style={styles.cardIcone}>👤</Text>
            <Text style={styles.cardTitulo}>Meu Perfil</Text>
            <Text style={styles.cardDescricao}>
              Visualize e edite seus dados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardQuaternario]}
            onPress={() => {}}
          >
            <Text style={styles.cardIcone}>⚙️</Text>
            <Text style={styles.cardTitulo}>Configurações</Text>
            <Text style={styles.cardDescricao}>
              Ajuste as preferências do app
            </Text>
          </TouchableOpacity>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
  },
  menu: {
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPrimario: {
    backgroundColor: "#79059C",
  },
  cardSecundario: {
    backgroundColor: "#4CAF50",
  },
  cardTerciario: {
    backgroundColor: "#2196F3",
  },
  cardQuaternario: {
    backgroundColor: "#FF9800",
  },
  cardIcone: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescricao: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
});
