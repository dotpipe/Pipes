/**
  *  only usage: onclick="pipes(this)"
  *  to begin using the PipesJS code in other ways than <dyn> <pipe> and <timed>.
  *  Usable DOM Attributes (almost all are optional
  *  upto x > 134,217,000 different configurations 
  *  with unlimited inputs/outputs):
  *  Attribute/Tag   |   Use Case
  *  -------------------------------------------------------------
  *  insert..........= return ajax call to this id
  *  ajax............= calls and returns the value file's output ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  query...........= default query string associated with url ex: <anyTag query="key0:value0;key1:value2;" ajax="page.foo">
  *  <download>......= tag for downloading files ex: <download file="foo.zip" directory="/home/bar/"> (needs ending with slash)
  *  file............= filename to download
  *  directory.......= relative or full path of 'file'
  *  redirect........= "follow" the ajax call in POST or GET mode ex: <pipe ajax="foo.bar" redirect query="key0:value0;" insert="someID">
  *  <lnk>..........= tag for clickable link <lnk ajax="goinghere.html" query="key0:value0;">
  *  <pipe>..........= Tag (initializes on DOMContentLoaded Event) ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  <dyn>...........= Automatic eventListening tag for onclick="pipes(this)" ex: <dyn ajax="foo.bar" query="key0:value0;" insert="someID">
  *  <timed>.........= Timed result refreshing tags (Keep up-to-date handling on page) ex: <timed ajax="foo.bar" delay="3000" query="key0:value0;" insert="someID">
  *  delay...........= delay between <timed> tag refreshes (required for <timed> tag) ex: see <timed>
  *  <carousel>......= Tag to create a carousel that moves every a timeOut() delay="x" occurs ex: <carousel ajax="foo.bar" file-order="foo.bar;bar.foo;foobar.barfoo" delay="3000" id="thisId" insert="thisId" height="100" width="100" boxes="8" style="height:100;width:800">
  *  boxes...........= <carousel> attribute to request for x boxes for pictures
  *  file-order......= ajax to these files, iterating [0,1,2,3]%array.length per call (delimited by ';') ex: <pipe query="key0:value0;" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  file-index......= counter of which index to use with file-order to go with ajax ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  incrIndex.......= increment thru index of file-order (0 moves once) (default: 1) ex: <pipe ajax="foo.bar" class="incrIndex" interval="2" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  decrIndex.......= decrement thru index of file-order (0 moves once) (default: 1) ex: <pipe ajax="foo.bar" class="decrIndex" interval="3" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  interval........= Take this many steps when stepping through file-order default = 1
  *  set-attr........= attribute to set in target HTML tag ex: <pipe set-attr="value" ajax="foo.bar" query="key0:value0;" insert="thisOrSomeID">
  *  mode............= "POST" or "GET" (default: "POST") ex: <pipe mode="POST" set-attr="value" ajax="foo.bar" query="key0:value0;" insert="thisOrSomeID">
  *  data-pipe.......= name of class for multi-tag data (augment with pipe) *** obfuscated to be reoriented
  *  multiple........= states that this object has two or more key/value pairs use: states this is a multi-select form box
  *  remove..........= remove element in tag ex: <anyTag remove="someID;someOtherId;">
  *  display.........= toggle visible and invisible of anything in the value ex: <anyTag display="someID;someOtherId;">
  *  json............= returns a JSON file set as value *** obfuscated for now
  *  callback........= calls function set as attribute value
  *  headers.........= headers in CSS markup-style-attribute (delimited by '&') <any ajax="foo.bar" headers="foobar:boo&barfoo:barfoo;q:9&" insert="someID">
  *  form-class......= class name of devoted form elements
  *  mouse-over......= class name to work thru PipesJS' other attributes on mouseenter/mouseleave
  **** ALL HEADERS FOR AJAX are available. They will use defaults to
  **** go on if there is no input to replace them.
  */
  
    document.addEventListener("DOMContentLoaded", function () {
        domContentLoad();
        return;
    });

