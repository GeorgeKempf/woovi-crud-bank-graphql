const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const Account = require("./models/Account");
const Transaction = require("./models/Transaction");

const AccountType = new GraphQLObjectType({
    name: "Account",

    fields: () => ({
        id: {
            type: GraphQLString,
            resolve(parent) {
                return parent._id.toString();
            }
        },

        name: {
            type: GraphQLString
        },

        balance: {
            type: GraphQLFloat
        },

        active: {
            type: GraphQLBoolean
        },

        transactions: {
            type: new GraphQLList(TransactionType),

            async resolve(parent) {
                return await Transaction.find({
                    $or: [
                        { fromAccount: parent._id },
                        { toAccount: parent._id }
                    ]
                });
            }
        }
    })
});

const TransactionType = new GraphQLObjectType({
    name: "Transaction",

    fields: {
        id: {
            type: GraphQLString,
            resolve(parent) {
                return parent._id.toString();
            }
        },

        fromAccount: {
            type: AccountType,
            async resolve(parent) {
                return await Account.findById(parent.fromAccount);
            }
        },

        toAccount: {
            type: AccountType,
            async resolve(parent) {
                return await Account.findById(parent.toAccount);
            }
        },

        amount: {
            type: GraphQLFloat
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",

    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return "Woovi GraphQL funcionando 🚀";
            }
        },

        accounts: {
            type: new GraphQLList(AccountType),
            async resolve() {
                return await Account.find({ active: true });
            }
        },

        account: {
            type: AccountType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                return await Account.findById(args.id);
            }
        },

        transactions: {
    type: new GraphQLList(TransactionType),

    async resolve() {
        return await Transaction.find();
    }
},

accountTransactions: {
    type: new GraphQLList(TransactionType),

    args: {
        accountId: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(parent, args) {
        return await Transaction.find({
            $or: [
                { fromAccount: args.accountId },
                { toAccount: args.accountId }
            ]
        });
    }
}
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",

    fields: {
        createAccount: {
            type: AccountType,

            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },

                initialBalance: {
                    type: GraphQLFloat
                }
            },

            async resolve(parent, args) {
                if ((args.initialBalance || 0) < 0) {
                    throw new Error("O saldo inicial não pode ser negativo");
                }

                const account = new Account({
                    name: args.name,
                    balance: args.initialBalance || 0,
                    active: true
                });

                return await account.save();
            }
        },

        updateAccount: {
            type: AccountType,

            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                },

                name: {
                    type: GraphQLString
                }
            },

            async resolve(parent, args) {
                const account = await Account.findById(args.id);

                if (!account) {
                    throw new Error("Conta não encontrada");
                }

                if (!account.active) {
                    throw new Error("Não é possível atualizar uma conta desativada");
                }

                if (args.name) {
                    account.name = args.name;
                }

                return await account.save();
            }
        },

        deleteAccount: {
            type: AccountType,

            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },

            async resolve(parent, args) {
                const account = await Account.findById(args.id);

                if (!account) {
                    throw new Error("Conta não encontrada");
                }

                if (!account.active) {
                    throw new Error("Conta já está desativada");
                }

                account.active = false;

                return await account.save();
            }
        },

        sendTransaction: {
            type: TransactionType,

            args: {
                fromAccountId: {
                    type: new GraphQLNonNull(GraphQLString)
                },

                toAccountId: {
                    type: new GraphQLNonNull(GraphQLString)
                },

                amount: {
                    type: new GraphQLNonNull(GraphQLFloat)
                }
            },

            async resolve(parent, args) {
                if (args.fromAccountId === args.toAccountId) {
                    throw new Error("Não é possível transferir para a mesma conta");
                }

                if (args.amount <= 0) {
                    throw new Error("O valor da transferência deve ser maior que zero");
                }

                const fromAccount = await Account.findById(args.fromAccountId);
                const toAccount = await Account.findById(args.toAccountId);

                if (!fromAccount) {
                    throw new Error("Conta de origem não encontrada");
                }

                if (!toAccount) {
                    throw new Error("Conta de destino não encontrada");
                }

                if (!fromAccount.active) {
                    throw new Error("Conta de origem está desativada");
                }

                if (!toAccount.active) {
                    throw new Error("Conta de destino está desativada");
                }

                if (fromAccount.balance < args.amount) {
                    throw new Error("Saldo insuficiente");
                }

                fromAccount.balance -= args.amount;
                toAccount.balance += args.amount;

                await fromAccount.save();
                await toAccount.save();

                const transaction = new Transaction({
                    fromAccount: fromAccount._id,
                    toAccount: toAccount._id,
                    amount: args.amount
                });

                return await transaction.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});