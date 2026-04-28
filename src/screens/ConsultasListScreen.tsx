/**
 * ConsultasListScreen - Lista de Consultas
 * Exibe consultas filtradas por usuário (paciente vê só suas, admin vê todas)
 */

import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 FlatList,
 TouchableOpacity,
 RefreshControl,
 Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import consultasService from "../services/consultasService";
import { Consulta } from "../interfaces/consulta";
import { StatusConsulta } from "../types/statusConsulta";
import { ConsultaCard, Loading, EmptyState } from "../components";

type ConsultasListScreenProps = {
 navigation: any;
};

export default function ConsultasListScreen({
 navigation,
}: ConsultasListScreenProps) {
 const { usuario, isAdmin } = useAuth();
 const [consultas, setConsultas] = useState<Consulta[]>([]);
 const [loading, setLoading] = useState(true);
 const [refreshing, setRefreshing] = useState(false);
 const [filtroAtivo, setFiltroAtivo] = useState<StatusConsulta | "todas">("todas");

 useEffect(() => {
 carregarConsultas();
 }, []);

 async function carregarConsultas() {
 setLoading(true);
 try {
 const dados = await consultasService.listarConsultas(
 usuario?.id,
 isAdmin()
 );
 setConsultas(dados);
 } catch (error) {
 console.error("Erro ao carregar consultas:", error);
 Alert.alert("Erro", "Não foi possível carregar as consultas");
 } finally {
 setLoading(false);
 }
 }

 async function onRefresh() {
 setRefreshing(true);
 await carregarConsultas();
 setRefreshing(false);
 }

 async function handleConfirmar(id: number) {
 try {
 await consultasService.confirmarConsulta(id, usuario?.id, isAdmin());
 Alert.alert("Sucesso", "Consulta confirmada!");
 carregarConsultas();
 } catch (error: any) {
 Alert.alert("Erro", error.message || "Erro ao confirmar consulta");
 }
 }

 async function handleCancelar(id: number) {
 Alert.alert(
 "Cancelar Consulta",
 "Deseja realmente cancelar esta consulta?",
 [
 { text: "Não", style: "cancel" },
 {
 text: "Sim, cancelar",
 style: "destructive",
 onPress: async () => {
 try {
 await consultasService.cancelarConsulta(id, usuario?.id, isAdmin());
 Alert.alert("Sucesso", "Consulta cancelada");
 carregarConsultas();
 } catch (error: any) {
 Alert.alert("Erro", error.message || "Erro ao cancelar consulta");
 }
 },
 },
 ]
 );
 }

 function handleDetalhes(id: number) {
 navigation.navigate("ConsultaDetalhes", { consultaId: id });
 }

 const consultasFiltradas =
 filtroAtivo === "todas"
 ? consultas
 : consultas.filter((c) => c.status === filtroAtivo);

 if (loading) {
 return <Loading mensagem="Carregando consultas..." />;
 }

 return (
 <View style={styles.container}>
 {/* Header com Info do Usuário */}
 <View style={styles.header}>
 <Text style={styles.headerTitle}>
 {isAdmin() ? "📋 Todas as Consultas" : "📋 Minhas Consultas"}
 </Text>
 <Text style={styles.headerSubtitle}>
 {consultasFiltradas.length} consulta(s) encontrada(s)
 </Text>
 </View>

 {/* Filtros */}
 <View style={styles.filtros}>
 <TouchableOpacity
 style={[styles.filtro, filtroAtivo === "todas" && styles.filtroAtivo]}
 onPress={() => setFiltroAtivo("todas")}
 >
 <Text style={[styles.filtroTexto, filtroAtivo === "todas" && styles.filtroTextoAtivo]}>
 Todas
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.filtro, filtroAtivo === "agendada" && styles.filtroAtivo]}
 onPress={() => setFiltroAtivo("agendada")}
 >
 <Text style={[styles.filtroTexto, filtroAtivo === "agendada" && styles.filtroTextoAtivo]}>
 Agendadas
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.filtro, filtroAtivo === "confirmada" && styles.filtroAtivo]}
 onPress={() => setFiltroAtivo("confirmada")}
 >
 <Text style={[styles.filtroTexto, filtroAtivo === "confirmada" && styles.filtroTextoAtivo]}>
 Confirmadas
 </Text>
 </TouchableOpacity>
 </View>

 {/* Lista de Consultas */}
 {consultasFiltradas.length === 0 ? (
 <EmptyState
 icone="📅"
 mensagem={
 filtroAtivo === "todas"
 ? "Nenhuma consulta encontrada"
 : `Nenhuma consulta ${filtroAtivo}`
 }
 />
 ) : (
 <FlatList
 data={consultasFiltradas}
 keyExtractor={(item) => item.id.toString()}
 renderItem={({ item }) => (
 <ConsultaCard
 consulta={item}
 onConfirmar={() => handleConfirmar(item.id)}
 onCancelar={() => handleCancelar(item.id)}
 onDetalhes={() => handleDetalhes(item.id)}
 />
 )}
 contentContainerStyle={styles.lista}
 refreshControl={
 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 }
 />
 )}
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
 },
 header: {
 backgroundColor: "#fff",
 padding: 16,
 borderBottomWidth: 1,
 borderBottomColor: "#e0e0e0",
 },
 headerTitle: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 4,
 },
 headerSubtitle: {
 fontSize: 14,
 color: "#666",
 },
 filtros: {
 flexDirection: "row",
 padding: 16,
 gap: 8,
 backgroundColor: "#fff",
 borderBottomWidth: 1,
 borderBottomColor: "#e0e0e0",
 },
 filtro: {
 paddingHorizontal: 16,
 paddingVertical: 8,
 borderRadius: 20,
 backgroundColor: "#f5f5f5",
 borderWidth: 1,
 borderColor: "#e0e0e0",
 },
 filtroAtivo: {
 backgroundColor: "#79059C",
 borderColor: "#79059C",
 },
 filtroTexto: {
 color: "#666",
 fontSize: 14,
 fontWeight: "500",
 },
 filtroTextoAtivo: {
 color: "#fff",
 },
 lista: {
 padding: 16,
 },
});
