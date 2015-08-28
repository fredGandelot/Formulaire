
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var RequestHandler = {};	// @Button
	var button2 = {};	// @Button
// @endregion// @endlock

// eventHandlers// @lock

	RequestHandler.click = function RequestHandler_click (event)// @startlock
	{// @endlock
		//debugger;
		var param = source.tReport.getAttributeValue('id')
		var urlstring = '/generatePDF'
		var formdata=new FormData(); 
        formdata.append('id',param) 
		var xhr=new XMLHttpRequest();
		xhr.open('POST',urlstring);
		xhr.send(formdata);
		console.log(xhr.response);
		
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		sendMail2.generatePDFAsync({
                'onSuccess': function (result) {
                    console.log(result);
                },  
                'onError': function (error) {
                    console.log(error);
                }
                
             });
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("RequestHandler", "click", RequestHandler.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
// @endregion
};// @endlock
