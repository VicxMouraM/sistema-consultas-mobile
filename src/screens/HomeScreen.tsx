/**
 * HomeScreen - Tela Principal do Paciente
 * Exibe resumo e menu de navegação com autenticação
 */

import React from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

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

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
 },
 scrollContent: {
 padding: 20,
 paddingBottom: 40,
 },
 header: {
 marginBottom: 32,
 alignItems: "center",
 },
 icone: {
 fontSize: 60,
 marginBottom: 16,
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
 boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
 elevation: 3,
 },
 cardPrimario: {
 backgroundColor: "#79059C",
 },
 cardSecundario: {
 backgroundColor: "#4CAF50",
 },
 cardTerciario: {
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
 logoutButton: {
 marginTop: 32,
 padding: 16,
 backgroundColor: "#fff",
 borderRadius: 12,
 borderWidth: 2,
 borderColor: "#f44336",
 alignItems: "center",
 },
 logoutText: {
 color: "#f44336",
 fontWeight: "bold",
 fontSize: 16,
 },
 footer: {
 marginTop: 24,
 paddingTop: 20,
 alignItems: "center",
 },
 footerText: {
 fontSize: 12,
 color: "#666",
 },
 footerSubtext: {
 fontSize: 10,
 color: "#999",
 marginTop: 4,
 },
});
