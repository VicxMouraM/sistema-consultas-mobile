/**
 * Admin Screen - Painel Administrativo
 * Gerenciamento completo do sistema (apenas admin)
 */

import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 ScrollView,
 TouchableOpacity,
 Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";
import consultasService from "../services/consultasService";
import { Consulta } from "../interfaces/consulta";
import { styles } from "../styles/admin.styles";

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