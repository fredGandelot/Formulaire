var Print = {};

Print.pdfFromTemplate = function(template, output, variables){
	
	var _ = require('./underscore');
	
	var templateFile        = (template instanceof File)? template : File(template);
	var templateFileContent = templateFile.toString();
	var compiledTemplate    = _.template(templateFileContent);
	var uuid                = generateUUID();
	var tmpFile             = File("/DATA/" + uuid + ".html");
	var outputFile          = (output instanceof File)? output : File(output);
	var outputFileContent   = compiledTemplate(variables);

	saveText(outputFileContent, tmpFile);

	var result = Print.toPDF({
	 inputFile  : tmpFile,
	 outputFile : outputFile
	});
	   
	tmpFile.remove();
	
	return result;
	
};

Print.toPDF = function(params) {

    var pdfWorker = null;
    var output = '';
    var parameters = '';
    var arrParameters = [];
    var pdfFile = null;
    var error = false;
    
    if(typeof params !== "object"){
    	throw new Error("Wrong parameters");
    }
	
	if ( ! params.inputFile ){
		throw new Error("inputFile cannot be empty or undefined")
	}
	
	if( ! params.outputFile ){
		params.outputFile = File(params.inputFile.getURL().replace(/\.html$/, '') + ".pdf");		
	}
	
	params.inputFile = params.inputFile.getURL();
    params.options   = params.options || '';
    params.delay     = params.delay || '5000';
    
    arrParameters.push(params.inputFile);
    arrParameters.push(params.outputFile);

    parameters = params.options + ' --javascript-delay ' + params.delay + ' {s} {f}';

    pdfWorker = new SystemWorker('wkhtmltopdf', parameters, null, arrParameters);

    pdfWorker.onmessage = function() {
    };

    pdfWorker.onterminated = function() {
        if (! error) {
            output = params.outputFile;
        }
        exitWait();
    };

    pdfWorker.onerror = function(message) {
    	error = true;
    	
        if (message && message.data) {
            message = 'Error while running wkhtmltopdf\r\n';
            output += message.data;            
        }
        
        exitWait();
    };

    wait(10000);

    return {
    	output : output,
    	error : error
    };
};

module.exports = Print;