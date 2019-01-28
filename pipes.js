// Pipes for PVC & Pirodock
// on github/swatchphp

['click', 'touch', 'tap'].forEach(function(e) {
	window.addEventListener(e, function(ev) {
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


	if (elem === null || elem === undefined) {
		if (ev.target.onclick !== null && ev.target.onclick !== undefined)
			(ev.target.onclick)();
	//does not mix with href (but you can still use <a></a>)
		if (ev.target.href !== null && ev.target.href !== undefined)
			window.location.href = ev.target.href;
		return;
	}
	//use 'data-pipe' as the classname to include its value
	// specify which pipe with pipe="target.id"
	var elem_values = document.getElementsByClassName("data-pipe");
	var elem_qstring = "";

	//return if non-pipe


	// No 'pipe' means it is generic
	for (var i = 0 ; i < elem_values.length ; i++) {
		var val = "";
	//if this is designated as belonging to another pipe, it won't be passed in the url
		if (!elem_values[i].hasAttribute("pipe") || elem_values[i].getAttribute("pipe") === elem.id)
			elem_qstring = elem_qstring + elem_values[i].name + "=" + elem_values[i].getAttribute("value") + "&";
	}

	//strip last & char
	if (elem_qstring[elem_qstring.length-1] === "&")
		elem_qstring = elem_qstring.substring(0, elem_qstring.length - 1);

	if (!elem.hasAttribute("thru-pipe")) {
		if (elem.hasAttribute("to-pipe") && elem.getAttribute("to-pipe") !== "")
			window.location.href = elem.getAttribute("to-pipe") + "?" +  elem_qstring.substring(0, elem_qstring.length - 1);
		return;
	}

	//make up headers and options for fetch call
	(!elem.hasAttribute("method")) ? method_thru = "GET" : method_thru = elem.getAttribute("method");
	(!elem.hasAttribute("mode")) ? mode_thru = "no-cors" : mode_thru = elem.getAttribute("mode");
	(!elem.hasAttribute("cache")) ? cache_thru = "no-cache" : cache_thru = elem.getAttribute("cache");
	(!elem.hasAttribute("credentials")) ? cred_thru = "same-origin" : cred_thru = elem.getAttribute("credentials");
	(!elem.hasAttribute("headers")) ? content_thru = '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}' : content_thru = elem.getAttribute("headers");
	(!elem.hasAttribute("redirect")) ? redirect_thru = "manual" : redirect_thru = elem.getAttribute("redirect");
	(!elem.hasAttribute("referrer")) ? refer_thru = "client" : refer_thru = elem.getAttribute("referrer");

	var opts_req = new Request(elem.getAttribute("thru-pipe"));
	opts = new Map();
	opts.set("method", method_thru); // *GET, POST, PUT, DELETE, etc.
	opts.set("mode", mode_thru); // no-cors, cors, *same-origin
	opts.set("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
	opts.set("credentials", cred_thru); // include, same-origin, *omit
	opts.set("header", content_thru); // content-type
	opts.set("redirect", redirect_thru); // manual, *follow, error
	opts.set("referrer", refer_thru); // no-referrer, *client
	if (content_thru == "application/json") {
		opts.set('body', JSON.stringify(elem_qstring));
	}
	else {
		opts.set('body', elem_qstring); // body data type must match "Content-Type" header
	}
	const abort_ctrl = new AbortController();
	const signal = abort_ctrl.signal;
	var target__ = null;
	if (elem.hasAttribute("out-pipe"))
		target__ = document.getElementById(elem.hasAttribute("out-pipe"));
	fetch(opts_req, {signal});
	setTimeout(() => abort_ctrl.abort(), 3 * 1000);
	const __grab = async (opts_r, opts_) => {
		return fetch(opts_r, opts_)
			.then(function(response){
			return response.text().then(function(text) {
				if (target__ != null)
					target__.innerHTML = text;
				return text;
			});
		});
		let dataBack = await text.text();
		return dataBack;
	
	}

	// call-pipe is the callback function for the fetch
	// You may leave it out, but you won't have a reply
	// It is recommended to leave at least a file that
	// you got it. You can do this through setting out-pipe.
	const getActivity = async (opts_req, opts) => {
		let g = await __grab(opts_req, opts);
		if (elem.hasAttribute("call-pipe")) {
			var t = elem.getAttribute("call-pipe");
			return (t)(g);
		}
		return;
	}
	var s = getActivity(opts_req, opts);
	if (elem.hasAttribute("to-pipe"))
		window.location.href = elem.getAttribute("to-pipe");
}, false);
});
