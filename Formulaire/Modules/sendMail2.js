exports.generatePDF= function generatePDF () 
{
var Printer = require("print");

var templateFile = File("/PROJECT/templates/formulaire.html");
var randomName   = generateUUID() + ".pdf";
var outputFile   = File("/DATA/" + randomName);

var variables    = {
	"title" : "Mon Titre"
	};

var result = Printer.pdfFromTemplate(templateFile, outputFile, variables);

if(result){
	var mail = require('waf-mail/mail'); 
	var message = new mail.Mail();
	
	message.addField('From', 'frederic.gandelot@gmail.com'); 
	message.addField('To',  'frederic.gandelot@wakanda.io'); 
	message.addField('Subject', 'Formulaire');  
	message.setBody('Voir PJ');  
	message.addAttachment (outputFile, 'Formulaire.pdf', 'application/pdf');
	message.send({
	    address: 'smtp.gmail.com', 
	    port: 465,   // SSL port for gmail
	    isSSL: true, 
	    username: 'frederic.gandelot', 
	    password: (new Buffer("RlI0RC8vYWI=", "base64")).toString("utf8"), //Pour masquer le mot de passe à l'oeil
	    domain: 'gmail.com'
	});
	
	outputFile.remove();
};

result = "ca marche bien cette histoire!";
return result;

};
