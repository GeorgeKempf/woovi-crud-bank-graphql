# 🏦 Woovi CRUD Bank GraphQL

Desafio técnico inspirado no dia a dia da **Woovi**, simulando um sistema bancário com **CRUD de contas**, **transferências financeiras** e **controle de saldo**, utilizando **GraphQL**, **Koa.js** e **MongoDB Atlas**.

---

## 🌐 Deploy

A API está disponível em produção no Render:

**GraphQL Endpoint**

```txt
https://woovi-crud-bank-graphql.onrender.com/graphql
```

> Observação: por estar no plano gratuito do Render, a primeira requisição pode demorar alguns segundos caso o serviço esteja inativo.

---

## 🚀 Tecnologias utilizadas

### Backend

- Node.js
- Koa.js
- GraphQL
- graphql-http
- MongoDB Atlas
- Mongoose
- Dotenv
- Nodemon

### Deploy

- Render

---

## 📌 Funcionalidades

### Contas Bancárias

- ✅ Criar conta
- ✅ Buscar todas as contas
- ✅ Buscar conta por ID
- ✅ Atualizar conta
- ✅ Excluir conta

### Transações

- ✅ Transferência entre contas
- ✅ Atualização automática de saldo
- ✅ Validação de saldo insuficiente
- ✅ Proteção contra transferência para a mesma conta
- ✅ Histórico de transações
- ✅ Extrato por conta

---

## 📂 Estrutura do projeto

```bash
backend/
├── src/
│   ├── models/
│   │   ├── Account.js
│   │   └── Transaction.js
│   ├── database.js
│   ├── schema.js
│   └── server.js
├── .env
├── package.json
└── package-lock.json
```

---

## ⚙️ Configuração do projeto

### 1. Clone o repositório

```bash
git clone https://github.com/GeorgeKempf/woovi-crud-bank-graphql.git
```

### 2. Entre na pasta do projeto

```bash
cd woovi-crud-bank-graphql/backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do backend:

```env
PORT=4000
MONGO_URI=sua_string_do_mongodb_atlas
```

### 5. Execute o projeto

```bash
npm run dev
```

Servidor disponível em:

```txt
http://localhost:4000/graphql
```

---

## 🧪 Exemplos de Queries GraphQL

### Criar conta

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

### Buscar contas

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

### Buscar conta por ID

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

### Atualizar conta

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

### Excluir conta

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

### Fazer transferência

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

### Histórico de transações

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

### Extrato por conta

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

## 👨‍💻 Autor

Desenvolvido por **George Kempf Teixeira**

### Contato

- GitHub: https://github.com/GeorgeKempf
- LinkedIn: https://www.linkedin.com/in/georgekempf/

---

## 📈 Melhorias futuras

- [ ] Testes automatizados com Jest
- [ ] Frontend com React + Relay
- [ ] Interface bancária
- [ ] Paginação Relay Connection
- [ ] Autenticação de usuários