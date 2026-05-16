# 🏦 Woovi CRUD Bank GraphQL

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/GraphQL-API-E10098?style=for-the-badge&logo=graphql" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Koa.js-Backend-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Jest-Testes-red?style=for-the-badge&logo=jest" />
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" />
</p>

---

## 📖 Sobre o projeto

Desafio técnico inspirado no dia a dia da **Woovi**, simulando um sistema bancário utilizando **GraphQL**, **Koa.js** e **MongoDB Atlas**.

O projeto implementa um sistema de contas bancárias com:

- CRUD completo de contas
- Transferências financeiras entre contas
- Controle de saldo
- Histórico de transações
- Regras de negócio bancárias
- Ledger de movimentações financeiras
- Testes automatizados

O objetivo foi construir uma API próxima de um cenário real, aplicando validações financeiras e regras de segurança para evitar inconsistências de saldo.

---

# 🌐 Deploy

A API está disponível online no Render:

### GraphQL Endpoint

```txt
https://woovi-crud-bank-graphql.onrender.com/graphql
```

> ⚠️ Observação: como o deploy está no plano gratuito do Render, a primeira requisição pode levar alguns segundos.

---

# 🚀 Tecnologias utilizadas

## Backend

- Node.js
- Koa.js
- GraphQL
- graphql-http
- MongoDB Atlas
- Mongoose
- Dotenv

## Testes

- Jest
- Supertest
- MongoDB Memory Server

## Deploy

- Render

---

# 🏦 Funcionalidades

## Contas Bancárias

✅ Criar conta

✅ Criar conta com saldo inicial

✅ Buscar todas as contas

✅ Buscar conta por ID

✅ Atualizar conta

✅ Excluir conta

✅ Ativar/Desativar conta

---

## Transferências Bancárias

✅ Transferência entre contas

✅ Atualização automática do saldo

✅ Registro da transação

✅ Histórico financeiro

✅ Extrato por conta

---

# 🔒 Regras de negócio implementadas

O sistema possui validações para simular um ambiente bancário real:

### Segurança de transferências

✅ Não permite transferir para a mesma conta

✅ Não permite saldo insuficiente

✅ Não permite enviar dinheiro para contas desativadas

✅ Não permite receber dinheiro em contas desativadas

✅ Não permite transferências inválidas

---

### Controle financeiro

✅ Atualização automática dos saldos

✅ Histórico de movimentações

✅ Ledger financeiro das contas

✅ Extrato individual por conta

---

# 🧪 Testes automatizados

O projeto possui testes automatizados cobrindo regras críticas do sistema bancário.

### Casos testados

✅ Criar conta com saldo inicial

✅ Bloquear criação de conta sem nome

✅ Transferir saldo entre contas

✅ Bloquear transferência com saldo insuficiente

✅ Bloquear transferência para a mesma conta

✅ Bloquear transferência para conta desativada

---

## Executar testes

Entre na pasta backend:

```bash
cd backend
```

Execute:

```bash
npm test
```

---

# 📮 Collection do Postman

O projeto possui uma collection pronta do Postman para testar toda a API.

### Localização:

```txt
postman/
└── woovi-crud-bank-graphql.postman.json
```

### Como importar

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo:

```txt
postman/woovi-crud-bank-graphql.postman.json
```

---

# 📂 Estrutura do projeto

```txt
woovi-crud-bank-graphql/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Account.js
│   │   │   └── Transaction.js
│   │   │
│   │   ├── database.js
│   │   ├── schema.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── account.test.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── postman/
│   └── woovi-crud-bank-graphql.postman.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Como rodar o projeto localmente

## 1. Clone o repositório

```bash
git clone https://github.com/GeorgeKempf/woovi-crud-bank-graphql.git
```

---

## 2. Entre no projeto

```bash
cd woovi-crud-bank-graphql/backend
```

---

## 3. Instale as dependências

```bash
npm install
```

---

## 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do backend:

```env
PORT=4000
MONGO_URI=sua_string_do_mongodb_atlas
```

---

## 5. Execute o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Servidor local:

```txt
http://localhost:4000/graphql
```

---

# 📚 Exemplos de Queries e Mutations

## Criar conta

```graphql
mutation {
  createAccount(
    name: "George"
    initialBalance: 1000
  ) {
    id
    name
    balance
    active
  }
}
```

---

## Buscar todas as contas

```graphql
query {
  accounts {
    id
    name
    balance
    active
  }
}
```

---

## Buscar conta por ID

```graphql
query {
  account(id: "ID_DA_CONTA") {
    id
    name
    balance
    active
  }
}
```

---

## Atualizar conta

```graphql
mutation {
  updateAccount(
    id: "ID_DA_CONTA"
    name: "Novo Nome"
  ) {
    id
    name
    balance
  }
}
```

---

## Excluir conta

```graphql
mutation {
  deleteAccount(
    id: "ID_DA_CONTA"
  ) {
    id
  }
}
```

---

## Fazer transferência

```graphql
mutation {
  sendTransaction(
    fromAccountId: "ID_ORIGEM"
    toAccountId: "ID_DESTINO"
    amount: 150
  ) {
    id
    amount

    fromAccount {
      name
      balance
    }

    toAccount {
      name
      balance
    }
  }
}
```

---

## Histórico de transações

```graphql
query {
  transactions {
    id
    amount

    fromAccount {
      name
    }

    toAccount {
      name
    }
  }
}
```

---

## Extrato de uma conta

```graphql
query {
  accountTransactions(
    accountId: "ID_DA_CONTA"
  ) {
    id
    amount

    fromAccount {
      name
    }

    toAccount {
      name
    }
  }
}
```

---

# 📈 Melhorias futuras

- [x] Testes automatizados com Jest
- [x] Collection do Postman
- [ ] Docker
- [ ] Frontend bancário
- [ ] Interface React + Relay
- [ ] Autenticação de usuários
- [ ] Logs de auditoria financeira
- [ ] Paginação Relay Connection

---

# 👨‍💻 Autor

### George Kempf Teixeira

Desenvolvido como desafio técnico inspirado na Woovi.

### Contato

**GitHub**

```txt
https://github.com/GeorgeKempf
```

**LinkedIn**

```txt
https://www.linkedin.com/in/georgekempf/
```