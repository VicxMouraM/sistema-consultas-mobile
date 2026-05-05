import React from "react";
import {
 TextInput,
 Text,
 View,
 StyleSheet,
 TextInputProps,
} from "react-native";

type InputProps = TextInputProps & {
 label: string;
 error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
 return (
 <View style={styles.container}>
 <Text style={styles.label}>{label}</Text>
 <TextInput
 style={[styles.input, error && styles.inputError]}
 placeholderTextColor="#999"
 {...props}
 />
 {error && <Text style={styles.errorText}>{error}</Text>}
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 marginBottom: 16,
 },
 label: {
 fontSize: 14,
 fontWeight: "600",
 color: "#333",
 marginBottom: 6,
 },
 input: {
 backgroundColor: "#fff",
 borderWidth: 1,
 borderColor: "#ddd",
 borderRadius: 8,
 padding: 12,
 fontSize: 16,
 color: "#333",
 },
 inputError: {
 borderColor: "#f44336",
 },
 errorText: {
 color: "#f44336",
 fontSize: 12,
 marginTop: 4,
 },
});
