import express from "express"
import { Client } from "../Client.";
import { Transaction, TransactionTypes } from "../Transaction";

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    });
    if (!client) {
        return res.json({
            msg: "client not found"
        })
    }

    const transaction = Transaction.create({
        amount, type, client
    })

    await transaction.save();
    if (type === TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance = client.balance - amount;
    }

    await client.save();

    return res.json({
        msg: "transaction saved"
    })
})


export {
    router as createTransactionRouter
}