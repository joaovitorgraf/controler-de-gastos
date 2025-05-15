# Controle de Gastos 💸

Aplicativo mobile desenvolvido em **React Native** com **Expo** e **Firebase** (Auth & Firestore) para gerenciamento completo de despesas pessoais.

---

## 📝 Funcionalidades Principais

- **Autenticação** via Firebase Auth (e-mail/senha)
- **CRUD de Despesas**: criação, listagem, edição e exclusão de despesas com campos de valor, descrição e data
- **Ordenação e Filtro**: ordenação por data e filtros dinâmicos por faixa de valor e intervalo de datas
- **Perfil de Usuário**: exibição de dados cadastrais e opção de redefinição de senha
- **Theming**: suporte a tema claro/escuro controlado via React Context e persistido em AsyncStorage

---

## 🛠️ Stack Tecnológico

- **React Native** ≥ 0.72
- **Expo** ≥ 48
- **Firebase**
  - Authentication
  - Firestore
- **React Navigation** ≥ 6
- **Async Storage** (`@react-native-async-storage/async-storage`)

---

## ⚙️ Configuração do Ambiente

1. **Pré-requisitos**

   - Node.js ≥ 14.x
   - npm ≥ 6.x
   - Expo CLI (`npm install -g expo-cli`)

## 🧩 Passo a Passo para Iniciar o Projeto

1. **Clone o repositório**  
   Abra o terminal e execute o comando:

   ```bash
   git clone https://github.com/joaovitorgraf/controler-de-gastos.git
   ```

2. **Acesse a pasta do projeto clonado**

   ```bash
   cd controler-de-gastos
   ```

3. **Instale as dependências**

   ```bash
   npm install
   ```

4. **Copie o arquivo .env.example para .env**

   ```bash
    cp .env.example .env
   ```

5. **Preencha o arquivo .env com os dados do seu projeto Firebase**

   ```bash
   FIREBASE_API_KEY=SEU_API_KEY
   FIREBASE_PROJECT_ID=SEU_PROJETO
   FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_ID
   FIREBASE_APP_ID=1:XXXX:web:XXXX
   ```

6. **Inicie o servidor de desenvolvimento (Metro Bundler)**

   ```bash
    npm run start
   ```

## 🚀 Comandos Disponíveis

| Comando           | Descrição                                        |
| ----------------- | ------------------------------------------------ |
| `npm install`     | Instala as dependências do projeto               |
| `npm run start`   | Inicia o Metro Bundler e abre o Expo DevTools    |
| `npm run android` | Executa o app em dispositivo ou emulador Android |
| `npm run ios`     | Executa o app em simulador iOS (macOS apenas)    |
| `npm run web`     | Executa o app no navegador via Expo for Web      |
