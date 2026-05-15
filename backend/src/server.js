require("dotenv").config();

const Koa = require("koa");
const cors = require("@koa/cors");

const { createHandler } = require("graphql-http/lib/use/koa");
const { ruruHTML } = require("ruru/server");

const connectDatabase = require("./database");
const schema = require("./schema");

const app = new Koa();

app.use(cors());

app.use(async (ctx) => {
    if (ctx.path === "/graphql" && ctx.method === "GET" && !ctx.query.query) {
        ctx.type = "html";
        ctx.body = ruruHTML({
            endpoint: "/graphql"
        });
        return;
    }

    if (ctx.path === "/graphql") {
        return createHandler({
            schema
        })(ctx);
    }

    ctx.body = "Woovi Bank API rodando 🚀";
});

connectDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});