
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button2 = {};	// @Button
// @endregion// @endlock

// eventHandlers// @lock

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
	WAF.addListener("button2", "click", button2.click, "WAF");
// @endregion
};// @endlock
