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

export default function Admin({ navigation }: any) {
  // Estados para especialidade
  const [nomeEsp, setNomeEsp] = useState("");
  const [descEsp, setDescEsp] = useState("");
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  // Estados para médico
  const [nomeMed, setNomeMed] = useState("");
  const [crmMed, setCrmMed] = useState("");
  const [medicos, setMedicos] = useState<Medico[]>([]);

  // Estados para consulta de teste
  const [nomePac, setNomePac] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }

  function adicionarEspecialidade() {
    if (!nomeEsp || !descEsp) {
      Alert.alert("Erro", "Preencha nome e descrição");
      return;
    }

    const novaEsp: Especialidade = {
      id: especialidades.length + 1,
      nome: nomeEsp,
      descricao: descEsp,
    };

    const novasEsps = [...especialidades, novaEsp];
    setEspecialidades(novasEsps);
    salvarEspecialidades(novasEsps);

    setNomeEsp("");
    setDescEsp("");
    Alert.alert("Sucesso", "Especialidade adicionada!");
  }

  function adicionarMedico() {
    if (!nomeMed || !crmMed) {
      Alert.alert("Erro", "Preencha nome e CRM");
      return;
    }

    if (especialidades.length === 0) {
      Alert.alert("Erro", "Adicione uma especialidade primeiro!");
      return;
    }

    const novoMed: Medico = {
      id: medicos.length + 1,
      nome: nomeMed,
      crm: crmMed,
      especialidade: especialidades[0], // Usa a primeira especialidade
      ativo: true,
    };

    const novosMeds = [...medicos, novoMed];
    setMedicos(novosMeds);
    salvarMedicos(novosMeds);

    setNomeMed("");
    setCrmMed("");
    Alert.alert("Sucesso", "Médico adicionado!");
  }

  async function criarConsultaTeste() {
    if (!nomePac || !dataConsulta) {
      Alert.alert("Erro", "Preencha nome do paciente e data");
      return;
    }

    if (medicos.length === 0) {
      Alert.alert("Erro", "Adicione um médico primeiro!");
      return;
    }

    const pacienteTeste: Paciente = {
      id: 1,
      nome: nomePac,
      cpf: "123.456.789-00",
      email: "paciente@email.com",
      telefone: "(11) 98765-4321",
    };

    const [dia, mes, ano] = dataConsulta.split("/");
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const novaConsulta: Consulta = {
      id: Date.now(),
      medico: medicos[0],
      paciente: pacienteTeste,
      data: data,
      valor: 350,
      status: "agendada",
      observacoes: "Consulta de teste",
    };

    const consultasAtuais = await obterConsultas();
    await salvarConsultas([...consultasAtuais, novaConsulta]);

    setNomePac("");
    setDataConsulta("");
    Alert.alert("Sucesso", "Consulta criada! Volte para Home", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.content}>
        {/* Seção Especialidades */}
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
          <Button title="Adicionar Especialidade" onPress={adicionarEspecialidade} />

          <View style={styles.lista}>
            {especialidades.map((esp) => (
              <Text key={esp.id} style={styles.item}>
                • {esp.nome} - {esp.descricao}
              </Text>
            ))}
          </View>
        </View>

        {/* Seção Médicos */}
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
          <Button title="Adicionar Médico" onPress={adicionarMedico} />

          <View style={styles.lista}>
            {medicos.map((med) => (
              <Text key={med.id} style={styles.item}>
                • {med.nome} ({med.crm}) - {med.especialidade.nome}
              </Text>
            ))}
          </View>
        </View>

        {/* Seção Consulta  Teste */}
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
          <Button title="Criar Consulta" onPress={criarConsultaTeste} />
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
