# 📱 Sistema de Consultas Mobile

## 📌 Descrição

Este projeto consiste em uma aplicação mobile desenvolvida em **React Native**, com o objetivo de gerenciar consultas médicas, permitindo visualizar, cadastrar e acompanhar atendimentos.

Nesta atividade, foi realizada a **refatoração completa dos estilos das telas**, separando os `StyleSheet` em arquivos próprios dentro da pasta `styles`, seguindo boas práticas de organização de código.

---

## 🎯 Objetivo da Atividade

* Separar os estilos de cada tela em arquivos `.styles.ts`
* Melhorar a organização do projeto
* Aplicar boas práticas de desenvolvimento
* Utilizar **Git Flow (branches + Pull Requests)**

---

## 🧩 Telas Refatoradas

| Etapa | Tela                   | Branch                        |
| ----- | ---------------------- | ----------------------------- |
| 1     | HomeScreen             | feat/styles-home              |
| 2     | ConsultasListScreen    | feat/styles-consultas-list    |
| 3     | ConsultaDetalhesScreen | feat/styles-consulta-detalhes |
| 4     | NovaConsultaScreen     | feat/styles-nova-consulta     |
| 5     | Login                  | feat/styles-login             |
| 6     | CadastroPaciente       | feat/styles-cadastro          |
| 7     | MinhasConsultas        | feat/styles-minhas-consultas  |

---

## 📁 Estrutura de Estilos

```
styles/
├── cadastroPaciente.styles.ts
├── consultaDetalhes.styles.ts
├── consultasList.styles.ts
├── home.styles.ts
├── login.styles.ts
├── minhasConsultas.styles.ts
└── novaConsulta.styles.ts
```

---

## 🔄 Git Flow Utilizado

* Cada tela foi refatorada em uma **branch específica**
* As alterações foram enviadas via **Pull Requests**
* Após revisão, as branches foram **mergeadas na main**
* Nenhuma alteração foi feita diretamente na branch principal

---

## 👩‍💻 Integrante

**Nome:** Victoria Moura
**RM:** 555474

---

## ✅ Resultado

* Todas as telas tiveram seus estilos refatorados
* Código mais organizado e modular
* Aplicação manteve o funcionamento original
* Uso correto de versionamento com Git Flow
