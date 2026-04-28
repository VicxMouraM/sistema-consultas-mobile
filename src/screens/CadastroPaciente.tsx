/**
 * Cadastro de Paciente
 * Permite criar uma nova conta de paciente
 */

import React, { useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 TextInput,
 ScrollView,
 Alert,
 ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";
import { cadastrarUsuario } from "../services/authService";

type CadastroPacienteProps = {
 navigation: any;
};

export default function CadastroPaciente({ navigation }: CadastroPacienteProps) {
 const { login } = useAuth();
 const [nome, setNome] = useState("");
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [cpf, setCpf] = useState("");
 const [telefone, setTelefone] = useState("");
 const [loading, setLoading] = useState(false);

 async function handleCadastro() {
 if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !telefone.trim()) {
 Alert.alert("Erro", "Preencha todos os campos");
 return;
 }

 if (senha.length < 6) {
 Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres");
 return;
 }

 setLoading(true);
 try {
 const novoUsuario = await cadastrarUsuario({
 nome: nome.trim(),
 email: email.trim().toLowerCase(),
 senha: senha,
 cpf: cpf.trim(),
 telefone: telefone.trim(),
 });

 if (!novoUsuario) {
 Alert.alert("Erro", "Não foi possível criar a conta. Verifique se o email já está cadastrado.");
 setLoading(false);
 return;
 }

 // Faz login automático após cadastro
 const loginSucesso = await login(email.trim().toLowerCase(), senha);

 if (loginSucesso) {
 Alert.alert(
 "Sucesso! 🎉",
 `Bem-vindo(a), ${nome}! Sua conta foi criada com sucesso.`,
 [{ text: "OK" }]
 );
 // NÃO navegamos manualmente - o Navigation redireciona automaticamente
 } else {
 Alert.alert("Aviso", "Conta criada! Faça login para continuar.");
 navigation.goBack();
 }
 } catch (error: any) {
 Alert.alert("Erro", error.message || "Ocorreu um erro ao criar a conta");
 } finally {
 setLoading(false);
 }
 }

 return (
 <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
 <StatusBar style="light" />
 <View style={styles.content}>
 <Text style={styles.icone}>📝</Text>
 <Text style={styles.titulo}>Criar Conta</Text>
 <Text style={styles.subtitulo}>Cadastre-se como paciente</Text>

 <View style={styles.formContainer}>
 <TextInput
 style={styles.input}
 placeholder="Nome completo"
 placeholderTextColor="#999"
 value={nome}
 onChangeText={setNome}
 editable={!loading}
 />

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
 placeholder="Senha (mínimo 6 caracteres)"
 placeholderTextColor="#999"
 value={senha}
 onChangeText={setSenha}
 secureTextEntry
 editable={!loading}
 />

 <TextInput
 style={styles.input}
 placeholder="CPF (000.000.000-00)"
 placeholderTextColor="#999"
 value={cpf}
 onChangeText={setCpf}
 keyboardType="numeric"
 editable={!loading}
 />

 <TextInput
 style={styles.input}
 placeholder="Telefone (11) 99999-9999"
 placeholderTextColor="#999"
 value={telefone}
 onChangeText={setTelefone}
 keyboardType="phone-pad"
 editable={!loading}
 />

 <TouchableOpacity
 style={[styles.botao, styles.botaoPrimario]}
 onPress={handleCadastro}
 disabled={loading}
 >
 {loading ? (
 <ActivityIndicator color="#fff" />
 ) : (
 <Text style={styles.botaoTexto}>Criar Conta</Text>
 )}
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoSecundario]}
 onPress={() => navigation.goBack()}
 disabled={loading}
 >
 <Text style={styles.botaoTextoSecundario}>Voltar ao Login</Text>
 </TouchableOpacity>
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
 paddingTop: 60,
 paddingBottom: 40,
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
});
