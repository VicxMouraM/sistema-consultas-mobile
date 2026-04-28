/**
 * Navigation - Configuração de Rotas com Autenticação
 * Define a navegação do aplicativo usando React Navigation
 * Controla acesso baseado no perfil do usuário (admin/paciente)
 */

import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import {
 HomeScreen,
 ConsultasListScreen,
 ConsultaDetalhesScreen,
 NovaConsultaScreen,
 LoginScreen,
 CadastroPacienteScreen,
 MinhasConsultasScreen,
 AdminScreen,
 AgendamentoScreen,
} from "../screens";

// Tipagem das rotas (boas práticas de TypeScript)
export type RootStackParamList = {
 Login: undefined;
 Home: undefined;
 ConsultasList: undefined;
 ConsultaDetalhes: { consultaId: number };
 NovaConsulta: undefined;
 CadastroPaciente: undefined;
 MinhasConsultas: undefined;
 Admin: undefined;
 Agendamento: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
 const { usuario, loading, logout } = useAuth();

 useEffect(() => {
 if (!loading) {
 if (usuario) {
 console.log("🔐 Navigation: Usuário logado ->", usuario.nome, `(${usuario.perfil})`);
 } else {
 console.log("🔓 Navigation: Nenhum usuário logado - Mostrando tela de Login");
 }
 }
 }, [usuario, loading]);

 // Mostra loading enquanto verifica autenticação
 if (loading) {
 console.log("⏳ Navigation: Carregando estado de autenticação...");
 return (
 <View style={styles.loadingContainer}>
 <ActivityIndicator size="large" color="#79059C" />
 </View>
 );
 }

 return (
 <NavigationContainer key={usuario ? usuario.id.toString() : "guest"}>
 <Stack.Navigator
 screenOptions={{
 headerStyle: {
 backgroundColor: "#79059C",
 },
 headerTintColor: "#fff",
 headerTitleStyle: {
 fontWeight: "bold",
 },
 headerRight: () => (
 usuario ? (
 <View style={styles.headerRight}>
 <View style={styles.userBadge}>
 <View style={styles.userInfo}>
 <Text style={styles.userName}>
 {usuario.perfil === "admin" ? "👨‍💼" : "👤"} {usuario.nome}
 </Text>
 </View>
 </View>
 </View>
 ) : null
 ),
 }}
 >
 {!usuario ? (
 // Usuário NÃO autenticado - apenas Login e Cadastro
 <>
 <Stack.Screen
 name="Login"
 component={LoginScreen}
 options={{
 title: "Login",
 headerShown: false,
 }}
 />
 <Stack.Screen
 name="CadastroPaciente"
 component={CadastroPacienteScreen}
 options={{
 title: "Criar Conta",
 headerShown: false,
 }}
 />
 </>
 ) : usuario.perfil === "admin" ? (
 // Usuário ADMIN - acesso total
 <>
 <Stack.Screen
 name="Admin"
 component={AdminScreen}
 options={{
 title: "Painel Administrativo",
 }}
 />
 <Stack.Screen
 name="ConsultasList"
 component={ConsultasListScreen}
 options={{
 title: "Todas as Consultas",
 }}
 />
 <Stack.Screen
 name="ConsultaDetalhes"
 component={ConsultaDetalhesScreen}
 options={{
 title: "Detalhes da Consulta",
 }}
 />
 <Stack.Screen
 name="NovaConsulta"
 component={NovaConsultaScreen}
 options={{
 title: "Nova Consulta",
 }}
 />
 </>
 ) : (
 // Usuário PACIENTE - acesso limitado
 <>
 <Stack.Screen
 name="Home"
 component={HomeScreen}
 options={{
 title: "Sistema de Consultas",
 }}
 />
 <Stack.Screen
 name="MinhasConsultas"
 component={MinhasConsultasScreen}
 options={{
 title: "Minhas Consultas",
 }}
 />
 <Stack.Screen
 name="ConsultasList"
 component={ConsultasListScreen}
 options={{
 title: "Minhas Consultas",
 }}
 />
 <Stack.Screen
 name="ConsultaDetalhes"
 component={ConsultaDetalhesScreen}
 options={{
 title: "Detalhes da Consulta",
 }}
 />
 <Stack.Screen
 name="NovaConsulta"
 component={NovaConsultaScreen}
 options={{
 title: "Agendar Consulta",
 }}
 />
 <Stack.Screen
 name="Agendamento"
 component={AgendamentoScreen}
 options={{
 title: "Agendamento",
 }}
 />
 </>
 )}
 </Stack.Navigator>
 </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 loadingContainer: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 backgroundColor: "#fff",
 },
 headerRight: {
 marginRight: 8,
 },
 userBadge: {
 flexDirection: "row",
 alignItems: "center",
 },
 userInfo: {
 alignItems: "flex-end",
 },
 userName: {
 color: "#fff",
 fontSize: 13,
 fontWeight: "600",
 },
});
