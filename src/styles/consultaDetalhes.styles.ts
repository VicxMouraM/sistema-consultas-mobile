import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
 },
 scrollContent: {
 padding: 20,
 },
 statusBadge: {
 alignSelf: "center",
 paddingHorizontal: 24,
 paddingVertical: 12,
 borderRadius: 24,
 marginBottom: 24,
 },
 statusTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 textTransform: "uppercase",
 },
 secao: {
 marginBottom: 20,
 },
 secaoTitulo: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 12,
 },
 card: {
 backgroundColor: "#fff",
 borderRadius: 12,
 padding: 16,
 boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
 elevation: 3,
 },
 row: {
 flexDirection: "row",
 gap: 16,
 },
 coluna: {
 flex: 1,
 },
 label: {
 fontSize: 12,
 color: "#666",
 marginBottom: 4,
 },
 valor: {
 fontSize: 18,
 color: "#333",
 fontWeight: "600",
 },
 observacoes: {
 fontSize: 16,
 color: "#555",
 lineHeight: 24,
 },
 acoes: {
 gap: 12,
 marginTop: 12,
 },
 botao: {
 paddingVertical: 16,
 borderRadius: 12,
 alignItems: "center",
 },
 botaoConfirmar: {
 backgroundColor: "#4CAF50",
 },
 botaoCancelar: {
 backgroundColor: "#F44336",
 },
 botaoTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
});