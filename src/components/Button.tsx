import React from "react";
import {
 TouchableOpacity,
 Text,
 StyleSheet,
 ActivityIndicator,
} from "react-native";

type ButtonProps = {
 title: string;
 onPress: () => void;
 variant?: "primary" | "secondary" | "danger";
 loading?: boolean;
 disabled?: boolean;
};

export default function Button({
 title,
 onPress,
 variant = "primary",
 loading = false,
 disabled = false,
}: ButtonProps) {
 const isDisabled = disabled || loading;

 return (
 <TouchableOpacity
 style={[
 styles.button,
 styles[variant],
 isDisabled && styles.disabled,
 ]}
 onPress={onPress}
 disabled={isDisabled}
 activeOpacity={0.7}
 >
 {loading ? (
 <ActivityIndicator color="#fff" />
 ) : (
 <Text style={styles.text}>{title}</Text>
 )}
 </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
 button: {
 padding: 14,
 borderRadius: 8,
 alignItems: "center",
 justifyContent: "center",
 marginVertical: 8,
 },
 primary: {
 backgroundColor: "#2196F3",
 },
 secondary: {
 backgroundColor: "#4CAF50",
 },
 danger: {
 backgroundColor: "#f44336",
 },
 disabled: {
 backgroundColor: "#ccc",
 opacity: 0.6,
 },
 text: {
 color: "#fff",
 fontSize: 16,
 fontWeight: "600",
 },
});
