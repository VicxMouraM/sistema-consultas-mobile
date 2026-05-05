import React from "react";
import {
 TouchableOpacity,
 Text,
 ActivityIndicator,
} from "react-native";
import { styles } from "../styles/button.styles";

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