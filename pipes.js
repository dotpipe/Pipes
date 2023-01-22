 /**
  *  only usage: onclick="pipes(this)"
  *  to begin using the PipesJS code.
  *  Usable DOM Attributes:
  *  Attribute   |   Use Case
  *  -------------------------------------------------------------
  *  query.......= default query string associated with url
  *  pipe........= name of id // Possible deprecation
  *  goto........= URI to go to
  *  ajax........= calls and returns the value file's output
  *  file-order..= ajax to these files, iterating [0,1,2,3]%array.length per call (delimited by ';')
  *  class-switch= iterate through class sets, iterating [0,1,2,3]%array.length per call (delimited by ';')
  *  file-index..= counter of which index to use with file-order to go with ajax
  *  incrIndex...= increment thru index of file-order (0 moves once) (default: 1)
  *  decrIndex...= decrement thru index of file-order (0 moves once) (default: 1)
  *  redirect....= "follow" the ajax call in POST or GET mode
  *  mode........= "POST" or "GET" (default: "POST")
  *  data-pipe...= name of class for multi-tag data (augment with pipe)
  *  multiple....= states that this object has two or more key/value pairs
  *  remove......= remove element in tag
  *  display.....= toggle visible and invisible of anything in the value (delimited by ';') this attribute
  *  insert......= return ajax call to this id
  *  json........= returns a JSON file set as value
  *  fs-opts.....= JSON headers for AJAX implementation
  *  headers.....= headers in CSS markup-style-attribute (delimited by '&')
  *  link........= class for operating tag as clickable link
  *  download....= class for downloading files
  *  file........= filename to download
  *  directory...= relative or full path of 'file'
  **** ALL HEADERS FOR AJAX are available. They will use defaults to
  **** go on if there is no input to replace them.
  */

  function fileOrder(elem)
  {
      arr = elem.getAttribute("file-order").split(";");
      if (!elem.hasAttribute("file-index"))
        elem.setAttribute("file-index", "0");
      index = parseInt(elem.getAttribute("file-index").toString());
      if (elem.hasAttribute("incrIndex"))
          index = parseInt(elem.getAttribute("incrIndex").toString()) + 1;
      else if (elem.hasAttribute("decrIndex"))
          index = Math.abs(parseInt(elem.getAttribute("decrIndex").toString())) - 1;
      else
          index++;
      if (index < 0)
          index = 0;
      index = index%arr.length;
      elem.setAttribute("file-index",index.toString());
      ppfc = document.getElementById(elem.getAttribute("insert").toString());
      console.log(ppfc);
      if (ppfc.hasAttribute("src"))
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
  
  function classOrder(elem)
  {
      arr = elem.getAttribute("class-switch").split(";");
      if (!elem.hasAttribute("class-index"))
        elem.setAttribute("class-index", "0");
      index = parseInt(elem.getAttribute("class-index").toString());
      if (elem.hasAttribute("incrIndex"))
          index = parseInt(elem.getAttribute("incrIndex").toString()) + 1;
      else if (elem.hasAttribute("decrIndex"))
          index = Math.abs(parseInt(elem.getAttribute("decrIndex").toString())) - 1;
      else
          index++;
      if (index < 0)
          index = 0;
      index = index%arr.length;
      elem.setAttribute("class-index",index.toString());
      elem.classList = arr[index];
  }
  
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
  
  function pipes(elem) {
  
      var opts = new Map();
      var query = "";
      var headers = new Map();
      var form_ids = new Map();
      var use_nav = 0;
      if (elem.classList == "download")
      {
          var text = ev.target.getAttribute("file");
          var element = document.createElement('a');
          var location = ev.target.getAttribute("directory");
          element.setAttribute('href', location + encodeURIComponent(text));
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
      }
      if (elem.classList.contains("redirect"))
      {
          window.location.href = elem.getAttribute("ajax") + ((elem.hasAttribute("query")) ? "?" + elem.getAttribute("query") : "");
      }
      if (elem.hasAttribute("display") && elem.getAttribute("display"))
      {
          var optsArray = elem.getAttribute("display").split(";");
          optsArray.forEach((e,f) => {
            var x = document.getElementById(e);
            if (x.style.display !== "none")
                x.style.display = "none";
            else
                x.style.display = "block";
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
      if (elem.classList.contains("link"))
      {
          window.location.href = elem.getAttribute("ajax");
          return;
      }
      if (elem.hasAttribute("query"))
      {
          var optsArray = elem.getAttribute("query").split(";");
          optsArray.forEach((e,f) => {
              var g = e.split(":");
              query = query + g[0] + "=" + g[1] + "&";
          });
          use_nav = 1;
      }
      if (elem.hasAttribute("headers"))
      {
          var optsArray = elem.getAttribute("headers").split("&");
          optsArray.forEach((e,f) => {
              var g = e.split(":");
              headers.set(g[0], g[1]);
          });
          use_nav = 1;
      }
      if (elem.hasAttribute("form-ids"))
      {
          var optsArray = elem.getAttribute("form-ids").split(";");
          optsArray.forEach((e,f) => {
              form_ids.set(f, document.getElementById(e));
          });
          use_nav = 1;
      }
      if (elem.hasAttribute("class-switch"))
      {
          classOrder(elem);
      }
      if (elem.hasAttribute("file-order"))
      {
          fileOrder(elem);
      }
      // Use a JSON to hold Header information
      if ((elem.hasAttribute("fs-opts") && elem.getAttribute("fs-opts")) || elem.hasAttribute("json") && elem.getAttribute("json"))
      {
          return fetch(elem.getAttribute("json")).json();
      }
      // This is a quick way to make a downloadable link in an href
  //     else
      if (use_nav == 1)
          navigate(elem, headers, query, form_ids);
  }
  
  function setAJAXOpts(elem, opts)
  {
      // communicate properties of Fetch Request
    //   var method_thru = (opts["method"] !== undefined) ? opts["method"] : "GET";
    //   var mode_thru = (opts["mode"] !== undefined) ? opts["mode"]: "no-cors";
    //   var cache_thru = (opts["cache"] !== undefined) ? opts["cache"]: "no-cache";
    //   var cred_thru = (opts["cred"] !== undefined) ? opts["cred"]: '{"Access-Control-Allow-Origin":"*"}';
    //   // updated "headers" attribute to more friendly "content-type" attribute
    //   var content_thru = (opts["content-type"] !== undefined) ? opts["content-type"]: '{"Content-Type":"text/html"}';
    //   var redirect_thru = (opts["redirect"] !== undefined) ? opts["redirect"]: "manual";
    //   var refer_thru = (opts["referrer"] !== undefined) ? opts["referrer"]: "referrer";
    //   opts.setRequestHeader("method", method_thru); // *GET, POST, PUT, DELETE, etc.
    //   opts.setRequestHeader("mode", mode_thru); // no-cors, cors, *same-origin
    //   opts.setRequestHeader("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
    //   opts.setRequestHeader("credentials", cred_thru); // include, same-origin, *omit
    //   opts.setRequestHeader("content-type", content_thru); // content-type UPDATED**
    //   opts.setRequestHeader("redirect", redirect_thru); // manual, *follow, error
    //   opts.setRequestHeader("referrer", refer_thru); // no-referrer, *client
    //   opts.setRequestHeader('body', JSON.stringify(content_thru));
  
      return opts;
  }

  function formAJAX(elem, elem_names)
  {
      var elem_qstring = "";

      // No, 'pipe' means it is generic. This means it is open season for all with this class
      for (var i = 0; i < elem_names.length; i++)
      {
          var elem_value = document.getElementById(elem_names[i]);
          elem_qstring = elem_qstring + elem_value.name + "=" + elem_value.value + "&";
          // Multi-select box
          console.log(".");
          if (elem_value.hasOwnProperty("multiple"))
          {
              for (var o of elem_value.options) {
                  if (o.selected) {
                      elem_qstring = elem_qstring + "&" + elem_value.name + "=" + o.value;
                  }
              }
          }
      }
      console.log(elem_qstring);
      return (elem_qstring);
  }
  
  function navigate(elem, opts = null, query = "", form_ids = [])
  {
      //formAJAX at the end of this line
      
        elem_qstring = query + ((form_ids.length > 0) ? formAJAX(elem, form_ids) : "");
        elem_qstring = elem.getAttribute("ajax") + ((elem_qstring.length > 0) ? "?" + elem_qstring : "");
        elem_qstring = encodeURI(elem_qstring);
        // opts.set("mode",(opts["mode"] !== undefined) ? opts["mode"]: '"Access-Control-Allow-Origin":"*"');


        var rawFile = new XMLHttpRequest();
        console.log(elem_qstring);
        console.log(opts);
        rawFile.open(opts.get("method"), elem_qstring, true);
        opts.forEach((i,f) => {
            rawFile.setRequestHeader(i.key,i.value);
        });
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
            var allText = rawFile.responseText;
            document.getElementById(elem.getAttribute("insert")).innerHTML = allText;
            }
        }
        rawFile.send();
  }
  
