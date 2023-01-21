import express from "express"
import { Banker } from "../Banker";
const router = express.Router();

router.post('/api/banker', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        cardNumber,
        employNumber
    } = req.body;

    const banker = Banker.create({
        first_name: firstName,
        last_name: lastName,
        email,
        card_number: cardNumber,
        employee_number: employNumber
    })
    console.log(banker)
    await banker.save();
    return res.json(banker);
})


export {
    router as createBankerRouter
}