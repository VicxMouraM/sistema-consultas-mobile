/**
 * NovaConsultaScreen - Formulário de Nova Consulta
 * Permite agendar uma nova consulta (stub inicial)
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/novaConsulta.styles"

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