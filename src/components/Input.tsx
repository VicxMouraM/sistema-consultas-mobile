import React from "react";
import {
 TextInput,
 Text,
 View,
 TextInputProps,
} from "react-native";
import { styles } from "../styles/input.styles";

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