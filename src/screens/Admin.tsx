import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// Importa todas as funções do service layer
import {
  obterEspecialidades,
  obterMedicos,
  salvarEspecialidades,
  salvarMedicos,
  obterConsultas,
  salvarConsultas,
} from "../services/storage";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { Paciente } from "../types/paciente";
import { Consulta } from "../interfaces/consulta";

// Recebe navigation para poder voltar para Home
export default function Admin({ navigation }: any) {
  // ========== ESTADOS PARA ESPECIALIDADE ==========
  const [nomeEsp, setNomeEsp] = useState("");
  const [descEsp, setDescEsp] = useState("");
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  // ========== ESTADOS PARA MÉDICO ==========
  const [nomeMed, setNomeMed] = useState("");
  const [crmMed, setCrmMed] = useState("");
  const [medicos, setMedicos] = useState<Medico[]>([]);

  // ========== ESTADOS PARA CONSULTA DE TESTE ==========
  const [nomePac, setNomePac] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");

  // Carrega dados existentes ao montar
  useEffect(() => {
    carregarDados();
  }, []);

  // Busca especialidades e médicos salvos
  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }

  // Adiciona nova especialidade
  function adicionarEspecialidade() {
    // Validação simples
    if (!nomeEsp || !descEsp) {
      Alert.alert("Erro", "Preencha nome e descrição");
      return;
    }

    // Cria objeto especialidade
    const novaEsp: Especialidade = {
      id: especialidades.length + 1, // ID sequencial simples
      nome: nomeEsp,
      descricao: descEsp,
    };

    // Adiciona ao array e salva
    const novasEsps = [...especialidades, novaEsp];
    setEspecialidades(novasEsps);
    salvarEspecialidades(novasEsps);

    // Limpa campos
    setNomeEsp("");
    setDescEsp("");
    Alert.alert("Sucesso", "Especialidade adicionada!");
  }

  // Adiciona novo médico
  function adicionarMedico() {
    if (!nomeMed || !crmMed) {
      Alert.alert("Erro", "Preencha nome e CRM");
      return;
    }

    // Valida se há especialidade cadastrada
    if (especialidades.length === 0) {
      Alert.alert("Erro", "Adicione uma especialidade primeiro!");
      return;
    }

    // Cria objeto médico (usa primeira especialidade por simplicidade)
    const novoMed: Medico = {
      id: medicos.length + 1,
      nome: nomeMed,
      crm: crmMed,
      especialidade: especialidades[0], // Simplificação: usa primeira especialidade
      ativo: true,
    };

    const novosMeds = [...medicos, novoMed];
    setMedicos(novosMeds);
    salvarMedicos(novosMeds);

    setNomeMed("");
    setCrmMed("");
    Alert.alert("Sucesso", "Médico adicionado!");
  }

  // Cria consulta de teste para aparecer na Home
  async function criarConsultaTeste() {
    if (!nomePac || !dataConsulta) {
      Alert.alert("Erro", "Preencha nome do paciente e data");
      return;
    }

    if (medicos.length === 0) {
      Alert.alert("Erro", "Adicione um médico primeiro!");
      return;
    }

    // Cria paciente fictício
    const pacienteTeste: Paciente = {
      id: 1,
      nome: nomePac,
      cpf: "123.456.789-00",
      email: "paciente@email.com",
      telefone: "(11) 98765-4321",
    };

    // Converte string de data (DD/MM/AAAA) para objeto Date
    const [dia, mes, ano] = dataConsulta.split("/");
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    // Cria consulta (usa primeiro médico por simplicidade)
    const novaConsulta: Consulta = {
      id: Date.now(), // ID único usando timestamp
      medico: medicos[0],
      paciente: pacienteTeste,
      data: data,
      valor: 350,
      status: "agendada",
      observacoes: "Consulta de teste",
    };

    // Adiciona à lista existente
    const consultasAtuais = await obterConsultas();
    await salvarConsultas([...consultasAtuais, novaConsulta]);

    setNomePac("");
    setDataConsulta("");
    
    // Exibe alerta e navega de volta para Home
    Alert.alert("Sucesso", "Consulta criada! Volte para Home", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.content}>
        {/* ========== SEÇÃO 1: ESPECIALIDADES ========== */}
        <View style={styles.secao}>
          <Text style={styles.titulo}>1. Adicionar Especialidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da especialidade"
            value={nomeEsp}
            onChangeText={setNomeEsp}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descEsp}
            onChangeText={setDescEsp}
          />
          <Button title="Adicionar Especialidade" onPress={adicionarEspecialidade} color="black"/>

          {/* Lista de especialidades cadastradas */}
          <View style={styles.lista}>
            {especialidades.map((esp) => (
              <Text key={esp.id} style={styles.item}>
                • {esp.nome} - {esp.descricao}
              </Text>
            ))}
          </View>
        </View>

        {/* ========== SEÇÃO 2: MÉDICOS ========== */}
        <View style={styles.secao}>
          <Text style={styles.titulo}>2. Adicionar Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do médico"
            value={nomeMed}
            onChangeText={setNomeMed}
          />
          <TextInput
            style={styles.input}
            placeholder="CRM"
            value={crmMed}
            onChangeText={setCrmMed}
          />
          <Button title="Adicionar Médico" onPress={adicionarMedico} color="black"/>

          {/* Lista de médicos cadastrados */}
          <View style={styles.lista}>
            {medicos.map((med) => (
              <Text key={med.id} style={styles.item}>
                • {med.nome} ({med.crm}) - {med.especialidade.nome}
              </Text>
            ))}
          </View>
        </View>

        {/* ========== SEÇÃO 3: CONSULTA TESTE ========== */}
        <View style={styles.secao}>
          <Text style={styles.titulo}>3. Criar Consulta de Teste</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do paciente"
            value={nomePac}
            onChangeText={setNomePac}
          />
          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            value={dataConsulta}
            onChangeText={setDataConsulta}
          />
          <Button title="Criar Consulta" onPress={criarConsultaTeste} color="black"/>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  secao: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  lista: {
    marginTop: 15,
  },
  item: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});