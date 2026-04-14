/**
 * ConsultaDetalhesScreen - Detalhes da Consulta
 * Exibe informações completas de uma consulta específica
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Consulta } from "../types";
import { Loading } from "../components";
import { consultasService } from "../services/consultasService";
import {
  formatarData,
  formatarHorario,
  obterCorStatus,
  obterTextoStatus,
} from "../utils/formatters";
import { styles } from "../styles/consultaDetalhes.styles";

type ConsultaDetalhesScreenProps = {
  navigation: any;
  route: any;
};

export default function ConsultaDetalhesScreen({
  navigation,
  route,
}: ConsultaDetalhesScreenProps) {
  const { consultaId } = route.params;
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarConsulta();
  }, [consultaId]);

  async function carregarConsulta() {
    setLoading(true);
    try {
      const dados = await consultasService.obterConsulta(consultaId);
      setConsulta(dados);
    } catch (error) {
      console.error("Erro ao carregar consulta:", error);
      Alert.alert("Erro", "Não foi possível carregar a consulta");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmar() {
    if (!consulta) return;

    Alert.alert(
      "Confirmar Consulta",
      "Deseja confirmar esta consulta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await consultasService.confirmarConsulta(consulta.id);
              carregarConsulta();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível confirmar a consulta");
            }
          },
        },
      ]
    );
  }

  async function handleCancelar() {
    if (!consulta) return;

    Alert.alert(
      "Cancelar Consulta",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            try {
              await consultasService.cancelarConsulta(consulta.id);
              carregarConsulta();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível cancelar a consulta");
            }
          },
        },
      ]
    );
  }

  if (loading || !consulta) {
    return <Loading mensagem="Carregando detalhes..." />;
  }

  const corStatus = obterCorStatus(consulta.status);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: corStatus }]}>
          <Text style={styles.statusTexto}>
            {obterTextoStatus(consulta.status)}
          </Text>
        </View>

        {/* Seção Paciente */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>👤 Paciente</Text>
          <View style={styles.card}>
            <Text style={styles.valor}>{consulta.pacienteNome}</Text>
          </View>
        </View>

        {/* Seção Médico */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>👨‍⚕️ Médico</Text>
          <View style={styles.card}>
            <Text style={styles.valor}>{consulta.medicoNome}</Text>
            <Text style={styles.label}>{consulta.especialidade}</Text>
          </View>
        </View>

        {/* Seção Data e Hora */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>📅 Agendamento</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.coluna}>
                <Text style={styles.label}>Data</Text>
                <Text style={styles.valor}>{formatarData(consulta.data)}</Text>
              </View>
              <View style={styles.coluna}>
                <Text style={styles.label}>Horário</Text>
                <Text style={styles.valor}>
                  {formatarHorario(consulta.horario)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seção Observações */}
        {consulta.observacoes && (
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>📝 Observações</Text>
            <View style={styles.card}>
              <Text style={styles.observacoes}>{consulta.observacoes}</Text>
            </View>
          </View>
        )}

        {/* Botões de Ação */}
        <View style={styles.acoes}>
          {consulta.status === "agendada" && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoConfirmar]}
              onPress={handleConfirmar}
            >
              <Text style={styles.botaoTexto}>✓ Confirmar Consulta</Text>
            </TouchableOpacity>
          )}

          {(consulta.status === "agendada" ||
            consulta.status === "confirmada") && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={handleCancelar}
            >
              <Text style={styles.botaoTexto}>✕ Cancelar Consulta</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}