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
            1 - Cadastro
            2 - Faça uma pergunta
            3 - Verifique seu pedido
            4 - Cancelar
          `);
        }, 1000);
        reset();
    }
    switch(msg){
      case '1':
        message.reply('Por favor, informe seu nome:');
        client.on('message', async(message) => {
          const msg1 = message.body.toLocaleLowerCase()
          const nome = msg1
          
          conversationState = 1;
          if(conversationState === 1){
            await message.reply(`Bem Vindo, ${nome}, para continuar seu cadastro envie seus dados pessoais!`)
            setTimeout(() => {
              client.sendMessage(message.from, `Informe se CPF: `);
            }, 1000);
            client.on('message', async (message) =>{
              const msg2 = message.body.toLocaleLowerCase()
              const cpf = msg2

              conversationState = 2;
              if(conversationState = 2){
                await message.reply('CPF registrado, agora envie o nome da sua mãe: ')
                client.on('message', async(message) => {
                  const msg3 = message.body.toLocaleLowerCase()
                  const nomeM = msg3

                  conversationState = 3;
                  if(conversationState === 3){
                    await message.reply(`Sua mãe é ${nomeM}, agora Informe o Nome do seu Pai: `)
                    client.on('message', async(message) => {
                      const msg4 = message.body.toLocaleLowerCase()
                      const nomeP = msg4

                      conversationState = 4;
                      if(conversationState === 4){
                        await message.reply(`Seu pai é: ${nomeP}`)
                      }
                    })
                  }
                })
              }
            })
          }
        })
        break;
      case '2':
        message.reply('Você escolheu fazer uma pergunta! Por favor, digite sua pergunta:');
        break;
      case '3':
        message.reply('Você escolheu verificar seu pedido! Por favor, digite o número do seu pedido:');
        break;
      case '4':
        message.reply('Você escolheu cancelar! Obrigado por utilizar nosso serviço.');
        break;
      // default:
      //   message.reply('Opção inválida. Por favor, selecione uma opção válida.');
    }
});

client.initialize();
