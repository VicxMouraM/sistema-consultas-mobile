import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#79059C",
 },
 scrollContent: {
 flexGrow: 1,
 },
 content: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 padding: 32,
 },
 icone: {
 fontSize: 80,
 marginBottom: 24,
 },
 titulo: {
 fontSize: 32,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 8,
 },
 subtitulo: {
 fontSize: 16,
 color: "#fff",
 opacity: 0.9,
 marginBottom: 32,
 },
 formContainer: {
 width: "100%",
 gap: 16,
 },
 input: {
 backgroundColor: "#fff",
 paddingVertical: 16,
 paddingHorizontal: 20,
 borderRadius: 12,
 fontSize: 16,
 color: "#333",
 },
 botao: {
 paddingVertical: 16,
 paddingHorizontal: 32,
 borderRadius: 12,
 alignItems: "center",
 },
 botaoPrimario: {
 backgroundColor: "#fff",
 marginTop: 8,
 },
 botaoSecundario: {
 backgroundColor: "transparent",
 borderWidth: 2,
 borderColor: "#fff",
 },
 botaoTexto: {
 color: "#79059C",
 fontWeight: "bold",
 fontSize: 16,
 },
 botaoTextoSecundario: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
 credenciaisContainer: {
 marginTop: 32,
 width: "100%",
 },
 credenciaisTitulo: {
 color: "#fff",
 fontSize: 14,
 textAlign: "center",
 opacity: 0.8,
 },
 credenciaisLista: {
 marginTop: 16,
 gap: 12,
 },
 credencialItem: {
 backgroundColor: "rgba(255, 255, 255, 0.15)",
 padding: 12,
 borderRadius: 8,
 borderWidth: 1,
 borderColor: "rgba(255, 255, 255, 0.3)",
 },
 credencialTipo: {
 color: "#fff",
 fontWeight: "bold",
 marginBottom: 4,
 },
 credencialTexto: {
 color: "#fff",
 fontSize: 12,
 opacity: 0.9,
 },
 botaoDebug: {
 marginTop: 16,
 borderWidth: 1,
 borderColor: "rgba(255, 0, 0, 0.5)",
 alignItems: "center",
 },
 botaoDebugPerigoso: {
 marginTop: 12,
 backgroundColor: "rgba(139, 0, 0, 0.6)",
 padding: 12,
 borderRadius: 8,
 borderWidth: 2,
 borderColor: "#ff0000",
 alignItems: "center",
 },
 botaoDebugTexto: {
 backgroundColor: "rgba(255, 0, 0, 0.3)",
 padding: 12,
 borderRadius: 8,
 color: "#fff",
 fontSize: 12,
 fontWeight: "bold",
 },
});