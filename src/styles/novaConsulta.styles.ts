import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#f5f5f5",
 },
 scrollContent: {
 paddingBottom: 40,
 },
 header: {
 backgroundColor: "#79059C",
 paddingTop: 20,
 paddingBottom: 32,
 paddingHorizontal: 24,
 },
 headerTitulo: {
 fontSize: 26,
 fontWeight: "bold",
 color: "#fff",
 marginBottom: 6,
 },
 headerSubtitulo: {
 fontSize: 14,
 color: "#fff",
 opacity: 0.85,
 },
 form: {
 padding: 20,
 gap: 8,
 },
 label: {
 fontSize: 14,
 fontWeight: "600",
 color: "#444",
 marginTop: 12,
 marginBottom: 4,
 },
 input: {
 backgroundColor: "#fff",
 borderWidth: 1,
 borderColor: "#ddd",
 borderRadius: 10,
 paddingVertical: 14,
 paddingHorizontal: 16,
 fontSize: 16,
 color: "#333",
 },
 inputMultiline: {
 height: 100,
 paddingTop: 14,
 },
 selector: {
 backgroundColor: "#fff",
 borderWidth: 1,
 borderColor: "#ddd",
 borderRadius: 10,
 paddingVertical: 14,
 paddingHorizontal: 16,
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 },
 selectorDesabilitado: {
 backgroundColor: "#f0f0f0",
 borderColor: "#e0e0e0",
 },
 selectorTexto: {
 fontSize: 16,
 color: "#333",
 flex: 1,
 },
 selectorPlaceholder: {
 fontSize: 16,
 color: "#aaa",
 flex: 1,
 },
 selectorIcone: {
 fontSize: 12,
 color: "#79059C",
 marginLeft: 8,
 },
 botaoAgendar: {
 backgroundColor: "#79059C",
 paddingVertical: 16,
 borderRadius: 12,
 alignItems: "center",
 marginTop: 24,
 },
 botaoDesabilitado: {
 opacity: 0.6,
 },
 botaoAgendarTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
 botaoCancelar: {
 paddingVertical: 14,
 borderRadius: 12,
 alignItems: "center",
 borderWidth: 2,
 borderColor: "#79059C",
 marginTop: 8,
 },
 botaoCancelarTexto: {
 color: "#79059C",
 fontWeight: "bold",
 fontSize: 16,
 },
 // ── Modal ──
 modalOverlay: {
 flex: 1,
 backgroundColor: "rgba(0,0,0,0.5)",
 justifyContent: "flex-end",
 },
 modalContainer: {
 backgroundColor: "#fff",
 borderTopLeftRadius: 24,
 borderTopRightRadius: 24,
 padding: 24,
 maxHeight: "70%",
 },
 modalTitulo: {
 fontSize: 18,
 fontWeight: "bold",
 color: "#333",
 marginBottom: 16,
 textAlign: "center",
 },
 modalItem: {
 paddingVertical: 14,
 paddingHorizontal: 16,
 borderRadius: 8,
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 marginBottom: 4,
 },
 modalItemSelecionado: {
 backgroundColor: "#f3e5f5",
 },
 modalItemTexto: {
 fontSize: 16,
 color: "#333",
 },
 modalItemTextoSelecionado: {
 color: "#79059C",
 fontWeight: "600",
 },
 modalFechar: {
 marginTop: 16,
 backgroundColor: "#79059C",
 paddingVertical: 14,
 borderRadius: 10,
 alignItems: "center",
 },
 modalFecharTexto: {
 color: "#fff",
 fontWeight: "bold",
 fontSize: 16,
 },
 // ── Horários ──
 horariosGrid: {
 justifyContent: "space-between",
 marginBottom: 8,
 },
 horarioItem: {
 flex: 1,
 marginHorizontal: 4,
 paddingVertical: 12,
 borderRadius: 8,
 borderWidth: 1,
 borderColor: "#ddd",
 alignItems: "center",
 },
 horarioItemSelecionado: {
 backgroundColor: "#79059C",
 borderColor: "#79059C",
 },
 horarioItemTexto: {
 fontSize: 15,
 color: "#333",
 fontWeight: "500",
 },
 horarioItemTextoSelecionado: {
 color: "#fff",
 },
});