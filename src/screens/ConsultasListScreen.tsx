/**
 * ConsultasListScreen - Lista de Consultas
 * Exibe consultas filtradas por usuário (paciente vê só suas, admin vê todas)
 */

import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
 View,
 Text,
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
import { styles } from "../styles/consultasList.styles";

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

 useFocusEffect(
 useCallback(() => {
 carregarConsultas();
 }, [usuario?.id])
 );

 async function carregarConsultas() {
 setLoading(true);
 try {
 // Carrega consultas filtradas por usuário
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
 {isAdmin() ? "Todas as Consultas" : "Minhas Consultas"}
 </Text>
 <Text style={styles.headerSubtitle}>
 {consultasFiltradas.length} consulta(s) encontrada(s)
 </Text>
 </View>

 {/* Filtros */}
 <View style={styles.filtros}>
 <TouchableOpacity
 style={[
 styles.filtro,
 filtroAtivo === "todas" && styles.filtroAtivo,
 ]}
 onPress={() => setFiltroAtivo("todas")}
 >
 <Text
 style={[
 styles.filtroTexto,
 filtroAtivo === "todas" && styles.filtroTextoAtivo,
 ]}
 >
 Todas
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[
 styles.filtro,
 filtroAtivo === "agendada" && styles.filtroAtivo,
 ]}
 onPress={() => setFiltroAtivo("agendada")}
 >
 <Text
 style={[
 styles.filtroTexto,
 filtroAtivo === "agendada" && styles.filtroTextoAtivo,
 ]}
 >
 Agendadas
 </Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[
 styles.filtro,
 filtroAtivo === "confirmada" && styles.filtroAtivo,
 ]}
 onPress={() => setFiltroAtivo("confirmada")}
 >
 <Text
 style={[
 styles.filtroTexto,
 filtroAtivo === "confirmada" && styles.filtroTextoAtivo,
 ]}
 >
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