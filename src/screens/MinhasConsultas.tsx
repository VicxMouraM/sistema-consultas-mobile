import React from "react";
import {
 View,
 Text,
 TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles/minhasConsultas.styles";

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