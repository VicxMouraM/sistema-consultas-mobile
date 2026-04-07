import React from "react";
// Importa componentes do React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importa as telas
import Home from "./src/screens/Home";
import Admin from "./src/screens/Admin";
// Cria o navegador
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer envolve toda a navegação
    <NavigationContainer>
      {/* Stack.Navigator define a pilha de telas */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#000000" }, // Cor do cabeçalho
          headerTintColor: "white", // Cor do texto do cabeçalho
          headerTitleStyle: { fontWeight: "bold" }, // Estilo do título
        }}
      >
        {/* Tela Home - tela inicial */}
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: "Minhas Consultas" }}
        />
        {/* Tela Admin - tela administrativa */}
        <Stack.Screen 
          name="Admin" 
          component={Admin}
          options={{ title: "Painel Administrativo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}