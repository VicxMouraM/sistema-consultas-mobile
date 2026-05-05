/**
 * HomeScreen - Tela Principal do Paciente
 * Exibe resumo e menu de navegação com autenticação
 */

import React from "react";
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { styles } from "../styles/homeScreen.styles";

type HomeScreenProps = {
 navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
 const { usuario, logout } = useAuth();

 console.log("🏠 HomeScreen renderizado - Usuario:", usuario?.nome);

 async function handleLogout() {
 try {
 await logout();
 } catch (error) {
 Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
 }
 }

 return (
 <View style={styles.container}>
 <ScrollView contentContainerStyle={styles.scrollContent}>
 {/* Cabeçalho */}
 <View style={styles.header}>
 <Text style={styles.icone}>👋</Text>
 <Text style={styles.titulo}>Olá, {usuario?.nome}!</Text>
 <Text style={styles.subtitulo}>O que deseja fazer hoje?</Text>
 </View>

 {/* Cards de Navegação */}
 <View style={styles.menu}>
 <TouchableOpacity
 style={[styles.card, styles.cardPrimario]}
 onPress={() => navigation.navigate("MinhasConsultas")}
 >
 <Text style={styles.cardIcone}>📅</Text>
 <Text style={styles.cardTitulo}>Minhas Consultas</Text>
 <Text style={styles.cardDescricao}>
 Visualize e gerencie suas consultas
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.card, styles.cardSecundario]}
 onPress={() => navigation.navigate("Agendamento")}
 >
 <Text style={styles.cardIcone}>➕</Text>
 <Text style={styles.cardTitulo}>Agendar Consulta</Text>
 <Text style={styles.cardDescricao}>
 Agende uma nova consulta médica
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.card, styles.cardTerciario]}
 onPress={() => navigation.navigate("ConsultasList")}
 >
 <Text style={styles.cardIcone}>📋</Text>
 <Text style={styles.cardTitulo}>Histórico</Text>
 <Text style={styles.cardDescricao}>
 Ver todas as suas consultas
 </Text>
 </TouchableOpacity>
 </View>

 {/* Botão de Logout */}
 <TouchableOpacity
 style={styles.logoutButton}
 onPress={handleLogout}
 >
 <Text style={styles.logoutText}>🚪 Sair da Conta</Text>
 </TouchableOpacity>

 {/* Footer */}
 <View style={styles.footer}>
 <Text style={styles.footerText}>Sistema de Consultas Médicas</Text>
 <Text style={styles.footerSubtext}>FIAP - 3ESA</Text>
 </View>
 </ScrollView>
 </View>
 );
}