import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 card: {
 backgroundColor: "#fff",
 borderRadius: 12,
 padding: 16,
 marginVertical: 8,
 marginHorizontal: 16,
 boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
 backgroundColor: "#f44336",
 },
 botaoDetalhes: {
 backgroundColor: "transparent",
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
