const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { graphql } = require("graphql");

const schemaModule = require("../src/schema");
const Account = require("../src/models/Account");
const Transaction = require("../src/models/Transaction");

const schema = schemaModule.schema || schemaModule;

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Account.deleteMany({});
  await Transaction.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Account GraphQL", () => {

  test("deve criar uma conta com saldo inicial", async () => {
    const mutation = `
      mutation {
        createAccount(name: "George Teste", initialBalance: 100) {
          id
          name
          balance
          active
        }
      }
    `;

    const result = await graphql({
      schema,
      source: mutation,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.createAccount.name).toBe("George Teste");
    expect(result.data.createAccount.balance).toBe(100);
    expect(result.data.createAccount.active).toBe(true);
  });

  test("não deve criar conta sem nome", async () => {
    const mutation = `
      mutation {
        createAccount(
          name: ""
          initialBalance: 100
        ) {
          id
          name
        }
      }
    `;

    const result = await graphql({
      schema,
      source: mutation,
    });

    expect(result.errors).toBeDefined();
  });

  test("deve transferir saldo entre contas", async () => {
  // cria conta origem
  const contaOrigem = await Account.create({
    name: "George",
    balance: 500,
    active: true,
  });

  // cria conta destino
  const contaDestino = await Account.create({
    name: "Michele",
    balance: 100,
    active: true,
  });

  const mutation = `
    mutation {
      sendTransaction(
        fromAccountId: "${contaOrigem._id}"
        toAccountId: "${contaDestino._id}"
        amount: 200
      ) {
        id
        amount
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
  });

  expect(result.errors).toBeUndefined();

  const origemAtualizada = await Account.findById(contaOrigem._id);
  const destinoAtualizado = await Account.findById(contaDestino._id);

  expect(origemAtualizada.balance).toBe(300);
  expect(destinoAtualizado.balance).toBe(300);
});

test("não deve transferir saldo insuficiente", async () => {
  const contaOrigem = await Account.create({
    name: "George",
    balance: 100,
    active: true,
  });

  const contaDestino = await Account.create({
    name: "Michele",
    balance: 100,
    active: true,
  });

  const mutation = `
    mutation {
      sendTransaction(
        fromAccountId: "${contaOrigem._id}"
        toAccountId: "${contaDestino._id}"
        amount: 500
      ) {
        id
        amount
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
  });

  expect(result.errors).toBeDefined();

  const origemAtualizada = await Account.findById(contaOrigem._id);
  const destinoAtualizado = await Account.findById(contaDestino._id);

  expect(origemAtualizada.balance).toBe(100);
  expect(destinoAtualizado.balance).toBe(100);
});

test("não deve transferir para a mesma conta", async () => {
  const conta = await Account.create({
    name: "George",
    balance: 500,
    active: true,
  });

  const mutation = `
    mutation {
      sendTransaction(
        fromAccountId: "${conta._id}"
        toAccountId: "${conta._id}"
        amount: 100
      ) {
        id
        amount
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
  });

  expect(result.errors).toBeDefined();

  const contaAtualizada = await Account.findById(conta._id);

  expect(contaAtualizada.balance).toBe(500);
});

test("não deve transferir para conta desativada", async () => {
  const contaOrigem = await Account.create({
    name: "George",
    balance: 500,
    active: true,
  });

  const contaDestino = await Account.create({
    name: "Conta Inativa",
    balance: 100,
    active: false,
  });

  const mutation = `
    mutation {
      sendTransaction(
        fromAccountId: "${contaOrigem._id}"
        toAccountId: "${contaDestino._id}"
        amount: 100
      ) {
        id
        amount
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
  });

  expect(result.errors).toBeDefined();

  const origemAtualizada = await Account.findById(contaOrigem._id);
  const destinoAtualizada = await Account.findById(contaDestino._id);

  expect(origemAtualizada.balance).toBe(500);
  expect(destinoAtualizada.balance).toBe(100);
});

});