/**
 * HomeScreen - Tela Principal
 * Exibe resumo e menu de navegação
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "../styles/home.styles";

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