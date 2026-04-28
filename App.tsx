import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/contexts/AuthContext";
import { inicializarUsuarios } from "./src/services/authService";
import { inicializarConsultas } from "./src/services/consultasService";
import Navigation from "./src/navigation";

export default function App() {
 useEffect(() => {
 // Inicializa dados de teste ao carregar o app
 async function inicializarDados() {
 await inicializarUsuarios();
 await inicializarConsultas();
 }
 inicializarDados();
 }, []);

 return (
 <AuthProvider>
 <Navigation />
 <StatusBar style="light" />
 </AuthProvider>
 );
}