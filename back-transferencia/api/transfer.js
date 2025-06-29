// api/transfer.js
const express = require('express');
const { ServiceBusClient } = require("@azure/service-bus");
require('dotenv').config();

const router = express.Router();

//const sbClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
//const sender = sbClient.createSender(process.env.QUEUE_NAME);

router.post('/transfer', async (req, res) => {
  const message = {
    body: req.body,
    applicationProperties: { type: "transferencia" },
  };

  console.log(message);

  try {
    //await sender.sendMessages(message);
    res.json({ status: 'enviado', message: 'Transferencia enviada al Service Bus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al enviar al Service Bus' });
  }
});

module.exports = router;
