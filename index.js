
require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})



client.on('message', message => {

    if (!message.content.startsWith('!sheet') || message.author.bot) return;

const args = message.content.split(' ');
const command = args.shift().toLowerCase();
if (command != null) {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	const doc = new GoogleSpreadsheet(args[0]);

		// use service account creds
doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_SHEETS_API_KEY,
});
 doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
message.channel.send(`${doc.title}`);

const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
console.log(sheet.title);
console.log(sheet.rowCount);
message.channel.send(sheet.title);

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
}
})

client.login(process.env.BOT_TOKEN)



