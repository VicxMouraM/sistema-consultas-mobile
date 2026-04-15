import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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