/**
 * Componente Card de Consulta
 * Exibe informações de uma consulta com ações disponíveis
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Consulta } from "../types";
import { formatarData, formatarHorario, obterCorStatus, obterTextoStatus } from "../utils/formatters";
import { styles } from "../styles/consultaCard.styles";

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