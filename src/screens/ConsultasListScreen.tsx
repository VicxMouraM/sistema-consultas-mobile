/**
 * ConsultasListScreen - Lista de Consultas
 * Exibe todas as consultas do usuário com filtros
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Consulta, StatusConsulta } from "../types";
import { ConsultaCard, Loading, EmptyState } from "../components";
import { consultasService } from "../services/consultasService";

type ConsultasListScreenProps = {
  navigation: any;
};

export default function ConsultasListScreen({
  navigation,
}: ConsultasListScreenProps) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState<StatusConsulta | "todas">(
    "todas"
  );

  useEffect(() => {
    carregarConsultas();
  }, []);

  async function carregarConsultas() {
    setLoading(true);
    try {
      const dados = await consultasService.listarConsultas();
      setConsultas(dados);
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmar(id: number) {
    try {
      await consultasService.confirmarConsulta(id);
      carregarConsultas();
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);
    }
  }

  async function handleCancelar(id: number) {
    try {
      await consultasService.cancelarConsulta(id);
      carregarConsultas();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
  }

  function handleDetalhes(id: number) {
    navigation.navigate("ConsultaDetalhes", { consultaId: id });
  }

  const consultasFiltradas =
    filtroAtivo === "todas"
      ? consultas
      : consultas.filter((c) => c.status === filtroAtivo);

  if (loading) {
    return <Loading mensagem="Carregando consultas..." />;
  }

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filtros}>
        <TouchableOpacity
          style={[
            styles.filtro,
            filtroAtivo === "todas" && styles.filtroAtivo,
          ]}
          onPress={() => setFiltroAtivo("todas")}
        >
          <Text
            style={[
              styles.filtroTexto,
              filtroAtivo === "todas" && styles.filtroTextoAtivo,
            ]}
          >
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filtro,
            filtroAtivo === "agendada" && styles.filtroAtivo,
          ]}
          onPress={() => setFiltroAtivo("agendada")}
        >
          <Text
            style={[
              styles.filtroTexto,
              filtroAtivo === "agendada" && styles.filtroTextoAtivo,
            ]}
          >
            Agendadas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filtro,
            filtroAtivo === "confirmada" && styles.filtroAtivo,
          ]}
          onPress={() => setFiltroAtivo("confirmada")}
        >
          <Text
            style={[
              styles.filtroTexto,
              filtroAtivo === "confirmada" && styles.filtroTextoAtivo,
            ]}
          >
            Confirmadas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Consultas */}
      <FlatList
        data={consultasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultaCard
            consulta={item}
            onConfirmar={handleConfirmar}
            onCancelar={handleCancelar}
            onDetalhes={handleDetalhes}
          />
        )}
        contentContainerStyle={
          consultasFiltradas.length === 0 && styles.emptyContainer
        }
        ListEmptyComponent={
          <EmptyState
            mensagem={
              filtroAtivo === "todas"
                ? "Você ainda não possui consultas"
                : `Nenhuma consulta ${filtroAtivo}`
            }
            icone="📅"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  filtros: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filtro: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  filtroAtivo: {
    backgroundColor: "#79059C",
  },
  filtroTexto: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  filtroTextoAtivo: {
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
  },
});
