import express from 'express';
import { Kafka, logLevel } from 'kafkajs';
import routes from './routes';

//declaração de constantes
const app = express();
const kafka = new Kafka({
    clientId: 'api',
    brokers: ['127.0.0.1:9092'],
    //Retentativa em uma intervalo calculado exponencialmente aleatório, levando em consideração a quantidade de vezes e o tempo inicial
    logLevel: logLevel.WARN,
    retry: {
        initialRetryTime: 300,
        retries: 10
    },

});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' });
//declaração de uso
app.use((req, res, next) => {
    req.producer = producer;

    return next();
})
app.use(routes);

//função assíncrona para conectar o producer e levantar o server
async function run() {
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: 'certification-response' });

    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            console.log('Resposta', String(message.value));
        },
    });

    app.listen(3333);
}
// start da função run() com tratamento de erro
run().catch(console.error)