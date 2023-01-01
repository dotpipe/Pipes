 /*
    Tags in script:
        pipe        = name of id
        ajax        = calls and returns this file's ouput
        file-order  = data-ajax to these files, iterating [0,1,2,3]%array.length
        index       = counter of which index to use with file-order to go with data-ajax
        redirect    = "follow" to go where the data-ajax says
        data-pipe   = name of class for multi-tag data (augment with pipe)
        multiple    = states that this object has two or more key/value pairs
        remove      = remove element in tag
        display     = toggle visible and invisible
        replace     = data-insert data-ajax callback return in this id
        data-insert      = same as replace
        json        = returning a JSON
        !!! ALL HEADERS FOR data-AJAX are available. They will use defaults to
        !!! go on if there is no input to replace them.
*/


/**
 * 
 * @param {this} elem 
 * @param {string} target_id 
 * 
 * elem is a source for the list of ; delimited files to be used
 * 
 * target_id is the endpoint for the output of the indexed file
 */
function fileOrder(elem, target_id)
{
    arr = elem.getAttribute("file-order").split(";");
    index = parseInt(elem.getAttribute("index").toString());
    index++;
    index = index%arr.length;
    console.log(index);
    elem.setAttribute("index",index.toString());
    document.getElementById(target_id).setAttribute("src",arr[index]);
}

/**
 * 
 * @param {this} elem 
 * 
 * Toggle display on or of
 */
function display(elem)
{
            // Toggle visibility of CSS display style of object
    if (elem.hasOwnProperty("display"))
    {
        var toggle = elem.getAttribute("display");
        doc_set = document.getElementById(toggle);
        if (document.getElementById(toggle) && doc_set.style.display !== "none"){
            doc_set.style.display = "none";
        }
        else if (document.getElementById(toggle) && doc_set.style.display === "none")
        {
            doc_set.style.display = "block";
        }
    }
}


/**
 * 
 * @param {this} elem 
 * 
 * Remove the current element from the DOM
 */
function remove(elem)
{
    // Remove Object
    if (elem.hasOwnProperty("remove"))
    {
        var rem = elem.getAttribute("remove");
        if (document.getElementById(rem)) {
            doc_set = document.getElementById(rem);
            doc_set.remove();
        }
        doc_set.parentNode.removeChild(doc_set);
            
    }
}

/**
 * 
 * @param {this} el 
 * @returns Map
 * 
 * Private function associated with get an element holding all header information
 * 
 * 
 */
