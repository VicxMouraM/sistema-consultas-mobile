/**
 * NovaConsultaScreen - Formulário de Agendamento de Consulta
 * Permite ao paciente agendar uma nova consulta médica
 */

import React, { useState } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 TextInput,
 ScrollView,
 Modal,
 FlatList,
 Alert,
 ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import consultasService from "../services/consultasService";
import { styles } from "../styles/novaConsulta.styles";

// ─── Tipos locais ─────────────────────────────────────────────────────────────

type Especialidade =
 | "Cardiologia"
 | "Dermatologia"
 | "Ortopedia"
 | "Pediatria"
 | "Psiquiatria"
 | "Clínica Geral";

type Medico = {
 id: number;
 nome: string;
 especialidade: Especialidade;
};

// ─── Dados mock ───────────────────────────────────────────────────────────────

const ESPECIALIDADES: Especialidade[] = [
 "Cardiologia",
 "Clínica Geral",
 "Dermatologia",
 "Ortopedia",
 "Pediatria",
 "Psiquiatria",
];

const MEDICOS: Medico[] = [
 { id: 1, nome: "Dr. Roberto Silva", especialidade: "Cardiologia" },
 { id: 2, nome: "Dra. Maria Santos", especialidade: "Dermatologia" },
 { id: 3, nome: "Dr. João Pereira", especialidade: "Ortopedia" },
 { id: 4, nome: "Dra. Ana Costa", especialidade: "Clínica Geral" },
 { id: 5, nome: "Dr. Paulo Oliveira", especialidade: "Psiquiatria" },
 { id: 6, nome: "Dra. Carla Lima", especialidade: "Pediatria" },
];

const HORARIOS_DISPONIVEIS = [
 "08:00",
 "08:30",
 "09:00",
 "09:30",
 "10:00",
 "10:30",
 "11:00",
 "14:00",
 "14:30",
 "15:00",
 "15:30",
 "16:00",
 "16:30",
];

// ─── Máscara de data ──────────────────────────────────────────────────────────

