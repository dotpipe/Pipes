<script>
// Pipes for PVC & Pirodock
// http://www.github.com/swatchphp
window.addEventListener("click", function(ev) {
	var method_thru = "";
	var mode_thru = "";
	var cache_thru = "";
	var cred_thru = "";
	var content_thru = "";
	var redirect_thru = "";
	var refer_thru = "";
	var pipe_to = "";
	var return = "";
	var elem = document.getElementById(ev.target.id);
	if (elem.getAttribute("pipe_thru") == undefined)
		return;
	var elem_values = document.getElementsByClassName("pipe-data");
	var elem_qstring = "";
	Object.entries(elem_values).forEach(([ name, value]) {
		elem_qstring = elem_qstring + name + "=" + value + "&";
	});
	elem_qstring = elem.getAttribute("pipe-thru") + "?" + elem_qstring;
	fetch(elem_qstring, {
		(elem.getAttribute("method") == undefined) ? method_thru = "GET" : method_thru = elem.getAttribute("method");
		(elem.getAttribute("mode") == undefined) ? mode_thru = "cors" : mode_thru = elem.getAttribute("mode");
		(elem.getAttribute("cache") == undefined) ? cache_thru = "no-cache" : cache_thru = elem.getAttribute("cache");
		(elem.getAttribute("cred") == undefined) ? cred_thru = "cred" : cred_thru = elem.getAttribute("cred");
		(elem.getAttribute("content") == undefined) ? content_thru = "text/html" : content_thru = elem.getAttribute("content");
		(elem.getAttribute("redirect") == undefined) ? redirect_thru = "follow" : content_thru = elem.getAttribute("redirect");
		(elem.getAttribute("referrer") == undefined) ? refer_thru = "client" : content_thru = elem.getAttribute("referrer");
		method: method_thru, // *GET, POST, PUT, DELETE, etc.
		mode: mode_thru, // no-cors, cors, *same-origin
		cache: cache_thru, // *default, no-cache, reload, force-cache, only-if-cached
		credentials: cred_thru, // include, same-origin, *omit
		headers: {
			"Content-Type": content_thru,
		},
		redirect: redirect_thru, // manual, *follow, error
		referrer: refer_thru, // no-referrer, *client
		if (content_thru == "application/json" && return == "body") {
			body: JSON.stringify(data);
		}
		else if (return == "body") {
			body: data // body data type must match "Content-Type" header
		}
		else if (return == "return") {
			return data; // body data type must match "Content-Type" header
		}
	});
	if (elem.getAttribute("pipe-to") !== undefined)
		window.location.replace(elem.getAttribute("href"));
});
</script>