let domContentLoad = (again = false) => {
    doc_set = document.getElementsByTagName("pipe");
    if (again == false)
    {
        Array.from(doc_set).forEach(function(elem) {
	    if (elem.classList.contains("pipe-active"))
                return;
            elem.classList.toggle("pipe-active")
            pipes(elem);
        });
    }

    let elementsArray_time= document.getElementsByTagName("timed");
    Array.from(elementsArray_time).forEach(function(elem) {
            if (elem.classList.contains("pipe-active"))
                return;
            elem.classList.toggle("pipe-active")
            setTimers(elem);
    });

    let elementsArray_dyn = document.getElementsByTagName("dyn");
    Array.from(elementsArray_dyn).forEach(function(elem) {
            if (elem.classList.contains("pipe-active"))
                return;
            elem.classList.toggle("pipe-active")
            elem.addEventListener("click", function() {
                pipes(elem);
        });
    });

    let elements_Carousel = document.getElementsByTagName("carousel");
    Array.from(elements_Carousel).forEach(function(elem) {
            if (elem.classList.contains("pipe-active"))
                return;
            elem.classList.toggle("pipe-active")
        let auto = true;
        if (elem.classList.contains("carousel-auto-off"))
            auto = false;
        setTimeout(carousel(elem.id, auto),elem.getAttribute("delay"));
    });

    let elementsArray_link = document.getElementsByTagName("lnk");
    Array.from(elementsArray_link).forEach(function(elem) {
            if (elem.classList.contains("pipe-active"))
                return;
            elem.classList.toggle("pipe-active")
            elem.addEventListener("click", function() {
                pipes(elem);
        });
    });

    let elementsArray_mouseOver = document.getElementsByClassName("mouse-over");
    Array.from(elementsArray_mouseOver).forEach(function(elem) {
        if (elem.classList.contains("pipe-active"))
            return;
        elem.classList.toggle("pipe-active")
        elem.addEventListener("mouseenter", function() {
            pipes(elem, true);
        });
        elem.addEventListener("mouseleave", function() {
            pipes(elem, true);
        });
    });
}

// modala(jsonObj,rootNode)
function modala (value, tempTag, root, id)
{
    if (id == true)
    {
        tempTag = document.getElementById(tempTag);
    }
    if (root === undefined)
        root = tempTag;
    if (tempTag == undefined)
    {
        return;
    }
    if (value == undefined)
    {
        console.error("value of reference incorrect");
        return;
    }
    var temp = document.createElement((value["tagname"]));
    //        console.log(value);
    Object.entries(value).forEach((nest) => {
        const [k, v] = nest;
        if (v instanceof Object)
            modala(v, temp, root, id);
        else if (!Number(k) && k.toLowerCase() != "tagname" && k.toLowerCase() != "textcontent" && k.toLowerCase() != "innerhtml" && k.toLowerCase() != "innertext")
        {
            temp.setAttribute(k,v);
        }
        else if (!Number(k) && k.toLowerCase() != "tagname" && (k.toLowerCase() == "textcontent" || k.toLowerCase() == "innerhtml" || k.toLowerCase() == "innertext"))
        {
            (k.toLowerCase() == "textcontent") ? temp.textContent = v : (k.toLowerCase() == "innerhtml") ? temp.innerHTML = v : temp.innerText = v;
        }
    });
    tempTag.appendChild(temp);
    domContentLoad(true);
}

function setTimers(target)
{   
    var delay = target.getAttribute("delay");
    setTimeout(function() {
        pipes(target);
        setTimers(target);
    },delay);
}

