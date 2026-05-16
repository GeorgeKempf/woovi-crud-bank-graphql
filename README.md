# 🏦 Woovi CRUD Bank GraphQL

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![Koa.js](https://img.shields.io/badge/Koa.js-Backend-black)
![Status](https://img.shields.io/badge/Status-Completed-success)

Desafio técnico inspirado no dia a dia da **Woovi**, simulando um sistema bancário com **CRUD de contas**, **transferências financeiras**, **controle de saldo** e **ledger de transações**, utilizando **GraphQL**, **Koa.js** e **MongoDB Atlas**.

O objetivo do projeto foi construir uma API bancária seguindo regras de negócio reais, como validação de saldo, prevenção de transações inválidas e histórico financeiro por conta.

---

# 🚀 Funcionalidades

## 🏦 Contas Bancárias

- ✅ Criar conta
- ✅ Criar conta com saldo inicial
- ✅ Buscar todas as contas
- ✅ Buscar conta por ID
- ✅ Atualizar conta
- ✅ Desativar conta (*soft delete*)
- ✅ Proteção contra operações em contas desativadas

## 💸 Transações

- ✅ Transferência entre contas
- ✅ Atualização automática de saldo
- ✅ Validação de saldo insuficiente
- ✅ Proteção contra transferência para a mesma conta
- ✅ Proteção contra contas inativas
- ✅ Histórico de transações
- ✅ Extrato financeiro por conta
- ✅ Controle de ledger bancário

---

# 🌐 Deploy

A API está disponível em produção no Render:

### GraphQL Endpoint

```txt
https://woovi-crud-bank-graphql.onrender.com/graphql
```

> ⚠️ Observação: por estar hospedado no plano gratuito do Render, a primeira requisição pode demorar alguns segundos.

---

# 🛠 Tecnologias utilizadas

## Backend

- Node.js
- Koa.js
- GraphQL
- graphql-http
- MongoDB Atlas
- Mongoose
- Dotenv
- Nodemon

## Banco de Dados

- MongoDB Atlas

## Deploy

- Render

---

# 📂 Estrutura do projeto

```bash
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
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── postman/
│   └── woovi-crud-bank-graphql.postman.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Como rodar o projeto localmente

## 1. Clone o repositório

```bash
git clone https://github.com/GeorgeKempf/woovi-crud-bank-graphql.git
```

## 2. Entre na pasta do backend

```bash
cd woovi-crud-bank-graphql/backend
```

## 3. Instale as dependências

```bash
npm install
```

## 4. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
PORT=4000
MONGO_URI=sua_string_do_mongodb_atlas
```

---

## 5. Execute o projeto

```bash
npm run dev
```

Servidor disponível em:

```txt
http://localhost:4000/graphql
```

---

# 🧪 Testando com Postman

O projeto já possui uma collection pronta do Postman para facilitar os testes.

Arquivo disponível em:

```txt
postman/woovi-crud-bank-graphql.postman.json
```

### Como importar

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo:

```txt
postman/woovi-crud-bank-graphql.postman.json
```

4. Execute as mutations e queries prontas.

---

# 📡 Exemplos de Queries e Mutations

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

## Desativar conta (*Soft Delete*)

```graphql
mutation {
  deleteAccount(
    id: "ID_DA_CONTA"
  ) {
    id
    active
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

## Extrato por conta

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

# 🧠 Regras de negócio implementadas

O sistema possui validações para simular um ambiente bancário mais próximo do real:

- Não permite transferir dinheiro para a mesma conta
- Não permite transferências com saldo insuficiente
- Não permite transações com contas desativadas
- Não permite enviar dinheiro para contas inativas
- O saldo é atualizado automaticamente após cada transação
- Todas as transferências ficam registradas no ledger da conta

---

# 📈 Melhorias futuras

- [ ] Testes automatizados com Jest
- [ ] Docker
- [ ] Frontend com React + Relay
- [ ] Interface bancária
- [ ] Paginação Relay Connection
- [ ] Sistema de autenticação
- [ ] Logs de auditoria financeira

---

# 👨‍💻 Autor

**George Kempf Teixeira**

### Contato

GitHub:  
https://github.com/GeorgeKempf

LinkedIn:  
https://www.linkedin.com/in/georgekempf/

---

⭐ Se este projeto te ajudou ou você gostou da implementação, considere deixar uma estrela no repositório.