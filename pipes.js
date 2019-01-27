// Pipes for PVC & Pirodock
// on github/swatchphp
window.addEventListener("click", function(ev) {
	var method_thru = "";
	var mode_thru = "";
	var cache_thru = "";
	var cred_thru = "";
	var content_thru = "";
	var redirect_thru = "";
	var refer_thru = "";
	var pipe_to = "";
	var return_method = "";
	var elem = document.getElementById(ev.target.id);
	if (elem === null || elem === undefined)
		return;
	if (elem.hasAttribute("href"))
		window.location.replace(elem.getAttribute("href"));
	var return_method = "";
	var elem_values = document.getElementsByClassName("data-pipe");
	var elem_qstring = "";
	for (var i = 0 ; i < elem_values.length ; i++) {
		var val = "";
		elem_qstring = elem_qstring + elem_values[i].name + "=" + elem_values[i].getAttribute("value") + "&";
	}
	
	if (elem_qstring[elem_qstring] === "&")
		elem_qstring = elem_qstring.substring(0, elem_qstring.length - 1);

	if (!elem.hasAttribute("thru-pipe")) {
		if (elem.hasAttribute("to-pipe") && elem.getAttribute("to-pipe") !== "")
			window.location.href = elem.getAttribute("to-pipe") + "?" +  elem_qstring.substring(0, elem_qstring.length - 1);
		return;
	}
	(!elem.hasAttribute("method")) ? method_thru = "GET" : method_thru = elem.getAttribute("method");
	(!elem.hasAttribute("mode")) ? mode_thru = "no-cors" : mode_thru = elem.getAttribute("mode");
	(!elem.hasAttribute("cache")) ? cache_thru = "no-cache" : cache_thru = elem.getAttribute("cache");
	(!elem.hasAttribute("credentials")) ? cred_thru = "same-origin" : cred_thru = elem.getAttribute("cred");
	(!elem.hasAttribute("headers")) ? content_thru = '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}' : content_thru = elem.getAttribute("content");
	(!elem.hasAttribute("redirect")) ? redirect_thru = "manual" : redirect_thru = elem.getAttribute("redirect");
	(!elem.hasAttribute("referrer")) ? refer_thru = "client" : refer_thru = elem.getAttribute("referrer");

	var opts_req = new Request(elem.getAttribute("thru-pipe"));
	opts = new Array();
	opts.push("method", method_thru); // *GET, POST, PUT, DELETE, etc.
	opts.push("mode", mode_thru); // no-cors, cors, *same-origin
	opts.push("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
	opts.push("credentials", cred_thru); // include, same-origin, *omit
	opts.push("header", content_thru); // content-type
	opts.push("redirect", redirect_thru); // manual, *follow, error
	opts.push("referrer", refer_thru); // no-referrer, *client
	if (content_thru == "application/json") {
		opts.push('body', JSON.stringify(elem_qstring));
	}
	else {
		opts.push('body', elem_qstring); // body data type must match "Content-Type" header
	}
	const abort_ctrl = new AbortController();
	const signal = abort_ctrl.signal;

	fetch(opts_req, {signal});
	setTimeout(() => abort_ctrl.abort(), 10 * 1000);
	fetch(opts_req, opts);
	if (elem.hasAttribute("to-pipe"))
		window.location.href = elem.getAttribute("to-pipe");
});
