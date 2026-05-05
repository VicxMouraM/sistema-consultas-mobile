import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
 },
 header: {
 backgroundColor: "#fff",
 padding: 16,
 borderBottomWidth: 1,
 borderBottomColor: "#e0e0e0",
 },
 headerTitle: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 4,
 },
 headerSubtitle: {
 fontSize: 14,
 color: "#666",
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
 backgroundColor: "#f5f5f5",
 borderWidth: 1,
 borderColor: "#e0e0e0",
 },
 filtroAtivo: {
 backgroundColor: "#79059C",
 borderColor: "#79059C",
 },
 filtroTexto: {
 color: "#666",
 fontSize: 14,
 fontWeight: "500",
 },
 filtroTextoAtivo: {
 color: "#fff",
 },
 lista: {
 padding: 16,
 },
});