function fileOrder(elem)
{
    arr = elem.getAttribute("file-order").split(";");
    ppfc = document.getElementById(elem.getAttribute("insert").toString());
    if (!ppfc.hasAttribute("file-index"))
        ppfc.setAttribute("file-index", "0");
    index = parseInt(ppfc.getAttribute("file-index").toString());
    var interv = elem.getAttribute("interval");
    if (elem.classList.contains("decrIndex"))
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) - interv;
    else
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) + interv;
    if (index < 0)
        index = arr.length - 1;
    index = index%arr.length;
    ppfc.setAttribute("file-index",index.toString());

    console.log(ppfc);
    if (ppfc.hasOwnAttribute("src"))
    {
        try {
            // <Source> tag's parentNode will need to be paused and resumed
            // to switch the video
            ppfc.parentNode.pause();
            ppfc.parentNode.setAttribute("src",arr[index].toString());
            ppfc.parentNode.load();
            ppfc.parentNode.play();
        }
        catch (e)
        {
            ppfc.setAttribute("src",arr[index].toString());
        }
    }
    else
    {
        elem.setAttribute("ajax",arr[index].toString());
        pipes(elem);
    }
}

function carousel(elem, auto = true)
{
    elem = document.getElementById(elem);
    x = document.getElementById(elem.getAttribute("insert"));
    var imgArray = elem.getAttribute("file-order").split(";");
    var y = 1;
    var crement = 1;
    if (elem.hasAttribute("interval"))
        crement = parseInt(elem.getAttribute("interval"));
    if (elem.classList.contains("decrIndex"))
        crement = crement * (-1);
    var i = parseInt(x.getAttribute("file-index"));
    var j = 0;
    var multiVert = 1;
    if (elem.classList.contains("carousel-vert"))
    {
        multiVert = 2;
    }
    var n = 0;
    for (m = 0 ; m < elem.getAttribute("boxes") * multiVert ; m++) {
        if (x.children.length < elem.getAttribute("boxes") * multiVert)
        {
            img = document.createElement("img");
            img.src = imgArray[(n)%imgArray.length];
            x.appendChild(img);
	    n++;
            br = document.createElement("br");
	    if (multiVert == 2)
	            x.appendChild(br);
        }
	else if (x.children.length >= x.getAttribute("boxes") * multiVert)
        {
	    if (x.children[Math.abs(j)%x.children.length].tagName == "BR")
                j++;
            x.children[Math.abs(j)%x.children.length].src = imgArray[i%imgArray.length];
            i++;
            j += 1;
        }
    }
    var w = (i);
    x.setAttribute("file-index", w%imgArray.length);
    var delay = elem.getAttribute("delay");
    if (!elem.classList.contains("carousel-auto-off"))
    setTimeout(() => { carousel(elem.id, auto); },delay);
}

function fileShift(elem)
{
    if (elem == null || elem == undefined)
        return;
    var arr = elem.getAttribute("file-order").split(";");
    var ppfc = document.getElementById(elem.getAttribute("insert").toString());
    if (!ppfc.hasAttribute("file-index"))
        ppfc.setAttribute("file-index", "0");
    var index = parseInt(ppfc.getAttribute("file-index").toString());
    var interv = elem.getAttribute("interval");
    if (elem.classList.contains("decrIndex"))
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) - interv;
    else
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) + interv;
    if (index < 0)
        index = arr.length - 1;
    index = index%arr.length;
    ppfc.setAttribute("file-index",index.toString());
}

function classOrder(elem)
{
    arr = elem.getAttribute("class-switch").split(";");
    if (!elem.hasAttribute("class-index"))
    elem.setAttribute("class-index", "0");
    index = parseInt(elem.getAttribute("class-index").toString());
    var interv = elem.getAttribute("interval");
    if (elem.classList.contains("decrIndex"))
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) - interv;
    else
        index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) + interv;
    if (index < 0)
        index = arr.length-1;
    index = index%arr.length;
    elem.setAttribute("class-index",index.toString());
    elem.classList = arr[index];
}

