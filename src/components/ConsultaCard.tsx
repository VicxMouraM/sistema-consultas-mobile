/**
 * Componente Card de Consulta
 * Exibe informações de uma consulta com ações disponíveis
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Consulta } from "../types";
import { formatarData, formatarHorario, obterCorStatus, obterTextoStatus } from "../utils/formatters";

type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar?: (id: number) => void;
  onCancelar?: (id: number) => void;
  onDetalhes?: (id: number) => void;
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
  onDetalhes,
}: ConsultaCardProps) {
  const corStatus = obterCorStatus(consulta.status);

  return (
    <View style={styles.card}>
      {/* Cabeçalho com Status */}
      <View style={[styles.statusBadge, { backgroundColor: corStatus }]}>
        <Text style={styles.statusTexto}>
          {obterTextoStatus(consulta.status)}
        </Text>
      </View>

      {/* Informações Principais */}
      <View style={styles.info}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.valor}>{consulta.pacienteNome}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Médico:</Text>
        <Text style={styles.valor}>{consulta.medicoNome}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Especialidade:</Text>
        <Text style={styles.valor}>{consulta.especialidade}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.info, { flex: 1 }]}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.valor}>{formatarData(consulta.data)}</Text>
        </View>
        <View style={[styles.info, { flex: 1 }]}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.valor}>{formatarHorario(consulta.horario)}</Text>
        </View>
      </View>

      {consulta.observacoes && (
        <View style={styles.info}>
          <Text style={styles.label}>Observações:</Text>
          <Text style={styles.valorSecundario}>{consulta.observacoes}</Text>
        </View>
      )}

      {/* Botões de Ação */}
      <View style={styles.acoes}>
        {consulta.status === "agendada" && onConfirmar && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoConfirmar]}
            onPress={() => onConfirmar(consulta.id)}
          >
            <Text style={styles.botaoTexto}>Confirmar</Text>
          </TouchableOpacity>
        )}

        {(consulta.status === "agendada" || consulta.status === "confirmada") &&
          onCancelar && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={() => onCancelar(consulta.id)}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          )}

        {onDetalhes && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoDetalhes]}
            onPress={() => onDetalhes(consulta.id)}
          >
            <Text style={styles.botaoTextoSecundario}>Ver Detalhes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  info: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  valor: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  valorSecundario: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
  acoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  botao: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  botaoConfirmar: {
    backgroundColor: "#4CAF50",
  },
  botaoCancelar: {
    backgroundColor: "#F44336",
  },
  botaoDetalhes: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#79059C",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  botaoTextoSecundario: {
    color: "#79059C",
    fontWeight: "bold",
    fontSize: 14,
  },
});
