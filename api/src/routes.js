import express from 'express';
import { CompressionTypes } from 'kafkajs';


const routes = express.Router();

routes.post('/certifications', async(req, res) => {

    const message = {
        user: { id: 1, name: 'Alisson Cavalcanti' },
        course: 'Node.js Kafka',
        grade: 100,
    };
    //console.log(req.producer);

    //Chamar micro-serviço
    await req.producer.send({
            topic: 'issue-certificate',
            compression: CompressionTypes.GZIP,
            messages: [
                { value: JSON.stringify(message) },
            ],
        })
        //return res.json({ msg })
    console.log("\n SENDED MSG KAFKA")
    return res.json({ ok: true });
})

export default routes;