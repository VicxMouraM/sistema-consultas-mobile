/**
 * Login Screen - Tela de Autenticação
 * Permite login com email e senha
 */

import React, { useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 TextInput,
 Alert,
 ActivityIndicator,
 ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";
import {
 obterCredenciaisTeste,
 forcarLogoutCompleto,
 limparTudoDoAsyncStorage
} from "../services/authService";

type LoginProps = {
 navigation: any;
};

export default function Login({ navigation }: LoginProps) {
 const { login } = useAuth();
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [loading, setLoading] = useState(false);
 const [mostrarCredenciais, setMostrarCredenciais] = useState(false);

 async function handleLogin() {
 if (!email.trim() || !senha.trim()) {
 Alert.alert("Erro", "Preencha todos os campos");
 return;
 }

 setLoading(true);
 try {
 const sucesso = await login(email.trim(), senha);

 if (!sucesso) {
 Alert.alert("Erro", "Email ou senha inválidos");
 }
 // Se login bem-sucedido, a navegação é feita pelo Navigation baseado no contexto
 } catch (error) {
 Alert.alert("Erro", "Ocorreu um erro ao fazer login");
 } finally {
 setLoading(false);
 }
 }

 function preencherCredenciais(emailPreencher: string, senhaPreencher: string) {
 setEmail(emailPreencher);
 setSenha(senhaPreencher);
 setMostrarCredenciais(false);
 }

 async function handleForcarLogout() {
 try {
 await forcarLogoutCompleto();
 Alert.alert("Debug", "Logout forçado! Verifique o console.");
 } catch (error) {
 Alert.alert("Erro", "Não foi possível forçar logout");
 }
 }

 async function handleLimparTudo() {
 Alert.alert(
 "⚠️ CUIDADO!",
 "Isso vai limpar TODOS os dados do AsyncStorage!\n\nTem certeza?",
 [
 { text: "Cancelar", style: "cancel" },
 {
 text: "SIM, LIMPAR TUDO",
 style: "destructive",
 onPress: async () => {
 try {
 await limparTudoDoAsyncStorage();
 Alert.alert("✅ Concluído", "AsyncStorage limpo! RECARREGUE O APP (R+R).");
 } catch (error) {
 Alert.alert("Erro", "Não foi possível limpar");
 }
 },
 },
 ]
 );
 }

 const credenciais = obterCredenciaisTeste();

 return (
 <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
 <StatusBar style="light" />
 <View style={styles.content}>
 <Text style={styles.icone}>🔑</Text>
 <Text style={styles.titulo}>Sistema de Consultas</Text>
 <Text style={styles.subtitulo}>Faça login para continuar</Text>

 <View style={styles.formContainer}>
 <TextInput
 style={styles.input}
 placeholder="Email"
 placeholderTextColor="#999"
 value={email}
 onChangeText={setEmail}
 autoCapitalize="none"
 keyboardType="email-address"
 editable={!loading}
 />

 <TextInput
 style={styles.input}
 placeholder="Senha"
 placeholderTextColor="#999"
 value={senha}
 onChangeText={setSenha}
 secureTextEntry
 editable={!loading}
 />

 <TouchableOpacity
 style={[styles.botao, styles.botaoPrimario]}
 onPress={handleLogin}
 disabled={loading}
 >
 {loading ? (
 <ActivityIndicator color="#79059C" />
 ) : (
 <Text style={styles.botaoTexto}>Entrar</Text>
 )}
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoSecundario]}
 onPress={() => navigation.navigate("CadastroPaciente")}
 disabled={loading}
 >
 <Text style={styles.botaoTextoSecundario}>Criar Conta</Text>
 </TouchableOpacity>
 </View>

 {/* Credenciais de Teste (apenas desenvolvimento) */}
 <View style={styles.credenciaisContainer}>
 <TouchableOpacity
 onPress={() => setMostrarCredenciais(!mostrarCredenciais)}
 >
 <Text style={styles.credenciaisTitulo}>
 📋 {mostrarCredenciais ? "Ocultar" : "Ver"} Credenciais de Teste
 </Text>
 </TouchableOpacity>

 {mostrarCredenciais && (
 <View style={styles.credenciaisLista}>
 <TouchableOpacity
 style={styles.credencialItem}
 onPress={() => preencherCredenciais(
 credenciais.admin.email,
 credenciais.admin.senha
 )}
 >
 <Text style={styles.credencialTipo}>👨‍💼 ADMIN</Text>
 <Text style={styles.credencialTexto}>{credenciais.admin.email}</Text>
 <Text style={styles.credencialTexto}>{credenciais.admin.senha}</Text>
 </TouchableOpacity>

 {credenciais.pacientes.map((paciente, index) => (
 <TouchableOpacity
 key={index}
 style={styles.credencialItem}
 onPress={() => preencherCredenciais(paciente.email, paciente.senha)}
 >
 <Text style={styles.credencialTipo}>👤 {paciente.nome}</Text>
 <Text style={styles.credencialTexto}>{paciente.email}</Text>
 <Text style={styles.credencialTexto}>{paciente.senha}</Text>
 </TouchableOpacity>
 ))}
 </View>
 )}

 {mostrarCredenciais && (
 <>
 <TouchableOpacity
 style={styles.botaoDebug}
 onPress={handleForcarLogout}
 >
 <Text style={styles.botaoDebugTexto}>🔧 DEBUG: Forçar Logout Completo</Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={styles.botaoDebugPerigoso}
 onPress={handleLimparTudo}
 >
 <Text style={styles.botaoDebugTexto}>🚨 EMERGÊNCIA: Limpar TUDO do AsyncStorage</Text>
 </TouchableOpacity>
 </>
 )}
 </View>
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#79059C",
 },
 scrollContent: {
 flexGrow: 1,
 },
 content: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 padding: 32,
 },
 icone: {
 fontSize: 80,
 marginBottom: 24,
 },
 titulo: {
 fontSize: 32,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 8,
 },
 subtitulo: {
 fontSize: 16,
 color: "#fff",
 opacity: 0.9,
 marginBottom: 32,
 },
 formContainer: {
 width: "100%",
 gap: 16,
 },
 input: {
 backgroundColor: "#fff",
 paddingVertical: 16,
 paddingHorizontal: 20,
 borderRadius: 12,
 fontSize: 16,
 color: "#333",
 },
 botao: {
 paddingVertical: 16,
 paddingHorizontal: 32,
 borderRadius: 12,
 alignItems: "center",
 },
 botaoPrimario: {
 backgroundColor: "#fff",
 marginTop: 8,
 },
 botaoSecundario: {
 backgroundColor: "transparent",
 borderWidth: 2,
 borderColor: "#fff",
 },
 botaoTexto: {
 color: "#79059C",
 fontWeight: "bold",
 fontSize: 16,
 },
 botaoTextoSecundario: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
 credenciaisContainer: {
 marginTop: 32,
 width: "100%",
 },
 credenciaisTitulo: {
 color: "#fff",
 fontSize: 14,
 textAlign: "center",
 opacity: 0.8,
 },
 credenciaisLista: {
 marginTop: 16,
 gap: 12,
 },
 credencialItem: {
 backgroundColor: "rgba(255, 255, 255, 0.15)",
 padding: 12,
 borderRadius: 8,
 borderWidth: 1,
 borderColor: "rgba(255, 255, 255, 0.3)",
 },
 credencialTipo: {
 color: "#fff",
 fontWeight: "bold",
 marginBottom: 4,
 },
 credencialTexto: {
 color: "#fff",
 fontSize: 12,
 opacity: 0.9,
 },
 botaoDebug: {
 marginTop: 16,
 backgroundColor: "rgba(255, 0, 0, 0.3)",
 padding: 12,
 borderRadius: 8,
 borderWidth: 1,
 borderColor: "rgba(255, 0, 0, 0.5)",
 alignItems: "center",
 },
 botaoDebugPerigoso: {
 marginTop: 12,
 backgroundColor: "rgba(139, 0, 0, 0.6)",
 padding: 12,
 borderRadius: 8,
 borderWidth: 2,
 borderColor: "#ff0000",
 alignItems: "center",
 },
 botaoDebugTexto: {
 color: "#fff",
 fontSize: 12,
 fontWeight: "bold",
 },
});
