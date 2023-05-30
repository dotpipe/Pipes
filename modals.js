import jsonElems from '/modals.json' assert { type: 'json' };

var elemBody = document.getElementsByTagName("body")[0]
var captElemForEach = null;
var fg = null;
function forEachElem(elems, fg)
{
	Object.entries(elems).forEach((tagName) => {
		const [key,	 value] = tagName;
		if (key == "tagname")
		{
			try
			{
				if ((captElemForEach instanceof Node) && captElemForEach.parentNode != fg)
					fg.appendChild(captElemForEach);
			}
			catch (e)
			{
				elemBody.appendChild(fg);
				fg = document.createElement(value);
			}
			captElemForEach = document.createElement(value);
		}
		else if (key == "class")
		{
			captElemForEach.classList.toggle(value);
		}
		else if (key == "textContent")
		{
			captElemForEach.innerText = value;
		}
		else if (value instanceof Object)
		{
			try
			{
				console.log(value);
				const [k,v] = value;
				forEachElem(v, captElemForEach);
			}
			catch (e)
			{
				var tempTag = document.createElement(tagName["tagname"]);
				Object.entries(value).forEach((nest) => {
					const [k, v] = nest;
					if (k!="tagname")
						tempTag.k = v;
					console.log(k);
				});
				captElemForEach.appendChild(tempTag);
			}
		}
		else
			captElemForEach.setAttribute(key, value);
	});
	if (captElemForEach instanceof Node)
		fg.appendChild(captElemForEach);
	
}

function forEachElem1(value, tempTag, j)
{
	j++;
	var temp = document.createElement(value["tagname"]);
	Object.entries(value).forEach((nest) => {
		const [k, v] = nest;
		
		if (v instanceof Object)
			forEachElem1(v, temp, j);
		else if (k.toLowerCase() != "tagname" && k.toLowerCase() != "textcontent" && k.toLowerCase() != "innerhtml" && k.toLowerCase() != "innertext")
		{
			temp.setAttribute(k,v);
		}
		else if (k != "tagname" && k.toLowerCase() == "textcontent" || k.toLowerCase() == "innerhtml" || k.toLowerCase() == "innertext")
		{
			(k.toLowerCase() == "textcontent") ? temp.textContent = v : (k.toLowerCase() == "innerhtml") ? temp.innerHTML = v : temp.innerText = v;
		}
		console.log(tempTag);
	});
	tempTag.appendChild(temp);
}

forEachElem1(jsonElems, elemBody, 0);