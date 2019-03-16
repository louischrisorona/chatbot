const BOT_SECRET_TOKEN = "NTU1MDg5NTA5MDkyNTU2ODEz.D2mt_g.LX06wkvxvCv29B7SQU8wpqMtEGY";
const Discord = require('discord.js');
const client = new Discord.Client();
const MSGREF = {
	'love': 'I love you too!',
	'time': '',

}
let msgCount = 0;
let whatever = '';

client.on('ready', () => {
	console.log(`Connected as: ${client.user.tag}`);
	client.user.setActivity("Chingus", {type: "LISTENING"})
});

client.on('message', msg=>{
	if(msg.author == client.user) {
		return
	}

	if(msg.content.startsWith('$')){
		msgCount++;
		takeCommand(msg);
	}

	if(msg.content.includes(client.user.toString())){
		msgCount++;
		msg.channel.send(msg.author.toString() + ", " + msg.content.substr(client.user.toString().length) + ": does not compute.")
	}

	if(msg.content.includes('#')){
		msgCount++;
		msg.channel.send(msg.author.toString() + ", " + 'What ya talking about Willis?!');
	}

});

function getResponse(msg){
	/* 
	Code segment to find the message in the definition
	and respond with the predetermined selection.
	*/
}


function takeCommand(msg){
	let command = msg.content.substr(1);
	let splitCommand = command.split(' ');
	if(splitCommand.length > 1 || splitCommand[0] == 'roll') {
		let primaryCommand = splitCommand[0];
		let args = splitCommand.slice(1);

		console.log("Messages received: ", msgCount);
		console.log("Command received: ", primaryCommand);
		console.log("Sent by: ", msg.author.username);
		console.log("Arguments: ", args);

		if(primaryCommand == 'help') {
			helpCommand(args, msg);
		} else if(primaryCommand == 'roll') {
			rollCommand(args, msg);
		} else {
			msg.channel.send("I don't know that command. Try `$help` or `$roll`");
		}
	} else {
		msg.channel.send(`${msg.author.toString()}, what do you need help with?`)
		client.on('reply', rep => {
			msg.channel.send(`${msg.author.toString()}, I think I can help with that...`);
			setTimeout(function(){
				msg.channel.send(`...`)
			})
		})
	}
}

function helpCommand(args, msg) {
	if(args.length > 0) {		
		msg.channel.send("It looks like you need help with " + args)
	} else {
		msg.channel.send("I'm not sure what you need help with, " + msg.author.toString());
	}
}

function rollCommand(args, msg){
	let rand = Math.floor(Math.random() * 6) + 1;
	let rand2 = Math.floor(Math.random() * 6) + 1;
	msg.channel.send(`You rolled a ${rand} and a ${rand2}`);
}


client.login(BOT_SECRET_TOKEN);