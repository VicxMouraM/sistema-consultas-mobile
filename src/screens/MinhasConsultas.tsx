import React from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type MinhasConsultasProps = {
 navigation: any;
};

export default function MinhasConsultas({ navigation }: MinhasConsultasProps) {
 return (
 <View style={styles.container}>
 <StatusBar style="light" />
 <View style={styles.content}>
 <Text style={styles.icone}>📅</Text>
 <Text style={styles.titulo}>Minhas Consultas</Text>
 <Text style={styles.descricao}>
 Visualize todas as suas consultas médicas
 </Text>

 <View style={styles.botoesContainer}>
 <TouchableOpacity
 style={[styles.botao, styles.botaoPrimario]}
 onPress={() => navigation.navigate("ConsultasList")}
 >
 <Text style={styles.botaoTexto}>Ver Lista de Consultas</Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoSecundario]}
 onPress={() => navigation.navigate("Agendamento")}
 >
 <Text style={styles.botaoTexto}>Agendar Nova Consulta</Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoTerciario]}
 onPress={() => navigation.navigate("Home")}
 >
 <Text style={styles.botaoTextoSecundario}>Voltar ao Início</Text>
 </TouchableOpacity>
 </View>
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
 fontSize: 28,
 fontWeight: "bold",
 color: "#79059C",
 marginBottom: 16,
 },
 descricao: {
 fontSize: 16,
 color: "#666",
 textAlign: "center",
 marginBottom: 32,
 },
 botoesContainer: {
 width: "100%",
 gap: 16,
 },
 botao: {
 paddingVertical: 16,
 paddingHorizontal: 32,
 borderRadius: 12,
 alignItems: "center",
 },
 botaoPrimario: {
 backgroundColor: "#79059C",
 },
 botaoSecundario: {
 backgroundColor: "#4CAF50",
 },
 botaoTerciario: {
 backgroundColor: "transparent",
 borderWidth: 2,
 borderColor: "#79059C",
 },
 botaoTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
 botaoTextoSecundario: {
 color: "#79059C",
 fontWeight: "bold",
 fontSize: 16,
 },
});
