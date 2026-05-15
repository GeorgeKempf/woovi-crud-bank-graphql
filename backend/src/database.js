const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado com sucesso");
    } catch (erro) {
        console.error("Erro ao conectar MongoDB:", erro);
    }
}

module.exports = connectDatabase;