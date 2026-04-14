/**
 * Navigation - Configuração de Rotas
 * Define a navegação do aplicativo usando React Navigation
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ConsultasListScreen,
  ConsultaDetalhesScreen,
  NovaConsultaScreen,
} from "../screens";

// Tipagem das rotas (boas práticas de TypeScript)
export type RootStackParamList = {
  Home: undefined;
  ConsultasList: undefined;
  ConsultaDetalhes: { consultaId: number };
  NovaConsulta: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#79059C",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Sistema de Consultas",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="ConsultasList"
          component={ConsultasListScreen}
          options={{
            title: "Minhas Consultas",
          }}
        />

        <Stack.Screen
          name="ConsultaDetalhes"
          component={ConsultaDetalhesScreen}
          options={{
            title: "Detalhes da Consulta",
          }}
        />

        <Stack.Screen
          name="NovaConsulta"
          component={NovaConsultaScreen}
          options={{
            title: "Agendar Consulta",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
