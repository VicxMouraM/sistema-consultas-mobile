/**
 * NovaConsultaScreen - Formulário de Nova Consulta
 * Permite agendar uma nova consulta (stub inicial)
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type NovaConsultaScreenProps = {
 navigation: any;
};

export default function NovaConsultaScreen({
 navigation,
}: NovaConsultaScreenProps) {
 return (
 <View style={styles.container}>
 <View style={styles.content}>
 <Text style={styles.icone}>🚧</Text>
 <Text style={styles.titulo}>Em Desenvolvimento</Text>
 <Text style={styles.descricao}>
 O formulário de agendamento de consultas será implementado nas
 próximas aulas.
 </Text>

 <TouchableOpacity
 style={styles.botao}
 onPress={() => navigation.goBack()}
 >
 <Text style={styles.botaoTexto}>Voltar</Text>
 </TouchableOpacity>
 </View>
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
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
 fontSize: 24,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 16,
 textAlign: "center",
 },
 descricao: {
 fontSize: 16,
 color: "#666",
 textAlign: "center",
 marginBottom: 32,
 lineHeight: 24,
 },
 botao: {
 backgroundColor: "#79059C",
 paddingHorizontal: 32,
 paddingVertical: 16,
 borderRadius: 12,
 },
 botaoTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
});