function pipes(elem, stop = false) {

    var query = "";
    var headers = new Map();
    var formclass = "";

    if (elem.id === null)
        return;
//    domContentLoad(true);
    if (elem.tagName == "lnk" && elem.classList.contains("new-win"))
    {
        let lnk_win = (elem.hasAttribute("win-name") && elem.getAttribute("win-name")) ? elem.getAttribute("win-name") : "_blank";
        window.open(elem.getAttribute("ajax") + (elem.hasAttribute("query") ? "?" + elem.getAttribute("query") : ""), lnk_win);
    }
    if (elem.tagName == "lnk" || elem.classList.contains("redirect"))
    {
        window.location.href = elem.getAttribute("ajax") + (elem.hasAttribute("query") ? "?" + elem.getAttribute("query") : "");
    }
    if (elem.hasAttribute("display") && elem.getAttribute("display"))
    {
        var optsArray = elem.getAttribute("display").split(";");
        optsArray.forEach((e,f) => {
        var x = document.getElementById(e);
        if (x !== null && x.style.display !== "none")
            x.style.display = "none";
        else if (x !== null)
            x.style.display = "block";
        });
    }
    if (elem.hasAttribute("set-attr") && elem.getAttribute("set-attr"))
    {
        var optsArray = elem.getAttribute("set-attr").split(";");
        optsArray.forEach((e,f) => {
            var g = e.split(":");
            if (g[0] != '' && g[0] != undefined)
            document.getElementById(elem.getAttribute("insert")).setAttribute(g[0],g[1]);
        });
    }
    if (elem.hasAttribute("remove") && elem.getAttribute("remove"))
    {
        var optsArray = elem.getAttribute("remove").split(";");
        optsArray.forEach((e,f) => {
            var x = document.getElementById(e);
            x.remove();
        });
    }
    if (elem.hasAttribute("query"))
    {
        var optsArray = elem.getAttribute("query").split(";");

        optsArray.forEach((e,f) => {
            var g = e.split(":");
            query = query + g[0] + "=" + g[1] + "&";
        });
    }
    if (elem.hasAttribute("headers"))
    {
        var optsArray = elem.getAttribute("headers").split("&");
        optsArray.forEach((e,f) => {
            var g = e.split(":");
            headers.set(g[0], g[1]);
        });
    }
    if (elem.hasAttribute("form-class"))
    {
        formclass = elem.getAttribute("form-class");
    }
    if (elem.hasAttribute("class-switch"))
    {
        classOrder(elem);
    }
    if (elem.tagName != "carousel" && elem.hasAttribute("file-order"))
    {
        fileOrder(elem);
    }
    if (elem.classList.contains("carousel"))
    {
	var auto = true;
	if (elem.classList.contains("carousel-auto-off"))
		auto = false;
	carousel(elem,auto);
	return;
    }
    // This is a quick way to make a downloadable link in an href
    //     else
    if (elem.tagName == "download")
    {
        var text = ev.target.getAttribute("file");
        var element = document.createElement('a');
        var location = ev.target.getAttribute("directory");
        element.setAttribute('href', location + encodeURIComponent(text));
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return;
    }
    if (stop == true)
            return;
    navigate(elem, headers, query, formclass);
}

