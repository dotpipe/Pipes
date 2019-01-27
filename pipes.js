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
	if (!elem.hasAttribute("thru-pipe")) {
		if (elem.hasAttribute("to-pipe") && elem.getAttribute("to-pipe") !== "")
			window.location.replace(elem.getAttribute("to-pipe"));
		return;
	}
	if (elem.hasAttribute("href") && elem.getAttribute("href") !== undefined && elem.getAttribute("href") !== null)
		window.location.replace(elem.getAttribute("href"));
	var return_method = "";
	var elem_values = document.getElementsByClassName("data-pipe");
	var elem_qstring = "";
	for (var i = 0 ; i < elem_values.length ; i++)
		elem_qstring = elem_qstring + elem_values[i].name + "=" + elem_values[i].value + "&";
	
	if (elem_qstring[elem_qstring] === "&")
		elem_qstring = elem_qstring.substring(0, elem_qstring.length() - 1);

	(!elem.hasAttribute("method")) ? method_thru = "GET" : method_thru = elem.getAttribute("method");
	(!elem.hasAttribute("mode")) ? mode_thru = "no-cors" : mode_thru = elem.getAttribute("mode");
	(!elem.hasAttribute("cache")) ? cache_thru = "no-cache" : cache_thru = elem.getAttribute("cache");
	(!elem.hasAttribute("credentials")) ? cred_thru = "same-origin" : cred_thru = elem.getAttribute("cred");
	(!elem.hasAttribute("headers")) ? content_thru = "text/html" : content_thru = elem.getAttribute("content");
	(!elem.hasAttribute("redirect")) ? redirect_thru = "manual" : content_thru = elem.getAttribute("redirect");
	(!elem.hasAttribute("referrer")) ? refer_thru = "client" : content_thru = elem.getAttribute("referrer");

	var opts_req = new Request(elem.getAttribute("thru-pipe"));
	sequence<ByteString, ByteString> opts = {
		method: method_thru, // *GET, POST, PUT, DELETE, etc.
		mode: mode_thru, // no-cors, cors, *same-origin
		cache: cache_thru, // *default, no-cache, reload, force-cache, only-if-cached
		credentials: cred_thru, // include, same-origin, *omit
		headers: content_thru, // content-type
		redirect: redirect_thru, // manual, *follow, error
		referrer: refer_thru, // no-referrer, *client
		body: elem_qstring
	};
	/*
	if (content_thru == "application/json") {
		opts.push('body', JSON.stringify(elem_qstring));
	}
	else {
		opts.push('body', elem_qstring); // body data type must match "Content-Type" header
	}
	*/
	const abort_ctrl = new AbortController();
	const signal = abort_ctrl.signal;

	fetch(opts_req, {signal});
	setTimeout(() => abort_ctrl.abort(), 10 * 1000);
	fetch(opts_req, opts);
	if (elem.hasAttribute("to-pipe"))
		window.location.replace(elem.getAttribute("to-pipe"));
});
