import React from "react";
import {
 View,
 Text,
 TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles/agendamento.styles";

type AgendamentoProps = {
 navigation: any;
};

export default function Agendamento({ navigation }: AgendamentoProps) {
 return (
 <View style={styles.container}>
 <StatusBar style="light" />
 <View style={styles.content}>
 <Text style={styles.icone}>📅</Text>
 <Text style={styles.titulo}>Agendamento de Consultas</Text>
 <Text style={styles.descricao}>
 Agende sua consulta médica de forma rápida e fácil
 </Text>

 <View style={styles.botoesContainer}>
 <TouchableOpacity
 style={[styles.botao, styles.botaoPrimario]}
 onPress={() => navigation.navigate("NovaConsulta")}
 >
 <Text style={styles.botaoTexto}>Nova Consulta</Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoSecundario]}
 onPress={() => navigation.navigate("ConsultasList")}
 >
 <Text style={styles.botaoTexto}>Ver Minhas Consultas</Text>
 </TouchableOpacity>

 <TouchableOpacity
 style={[styles.botao, styles.botaoTerciario]}
 onPress={() => navigation.goBack()}
 >
 <Text style={styles.botaoTextoSecundario}>Voltar</Text>
 </TouchableOpacity>
 </View>
 </View>
 </View>
 );
}