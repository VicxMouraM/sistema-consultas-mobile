import { StyleSheet } from "react-native";

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
 paddingTop: 60,
 paddingBottom: 40,
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
 inputWrapper: {
 width: "100%",
 },
 input: {
 backgroundColor: "#fff",
 paddingVertical: 16,
 paddingHorizontal: 20,
 borderRadius: 12,
 fontSize: 16,
 color: "#333",
 },
 inputErro: {
 borderWidth: 2,
 borderColor: "#ff6b6b",
 },
 textoErro: {
 color: "#ffcccc",
 fontSize: 12,
 marginTop: 6,
 marginLeft: 4,
 lineHeight: 16,
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
});