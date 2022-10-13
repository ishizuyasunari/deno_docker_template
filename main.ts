import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

const server = serve(`0.0.0.0:8080`);

/**
 * Logger setup
 */
await log.setup({
    //define handlers
    handlers: {
        console: new log.handlers.ConsoleHandler("DEBUG", {formatter: "{datetime} {levelName} {msg}"})
    },

    //assign handlers to loggers  
    loggers: {
        default: { level: "DEBUG", handlers: ["console"] },
    },
});
const logger = log.getLogger();

logger.debug('Server started on port 8080');

/**
 * Web Server Handling
 */
for await (const request of server) {
    switch (request.url) {
        case "/exec":
            request.respond({ body: await execute(request)});
            break;
        default:
            request.respond({ body: "404! Page Not Found!" });
    }
}

/**
 * execute testing mysql connection
 * https://deno.land/x/mysql@v2.9.0
 * using deno_mysql sample
 * @param request 
 * @returns 
 */
 export async function execute(request) {

    // connect pool
    const client = await new Client().connect({
        hostname: "db",
        username: "deno",
        db: "deno-db",
        poolSize: 3,
        password: "deno",
      });

    // create table
    await client.execute(`DROP TABLE IF EXISTS users`);
    await client.execute(`
        CREATE TABLE users (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            created_at timestamp not null default current_timestamp,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    // insert
    let result = await client.execute(`INSERT INTO users(name) values(?)`, [
        "manyuanrong",
      ]);

    // query
    const username = "manyuanrong";
    const users = await client.query(`select * from users`);
    const queryWithParams = await client.query(
        "select ??,name from ?? where id = ?",
        ["id", "users", 1],
    );
    console.log(users, queryWithParams);

    return "request ok";
}

