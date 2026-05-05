/**
 * Cadastro de Paciente
 * Permite criar uma nova conta de paciente
 */

import React, { useState } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 TextInput,
 ScrollView,
 Alert,
 ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";
import { cadastrarUsuario } from "../services/authService";
import { styles } from "../styles/cadastroPaciente.styles"

type CadastroPacienteProps = {
 navigation: any;
};

// ─── Funções de máscara ───────────────────────────────────────────────────────

function aplicarMascaraCPF(valor: string): string {
 const numeros = valor.replace(/\D/g, "").slice(0, 11);
 if (numeros.length <= 3) return numeros;
 if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
 if (numeros.length <= 9)
 return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
 return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
}

function aplicarMascaraTelefone(valor: string): string {
 const numeros = valor.replace(/\D/g, "").slice(0, 11);
 if (numeros.length === 0) return "";
 if (numeros.length <= 2) return `(${numeros}`;
 if (numeros.length <= 7)
 return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
 return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

// ─── Validação de CPF ─────────────────────────────────────────────────────────
/**
 * Valida CPF usando o algoritmo oficial da Receita Federal
 * 
 * O CPF é composto por 11 dígitos: XXX.XXX.XXX-YZ
 * Onde YZ são os dígitos verificadores calculados a partir dos 9 primeiros.
 * 
 * ALGORITMO:
 * 1. Primeiro dígito verificador (Y):
 * - Multiplica os 9 primeiros dígitos pela sequência decrescente de 10 a 2
 * - Soma todos os resultados
 * - Calcula o resto da divisão por 11
 * - Se resto < 2, dígito = 0, caso contrário dígito = 11 - resto
 * 
 * 2. Segundo dígito verificador (Z):
 * - Multiplica os 10 primeiros dígitos (incluindo o primeiro verificador) por 11 a 2
 * - Soma todos os resultados
 * - Calcula o resto da divisão por 11
 * - Se resto < 2, dígito = 0, caso contrário dígito = 11 - resto
 * 
 * POR QUE VALIDAR CPF?
 * - Segurança: Previne cadastros com dados falsos ou digitação incorreta
 * - Integridade: Garante que apenas CPFs matematicamente válidos sejam aceitos
 * - Compliance: Muitas aplicações precisam estar em conformidade com LGPD
 * - UX: Feedback imediato ao usuário sobre erro de digitação
 * 
 * PARA TESTAR: Use o gerador https://www.4devs.com.br/gerador_de_cpf
 */
function validarCPF(cpf: string): boolean {
 // Remove formatação (pontos e traços)
 const numeros = cpf.replace(/\D/g, "");

 // CPF deve ter exatamente 11 dígitos
 if (numeros.length !== 11) return false;

 // Rejeita CPFs com todos os dígitos iguais (ex: 000.000.000-00, 111.111.111-11)
 // Estes CPFs passariam no cálculo matemático mas são inválidos
 if (/^(\d)\1{10}$/.test(numeros)) return false;

 // ── Cálculo do primeiro dígito verificador ──
 let soma = 0;
 for (let i = 0; i < 9; i++) {
 soma += parseInt(numeros.charAt(i)) * (10 - i);
 }
 let resto = (soma * 10) % 11;
 const digito1 = resto === 10 ? 0 : resto;

 // Verifica se o primeiro dígito verificador está correto
 if (digito1 !== parseInt(numeros.charAt(9))) return false;

 // ── Cálculo do segundo dígito verificador ──
 soma = 0;
 for (let i = 0; i < 10; i++) {
 soma += parseInt(numeros.charAt(i)) * (11 - i);
 }
 resto = (soma * 10) % 11;
 const digito2 = resto === 10 ? 0 : resto;

 // Verifica se o segundo dígito verificador está correto
 if (digito2 !== parseInt(numeros.charAt(10))) return false;

 // CPF válido!
 return true;
}

// ─── Validação de Email ───────────────────────────────────────────────────────
/**
 * Valida formato de email
 * Usa regex simples para verificar estrutura básica: texto@dominio.extensao
 */
function validarEmail(email: string): boolean {
 const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return regex.test(email.trim());
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CadastroPaciente({ navigation }: CadastroPacienteProps) {
 const { login } = useAuth();
 const [nome, setNome] = useState("");
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [cpf, setCpf] = useState("");
 const [telefone, setTelefone] = useState("");
 const [loading, setLoading] = useState(false);
 
 // Estados para mensagens de erro inline
 const [erroCpf, setErroCpf] = useState("");
 const [erroEmail, setErroEmail] = useState("");

 async function handleCadastro() {
 // Validação básica
 if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !telefone.trim()) {
 Alert.alert("Erro", "Preencha todos os campos");
 return;
 }

 if (senha.length < 6) {
 Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres");
 return;
 }

 // Validação oficial de CPF usando algoritmo da Receita Federal
 if (!validarCPF(cpf)) {
 Alert.alert(
 "CPF Inválido", 
 "O CPF informado não é válido.\n\n💡 Para testar, gere um CPF válido em:\nhttps://www.4devs.com.br/gerador_de_cpf"
 );
 return;
 }

 const digitosTel = telefone.replace(/\D/g, "");
 if (digitosTel.length < 10 || digitosTel.length > 11) {
 Alert.alert("Erro", "Telefone inválido. Informe DDD + número.");
 return;
 }

 setLoading(true);
 try {
 // Cadastra novo usuário
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

 // Faz login automático
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

 // Validação do CPF quando o campo perde o foco
 function validarCampoCpf() {
 if (cpf.trim() === "") {
 setErroCpf("");
 return;
 }
 
 if (!validarCPF(cpf)) {
 setErroCpf("CPF inválido. Use https://www.4devs.com.br/gerador_de_cpf para gerar um válido.");
 } else {
 setErroCpf("");
 }
 }

 // Validação do Email quando o campo perde o foco
 function validarCampoEmail() {
 if (email.trim() === "") {
 setErroEmail("");
 return;
 }
 
 if (!validarEmail(email)) {
 setErroEmail("Email inválido. Use o formato: exemplo@dominio.com");
 } else {
 setErroEmail("");
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
 <View style={styles.inputWrapper}>
 <TextInput
 style={styles.input}
 placeholder="Nome completo"
 placeholderTextColor="#999"
 value={nome}
 onChangeText={setNome}
 editable={!loading}
 />
 </View>

 <View style={styles.inputWrapper}>
 <TextInput
 style={[styles.input, erroEmail ? styles.inputErro : null]}
 placeholder="Email"
 placeholderTextColor="#999"
 value={email}
 onChangeText={(texto) => {
 setEmail(texto);
 if (erroEmail) setErroEmail(""); // Limpa erro ao digitar
 }}
 onBlur={validarCampoEmail}
 autoCapitalize="none"
 keyboardType="email-address"
 editable={!loading}
 />
 {erroEmail ? <Text style={styles.textoErro}>{erroEmail}</Text> : null}
 </View>

 <View style={styles.inputWrapper}>
 <TextInput
 style={styles.input}
 placeholder="Senha (mínimo 6 caracteres)"
 placeholderTextColor="#999"
 value={senha}
 onChangeText={setSenha}
 secureTextEntry
 editable={!loading}
 />
 </View>

 <View style={styles.inputWrapper}>
 <TextInput
 style={[styles.input, erroCpf ? styles.inputErro : null]}
 placeholder="CPF (000.000.000-00)"
 placeholderTextColor="#999"
 value={cpf}
 onChangeText={(texto) => {
 setCpf(aplicarMascaraCPF(texto));
 if (erroCpf) setErroCpf(""); // Limpa erro ao digitar
 }}
 onBlur={validarCampoCpf}
 keyboardType="numeric"
 maxLength={14}
 editable={!loading}
 />
 {erroCpf ? <Text style={styles.textoErro}>{erroCpf}</Text> : null}
 </View>

 <View style={styles.inputWrapper}>
 <TextInput
 style={styles.input}
 placeholder="Telefone (11) 99999-9999"
 placeholderTextColor="#999"
 value={telefone}
 onChangeText={(texto) => setTelefone(aplicarMascaraTelefone(texto))}
 keyboardType="phone-pad"
 maxLength={16}
 editable={!loading}
 />
 </View>

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
