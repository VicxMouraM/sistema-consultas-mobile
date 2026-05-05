/**
 * Componente Loading
 * Indicador de carregamento centralizado
 */

import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "../styles/loading.styles";

type LoadingProps = {
 mensagem?: string;
};

export default function Loading({ mensagem = "Carregando..." }: LoadingProps) {
 return (
 <View style={styles.container}>
 <ActivityIndicator size="large" color="#79059C" />
 <Text style={styles.texto}>{mensagem}</Text>
 </View>
 );
}