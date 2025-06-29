import { ServiceBusClient } from '@azure/service-bus';
import { AzureOpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const sbClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
const receiver = sbClient.createReceiver(process.env.QUEUE_NAME);

const openaiClient = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIDomain: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: '2024-07-01-preview', // verifica la versión disponible en tu recurso
});

receiver.subscribe({
  processMessage: async (msg) => {
    const { from, to, amount, timestamp, ip } = msg.body;
    const prompt = `Eres un sistema de detección de fraude...`;

    try {
      const response = await openaiClient.chat.completions.create({
        model: process.env.OPENAI_DEPLOYMENT_ID,
        messages: [{ role: 'user', content: prompt }],
      });

      const result = response.choices[0].message.content.trim();
      console.log('🔍 Resultado de análisis:', result);
    } catch (err) {
      console.error('❌ Error al llamar OpenAI:', err);
    }
  },
  processError: async (err) => console.error('💥 Service Bus error:', err),
});

console.log('📥 Worker escuchando mensajes...');
