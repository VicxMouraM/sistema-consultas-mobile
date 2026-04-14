/**
 * App.tsx - Ponto de Entrada do Aplicativo
 * Configuração principal com navegação
 */

import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="light" />
    </>
  );
}