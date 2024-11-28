window.PCH            = window.PCH || {};
window.PCH.TAGMANAGER = window.PCH.TAGMANAGER || {};

PCH.TAGMANAGER.utaglink = function(dataObj, callBackFunction) {
    $(function(){
    	if (typeof utag !== 'undefined') 
    		utag.link(dataObj, callBackFunction);
    });
}

PCH.TAGMANAGER.utagview = function(dataObj, callBackFunction, loadRules) {
    $(function(){
    	if (typeof utag !== 'undefined') 
    		utag.view(dataObj, callBackFunction, loadRules);   
    });
}
