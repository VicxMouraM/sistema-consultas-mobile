/**
 * Admin Screen - Painel Administrativo
 * Gerenciamento completo do sistema (apenas admin)
 */

import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";
import consultasService from "../services/consultasService";
import { Consulta } from "../interfaces/consulta";

export default function Admin({ navigation }: any) {
 const { usuario, logout } = useAuth();
 const [consultas, setConsultas] = useState<Consulta[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 carregarConsultas();
 }, []);

 async function carregarConsultas() {
 try {
 const todasConsultas = await consultasService.listarConsultas(
 usuario?.id,
 true // isAdmin
 );
 setConsultas(todasConsultas);
 } catch (error) {
 console.error("Erro ao carregar consultas:", error);
 } finally {
 setLoading(false);
 }
 }

 async function handleLogout() {
 try {
 await logout();
 } catch (error) {
 Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
 }
 }

 const consultasAgendadas = consultas.filter((c) => c.status === "agendada").length;
 const consultasConfirmadas = consultas.filter((c) => c.status === "confirmada").length;
 const consultasRealizadas = consultas.filter((c) => c.status === "realizada").length;
 const consultasCanceladas = consultas.filter((c) => c.status === "cancelada").length;

 return (
 <View style={styles.container}>
 <StatusBar style="light" />

 <ScrollView>
 <View style={styles.header}>
 <Text style={styles.icone}>👨‍💼</Text>
 <Text style={styles.titulo}>Painel Admin</Text>
 <Text style={styles.subtitulo}>Bem-vindo, {usuario?.nome}</Text>
 </View>

 {/* Dashboard de Estatísticas */}
 <View style={styles.statsContainer}>
 <Text style={styles.sectionTitle}>📊 Estatísticas</Text>

 <View style={styles.statsGrid}>
 <View style={[styles.statCard, { backgroundColor: "#2196F3" }]}>
 <Text style={styles.statNumber}>{consultasAgendadas}</Text>
 <Text style={styles.statLabel}>Agendadas</Text>
 </View>

 <View style={[styles.statCard, { backgroundColor: "#4CAF50" }]}>
 <Text style={styles.statNumber}>{consultasConfirmadas}</Text>
 <Text style={styles.statLabel}>Confirmadas</Text>
 </View>

 <View style={[styles.statCard, { backgroundColor: "#9C27B0" }]}>
 <Text style={styles.statNumber}>{consultasRealizadas}</Text>
 <Text style={styles.statLabel}>Realizadas</Text>
 </View>

 <View style={[styles.statCard, { backgroundColor: "#f44336" }]}>
 <Text style={styles.statNumber}>{consultasCanceladas}</Text>
 <Text style={styles.statLabel}>Canceladas</Text>
 </View>
 </View>
 </View>

 {/* Menu de Ações */}
 <View style={styles.menuContainer}>
 <Text style={styles.sectionTitle}>🔧 Ações Rápidas</Text>

 <TouchableOpacity
 style={[styles.menuItem, { backgroundColor: "#79059C" }]}
 onPress={() => navigation.navigate("ConsultasList")}
 >
 <Text style={styles.menuIcone}>📋</Text>
 <Text style={styles.menuTitulo}>Ver Todas Consultas</Text>
 <Text style={styles.menuDescricao}>
 {consultas.length} consulta(s) no sistema
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.menuItem, { backgroundColor: "#4CAF50" }]}
 onPress={() => navigation.navigate("NovaConsulta")}
 >
 <Text style={styles.menuIcone}>➕</Text>
 <Text style={styles.menuTitulo}>Nova Consulta</Text>
 <Text style={styles.menuDescricao}>Agendar consulta para paciente</Text>
 </TouchableOpacity>
 </View>

 {/* Botão de Logout */}
 <TouchableOpacity
 style={styles.logoutButton}
 onPress={handleLogout}
 >
 <Text style={styles.logoutText}>🚪 Sair da Conta Admin</Text>
 </TouchableOpacity>

 <View style={styles.footer}>
 <Text style={styles.footerText}>Sistema de Consultas Médicas</Text>
 <Text style={styles.footerSubtext}>Painel Administrativo - FIAP</Text>
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
 backgroundColor: "#79059C",
 padding: 32,
 paddingTop: 16,
 alignItems: "center",
 },
 icone: {
 fontSize: 60,
 marginBottom: 16,
 },
 titulo: {
 fontSize: 28,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 8,
 },
 subtitulo: {
 fontSize: 16,
 color: "#fff",
 opacity: 0.9,
 },
 statsContainer: {
 padding: 20,
 },
 sectionTitle: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 16,
 },
 statsGrid: {
 flexDirection: "row",
 flexWrap: "wrap",
 gap: 12,
 },
 statCard: {
 flex: 1,
 minWidth: "45%",
 padding: 20,
 borderRadius: 12,
 alignItems: "center",
 },
 statNumber: {
 fontSize: 32,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 4,
 },
 statLabel: {
 fontSize: 14,
 color: "#fff",
 opacity: 0.9,
 },
 menuContainer: {
 padding: 20,
 paddingTop: 0,
 },
 menuItem: {
 padding: 24,
 borderRadius: 16,
 marginBottom: 16,
 elevation: 3,
 },
 menuIcone: {
 fontSize: 40,
 marginBottom: 12,
 },
 menuTitulo: {
 fontSize: 20,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 4,
 },
 menuDescricao: {
 fontSize: 14,
 color: "#fff",
 opacity: 0.9,
 },
 logoutButton: {
 margin: 20,
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
 padding: 20,
 alignItems: "center",
 },
 footerText: {
 fontSize: 12,
 color: "#666",
 },
 footerSubtext: {
 fontSize: 10,
 color: "#999",
 },
});
