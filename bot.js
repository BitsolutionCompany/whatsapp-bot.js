// const qrcode = require('qrcode-terminal');
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
// const { Client } = require('whatsapp-web.js');
const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

client.on("message", (message) => {
  // console.log(message);

    if (message.body.toLocaleLowerCase() === "oi" || message.body.toLocaleLowerCase() === "olá" || message.body.toLocaleLowerCase() === "ola" || message.body.toLocaleLowerCase() === "bom dia" || message.body.toLocaleLowerCase() === "boa tarde" || message.body.toLocaleLowerCase() === "boa noite") {

      const data = new Date()
      const h = data.getHours();
      // const m = data.getMinutes();
      // const s = data.getSeconds();

      const r = [h, m, s].join(':')
      var msg = '';
      var text = '';

      if (h >= 0 && h < 6) {
          msg = 'Boa Madrugada';
      }else if(h > 6 && h < 12){
          msg = 'Bom dia';
      }else if(h > 12 && h < 18){
          msg = 'Boa Tarde';
      }else if(h > 18 && h <= 23){
          msg = 'Boa Noite';
      }
      text =  msg + " Seja bem vindo!";
      client.sendMessage(message.from, text);
    }
});

client.initialize();
