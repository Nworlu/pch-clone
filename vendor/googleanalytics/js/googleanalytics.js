var PCHGA = function (property, device, page, uri) {

    // global for the page
    var property = property;
    var device = device;
    var page = page;
    var uri = uri;

    this.getProperty = function () {
        return property;
    };

    this.trackPageView = function (pageName) {

        if (typeof(pageName) !== "undefined")
            page = pageName;

        page = formatGaArgument(page);
        if(typeof PCH.TAGMANAGER !== 'undefined') {
            PCH.TAGMANAGER.utagview({ 'event_type': 'ga_pageview', 'event_page': page,  'ga_only_flag':'true'});
        }
    };

    /**
     * callback and callbackParam are optional.  Used only when a function needs to be called after ga tag has a change to complete
     */
    this.trackVirtualPageView = function (page, label, callback, callbackParam) {
        if(typeof page !== 'undefined')
            page = formatGaArgument(page);

        if(typeof label !== 'undefined')
            label = formatGaArgument(label);
        else
            label = '';

        //_gaq.push(['_trackPageview', '/vp/'+property+'/'+page+'/'+label]);


        if(typeof PCH.TAGMANAGER !== 'undefined') {
            PCH.TAGMANAGER.utagview({ 'event_type': 'ga_virtualpageview', 'event_page': page, 'event_label':label, 'ga_only_flag':'true'});
        }

        // delay here so ga code gets to execute before a redirect happens
        if(typeof callback === 'function') {
            setTimeout(function(){callback(callbackParam);}, "200");
        }
    };

    this.trackEvent = function (category, action, label) {

        if (typeof label !== 'undefined')
            label = formatGaArgument(label);
        else
            label = '';

        //_gaq.push(['_trackEvent', category, action, label, 0, true]);   // "true" parameter indicates that the event hit will not be used in bounce-rate calculation.

        if(typeof PCH.TAGMANAGER !== 'undefined') {
            PCH.TAGMANAGER.utaglink({ 'event_type': 'ga_trackevent', 'event_category': category, 'event_action':action, 'event_label':label});
        }
    };

    this.setCustomVar = function (index, name, value, opt_scope) {
        //_gaq.push(['_setCustomVar', index, name, value, opt_scope]);
    };

    /*
     * Remove whitespace, multiple space, multiple dollar sign, PCH Property Names
     * Replace remaining spaces with Hyphen Sign
     */
    function formatGaArgument (arg) {
        if (typeof(arg) != "undefined") {
            arg = arg.trim();
            arg = arg.replace("| PCH.com", "");
            arg = arg.replace("| PCHLotto", "");
            arg = arg.replace("| PCHSearchAndWin", "");
            arg = arg.replace("| PCHslots", "");
            arg = arg.replace(/\${1,}/g, "");
            arg = arg.replace(/,{1,}/g, "");
            arg = arg.replace(/\s{1,}/g, " ");
            arg = arg.replace(/\s{1,}/g, "-");
        }
        return arg;
    };
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}