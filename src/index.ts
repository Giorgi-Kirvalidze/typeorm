import { createConnection } from "typeorm"
import { Banker } from "./entities/Banker"
import { Client } from "./entities/Client."
import { Transaction } from "./entities/Transaction"
import express from 'express'
import { createClientRouter } from "./entities/routes/create_client"
import { createBankerRouter } from "./entities/routes/create_banker"
import { createTransactionRouter } from "./entities/routes/create_transaction"
import { connectBankerToClientRouter } from "./entities/routes/connect_banker_to_client"

const app = express();

const main = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "me",
            password: "password",
            database: "typeorm",
            entities: [Client, Banker, Transaction],
            synchronize: true
        })
        console.log('connected to db')

        app.use(express.json())

        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankerToClientRouter)

        app.listen(8080, () => {
            console.log(`server is running at 8080 port`)
        })
    } catch (e) {
        console.error(e);
        throw new Error('failed to connect db')
    }

}

main()