function aplicarMascaraData(valor: string): string {
 const numeros = valor.replace(/\D/g, "").slice(0, 8);
 if (numeros.length <= 2) return numeros;
 if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
 return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

// ─────────────────────────────────────────────────────────────────────────────

type NovaConsultaScreenProps = {
 navigation: any;
};

export default function NovaConsultaScreen({
 navigation,
}: NovaConsultaScreenProps) {
 const { usuario } = useAuth();

 const [especialidade, setEspecialidade] = useState<Especialidade | null>(null);
 const [medico, setMedico] = useState<Medico | null>(null);
 const [data, setData] = useState("");
 const [horario, setHorario] = useState<string | null>(null);
 const [observacoes, setObservacoes] = useState("");
 const [loading, setLoading] = useState(false);

 const [modalEspecialidade, setModalEspecialidade] = useState(false);
 const [modalMedico, setModalMedico] = useState(false);
 const [modalHorario, setModalHorario] = useState(false);

 const medicosFiltrados = especialidade
 ? MEDICOS.filter((m) => m.especialidade === especialidade)
 : MEDICOS;

 function selecionarEspecialidade(esp: Especialidade) {
 setEspecialidade(esp);
 setMedico(null); // Reseta médico ao trocar especialidade
 setModalEspecialidade(false);
 }

 async function handleAgendar() {
 if (!especialidade) {
 Alert.alert("Atenção", "Selecione a especialidade.");
 return;
 }
 if (!medico) {
 Alert.alert("Atenção", "Selecione o médico.");
 return;
 }
 if (data.replace(/\D/g, "").length !== 8) {
 Alert.alert("Atenção", "Informe a data no formato DD/MM/AAAA.");
 return;
 }
 if (!horario) {
 Alert.alert("Atenção", "Selecione o horário.");
 return;
 }
 if (!usuario) {
 Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
 return;
 }

 // Converte data DD/MM/AAAA → AAAA-MM-DD (padrão ISO)
 const [dia, mes, ano] = data.split("/");
 const dataISO = `${ano}-${mes}-${dia}`;

 setLoading(true);
 try {
 await consultasService.criarConsulta({
 pacienteId: usuario.id,
 pacienteNome: usuario.nome,
 medicoId: medico.id,
 medicoNome: medico.nome,
 especialidade: especialidade as any,
 usuarioId: usuario.id,
 data: dataISO,
 horario: horario,
 status: "agendada",
 observacoes: observacoes.trim() || undefined,
 });

 Alert.alert(
 "Consulta Agendada!",
 `Sua consulta com ${medico.nome} foi agendada para ${data} às ${horario}.`,
 [{ text: "OK", onPress: () => navigation.goBack() }]
 );
 } catch (error: any) {
 Alert.alert("Erro", error.message || "Não foi possível agendar a consulta.");
 } finally {
 setLoading(false);
 }
 }

 return (
 <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
 <View style={styles.header}>
 <Text style={styles.headerTitulo}>Agendar Consulta</Text>
 <Text style={styles.headerSubtitulo}>
 Preencha os dados para agendar sua consulta
 </Text>
 </View>

 <View style={styles.form}>

 {/* ── Especialidade ── */}
 <Text style={styles.label}>Especialidade *</Text>
 <TouchableOpacity
 style={styles.selector}
 onPress={() => setModalEspecialidade(true)}
 >
 <Text style={especialidade ? styles.selectorTexto : styles.selectorPlaceholder}>
 {especialidade ?? "Selecione a especialidade"}
 </Text>
 <Text style={styles.selectorIcone}>▼</Text>
 </TouchableOpacity>

 {/* ── Médico ── */}
 <Text style={styles.label}>Médico *</Text>
 <TouchableOpacity
 style={[styles.selector, !especialidade && styles.selectorDesabilitado]}
 onPress={() => especialidade && setModalMedico(true)}
 >
 <Text style={medico ? styles.selectorTexto : styles.selectorPlaceholder}>
 {medico ? medico.nome : especialidade ? "Selecione o médico" : "Selecione a especialidade primeiro"}
 </Text>
 <Text style={styles.selectorIcone}>▼</Text>
 </TouchableOpacity>

 {/* ── Data ── */}
 <Text style={styles.label}>Data *</Text>
 <TextInput
 style={styles.input}
 placeholder="DD/MM/AAAA"
 placeholderTextColor="#aaa"
 value={data}
 onChangeText={(texto) => setData(aplicarMascaraData(texto))}
 keyboardType="numeric"
 maxLength={10}
 />

 {/* ── Horário ── */}
 <Text style={styles.label}>Horário *</Text>
 <TouchableOpacity
 style={styles.selector}
 onPress={() => setModalHorario(true)}
 >
 <Text style={horario ? styles.selectorTexto : styles.selectorPlaceholder}>
 {horario ?? "Selecione o horário"}
 </Text>
 <Text style={styles.selectorIcone}>▼</Text>
 </TouchableOpacity>

 {/* ── Observações ── */}
 <Text style={styles.label}>Observações (opcional)</Text>
 <TextInput
 style={[styles.input, styles.inputMultiline]}
 placeholder="Descreva seus sintomas ou motivo da consulta..."
 placeholderTextColor="#aaa"
 value={observacoes}
 onChangeText={setObservacoes}
 multiline
 numberOfLines={4}
 textAlignVertical="top"
 />

 {/* ── Botões ── */}
 <TouchableOpacity
 style={[styles.botaoAgendar, loading && styles.botaoDesabilitado]}
 onPress={handleAgendar}
 disabled={loading}
 >
 {loading ? (
 <ActivityIndicator color="#fff" />
 ) : (
 <Text style={styles.botaoAgendarTexto}>Confirmar Agendamento</Text>
 )}
 </TouchableOpacity>

 <TouchableOpacity
 style={styles.botaoCancelar}
 onPress={() => navigation.goBack()}
 disabled={loading}
 >
 <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
 </TouchableOpacity>
 </View>

 {/* ── Modal Especialidade ── */}
 <Modal visible={modalEspecialidade} transparent animationType="slide">
 <View style={styles.modalOverlay}>
 <View style={styles.modalContainer}>
 <Text style={styles.modalTitulo}>Selecione a Especialidade</Text>
 <FlatList
 data={ESPECIALIDADES}
 keyExtractor={(item) => item}
 renderItem={({ item }) => (
 <TouchableOpacity
 style={[
 styles.modalItem,
 especialidade === item && styles.modalItemSelecionado,
 ]}
 onPress={() => selecionarEspecialidade(item)}
 >
 <Text
 style={[
 styles.modalItemTexto,
 especialidade === item && styles.modalItemTextoSelecionado,
 ]}
 >
 {item}
 </Text>
 {especialidade === item && <Text>✓</Text>}
 </TouchableOpacity>
 )}
 />
 <TouchableOpacity
 style={styles.modalFechar}
 onPress={() => setModalEspecialidade(false)}
 >
 <Text style={styles.modalFecharTexto}>Fechar</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>

 {/* ── Modal Médico ── */}
 <Modal visible={modalMedico} transparent animationType="slide">
 <View style={styles.modalOverlay}>
 <View style={styles.modalContainer}>
 <Text style={styles.modalTitulo}>Selecione o Médico</Text>
 <FlatList
 data={medicosFiltrados}
 keyExtractor={(item) => item.id.toString()}
 renderItem={({ item }) => (
 <TouchableOpacity
 style={[
 styles.modalItem,
 medico?.id === item.id && styles.modalItemSelecionado,
 ]}
 onPress={() => {
 setMedico(item);
 setModalMedico(false);
 }}
 >
 <Text
 style={[
 styles.modalItemTexto,
 medico?.id === item.id && styles.modalItemTextoSelecionado,
 ]}
 >
 {item.nome}
 </Text>
 {medico?.id === item.id && <Text>✓</Text>}
 </TouchableOpacity>
 )}
 />
 <TouchableOpacity
 style={styles.modalFechar}
 onPress={() => setModalMedico(false)}
 >
 <Text style={styles.modalFecharTexto}>Fechar</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>

 {/* ── Modal Horário ── */}
 <Modal visible={modalHorario} transparent animationType="slide">
 <View style={styles.modalOverlay}>
 <View style={styles.modalContainer}>
 <Text style={styles.modalTitulo}>Selecione o Horário</Text>
 <FlatList
 data={HORARIOS_DISPONIVEIS}
 keyExtractor={(item) => item}
 numColumns={3}
 columnWrapperStyle={styles.horariosGrid}
 renderItem={({ item }) => (
 <TouchableOpacity
 style={[
 styles.horarioItem,
 horario === item && styles.horarioItemSelecionado,
 ]}
 onPress={() => {
 setHorario(item);
 setModalHorario(false);
 }}
 >
 <Text
 style={[
 styles.horarioItemTexto,
 horario === item && styles.horarioItemTextoSelecionado,
 ]}
 >
 {item}
 </Text>
 </TouchableOpacity>
 )}
 />
 <TouchableOpacity
 style={styles.modalFechar}
 onPress={() => setModalHorario(false)}
 >
 <Text style={styles.modalFecharTexto}>Fechar</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>
 </ScrollView>
 );
}