function setAJAXOpts(elem, opts)
{

    // communicate properties of Fetch Request
    var method_thru = (opts["method"] !== undefined) ? opts["method"] : "GET";
    var mode_thru = (opts["mode"] !== undefined) ? opts["mode"]: "no-cors";
    var cache_thru = (opts["cache"] !== undefined) ? opts["cache"]: "no-cache";
    var cred_thru = (opts["cred"] !== undefined) ? opts["cred"]: '{"Access-Control-Allow-Origin":"*"}';
    // updated "headers" attribute to more friendly "content-type" attribute
    var content_thru = (opts["content-type"] !== undefined) ? opts["content-type"]: '{"Content-Type":"text/html"}';
    var redirect_thru = (opts["redirect"] !== undefined) ? opts["redirect"]: "manual";
    var refer_thru = (opts["referrer"] !== undefined) ? opts["referrer"]: "referrer";
    opts.set("method", method_thru); // *GET, POST, PUT, DELETE, etc.
    opts.set("mode", mode_thru); // no-cors, cors, *same-origin
    opts.set("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
    opts.set("credentials", cred_thru); // include, same-origin, *omit
    opts.set("content-type", content_thru); // content-type UPDATED**
    opts.set("redirect", redirect_thru); // manual, *follow, error
    opts.set("referrer", refer_thru); // no-referrer, *client
    opts.set('body', JSON.stringify(content_thru));

    return opts;
}

function formAJAX(elem, classname)
{
    var elem_qstring = "";

    // No, 'pipe' means it is generic. This means it is open season for all with this class
    for (var i = 0; i < document.getElementsByClassName(classname).length; i++)
    {
        var elem_value = document.getElementsByClassName(classname)[i];
        elem_qstring = elem_qstring + elem_value.name + "=" + elem_value.value + "&";
        // Multi-select box
        if (elem_value.hasOwnProperty("multiple"))
        {
            for (var o of elem_value.options) {
                if (o.selected) {
                    elem_qstring = elem_qstring + "&" + elem_value.name + "=" + o.value;
                }
            }
        }
    }
    if (elem.classList.contains("redirect"))
        window.location.href = elem.getAttribute("ajax") + ((elem_qstring.length > 0) ? "?" + elem_qstring : "");
    console.log(elem_qstring);
    return (elem_qstring.substring(0,-2));
}

function navigate(elem, opts = null, query = "", classname = "")
{
    //formAJAX at the end of this line

    elem_qstring = query + ((document.getElementsByClassName(classname).length > 0) ? formAJAX(elem, classname) : "");
    elem_qstring = elem.getAttribute("ajax") + ((elem_qstring.length > 0) ? "?" + elem_qstring : "");
    elem_qstring = encodeURI(elem_qstring);
    opts = setAJAXOpts(elem, opts);
    var opts_req = new Request(elem_qstring);
    opts.set("mode",(opts["mode"] !== undefined) ? opts["mode"]: '"Access-Control-Allow-Origin":"*"');

    var rawFile = new XMLHttpRequest();
    rawFile.open(opts.get("method"), elem_qstring, true);
    if (elem.classList.contains("json"))
    {
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                var allText = "";// JSON.parse(rawFile.responseText);
                try {
                    allText = JSON.parse(rawFile.responseText);
                    if (elem.hasAttribute("callback"))
                    {
                        var func = elem.getAttribute("callback");
                        this[func](allText);
                    }
                    if (elem.hasAttribute("insert"))
                    {
                            document.getElementById(elem.getAttribute("insert")).textContent = (rawFile.responseText);
                    }
                    return allText;
                }
                catch (e)
                {
                    console.log("Response not a JSON");
                }
            }
        }
    }
    else if (elem.classList.contains("set-attr"))
    {
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                var allText = JSON.parse(rawFile.responseText);
                try {
                    
                    document.getElementById(elem.getAttribute("insert")).setAttribute(elem.getAttribute("set-attr"),allText);
                    
                }
                catch (e)
                {
                    console.error(e);
                }
            }
        }
    }
    else if (elem.classList.contains("modala"))
    {
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                var allText = ""; // JSON.parse(rawFile.responseText);
                allText = JSON.parse(rawFile.responseText);
                var x = document.getElementById(elem.getAttribute("insert"));
                x.innerHTML = "";
                modala(allText, x);
                if (elem.hasAttribute("callback"))
                {
                    var func = elem.getAttribute("callback");
                    this[func](allText);
                }
            }
        }
    }
    else if (!elem.hasAttribute("json") && !elem.hasAttribute("callback") )
    {
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                var allText = rawFile.responseText;
                if (document.getElementById(elem.getAttribute("insert") !== null))
                document.getElementById(elem.getAttribute("insert")).innerHTML = allText;
            }
        }
    }
    else
    {
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4)
            {
                var allText = JSON.parse(rawFile.responseText);
                var func = elem.getAttribute("callback");
                this[func](allText);
            }
        }
    }
    try{
            rawFile.send();
    } catch(e)
    {
            console.log(e);
    }
}