function setAJAXOpts(el)
{
    elem = document.getElementById(el.id);

    // communicate properties of Fetch Request
    var method_thru = (opts["method"] !== undefined) ? opts["method"] : (!elem.hasAttribute("method")) ? "GET" : elem.getAttribute("method").toString();
    var mode_thru = (opts["mode"] !== undefined) ? opts["mode"]: (!elem.hasAttribute("mode")) ? "no-cors" : elem.getAttribute("mode").toString();
    var cache_thru = (opts["cache"] !== undefined) ? opts["cache"]: (!elem.hasAttribute("cred")) ? "no-cache" : elem.getAttribute("cache").toString();
    var cred_thru = (opts["cred"] !== undefined) ? opts["cred"]: (!elem.hasAttribute("cred")) ? "same-origin" : elem.getAttribute("cred").toString();
    // updated "headers" attribute to more friendly "content-type" attribute
    var content_thru = (opts["headers"] !== undefined) ? opts["headers"]: (elem.hasAttribute("headers")) ? '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}' : elem.getAttribute("headers").toString();
    var redirect_thru = (opts["redirect"] !== undefined) ? opts["redirect"]: (!elem.hasAttribute("redirect")) ? "manual" : elem.getAttribute("redirect").toString();
    var refer_thru = (opts["referrer"] !== undefined) ? opts["referrer"]: (!elem.hasAttribute("referrer")) ? "client" : elem.getAttribute("referrer").toString();
    opts = new Map();
    opts.set("method", method_thru); // *GET, POST, PUT, DELETE, etc.
    opts.set("mode", mode_thru); // no-cors, cors, *same-origin
    opts.set("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
    opts.set("credentials", cred_thru); // include, same-origin, *omit
    opts.set("content-type", content_thru); // content-type UPDATED**
    opts.set("redirect", redirect_thru); // manual, *follow, error
    opts.set("referrer", refer_thru); // no-referrer, *client
    opts.set('body', JSON.stringify(content_thru));
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;

    return opts;
}

/**
 * 
 * @param {this} el 
 * @returns 
 * 
 * create Pipe instance
 * 
 */
function pipe(el) {

    if (!document.body.contains(el))
        return;

    elem = document.getElementById(el.id);
    
    if (elem.hasAttribute("link"))
    {
        window.location.replace = elem.getAttribute("link").toString();
    }
    else if (elem.hasAttribute("ajax") && elem.getAttribute("ajax") !== null)
    {
        if (elem.hasAttribute("getOptions") && elem.getAttribute("getOptions"))
        {
            var fs=require('fs');
            var json = elem.getAttribute("opts").toString();
            var data=fs.readFileSync(json, 'utf8');
            var words=JSON.parse(data);
            return setAJAXOpts(words);
        }
        if (elem.hasAttribute("json") && elem.getAttribute("json"))
        {
            var fs=require('fs');
            var json = elem.getAttribute("json").toString();
            var data=fs.readFileSync(json, 'utf8');
            var words=JSON.parse(data);
            return words;
        }
        if (elem.hasAttribute("insert") && elem.getAttribute("insert"))
        {
            var url = collectFormData(el).toString();
            document.getElementById(el.getElementById("insert").toString()).innerHTML = captureAJAXResponse(elem.getAttribute("ajax").toString());
        }
    }
// This is a quick if to make a downloadable link in an href
    else if (ev.target.classList == "download")
    {
        var text = ev.target.getAttribute("file");
        var element = document.createElement('a');
        var location = ev.target.getAttribute("dir");
        element.setAttribute('href', location + encodeURIComponent(text));

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        return;
    }
}

/**
 * 
 * @param {this} el 
 * @returns 
 * 
 * el is a "data-pipe" class DOM object
 * Without a pipe="" variation, it will collect
 *   from all classes with the 'data-pipe' classname in them
 * 
 * 
 */
function collectFormData(el)
{
    if (!document.body.contains(el))
        return;
    elem = document.getElementById(el.id);
    // use 'data-pipe' as the classname to include its value
    // specify which pipe with pipe="target"
    var elem_values = document.getElementsByClassName("data-pipe");
    let elem_qstring = elem.getAttribute("query");

    // No, 'pipe' means it is generic. This means it is open season for all with this class
    for (var i = 0; i < elem_values.length; i++) {
        //if this is designated as belonging to another pipe, it won't be passed in the url
        if (elem_values && !elem_values[i].hasOwnProperty("pipe") || elem_values[i].getAttribute("pipe") == elem.id)
            elem_qstring = elem_qstring + elem_values[i].name + "=" + elem_values[i].value + "&";
        // Multi-select box
        if (elem_values[i].hasOwnProperty("multiple")) {
            for (var o of elem_values.options) {
                if (o.selected) {
                    elem_qstring = elem_qstring + "&" + elem_values[i].name + "=" + o.value;
                }
            }
        }
    }

    console.log(elem.getAttribute("ajax") + "?" + elem_qstring.substr(1));
    elem_qstring = elem.getAttribute("ajax") + "?" + elem_qstring.substr(1);
    return encodeURI(elem_qstring);
}

/**
 * 
 * @param {this} ev 
 * @returns 
 * 
 * download "file" from 'src' attribute
 * in the 'dir' location
 */
function download(ev)
{
    // This is a quick if to make a downloadable link in an href
    if (ev.target.classList == "download")
    {
        var text = ev.target.getAttribute("src");
        var element = document.createElement('a');
        var location = ev.target.getAttribute("dir");
        element.setAttribute('href', location + encodeURIComponent(text));

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        return;
    }
    const elem = ev.target;
    console.log(ev);
}

function captureAJAXResponse(elem, opts) {

    f = 0;

    opts.forEach((e,f) => {
        let header_array = ["method","mode","cache","credentials","content-type","redirect","referrer"];

        opts.set(e, header_array[f]);
        
    });

   
    var opts_req = new Request(elem.getAttribute("ajax").toString());
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;

    fetch(opts_req, {
        signal
    });
    
    setTimeout(() => abort_ctrl.abort(), 10 * 1000);
    const __grab = async (opts_req, opts) => {
        return fetch(opts_req, opts)
            .then(function(response) {
                return response.text().then(function(text) {
                    if (response.status == 404)
                        return;
                    return text;
                });
            });
    }
    return __grab(opts_req, opts);
}

function rem(elem)
{
    elem.remove();
}
