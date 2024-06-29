// const qrcode = require('qrcode-terminal');
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
// const { Client } = require('whatsapp-web.js');

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2413.51-beta.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

// const data = new Date()
// const h = data.getHours();
// // const m = data.getMinutes();
// // const s = data.getSeconds();

// // const r = [h, m, s].join(':')
// var msg = '';
// var text = '';

// if (h >= 0 && h < 6) {
//     msg = 'Boa Madrugada';
// }else if(h > 6 && h < 12){
//     msg = 'Bom dia';
// }else if(h > 12 && h < 18){
//     msg = 'Boa Tarde';
// }else if(h > 18 && h <= 23){
//     msg = 'Boa Noite';
// }
// text =  msg + ", eu sou a Bia, assistente virtual da Bia Cosmético, em que posso ajudar?\n*Escolha uma Opção: *\n 1. Cadastro \n 2. Pedido \n 3. Dúvidas \n 4. Falar com atendente";
let conversationState = {};
client.on("message", (message) => {
    console.log(message);
    const msg = message.body.toLocaleLowerCase();

    if (msg.startsWith('oi') || msg.startsWith('ola') || msg.startsWith('olá') || msg.startsWith('bom dia') || msg.startsWith('boa tarde') || msg.startsWith('boa noite')) {
        message.reply('Olá! Eu sou o seu bot de atendimento. Como posso ajudá-lo hoje?');
        setTimeout(() => {
          message.reply(`
            Selecione uma opção:
            1 - Site
            2 - Dúvidas
          `);
        }, 1000);
    }
    switch(msg){
      case '1':
        message.reply('Esse é o nosso site, lá você pode realizar compras, se cadastrar e se tornar uma consultora.\n'+
         '*Link para compras: https://biacosmetico.com.br/store* \n' +
         '*Link para Ser Consultora: https://biacosmetico.com.br/store/cadastro_consultora.php* \n' +
         '*Ofertas: https://biacosmetico.com.br/store/ofertas.php*')
        break
    }
});

client.initialize();
